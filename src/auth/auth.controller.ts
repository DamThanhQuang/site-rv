import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupDto: SignupDto) {
    await this.authService.signup(signupDto);
    return { message: 'Đăng ký thành công' };
  }
  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: Login) {
  //   await this.authService.login(loginDto);
  //   return { message: 'Đăng nhập thành công' };
  // }
  @UseGuards(AuthGuard('local')) // Thêm decorator @UseGuards(AuthGuard('local')) để sử dụng Local Strategy //Sử dụng AuthGuard('local') để xác thực user.
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req) { //Thay đổi tham số từ @Body() loginDto: Login thành @Req() req vì Passport sẽ tự động gắn user đã xác thực vào req.user
    const result = await this.authService.login(req.user); //Truyền req.user vào authService.login() thay vì loginDto
    return {
      message: "Đăng nhập thành công",
      ...result
    };
  }
}
