import { ApiProperty } from '@nestjs/swagger';
import { Person } from '@prisma/client';
import { OmitStudentId } from '../../types/OmitStudentId';

export class PersonEntity implements OmitStudentId<Person> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  sex: boolean;

  @ApiProperty()
  carId: number;

  @ApiProperty()
  cityId: number;

  @ApiProperty()
  todoId: number;
}
