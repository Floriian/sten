import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createTodo = await this.prisma.todo.create({
      data: {
        body: createTodoDto.body,
        title: createTodoDto.title,
      },
    });
    return createTodo;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany({});
    if (!todos) throw new NotFoundException();
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) throw new NotFoundException();
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    await this.findOne(id);

    const updateTodo = await this.prisma.todo.update({
      data: {
        body: updateTodoDto.body,
        completed: updateTodoDto.completed,
        title: updateTodoDto.title,
      },
      where: {
        id,
      },
    });
    return updateTodo;
  }

  async remove(id: number): Promise<Todo> {
    await this.findOne(id);

    const removeTodo = await this.prisma.todo.delete({
      where: {
        id,
      },
    });
    return removeTodo;
  }
}
