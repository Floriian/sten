import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreatePersonDto } from './create-person.dto';

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  carId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  cityId: number;
}
