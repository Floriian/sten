import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    isArray: true,
    description: 'It returns all weathers in database.',
    status: HttpStatus.OK,
  })
  @ApiNotFoundResponse({
    isArray: false,
    description: 'It returns a NotFoundException',
    status: HttpStatus.NOT_FOUND,
  })
  findAll() {
    return this.weatherService.findAll();
  }

  @Get(':city')
  findByCity(@Param('city') city: string) {
    return this.weatherService.findByCity(city);
  }
}
