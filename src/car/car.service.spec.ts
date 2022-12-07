import { Test, TestingModule } from '@nestjs/testing';
import { Car } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CarService } from './car.service';
import { UpdateCarDto } from './dto/update-car.dto';

const testCar: Car = {
  age: 22,
  year: 2022,
  fuel: 'DIESEL',
  id: 1,
  licensePlate: 'MA00:01',
  manufacturer: 'BMW',
  model: '3-series',
};

const testCarArray: Car[] = [
  testCar,
  {
    age: 0,
    fuel: 'PETROL',
    id: 2,
    licensePlate: 'MA01:01',
    manufacturer: 'Mercedes-Benz',
    model: 'S-classe',
    year: 2022,
  },
  {
    age: 1,
    fuel: 'PETROL',
    id: 3,
    licensePlate: 'MA01:02',
    manufacturer: 'Mercedes-Benz',
    model: 'E-classe',
    year: 2021,
  },
];

const oneCar = testCarArray[0];

const db = {
  car: {
    findMany: jest.fn().mockResolvedValue(testCarArray),
    findUnique: jest.fn().mockResolvedValue(oneCar),
    findById: jest.fn().mockResolvedValue(oneCar),
    create: jest.fn().mockResolvedValue(oneCar),
    delete: jest.fn().mockResolvedValue(oneCar),
    update: jest.fn().mockResolvedValue(oneCar),
  },
};

describe('CarService', () => {
  let service: CarService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<CarService>(CarService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return cars', async () => {
    const cars = await service.findAll();
    expect(cars).toBe(testCarArray);
  });

  it('Should return one car', async () => {
    expect(service.findOne(testCar.licensePlate)).resolves.toEqual(oneCar);
  });

  it('Should update an car', async () => {
    const carDto: UpdateCarDto = {
      fuelType: testCar.fuel,
      licensePlate: testCar.licensePlate,
      manufacturer: testCar.manufacturer,
      model: testCar.model,
      year: testCar.year,
    };
    const car = await service.update('MA01:01', carDto);
    expect(car).toEqual(testCar);
  });

  it('Should delete an car', async () => {
    const deleteCar = await service.remove(testCar.id);
    expect(deleteCar).toEqual(testCar);
  });
});
