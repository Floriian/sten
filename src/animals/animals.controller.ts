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
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { ParamValiation } from './dto/paramvalidation.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AnimalEntity } from './entities/animal.entity';
@ApiTags('Animal')
@Controller('animal')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    isArray: false,
    description: 'It creates a new animal.',
    status: HttpStatus.CREATED,
    type: AnimalEntity,
  })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: true,
    description: 'It returns all animals.',
    status: HttpStatus.OK,
    type: AnimalEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    status: HttpStatus.NOT_FOUND,
    description: 'No animals found.',
  })
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    description: 'It return a $ID animal.',
    status: HttpStatus.OK,
    type: AnimalEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    status: HttpStatus.NOT_FOUND,
    description: 'No animal found',
  })
  findOne(@Param() animalParam: ParamValiation) {
    return this.animalsService.findOne(+animalParam.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    isArray: false,
    status: HttpStatus.ACCEPTED,
    description: 'It updates animal.',
    type: AnimalEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    status: HttpStatus.NOT_FOUND,
    description: 'No animal found',
  })
  update(
    @Param() animalParam: ParamValiation,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalsService.update(+animalParam.id, updateAnimalDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    status: HttpStatus.OK,
    description: 'It deletes an animal, and returns the deleted animal datas.',
    type: AnimalEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    status: HttpStatus.NOT_FOUND,
    description: 'No animal found',
  })
  remove(@Param() animalParam: ParamValiation) {
    return this.animalsService.remove(+animalParam.id);
  }
}
