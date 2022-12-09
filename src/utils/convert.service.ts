import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertService {
  toBoolean(val: string): boolean {
    val = val.toLowerCase();
    return val === 'true' || val == '1' ? true : false;
  }
}
