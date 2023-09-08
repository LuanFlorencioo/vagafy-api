import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { isNotEmpty, isString } from 'src/utils/message-validation';

export class UpdateRecruiterDto {
  @IsOptional()
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @IsOptional()
  @IsUrl({}, { message: 'linkedin - deve ser uma URL válida' })
  @IsString({ message: isString('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;
}
