import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { CreateUserInput } from '../graphql';
import { UserRoles } from '@app/common';

export class CreateUserDto extends CreateUserInput {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray({ each: true })
  @IsString({ each: true })
  @IsEnum(UserRoles)
  roles: UserRoles[];
}
