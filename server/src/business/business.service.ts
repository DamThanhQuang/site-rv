import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  async findAllProducts(): Promise<any> {
    try {
      const products = await this.productModel.find().lean();
      if (!products || products.length === 0) {
        return [];
      }

      // In your findAllProducts method
      const formattedProducts = products.map((product) => ({
        id: product._id.toString(),
        title: product.title || product.title,
        description: product.description || '',
        price: product.price || 0,
        image: product.image || 'https://via.placeholder.com/300x200',
        location:
          typeof product.location === 'object'
            ? ` ${product.location.city || ''}, ${
                product.location.country || ''
              }`
            : product.location || 'Long Biên, Hà Nội',
        // status: product.status || 'Đang thực hiện',
        // createdAt: product.createdAt,
        // actionRequired:
        //   product.needsAttention || product.actionRequired || false,
      }));
      return formattedProducts;
    } catch (error) {
      console.error('Error in findAllProducts:', error);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }
}
