import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { City } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CityQueryDto } from './dto/city-query.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(private prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    try {
      const createCity = await this.prisma.city.create({
        data: {
          county: createCityDto.county,
          name: createCityDto.name,
        },
      });
      return createCity;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException('This city name is already taken.');
        }
      }
      throw e;
    }
  }

  async findAll(): Promise<City[]> {
    const cities = await this.prisma.city.findMany();
    if (!cities.length) throw new NotFoundException();
    return cities;
  }

  async findOne(name: string, query?: CityQueryDto): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: {
        name,
      },
      include: {
        weather: query.includeWeather ? true : false,
      },
    });
    if (!city) throw new NotFoundException();
    return city;
  }

  async findById(id: number): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: {
        id,
      },
    });
    if (!city) throw new NotFoundException();
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const findCity = await this.findById(id);
    if (!findCity) throw new NotFoundException();
    const updateCity = await this.prisma.city.update({
      where: {
        id,
      },
      data: {
        county: updateCityDto.county,
        name: updateCityDto.name,
      },
    });
    return updateCity;
  }

  async remove(name: string): Promise<City> {
    const findCity = await this.findOne(name);
    if (!findCity) throw new NotFoundException();
    const deleteCity = await this.prisma.city.delete({
      where: {
        name,
      },
    });
    return deleteCity;
  }
}
