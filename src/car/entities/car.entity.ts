import { ApiProperty } from '@nestjs/swagger';
import { Car, FuelType } from '@prisma/client';

export class CarEntity implements Car {
  @ApiProperty()
  age: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  manufacturer: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  fuel: FuelType;
}
