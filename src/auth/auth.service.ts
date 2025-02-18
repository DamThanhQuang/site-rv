import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login } from './dto/login.dto';
import { PasswordHelper } from './helpers/utils';
import { EmailHelper } from './helpers/utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { firstname, lastname, email, password, role } = signupDto;

    // Kiểm tra email trùng lặp
    await EmailHelper.checkDuplicateEmail(email, this.userModel);

    const hashedPassword = await PasswordHelper.hashPassword(password);
    const newUser = new this.userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });

    return newUser.save();
  }

  async login(login: Login): Promise<User> {
    const { email, password } = login;
    const checkEmail = await this.userModel.findOne({ email });
    if (!checkEmail) {
      throw new BadRequestException('User not found!');
    }
    const isPasswordValid = await PasswordHelper.comparePassword(
      password,
      checkEmail.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password!');
    }

    return checkEmail;
  }
  async validateUser(login: Login): Promise<User | null> {
    const { email, password } = login;
    const user = await this.userModel.findOne({ email });
    
    if (!user) {
        return null;
    }
    
    const isPasswordValid = await PasswordHelper.comparePassword(
        password,
        user.password,
    );

    if (!isPasswordValid) {
        return null;
    }

    return user;
  }
}
