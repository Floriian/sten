import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from './calc.service';

describe('CalculateService', () => {
  let service: CalculateService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculateService],
    }).compile();
    service = module.get<CalculateService>(CalculateService);
  });
  it('It should be 10', async () => {
    const calc = await service.calculateAge(2012);
    expect(calc).toEqual(10);
  });
  it('It should be -10', async () => {
    const calc = await service.calculateAge(2032);
    expect(calc).toEqual(-10);
  });
  it(`It should be the current date (${new Date().getFullYear()})`, () => {
    const calc = service.calculateAge();
    expect(calc).toEqual(new Date().getFullYear());
  });
});
