import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterAsBusinessDto } from './dto/register-business';
import { Business, BusinessDocument } from '@/business/schemas/business.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
  ) {}
  async registerBusiness(
    userId: string,
    dto: RegisterAsBusinessDto,
  ): Promise<any> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found!');
    }

    // ktra xem user la business chua
    if (user.isBusiness) {
      throw new Error('User is already a business');
    }

    //Tao mot ban ghi moi
    const newBusiness = await this.businessModel.create({
      userId: user._id, // Link to user
      name: dto.name,
      description: dto.description,
      owner: dto.owner,
      email: user.email, // Add user email
      products: [],
    });

    // Cap nhat vai tro cua user
    user.isBusiness = true;
    user.role = 'business';
    user.businessId = newBusiness._id;
    await user.save();

    return {
      message: 'Success',
      business: newBusiness,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    };
  }
  async getAllUsers(): Promise<User[]> {
    try {
      const getUser = await this.userModel.find({ role: 'user' });
      return getUser;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found!');
      }

      if (dto.firstName) user.firstname = dto.firstName;
      if (dto.lastName) user.lastname = dto.lastName;
      if (dto.avatar) user.avatar = dto.avatar;
      if (dto.userName) user.username = dto.userName;
      if (dto.email) user.email = dto.email;

      if (dto.firstName || dto.lastName) {
        user.name = `${user.firstname || ''} ${user.lastname || ''}`.trim();
      }

      return await user.save();
    } catch (error) {
      console.error('Update user error:', error);
      throw new InternalServerErrorException('Failed to update user');
    }
  }
}
