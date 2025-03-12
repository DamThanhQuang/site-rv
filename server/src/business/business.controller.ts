import { Controller, Get, Param } from '@nestjs/common';
import { BusinessService } from './business.service';
import { Public } from '@/auth/decorators/customs.decorator';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Get()
  @Public()
  findAll() {
    return this.businessService.findAll();
  }

  @Get('products')
  @Public()
  getAllProducts() {
    return this.businessService.findAllProducts();
  }
}
