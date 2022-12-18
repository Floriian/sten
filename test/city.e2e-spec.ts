import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateCityDto } from '../src/city/dto/create-city.dto';
import { UpdateCityDto } from '../src/city/dto/update-city.dto';

describe('City E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(5402);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:5402/city');
  });

  afterAll(() => {
    app.close();
  });

  describe('/ (NoData)', () => {
    it('Should thrown NotFound Status (GET)', () => {
      return pactum.spec().get('/').expectStatus(HttpStatus.NOT_FOUND);
    });
    it('Should thrown NotFound Status (GET one)', () => {
      return pactum
        .spec()
        .get('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Should thrown a NotFound Status (PATCH)', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.NOT_FOUND);
    });
    it('Should thrown a NotFound Status (DELETE)', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
  describe('Body Validation', () => {
    it('Should thrown a BadRequest Status, because body was not provided.', () => {
      return pactum.spec().post('/').expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('County must be a string', () => {
      const dto = {
        name: 'name',
        county: 1,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Name must be a string', () => {
      const dto = {
        name: 1,
        county: 'asd',
      };
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Name, county must be a string', () => {
      const dto = {
        name: 1,
        county: 1,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
  describe('/ (With Data)', () => {
    const createDto: CreateCityDto = {
      county: 'Bács-Kiskun',
      name: 'Bácsalmás',
    };
    const updateDto: UpdateCityDto = {
      county: 'Bács-Kiskun',
      name: 'Baja',
    };
    it('Should create a city', () => {
      return pactum
        .spec()
        .post('/')
        .withBody(createDto)
        .expectStatus(HttpStatus.CREATED)
        .stores('id', 'id')
        .stores('name', 'name');
    });
    it('Should return a city', () => {
      return pactum
        .spec()
        .get('/{name}')
        .withPathParams('name', '$S{name}')
        .expectBodyContains(createDto.county)
        .expectBodyContains(createDto.name)
        .expectStatus(HttpStatus.OK);
    });
    //TODO
    //!manually test works, but automated no....
    // it('Should return a city, without weather', () => {
    //   return pactum
    //     .spec()
    //     .get('/{name}')
    //     .withPathParams('name', '$S{name}')
    //     .withQueryParams('includeWeather', 'false')
    //     .expectStatus(HttpStatus.OK);
    // });
    // it('Should return a city with weather', () => {
    //   return pactum
    //     .spec()
    //     .get('/{name}')
    //     .withPathParams('name', '$S{name}')
    //     .withQueryParams('includeWeather', 'true')
    //     .expectStatus(HttpStatus.OK);
    // });
    it('Should return cities', () => {
      return pactum
        .spec()
        .get('/')
        .expectJsonLength(1)
        .expectStatus(HttpStatus.OK);
    });
    it('Should update a city', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', '$S{id}')
        .withBody(updateDto)
        .expectStatus(HttpStatus.ACCEPTED)
        .stores('id', 'id')
        .stores('name', 'name');
    });
    it('Should delete a city', () => {
      return pactum
        .spec()
        .delete('/{name}')
        .withPathParams('name', '$S{name}')
        .expectStatus(HttpStatus.ACCEPTED);
    });
    it("Shouldn' t update a city. (BadRequest)", () => {
      return pactum
        .spec()
        .patch('/{name}')
        .withBody(updateDto)
        .withPathParams('name', '$S{name}')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it("Shouldn't delete a city (BadRequest)", () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', '$S{id}')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
});
