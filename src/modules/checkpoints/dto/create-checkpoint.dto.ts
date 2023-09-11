import { STATUS } from '@prisma/client';
import {
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import {
  isString,
  isNotEmpty,
  maxLength,
  minLength,
  isStatus,
} from 'src/utils/message-validation';

export class CreateCheckpointDto {
  @MaxLength(50, { message: maxLength('title', 50) })
  @MinLength(3, { message: minLength('title', 3) })
  @IsString({ message: isString('title') })
  @IsNotEmpty({ message: isNotEmpty('title') })
  title: string;

  @IsOptional()
  @IsString({ message: isString('description') })
  @IsNotEmpty({ message: isNotEmpty('description') })
  description?: string;

  @IsOptional()
  @IsString({ message: isString('status') })
  @IsNotEmpty({ message: isNotEmpty('status') })
  @IsEnum(STATUS, { message: isStatus() })
  status?: 'PENDING' | 'POSITIVE' | 'NEGATIVE';
}
