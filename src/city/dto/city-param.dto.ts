import { IsNumberString, IsOptional, IsString, Matches } from 'class-validator';

export class CityParamDto {
  @IsString()
  @Matches(/^([^0-9]*)$/, {
    message(validationArguments) {
      return validationArguments.property + ' must be a valid string.';
    },
  })
  @IsOptional()
  name: string;

  @IsNumberString()
  @IsOptional()
  id: string;
}
