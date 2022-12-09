import { Test, TestingModule } from '@nestjs/testing';
import { Person } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonService } from './person.service';

const testPerson: Person = {
  age: 18,
  carId: 1,
  cityId: 1,
  id: 0,
  name: 'Flórián',
  sex: true,
};

const testPersonArray: Person[] = [
  testPerson,
  {
    age: 20,
    carId: 2,
    cityId: 2,
    name: 'Levente',
    sex: true,
    id: 1,
  },
];

const db = {
  person: {
    findMany: jest.fn().mockResolvedValue(testPersonArray),
    findUnique: jest.fn().mockResolvedValue(testPerson),
    update: jest.fn().mockResolvedValue(testPerson),
    create: jest.fn().mockResolvedValue(testPerson),
    delete: jest.fn().mockResolvedValue(testPerson),
  },
};

describe('PersonService', () => {
  let service: PersonService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should get all persons', async () => {
    const persons = await service.findAll();
    expect(persons).toEqual(testPersonArray);
  });

  it('Should return one person', async () => {
    const person = service.findOne('Flórián');
    expect(person).resolves.toEqual(testPerson);
  });

  it('Should update person', async () => {
    const personDto: UpdatePersonDto = {
      carId: 1,
      cityId: 1,
      age: 20,
      name: 'Flórián',
      sex: true,
    };
    const person = await service.update(testPerson.id, personDto);
    expect(person).toEqual(testPerson);
  });

  it('Should delete a person', async () => {
    const deletePerson = await service.remove(0);
    expect(deletePerson).toEqual(testPerson);
  });

  it('Should return a person by id', async () => {
    const findById = await service.findById(testPerson.id);
    expect(findById).toEqual(testPerson);
  });
});
