import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAsBusinessDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  owner: string; // Email business
}
