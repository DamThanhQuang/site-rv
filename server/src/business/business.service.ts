import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business, BusinessDocument } from './schemas/business.schema';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { Product } from '@/product/schemas/product.schemas';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<Business[]> {
    const businesses = (await this.userModel.find({
      role: 'business',
    })) as Business[];

    return businesses;
  }

  // async findAllProductsByBusiness(businessId: string): Promise<Product[]> {
  //   const business = await this.businessModel
  //     .findById(businessId)
  //     .populate('Product')
  //     .exec();
  //   if (!business) {
  //     throw new NotFoundException('Business not found');
  //   }
  //   return business.products;
  // }
}
