import { Injectable } from '@nestjs/common';

@Injectable()
export class ConvertService {
  toBoolean(val: string): boolean {
    val = val.toLowerCase();
    return val === 'true' ? true : false;
  }
}
