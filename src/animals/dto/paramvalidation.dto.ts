import { IsNumberString } from 'class-validator';

//Use all this, because animal params based on id.
export class AnimalParamValidation {
  @IsNumberString()
  id: number;
}
