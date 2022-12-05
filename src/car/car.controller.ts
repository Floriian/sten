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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    isArray: false,
    description: 'It creates an car.',
    status: HttpStatus.ACCEPTED,
    type: CarEntity,
  })
  @ApiConflictResponse({
    isArray: false,
    description: 'It returns a ConflictException',
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
    description: 'It returns a NotFoundException',
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
    description: 'It returns a NotFoundException',
    status: HttpStatus.NOT_FOUND,
  })
  findOne(@Param('licensePlate') licensePlate: string) {
    return this.carService.findOne(licensePlate);
  }

  @Patch(':licensePlate')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('licensePlate') licensePlate: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    return this.carService.update(licensePlate, updateCarDto);
  }

  @Delete(':id')
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
    description: 'It returns a NotFoundException',
    status: HttpStatus.NOT_FOUND,
  })
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}
