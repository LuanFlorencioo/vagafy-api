import { IsString, IsNotEmpty } from 'class-validator';
import { isNotEmpty, isString } from 'src/utils/message-validation';

export class CreateRecruiterDto {
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @IsString({ message: isString('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;
}
