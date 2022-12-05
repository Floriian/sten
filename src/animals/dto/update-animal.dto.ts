import { PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateAnimalDto } from './create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}
