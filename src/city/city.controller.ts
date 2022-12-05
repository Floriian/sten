import {
  Controller,
  Get,
  Post,
  Body,
  Query,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityQueryDto } from './dto/city-query.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityEntity } from './entities/city.entity';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    isArray: false,
    description: 'It creates an city',
    status: HttpStatus.CREATED,
    type: CityEntity,
  })
  @ApiConflictResponse({
    isArray: false,
    description: 'It returns a ConflictException',
  })
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: false,
    description: 'It returns cities.',
    status: HttpStatus.OK,
    type: CityEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No cities found',
    status: HttpStatus.NOT_FOUND,
  })
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':name')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'includeWeather',
  })
  @ApiOkResponse({
    isArray: false,
    description: 'It returns a city.',
    status: HttpStatus.OK,
    type: CityEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No city found.',
    status: HttpStatus.NOT_FOUND,
  })
  findOne(@Param('name') name: string, @Query() query: CityQueryDto) {
    return this.cityService.findOne(name, query);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    isArray: false,
    description: 'It updates a city by id.',
    status: HttpStatus.ACCEPTED,
    type: CityEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No city find with given id.',
    status: HttpStatus.NOT_FOUND,
  })
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(':name')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    isArray: false,
    description: 'It removes a city, and returns the deleted city datas.',
    status: HttpStatus.ACCEPTED,
    type: CityEntity,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'No city found with given id',
    status: HttpStatus.NOT_FOUND,
  })
  remove(@Param('name') name: string) {
    return this.cityService.remove(name);
  }
}
