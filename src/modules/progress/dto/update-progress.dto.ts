import { STATUS } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEnum,
} from 'class-validator';
import { isNotEmpty, isStatus, isString } from 'src/utils/message-validation';

export class UpdateProgressDto {
  @IsOptional()
  @IsBoolean({ message: 'is_finished - deve ser do tipo Boolean' })
  is_finished: boolean;

  @IsOptional()
  @IsDate({ message: 'meeting_at - deve ser do tipo Date' })
  meeting_at: Date;

  @IsOptional()
  @IsString({ message: isString('status') })
  @IsNotEmpty({ message: isNotEmpty('status') })
  @IsEnum(STATUS, { message: isStatus() })
  status?: 'PENDING' | 'POSITIVE' | 'NEGATIVE';
}
