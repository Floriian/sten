import { Test, TestingModule } from '@nestjs/testing';
import { Animal } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AnimalsService } from './animals.service';
import { UpdateAnimalDto } from './dto/update-animal.dto';

const testAnimal = 'Radír';
const testAnimalAge = 12;
const testAnimalSpecie = 'Mopsz';
const testAnimalId = 1;

const animalArray: Animal[] = [
  {
    name: testAnimal,
    age: testAnimalAge,
    specie: testAnimalSpecie,
    id: testAnimalId,
  },
  {
    name: 'Bella',
    age: 8,
    specie: 'Németjuhász',
    id: 2,
  },
  {
    name: 'Benjie',
    age: 15,
    specie: 'Sarki mix',
    id: 3,
  },
];

const oneAnimal = animalArray[0];

const db = {
  animal: {
    findMany: jest.fn().mockResolvedValue(animalArray),
    findUnique: jest.fn().mockResolvedValue(oneAnimal),
    create: jest.fn().mockResolvedValue(oneAnimal),
    delete: jest.fn().mockResolvedValue(oneAnimal),
    update: jest.fn().mockResolvedValue(oneAnimal),
  },
};

describe('AnimalsService', () => {
  let service: AnimalsService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return animals.', async () => {
    const animals = await service.findAll();
    expect(animals).toBe(animalArray);
  });

  it('Should return one animal', async () => {
    expect(service.findOne(0)).resolves.toEqual(oneAnimal);
  });

  it('Should update an animal.', async () => {
    const animalDto: UpdateAnimalDto = {
      age: testAnimalAge,
      name: testAnimal,
      specie: testAnimalSpecie,
    };
    const animal = await service.update(0, animalDto);
    expect(animal).toEqual(oneAnimal);
  });

  it('Should delete an animal', async () => {
    const deleteAnimal = await service.remove(0);
    expect(deleteAnimal).toEqual(oneAnimal);
  });

  it('Should create an animal', async () => {
    const createAnimal: Animal = {
      age: testAnimalAge,
      name: testAnimal,
      specie: testAnimalSpecie,
      id: testAnimalId,
    };
    const create = await service.create(createAnimal);
    expect(create).toEqual(createAnimal);
  });
});
