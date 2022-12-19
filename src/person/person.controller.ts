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
  Query,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PersonEntity } from './entities/person.entity';
import { PersonQueryDto } from './dto/person-query.dto';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    isArray: false,
    description: 'Returns the created person.',
    status: HttpStatus.CREATED,
    type: PersonEntity,
  })
  @ApiConflictResponse({
    isArray: false,
    description: 'This name is reserved.',
    status: HttpStatus.CONFLICT,
  })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: true,
    description: 'It returns all the persons',
    status: HttpStatus.OK,
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No persons found in the database.',
    status: HttpStatus.NOT_FOUND,
  })
  findAll() {
    return this.personService.findAll();
  }

  @Get(':name')
  @ApiParam({
    name: 'name',
    description: "Person's name.",
    required: true,
  })
  @ApiQuery({
    name: 'includeCity',
    description: "Include person's city?",
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'includeCar',
    description: "Include person's cars?",
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'includeTodos',
    description: "Include person's todos?",
    type: Boolean,
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    description: 'It returns a person by name',
    type: PersonEntity,
    status: HttpStatus.OK,
  })
  @ApiOkResponse({
    isArray: false,
    description: 'No person found with this name.',
    status: HttpStatus.NOT_FOUND,
  })
  findOne(@Param('name') name: string, @Query() query: PersonQueryDto) {
    return this.personService.findOne(name, query);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    description: 'It updates a person by id.',
    status: HttpStatus.OK,
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No person found with the given id.',
    status: HttpStatus.NOT_FOUND,
  })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    description:
      'It delete person by id, and returns the deleted person datas.',
    status: HttpStatus.OK,
    type: PersonEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No person found with the given id.',
    status: HttpStatus.NOT_FOUND,
  })
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
