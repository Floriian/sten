import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configservice: ConfigService) {
    super({
      datasources: {
        db: configservice.get('DATABASE_URL'),
      },
    });
  }
}
