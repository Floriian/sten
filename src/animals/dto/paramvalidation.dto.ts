import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

//Use all this, because animal params based on id.
export class AnimalParamValidation {
  @IsNumberString()
  @ApiProperty({ name: 'AnimalID' })
  id: string;
}
