import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class Login {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}


