import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarParamValiation } from './dto/carparamvalidation.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    isArray: false,
    description: 'It creates an car.',
    status: HttpStatus.CREATED,
    type: CarEntity,
  })
  @ApiConflictResponse({
    isArray: false,
    description: 'This licenseplate is reserved',
    status: HttpStatus.CONFLICT,
  })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: true,
    description: 'It returns all car.',
    status: HttpStatus.OK,
    type: CarEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No car found with the given licenseplate.',
    status: HttpStatus.NOT_FOUND,
  })
  findAll() {
    return this.carService.findAll();
  }

  @Get(':licensePlate')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    description: 'It returns a car with given licenseplate',
    status: HttpStatus.OK,
    type: CarEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No car found with the given licenseplate.',
    status: HttpStatus.NOT_FOUND,
  })
  findOne(@Param() carParams: CarParamValiation) {
    return this.carService.findOne(carParams.licensePlate);
  }

  @Patch(':licensePlate')
  @ApiParam({
    name: 'licensePlate',
    description: "Car's licensePlate.",
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    description: 'It updates a car.',
    type: CarEntity,
    isArray: false,
    status: HttpStatus.ACCEPTED,
  })
  @ApiNotFoundResponse({
    description: 'No car found with the given licenseplate.',
    isArray: false,
    status: HttpStatus.NOT_FOUND,
  })
  update(
    @Param() carParams: CarParamValiation,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(carParams.licensePlate, updateCarDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: "Car's id.",
    required: true,
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    isArray: false,
    description:
      'It removes an car by given id, and returns deleted car datas.',
    status: HttpStatus.ACCEPTED,
    type: CarEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No car found with the given licenseplate.',
    status: HttpStatus.NOT_FOUND,
  })
  remove(@Param() carParams: CarParamValiation) {
    return this.carService.remove(+carParams.id);
  }
}
