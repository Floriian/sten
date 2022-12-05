import { ApiProperty } from '@nestjs/swagger';
import { FuelType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty({
    enum: FuelType,
  })
  @IsNotEmpty()
  @IsEnum(FuelType)
  fuelType: FuelType;
}
