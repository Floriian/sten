import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class TodoParamValidation {
  @IsNumberString()
  @ApiProperty({
    name: "Todo's ID.",
  })
  id: string;
}
