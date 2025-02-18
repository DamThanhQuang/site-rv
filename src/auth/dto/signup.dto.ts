import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignupDto {
  @IsNotEmpty() // Bắt buộc phải gửi lên
  @MaxLength(50) // Tối đa 50 ký tự
  firstname: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastname: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail() // Phải là định dạng email
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  //@IsStrongPassword() // Password phải đủ độ mạnh
  password: string;

  @IsNotEmpty()
  role: Role// Các vai trò
}
