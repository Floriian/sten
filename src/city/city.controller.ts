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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CityService } from './city.service';
import { CityParamDto } from './dto/city-param.dto';
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
  @ApiParam({
    name: 'name',
    description: "City's name",
  })
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'includeWeather',
    description: 'Include weather?',
    required: false,
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
  findOne(@Param() cityParams: CityParamDto, @Query() query: CityQueryDto) {
    return this.cityService.findOne(cityParams.name, query);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: "City's ID's",
    required: true,
  })
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
  update(
    @Param() cityParams: CityParamDto,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    return this.cityService.update(+cityParams.id, updateCityDto);
  }

  @Delete(':name')
  @ApiParam({
    name: 'name',
    description: "City's name",
    required: true,
  })
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
  remove(@Param() cityParams: CityParamDto) {
    return this.cityService.remove(cityParams.name);
  }
}
