import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class CityQueryDto {
  @Transform(({ value }) => (value.toLowerCase() === 'true' ? true : false))
  @IsBoolean()
  includeWeather: boolean;
}
