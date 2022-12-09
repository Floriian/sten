import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class PersonQueryDto {
  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsNotEmpty()
  @IsBoolean()
  includeCar: boolean;

  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsNotEmpty()
  @IsBoolean()
  includeCity: boolean;
}
