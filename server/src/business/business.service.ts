import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Business, BusinessDocument } from './schemas/business.schema';
import { User, UserDocument } from '@/user/schemas/user.schema';
import { Product, ProductDocument } from '@/product/schemas/product.schemas';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const businesses = await this.userModel.find({ role: 'business' });

      const businessesWithProducts = await Promise.all(
        businesses.map(async (business) => {
          let businessRecord = await this.businessModel.findOne({
            userId: business._id,
          });

          if (!businessRecord) {
            businessRecord = await this.businessModel.create({
              userId: business._id,
              name: business.email.split('@')[0],
              email: business.email,
              description: 'Default business description',
              owner: business.email,
              products: [],
            });
          }

          const products = await this.productModel.find({
            businessId: business._id,
          });

          return {
            business: {
              _id: business._id,
              name: businessRecord.name,
              email: business.email,
              description: businessRecord.description,
              owner: businessRecord.owner,
            },
            products: products,
          };
        }),
      );

      return businessesWithProducts;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Failed to fetch businesses');
    }
  }
}
