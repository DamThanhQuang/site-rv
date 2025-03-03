import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Type,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateProfileDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async updateAvatar(
    id: number | Types.ObjectId,
    avatarUrl: string,
  ): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, { avatar: avatarUrl });
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateCoverImage(
    id: number | Types.ObjectId,
    coverImageUrl: string,
  ): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, { coverImage: coverImageUrl });
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
