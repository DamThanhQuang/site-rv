import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddReviewDto } from './dto/add-review.dto';
import { Product, ProductDocument } from './schemas/product.schemas';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async addReview(addReviewDto: AddReviewDto): Promise<Product> {
    const product = await this.productModel.findById(addReviewDto.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.reviews.push({
      userId: addReviewDto.userId,
      rating: addReviewDto.rating,
      comment: addReviewDto.comment,
      createdAt: new Date(),
    });

    product.averageRating =
      product.reviews.reduce((t, q) => t + q.rating, 0) /
      product.reviews.length;
    return product.save();
  }
}
