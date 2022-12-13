import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateService {
  calculateAge(year?: number): number {
    if (!year) return new Date().getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    return age;
  }
}
