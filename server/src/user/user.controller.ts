import {
  Controller,
  Body,
  Patch,
  Param,
  UseGuards,
  Put,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAsBusinessDto } from './dto/register-business';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '@/auth/decorators/customs.decorator';
import { Types } from 'mongoose';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id/register-business')
  registerAsBusiness(
    @Param('id') userId: string,
    @Body() dto: RegisterAsBusinessDto,
  ) {
    return this.userService.registerBusiness(userId, dto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    // Kiểm tra xem id có phải là ObjectId hợp lệ không
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.update(id, updateUserDto);
  }

  @Put(':id/avatar')
  updateAvatar(@Param('id') id: string, @Body() avatar: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.updateAvatar(new Types.ObjectId(id), avatar);
  }

  @Put(':id/cover-image')
  updateCoverImage(@Param('id') id: string, @Body() coverImage: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.userService.updateCoverImage(
      new Types.ObjectId(id),
      coverImage,
    );
  }
}
