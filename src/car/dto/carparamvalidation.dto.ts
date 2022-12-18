import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CarParamValiation {
  @IsString()
  @IsOptional()
  licensePlate: string;

  @IsNumberString()
  @IsOptional()
  id: string;
}
