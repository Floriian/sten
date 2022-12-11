import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  async cleanDb() {
    await this.$transaction([
      this.animal.deleteMany(),
      this.car.deleteMany(),
      this.city.deleteMany(),
      this.person.deleteMany(),
      this.weather.deleteMany(),
    ]);
  }
}
