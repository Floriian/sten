import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { PrismaModule } from './prisma/prisma.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AnimalsModule,
  ],
})
export class AppModule {}
