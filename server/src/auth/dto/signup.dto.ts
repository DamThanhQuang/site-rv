import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class SignupDto {
  @IsOptional() // Khong Bắt buộc phải gửi lên
  @MaxLength(50) // Tối đa 50 ký tự
  firstName: string;

  @IsOptional()
  @MaxLength(50)
  lastName: string;

  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail() // Phải là định dạng email
  email: string;

  @IsNotEmpty()
  @MaxLength(50)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  role: Role; // Các vai trò
}
