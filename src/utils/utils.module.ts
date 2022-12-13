import { Module } from '@nestjs/common';
import { CalculateService } from './calc.service';
import { ConvertService } from './convert.service';

@Module({
  providers: [ConvertService, CalculateService],
  exports: [ConvertService, CalculateService],
})
export class UtilsModule {}
