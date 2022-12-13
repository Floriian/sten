import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CarParamValiation {
  @IsString()
  @IsOptional()
  @ApiProperty({ name: 'Licenseplate' })
  licensePlate: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty({ name: "Car's ID" })
  id: string;
}
