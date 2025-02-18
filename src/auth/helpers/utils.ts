import * as bcrypt from 'bcryptjs';

import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDocument } from '../../user/schemas/user.schema';

export class PasswordHelper {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export class EmailHelper {
  static async checkDuplicateEmail(
    email: string,
    userModel: Model<UserDocument>,
  ): Promise<void> {
    const existingUser = await userModel.findOne({ email });
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
