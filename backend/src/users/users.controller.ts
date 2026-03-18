import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard) // 🔥 Apply globally to all routes
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ✅ Get logged-in user profile (cleaner)
  @Get('me')
  getProfile(@GetUser('userId') userId: number) {
    return this.usersService.getProfile(userId);
  }

  // 🔐 CLIENT route
  @Get('client')
  @UseGuards(RolesGuard)
  @Roles('CLIENT')
  clientRoute() {
    return {
      message: 'Hello I am a CLIENT',
      access: 'granted',
    };
  }

  // 🔐 FREELANCER route
  @Get('freelancer')
  @UseGuards(RolesGuard)
  @Roles('FREELANCER')
  freelancerRoute() {
    return {
      message: 'Hello I am a FREELANCER',
      access: 'granted',
    };
  }

  // 🔐 All logged-in users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}