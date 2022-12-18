import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class PersonQueryDto {
  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsOptional()
  @IsBoolean()
  includeCar: boolean;

  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsOptional()
  @IsBoolean()
  includeCity: boolean;

  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsOptional()
  @IsBoolean()
  includeTodos: boolean;
}
