import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Put,
  Get,
  BadRequestException,
  UnauthorizedException,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { RegisterAsBusinessDto } from './dto/register-business';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: Request) {
    const userId = req.cookies.userId;
    if (!userId) {
      throw new UnauthorizedException('Chưa đăng nhập');
    }
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return user;
  }

  @Put(':id/avatar')
  @UseGuards(JwtAuthGuard)
  updateAvatar(@Param('id') id: string, @Body() avatar: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.updateAvatar(id, { avatar });
  }

  @Put(':id/cover-image')
  @UseGuards(JwtAuthGuard)
  updateCoverImage(@Param('id') id: string, @Body() coverImage: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.updateCoverImage(
      new Types.ObjectId(id),
      coverImage,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.updateUser(id, dto);
  }
}
