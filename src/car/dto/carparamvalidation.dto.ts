import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CarParamValiation {
  @IsString()
  @IsOptional()
  licensePlate: string;

  @IsNumberString()
  @IsOptional()
  id: string;
}
