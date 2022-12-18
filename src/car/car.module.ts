import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { UtilsModule } from '../utils/utils.module';

@Module({
  controllers: [CarController],
  providers: [CarService],
  imports: [UtilsModule],
})
export class CarModule {}
