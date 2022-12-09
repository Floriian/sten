import { Test, TestingModule } from '@nestjs/testing';
import { ConvertService } from './convert.service';

describe('UtilsService', () => {
  let service: ConvertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConvertService],
    }).compile();

    service = module.get<ConvertService>(ConvertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be true', () => {
    expect(service.toBoolean('true')).toBeTruthy();
  });

  it('Should be true', () => {
    expect(service.toBoolean('TRUE')).toBeTruthy();
  });

  it('Should be true', () => {
    expect(service.toBoolean('1')).toBeTruthy();
  });

  it('Should be false', () => {
    expect(service.toBoolean('false')).toBeFalsy();
  });

  it('Should be false', () => {
    expect(service.toBoolean('asd')).toBeFalsy();
  });

  it('Should be false', () => {
    expect(service.toBoolean('0')).toBeFalsy();
  });

  it('Should be false', () => {
    expect(service.toBoolean('false')).toBeFalsy();
  });

  it('Shold be false', () => {
    expect(service.toBoolean('FALSE')).toBeFalsy();
  });
});
