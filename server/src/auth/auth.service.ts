import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from './dto/login.dto';
import { PasswordHelper } from './helpers/utils';
import { EmailHelper } from './helpers/utils';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { firstName, lastName, email, password, role } = signupDto;

    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Password không hợp lệ');
    }

    // Kiểm tra email trùng lặp
    await EmailHelper.checkDuplicateEmail(email, this.userModel);

    const hashedPassword = await PasswordHelper.hashPassword(password);
    const newUser = new this.userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    return newUser.save(); 
  }

  async login(login: Login): Promise<any> {
    const { email, password } = login;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    const isPasswordValid = await PasswordHelper.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password!');
    }

    // Tạo JWT token
    const payload = { email: user.email, sub: user._id };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      token_type: 'Bearer',
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    // Tìm user theo email trong db
    const user = await this.userModel.findOne({ email: email });
    // So sánh password nhập vào với password đã mã hóa (bcrypt)
    if (
      user &&
      (await PasswordHelper.comparePassword(password, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  // Tạo method để tạo JWT token riêng (có thể sử dụng khi cần)
  async generateToken(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
