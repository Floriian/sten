import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
describe('Todo E2E', () => {
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
    await app.listen(5403);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:5403/todos');
  });

  afterAll(() => {
    app.close();
  });

  describe('/ (NoData)', () => {
    it('Should thrown NotFound status (GET)', () => {
      return pactum.spec().get('/').expectStatus(HttpStatus.NOT_FOUND);
    });

    it('Should thrown NotFound status (GET one)', () => {
      return pactum.spec().get('/123').expectStatus(HttpStatus.NOT_FOUND);
    });

    it('Should thrown a NotFound status (PATCH)', () => {
      return pactum.spec().patch('/1').expectStatus(HttpStatus.NOT_FOUND);
    });

    it('Should thrown a NotFound status (DELETE)', () => {
      return pactum.spec().patch('/1').expectStatus(HttpStatus.NOT_FOUND);
    });
  });
  describe('Param validation', () => {
    it('Should thrown a BadRequest status for params (GET one)', () => {
      return pactum
        .spec()
        .get('/1fsdjkflhansdf')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('Should thrown a BadRequest status for params (PATCH)', () => {
      return pactum
        .spec()
        .patch('/123sdfojhsdnf')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });

    it('Should thrown a BadRequest status for params (DELETE)', () => {
      return pactum
        .spec()
        .delete('/123sdfojhsdnf')
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
  describe('Body validation', () => {
    it('Should BadRequest status, because no body provided', () => {
      return pactum.spec().post('/').expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Should BadRequest status for title.', () => {
      const createTodoDto = {
        title: 0,
        body: 'pipsum',
      };
      return pactum
        .spec()
        .post('/')
        .withBody(createTodoDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
    it('Should BadRequest status for body', () => {
      const createTodoDto = {
        title: 'asdasd',
        body: 0,
      };
      return pactum
        .spec()
        .post('/')
        .withBody(createTodoDto)
        .expectStatus(HttpStatus.BAD_REQUEST);
    });
  });
  //TODO with data
});
