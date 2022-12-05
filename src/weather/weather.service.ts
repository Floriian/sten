import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Weather } from '@prisma/client';
import { AxiosError } from 'axios';
import { map, catchError } from 'rxjs';
import { CityService } from '../city/city.service';
import { PrismaService } from '../prisma/prisma.service';
import { WeatherAPIResponse } from '../types/WeatherAPIResponse';

@Injectable()
export class WeatherService {
  private readonly apiKey;
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
    config: ConfigService,
  ) {
    this.apiKey = config.get('API_KEY');
  }

  async findAll(): Promise<Weather[]> {
    const weathers = await this.prisma.weather.findMany({});
    if (!weathers.length) throw new NotFoundException();
    return weathers;
  }

  async findByCity(city: string) {
    const getWeather = await this.httpService.get(
      `/${city}?unitGroup=metric&key=${this.apiKey}&contentType=json`,
    );
    return getWeather.pipe(
      map((res) => this.createWeatherForCity(res.data)),
      catchError((e) => {
        throw new NotFoundException(); //Idk is this works..
      }),
    );
  }

  async createWeatherForCity(dto: WeatherAPIResponse) {
    const splittedAddress = await dto.resolvedAddress
      .replace(' ', '')
      .split(',');
    const createWeather = await this.prisma.weather.create({
      data: {
        humidity: dto.days[0].humidity,
        temp: dto.days[0].temp,
        city: {
          connectOrCreate: {
            where: {
              name: dto.address,
            },
            create: {
              name: splittedAddress[0],
              county: splittedAddress[1],
            },
          },
        },
      },
      include: {
        city: true,
      },
    });
    return createWeather;
    //! another method, but it doesn't work...
    // const cities = await this.cityService.findAll();
    // const returnCity = await cities.map(async (city) => {
    //   return await this.prisma.city.upsert({
    //     where: {
    //       id: city.id, //City
    //     },
    //     create: {
    //       name: splittedAddress[0],
    //       county: splittedAddress[1],
    //       weather: {
    //         create: {
    //           humidity: dto.days[0].humidity,
    //           temp: dto.days[0].temp,
    //         },
    //       },
    //     },
    //     update: {
    //       weather: {
    //         create: {
    //           humidity: dto.days[0].humidity,
    //           temp: dto.days[0].temp,
    //         },
    //       },
    //     },
    //     include: {
    //       weather: true,
    //     },
    //   });
    // });
    // return returnCity;
  }
}
