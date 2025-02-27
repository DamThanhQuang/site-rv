import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AddReviewDto } from './dto/add-review.dto';
import { Public } from '@/auth/decorators/customs.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Public()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('reviews')
  @Public()
  async addReview(@Body() addReviewDto: AddReviewDto) {
    console.log('Adding review for product:', addReviewDto);
    return this.productService.addReview(addReviewDto);
  }
}
