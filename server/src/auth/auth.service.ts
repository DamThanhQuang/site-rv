import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Req,
  Res,
  Scope,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from './dto/login.dto';
import { PasswordHelper } from './helpers/utils';
import { EmailHelper } from './helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
//import { RegisterBusinessDto } from './dto/register-business.dto';
import { Business, BusinessDocument } from '@/business/schemas/business.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { firstName, lastName, email, password, role } = signupDto;

    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Password không hợp lệ');
    }

    // Kiểm tra email trùng lặp
    //await EmailHelper.checkDuplicateEmail(email, this.userModel);

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

  async login(login: Login, @Res() response: Response): Promise<any> {
    const { email, password } = login;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: 'User not found!' });
    }

    const isPasswordValid = await PasswordHelper.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return response.status(400).json({ message: 'Invalid password!' });
    }

    // Tạo JWT token
    const payload = { email: user.email, sub: user._id, role: user.role };
    const token = this.jwtService.sign(payload);

    // Lưu token vào HTTP-Only Cookie
    response.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    });

    return response.status(200).json({
      message: 'Login Successful',
      role: user.role,
    });
  }

  // async registerBusiness(
  //   userId: string,
  //   dto: RegisterBusinessDto,
  // ): Promise<any> {
  //   const user = await this.userModel.findById(userId);
  //   // ktra xem user co ton tai khong
  //   if (!user) {
  //     throw new NotFoundException('User Not Found');
  //   }

  //   // Ktra xem user la business chua
  //   if (user.isBusiness) {
  //     throw new Error('User is already a business');
  //   }

  //   // Tao business moi
  //   const newBusiness = await this.businessModel.create({
  //     name: dto.name,
  //     description: dto.description,
  //     email: user.email,
  //   });

  //   //Cap hat vai tro cua user
  //   user.isBusiness=true;
  //   user.role= 'business',
  //   await user.save();
  //   return{message:'asd', newBusiness}
  // }

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
