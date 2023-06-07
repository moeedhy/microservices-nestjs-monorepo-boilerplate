import { IsEmail, IsStrongPassword } from 'class-validator';
import { CreateUserInput } from '../graphql';

export class CreateUserDto extends CreateUserInput {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
