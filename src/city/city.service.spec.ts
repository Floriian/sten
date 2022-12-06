import { Test, TestingModule } from '@nestjs/testing';
import { City } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';

const testCity: City = {
  id: 0,
  name: 'Szeged',
  county: 'Csongrád-Csanád',
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
    findUnique: jest.fn().mockResolvedValue(oneCity),
    update: jest.fn().mockResolvedValue(oneCity),
    remove: jest.fn().mockResolvedValue(oneCity),
  },
};

//Todo

describe('CityService', () => {
  let service: CityService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: PrismaService,
          useValue: db,
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
});
