import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { PrismaModule } from './prisma/prisma.module';
import { AnimalsModule } from './animals/animals.module';
import { CityModule } from './city/city.module';
import { CarModule } from './car/car.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AnimalsModule,
    CityModule,
    CarModule,
    WeatherModule,
  ],
})
export class AppModule {}
