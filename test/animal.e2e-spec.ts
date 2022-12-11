import {
  INestApplication,
  ValidationPipe,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { CreateAnimalDto } from '../src/animals/dto/create-animal.dto';
import { UpdateAnimalDto } from '../src/animals/dto/update-animal.dto';
describe('Animals E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(5401);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:5401/animal');
  });

  afterAll(() => {
    app.close();
  });

  describe('/  (No Data)', () => {
    it('/ GET NotFoundException', () => {
      return pactum.spec().get('/').expectStatus(HttpStatus.NOT_FOUND);
    });
    it('/id GET NotFoundException', () => {
      return pactum
        .spec()
        .get('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.NOT_FOUND);
    });
    it('/string GET NotFoundException', () => {
      return pactum
        .spec()
        .get('/{id}')
        .withPathParams('id', 'asdasd')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('/id PATCH NotFoundException', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.NOT_FOUND);
    });
    it('/string PATCH NotFoundException', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', 'asdasd')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('/id DELETE NotFoundException', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', 1)
        .expectStatus(HttpStatus.NOT_FOUND);
    });
    it('/string DELETE NotFoundException', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', 'asdasd')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });

  describe('Validation', () => {
    it('Should body provided', () => {
      return pactum.spec().post('/').expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Name must be a string', () => {
      const dto = {
        age: 18,
        name: 123,
        specie: 'Mopsz',
      };
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Age must be a number', () => {
      const dto = {
        age: '18',
        name: 'Radír',
        specie: 'Mopsz',
      };
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Specie must be a string', () => {
      const dto = {
        age: 18,
        name: 'Radír',
        specie: 123,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/ (With Data)', () => {
    const dto: CreateAnimalDto = {
      age: 18,
      name: 'Radír',
      specie: 'Mopsz',
    };
    const updateDto: UpdateAnimalDto = {
      age: 20,
      name: 'Radír',
      specie: 'Mopsz',
    };
    it('Should create an animal', () => {
      return pactum
        .spec()
        .post('/')
        .withBody(dto)
        .expectStatus(HttpStatus.CREATED)
        .expectBodyContains(dto.age)
        .expectBodyContains(dto.name)
        .expectBodyContains(dto.specie)
        .stores('animalId', 'id');
    });

    it('Should get a list of animals', () => {
      return pactum
        .spec()
        .get('/')
        .expectStatus(HttpStatus.OK)
        .expectJsonLength(1);
    });

    it('Should get an animal', () => {
      return pactum
        .spec()
        .get('/{id}')
        .withPathParams('id', `$S{animalId}`)
        .expectStatus(HttpStatus.OK);
    });

    it('Should update an animal', () => {
      return pactum
        .spec()
        .patch('/{id}')
        .withPathParams('id', '$S{animalId}')
        .withBody(updateDto)
        .expectStatus(HttpStatus.ACCEPTED);
    });

    it('Should delete an animal', () => {
      return pactum
        .spec()
        .delete('/{id}')
        .withPathParams('id', `$S{animalId}`)
        .expectStatus(HttpStatus.OK);
    });
  });
});
