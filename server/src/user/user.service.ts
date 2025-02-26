import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { RegisterAsBusinessDto } from './dto/register-business';
import { Business, BusinessDocument } from '@/business/schemas/business.schema';

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
      name: dto.name,
      owner: dto.owner,
      products: [],
    });

    // Cap nhat vai tro cua user
    user.isBusiness = true;
    user.role = 'business';
    user.businessId = newBusiness._id;
    await user.save(); 
    
    return { message: 'Success', business:newBusiness };
  }
}
