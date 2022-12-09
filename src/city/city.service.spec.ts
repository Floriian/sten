import { Test, TestingModule } from '@nestjs/testing';
import { City, Weather } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ConvertService } from '../utils/convert.service';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

type CustomCity<T> = City & {
  weather: T;
};

const testCity: City = {
  id: 0,
  name: 'Szeged',
  county: 'Csongrád-Csanád',
};

const testCityWithWeather: CustomCity<Weather[]> = {
  ...testCity,
  weather: [
    {
      cityId: testCity.id,
      id: 0,
      humidity: 82.2,
      temp: 22,
    },
    {
      cityId: testCity.id,
      id: 1,
      humidity: 82.1,
      temp: 23,
    },
  ],
};

const testCityArray: City[] = [
  testCity,
  {
    id: 1,
    name: 'Debrecen',
    county: 'Hajdú-Szoboszló',
  },
  {
    id: 2,
    name: 'Kecskemét',
    county: 'Bács-Kiskun',
  },
];

const oneCity = testCityArray[0];

const db = {
  city: {
    create: jest.fn().mockResolvedValue(oneCity),
    findMany: jest.fn().mockResolvedValue(testCityArray),
    findUnique: jest
      .fn()
      .mockResolvedValueOnce(oneCity)
      .mockResolvedValueOnce(testCityWithWeather),
    update: jest.fn().mockResolvedValue(oneCity),
    remove: jest.fn().mockResolvedValue(oneCity),
  },
};

const utils = {
  convert: {
    toBoolean: jest.fn(),
  },
};
//Todo

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;
  let convertService: ConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: PrismaService,
          useValue: db,
        },
        {
          provide: ConvertService,
          useValue: utils,
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create an city.', async () => {
    const createCity: CreateCityDto = {
      name: 'Szeged',
      county: 'Csongrád-Csanád',
    };
    const create = await service.create(createCity);
    expect(create).toEqual(testCity);
  });

  it('Should return all cities', async () => {
    const cities = await service.findAll();
    expect(cities).toEqual(testCityArray);
  });

  it('Should return one city', async () => {
    expect(
      service.findOne('Szeged', { includeWeather: false }),
    ).resolves.toEqual(testCity);
  });

  it('Should return city, with weather', async () => {
    const city = await service.findOne('Szeged', {
      includeWeather: true,
    });
    expect(city).toBe(testCityWithWeather);
  });
});
