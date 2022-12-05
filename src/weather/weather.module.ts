import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL:
        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
    }),
    CityModule,
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
