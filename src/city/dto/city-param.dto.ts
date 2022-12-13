import { IsNotEmpty, IsString } from 'class-validator';

export class CityParamDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
