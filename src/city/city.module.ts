import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { UtilsModule } from '../utils/utils.module';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [UtilsModule],
  exports: [CityService],
})
export class CityModule {}
