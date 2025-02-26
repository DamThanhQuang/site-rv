import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../user/schemas/user.schema';
import { Business } from '@/business/schemas/business.schema';


export class PasswordHelper {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    if (!password || !hashedPassword) {
      return false;
    }
    return await bcrypt.compare(password, hashedPassword);
  }
}

export class EmailHelper {
  static async checkDuplicateEmail(email: string, model: Model<User>) {
    const existingUser = await model.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
  }

  static async findUserByEmail(
    email: string,
    userModel: Model<UserDocument>,
  ): Promise<UserDocument> {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found!');
    }
    return user;
  }
}
