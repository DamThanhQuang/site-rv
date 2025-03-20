import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AddReviewDto } from './dto/add-review.dto';
import { Public } from '@/auth/decorators/customs.decorator';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('reviews')
  @Public()
  async addReview(@Body() addReviewDto: AddReviewDto) {
    console.log('Adding review for product:', addReviewDto);
    return this.productService.addReview(addReviewDto);
  }
  @Get('get-all-product')
  @Public()
  async getAllProduct() {
    return this.productService.findAll();
  }

  @Get('get-product/:id')
  @Public()
  async getProduct(@Body(':id') id: string) {
    console.log('Product ID:', id);
    return this.productService.findProductById(id);
  }
}
