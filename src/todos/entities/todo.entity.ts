import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '@prisma/client';
import { OmitStudentId } from '../../types/OmitStudentId';

export class TodoEntity implements OmitStudentId<Todo> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
