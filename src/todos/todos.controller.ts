import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TodoEntity } from './entities/todo.entity';

@ApiTags('Todo')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'It creates an TODO, and return it.',
    type: TodoEntity,
    isArray: false,
    status: HttpStatus.CREATED,
  })
  @ApiBadRequestResponse({
    description: 'Body validation error.',
    isArray: false,
    status: HttpStatus.BAD_REQUEST,
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TodoEntity,
    description: 'It returns all TODO-s.',
    status: HttpStatus.OK,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'No TODO-s found in the datbase',
    status: HttpStatus.NOT_FOUND,
    isArray: false,
  })
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    description: "TODO's id.",
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: 'It returns one TODO.',
    type: TodoEntity,
    status: HttpStatus.OK,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'No TODO found with the given ID.',
    isArray: false,
    status: HttpStatus.NOT_FOUND,
  })
  //TODO param validation
  @ApiBadRequestResponse({
    description: 'Invalid param.',
    status: HttpStatus.BAD_REQUEST,
    isArray: false,
  })
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    description: 'It updates a TODO',
    type: TodoEntity,
    isArray: false,
    status: HttpStatus.ACCEPTED,
  })
  @ApiNotFoundResponse({
    description: 'No TODO found with the given ID.',
    isArray: false,
    status: HttpStatus.NOT_FOUND,
  })
  @ApiBadRequestResponse({
    description: 'Invalid param or body.',
    status: HttpStatus.BAD_REQUEST,
    isArray: false,
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    description: "It delete an todo, and return the deleted TODO-'s data.",
    type: TodoEntity,
    status: HttpStatus.ACCEPTED,
    isArray: false,
  })
  @ApiNotFoundResponse({
    description: 'No TODO found with the given ID.',
    isArray: false,
    status: HttpStatus.NOT_FOUND,
  })
  @ApiBadRequestResponse({
    description: 'Invalid param.',
    status: HttpStatus.BAD_REQUEST,
    isArray: false,
  })
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}
