import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Person } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonQueryDto } from './dto/person-query.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PersonService {
  constructor(private prisma: PrismaService) {}

  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    try {
      const person = await this.prisma.person.create({
        data: {
          age: createPersonDto.age,
          name: createPersonDto.name,
          sex: createPersonDto.sex,
        },
      });
      return person;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException();
        }
      }
    }
  }

  async findAll(): Promise<Person[]> {
    const persons = await this.prisma.person.findMany();
    if (!persons.length) throw new NotFoundException();
    return persons;
  }

  async findOne(name: string, query: PersonQueryDto): Promise<Person> {
    const person = await this.prisma.person.findUnique({
      where: {
        name: name,
      },
      include: {
        cars: query.includeCar,
        city: query.includeCity,
        todo: query.includeTodos,
      },
    });
    if (!person) throw new NotFoundException();
    return person;
  }

  async findById(id: number): Promise<Person> {
    const person = await this.prisma.person.findUnique({
      where: {
        id: id,
      },
    });
    if (!person) throw new NotFoundException();
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    await this.findById(id);

    const updatePerson = await this.prisma.person.update({
      where: {
        id: id,
      },
      data: {
        age: updatePersonDto.age,
        cars: {
          connect: {
            id: updatePersonDto.carId,
          },
        },
        city: {
          connect: {
            id: updatePersonDto.cityId,
          },
        },
        todo: {
          connect: {
            id: updatePersonDto.todoId,
          },
        },
        name: updatePersonDto.name,
        sex: updatePersonDto.sex,
      },
    });
    return updatePerson;
  }

  async remove(id: number) {
    await this.findById(id);

    const removePerson = await this.prisma.person.delete({
      where: {
        id,
      },
    });
    return removePerson;
  }
}
