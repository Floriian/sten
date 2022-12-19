import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common/services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const logger: Logger = new Logger('APP');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('STEN')
    .setDescription('A simple API.')
    .setVersion('1.0')
    .setExternalDoc('External doc', 'https://floriian.github.io/sten')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT || 5400);
  logger.log(`App is listening on port ${process.env.port || 5400}`);
}
bootstrap();
