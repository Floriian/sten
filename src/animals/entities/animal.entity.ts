import { ApiProperty } from '@nestjs/swagger';
import { Animal } from '@prisma/client';

export class AnimalEntity implements Animal {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  specie: string;

  @ApiProperty()
  age: number;
}
