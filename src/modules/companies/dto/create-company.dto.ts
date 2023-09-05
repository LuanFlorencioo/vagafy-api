import { IsString, IsNotEmpty } from 'class-validator';
import { isNotEmpty, isString } from 'src/utils/message-validation';

export class CreateCompanyDto {
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @IsString({ message: isString('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;

  @IsString({ message: isString('website') })
  @IsNotEmpty({ message: isNotEmpty('website') })
  website: string;

  @IsString({ message: isString('logo_url') })
  @IsNotEmpty({ message: isNotEmpty('logo_url') })
  logo_url: string;
}
