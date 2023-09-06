import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { isNotEmpty, isString } from 'src/utils/message-validation';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString({ message: isString('name') })
  @IsNotEmpty({ message: isNotEmpty('name') })
  name: string;

  @IsOptional()
  @IsUrl({}, { message: 'linkedin - deve ser uma URL válida' })
  @IsString({ message: isString('linkedin') })
  @IsNotEmpty({ message: isNotEmpty('linkedin') })
  linkedin: string;

  @IsOptional()
  @IsUrl({}, { message: 'website - deve ser uma URL válida' })
  @IsString({ message: isString('website') })
  @IsNotEmpty({ message: isNotEmpty('website') })
  website: string;

  @IsOptional()
  @IsUrl({}, { message: 'logo_url - deve ser uma URL válida' })
  @IsString({ message: isString('logo_url') })
  @IsNotEmpty({ message: isNotEmpty('logo_url') })
  logo_url: string;
}
