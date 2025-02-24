import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('author')
export class ExampleController {
    @Roles(Role.ADMIN)
    @Get('admin-only')
    adminRoute() {
      return 'Only admins can see this';
    }
    
    @Roles(Role.USER)
    @Get('user-only')
    userRoute() {
      return 'Only users can see this';
    }
} 