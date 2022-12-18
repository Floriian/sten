import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateCarDto } from '../src/car/dto/create-car.dto';
import { UpdateCarDto } from '../src/car/dto/update-car.dto';
describe('Car E2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(5401);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:5401/car');
  });

  afterAll(() => {
    app.close();
  });

  describe('/ (NoData)', () => {
    it('/ GET NotFoundException', () => {
      return pactum.spec().get('/').expectStatus(HttpStatus.NOT_FOUND);
    });
    it('/id GET BadRequestException', () => {
      return (
        pactum
          .spec()
          .get('/{id}')
          .withPathParams('id', 1)
          //Because in params when u send the number is string, and licenseplate contains nums and chars
          .expectStatus(HttpStatus.NOT_FOUND)
      );
    });
    it('/string GET NotFound', () => {
      return pactum
        .spec()
        .get('/{id}')
        .withPathParams('id', 'OO:OM:300')
        .expectStatus(HttpStatus.NOT_FOUND);
    });

    it('/id PATCH NotFound', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.NOT_FOUND);
    });

    it('/string PATCH NotFound', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', 'OO:OM:300')
        .expectStatus(HttpStatus.NOT_FOUND);
    });

    it('/id DELETE NotFound', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.NOT_FOUND);
    });

    it('/string DELETE BAD_REQUEST', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', 'OO:OM:300')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Validation', () => {
    it('Should body provided', () => {
      return pactum.spec().post('/').expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('FuelType must be a valid FuelType', () => {
      const carDto = {
        fuelType: 1,
        licensePlate: 'OO:OM:300',
        manufacturer: 'BMW',
        model: '3-series',
        year: 2009,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(carDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Licenseplate must be string', () => {
      const carDto = {
        fuelType: 'DIESEL',
        licensePlate: 1,
        manufacturer: 'BMW',
        model: '3-series',
        year: 2009,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(carDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Manufacturer must be string', () => {
      const carDto = {
        fuelType: 'DIESEL',
        licensePlate: 'OO:OM:300',
        manufacturer: 1,
        model: '3-series',
        year: 2009,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(carDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Model must be a string', () => {
      const carDto = {
        fuelType: 'DIESEL',
        licensePlate: 'OO:OM:300',
        manufacturer: 'BMW',
        model: 3,
        year: 2009,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(carDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Year must be number', () => {
      const carDto = {
        fuelType: 'DIESEL',
        licensePlate: 'OO:OM:300',
        manufacturer: 'BMW',
        model: '3-series',
        year: '2009',
      };
      return pactum
        .spec()
        .post('/')
        .withBody(carDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
  describe('/ (With Data)', () => {
    const createDto: CreateCarDto = {
      fuelType: 'DIESEL',
      licensePlate: 'OO:OM:300',
      manufacturer: 'BMW',
      model: '3-series',
      year: 2009,
    };
    const updateDto: UpdateCarDto = {
      fuelType: 'PETROL',
    };
    it('Should create an car', () => {
      return pactum
        .spec()
        .post('/')
        .withBody(createDto)
        .expectStatus(HttpStatus.CREATED)
        .expectBodyContains(createDto.fuelType)
        .expectBodyContains(createDto.licensePlate)
        .expectBodyContains(createDto.manufacturer)
        .expectBodyContains(createDto.model)
        .expectBodyContains(createDto.year)
        .stores('licensePlate', 'licensePlate')
        .stores('id', 'id');
    });
    it('Should get a list of cars.', () => {
      return pactum
        .spec()
        .get('/')
        .expectStatus(HttpStatus.OK)
        .expectJsonLength(1);
    });
    it('Should update a car', () => {
      return pactum
        .spec()
        .patch('/{licensePlate}')
        .withPathParams('licensePlate', '$S{licensePlate}')
        .withBody(updateDto)
        .expectStatus(HttpStatus.ACCEPTED);
    });
    it('Should delete a car', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', '$S{id}')
        .expectStatus(HttpStatus.ACCEPTED);
    });
    it('Should be a BAD_REQUEST on delete car', () => {
      //this test needed, because DELETE method only accept number. It validates the given param.
      return pactum
        .spec()
        .delete('/{licensePlate}')
        .withPathParams('licensePlate', '$S{licensePlate}')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
});
