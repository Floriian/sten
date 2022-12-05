import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class CityQueryDto {
  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsOptional()
  @IsBoolean()
  includeWeather: boolean;
}
