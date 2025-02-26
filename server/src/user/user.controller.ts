import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAsBusinessDto } from './dto/register-business';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/register-business')
  registerAsBusiness(
    @Param('id') userId: string,
    @Body() dto: RegisterAsBusinessDto,
  ) {
    return this.userService.registerBusiness(userId, dto);
  }
}
