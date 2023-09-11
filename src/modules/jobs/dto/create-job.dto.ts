import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  IsUrl,
} from 'class-validator';
import {
  isNotEmpty,
  isString,
  isUrl,
  maxLength,
  minLength,
} from 'src/utils/message-validation';

export class CreateJobDto {
  @MaxLength(50, { message: maxLength('title', 50) })
  @MinLength(3, { message: minLength('title', 3) })
  @IsString({ message: isString('title') })
  @IsNotEmpty({ message: isNotEmpty('title') })
  title: string;

  @IsOptional()
  @IsString({ message: isString('description') })
  description?: string;

  @MaxLength(255, { message: maxLength('link', 255) })
  @IsUrl({}, { message: isUrl('link') })
  @IsString({ message: isString('link') })
  @IsNotEmpty({ message: isNotEmpty('link') })
  link: string;

  @MaxLength(50, { message: maxLength('company_name', 50) })
  @IsString({ message: isString('company_name') })
  @IsNotEmpty({ message: isNotEmpty('company_name') })
  company_name: string;

  @MaxLength(255, { message: maxLength('company_linkedin', 255) })
  @IsUrl({}, { message: isUrl('company_linkedin') })
  @IsString({ message: isString('company_linkedin') })
  @IsNotEmpty({ message: isNotEmpty('company_linkedin') })
  company_linkedin: string;

  @MaxLength(255, { message: maxLength('company_website', 255) })
  @IsUrl({}, { message: isUrl('company_website') })
  @IsString({ message: isString('company_website') })
  @IsNotEmpty({ message: isNotEmpty('company_website') })
  company_website: string;

  @MaxLength(255, { message: maxLength('company_logo_url', 255) })
  @IsUrl({}, { message: isUrl('company_logo_url') })
  @IsString({ message: isString('company_logo_url') })
  @IsNotEmpty({ message: isNotEmpty('company_logo_url') })
  company_logo_url: string;

  @IsOptional()
  @MaxLength(20, { message: maxLength('recruiter_name', 20) })
  @MinLength(3, { message: minLength('recruiter_name', 3) })
  @IsString({ message: isString('recruiter_name') })
  @IsNotEmpty({ message: isNotEmpty('recruiter_name') })
  recruiter_name?: string;

  @IsOptional()
  @MaxLength(255, { message: maxLength('recruiter_linkedin', 255) })
  @IsUrl({}, { message: isUrl('recruiter_linkedin') })
  @IsString({ message: isString('recruiter_linkedin') })
  @IsNotEmpty({ message: isNotEmpty('recruiter_linkedin') })
  recruiter_linkedin?: string;
}
