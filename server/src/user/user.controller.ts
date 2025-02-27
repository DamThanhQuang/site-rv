import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterAsBusinessDto } from './dto/register-business';
import { Public } from '@/auth/decorators/customs.decorator';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
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

  @Get()
  @Public()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    try {
      // Kiểm tra xem có token không
      if (!req.headers.authorization) {
        throw new UnauthorizedException('No token provided');
      }

      // Kiểm tra user từ token
      if (!req.user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Kiểm tra quyền với lowercase 'role'
      if (req.user.role !== 'admin' && req.user._id !== id) {
        throw new ForbiddenException(
          'You do not have permission to update this user',
        );
      }

      return this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }
}
