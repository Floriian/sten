import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CalculateService } from '../utils/calc.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarService {
  constructor(
    private prisma: PrismaService,
    private calculate: CalculateService,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      const createCar = await this.prisma.car.create({
        data: {
          age: new Date().getFullYear() - createCarDto.year,
          fuel: createCarDto.fuelType,
          licensePlate: createCarDto.licensePlate,
          manufacturer: createCarDto.manufacturer,
          model: createCarDto.model,
          year: createCarDto.year,
        },
      });
      return createCar;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException();
        }
      }
      throw e;
    }
  }

  async findAll(): Promise<Car[]> {
    const cars = await this.prisma.car.findMany({});
    if (!cars.length) throw new NotFoundException();
    return cars;
  }

  async findOne(licensePlate: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({
      where: {
        licensePlate,
      },
    });
    if (!car) throw new NotFoundException();
    return car;
  }

  async findById(id: number): Promise<Car> {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });
    return car;
  }

  async update(licensePlate: string, updateCarDto: UpdateCarDto): Promise<Car> {
    const getCar = await this.findOne(licensePlate);
    if (!getCar) throw new NotFoundException();
    const calculatedAge = await this.calculate.calculateAge(updateCarDto.year);
    const updateCar = await this.prisma.car.update({
      where: {
        licensePlate: licensePlate,
      },
      data: {
        age: calculatedAge,
        fuel: updateCarDto.fuelType,
        manufacturer: updateCarDto.manufacturer,
        model: updateCarDto.model,
        year: updateCarDto.year,
      },
    });
    return updateCar;
  }

  async remove(id: number): Promise<Car> {
    const getCar = await this.findById(id);
    if (!getCar) throw new NotFoundException();
    const remove = await this.prisma.car.delete({
      where: {
        id,
      },
    });
    return remove;
  }
}
