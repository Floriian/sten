import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto/SignUp.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: SignUpDto) {
    try {
      const teacher = await this.prisma.teacher.create({
        data: {
          name: dto.username,
          password: dto.password,
        },
      });
      delete teacher.password;
      return teacher;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ConflictException();
        }
      }
      throw e;
    }
  }

  async signIn(dto: SignUpDto) {} //TODO: SignInDto
}
