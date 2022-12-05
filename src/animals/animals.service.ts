import { Injectable, NotFoundException } from '@nestjs/common';
import { Animal } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaService) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const newAnimal = await this.prisma.animal.create({
      data: {
        age: createAnimalDto.age,
        name: createAnimalDto.name,
        specie: createAnimalDto.specie,
      },
    });
    return newAnimal;
  }

  async findAll(): Promise<Animal[]> {
    const animals = await this.prisma.animal.findMany({});
    if (!animals.length) throw new NotFoundException();
    return animals;
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.prisma.animal.findUnique({
      where: {
        id,
      },
    });
    if (!animal) throw new NotFoundException();
    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    const animal = await this.findOne(id);
    if (!animal) throw new NotFoundException();

    const update = await this.prisma.animal.update({
      where: {
        id,
      },
      data: {
        age: updateAnimalDto.age,
        name: updateAnimalDto.name,
        specie: updateAnimalDto.specie,
      },
    });
    return update;
  }

  async remove(id: number): Promise<Animal> {
    const animal = await this.findOne(id);
    if (!animal) throw new NotFoundException();

    const deleteAnimal = await this.prisma.animal.delete({
      where: {
        id,
      },
    });
    return deleteAnimal;
  }
}
