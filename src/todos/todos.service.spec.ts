import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

const testTodo: Todo = {
  id: 1,
  title: 'Lorem Ipsum',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel arcu ac nunc pharetra condimentum quis egestas leo. Sed in magna aliquam, dignissim quam non, faucibus lorem.',
  completed: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const testTodos: Todo[] = [
  testTodo,
  {
    id: 2,
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel arcu ac nunc pharetra condimentum quis egestas leo. Sed in magna aliquam, dignissim quam non, faucibus lorem.',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Lorem Ipsum',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel arcu ac nunc pharetra condimentum quis egestas leo. Sed in magna aliquam, dignissim quam non, faucibus lorem.',
    completed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const db = {
  todo: {
    findMany: jest.fn().mockResolvedValue(testTodos),
    findUnique: jest.fn().mockResolvedValue(testTodo),
    create: jest.fn().mockResolvedValue(testTodo),
    delete: jest.fn().mockResolvedValue(testTodo),
    update: jest.fn().mockResolvedValue(testTodo),
  },
};

describe('TodosService', () => {
  let service: TodosService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('Should return todos', async () => {
    const todos = await service.findAll();
    expect(todos).toBe(testTodos);
  });
  it('Should return one todo', async () => {
    expect(service.findOne(testTodo.id)).resolves.toEqual(testTodo);
  });

  it('Should update a todo', async () => {
    const updateTodo: UpdateTodoDto = {
      completed: testTodo.completed,
      body: testTodo.body,
      title: testTodo.title,
    };
    const todo = await service.update(testTodo.id, updateTodo);
    expect(todo).toEqual(testTodo);
  });

  it('Should delete a todo', async () => {
    const deleteTodo = await service.remove(testTodo.id);
    expect(deleteTodo).toEqual(testTodo);
  });
});
