import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  // 🎯 Reusable select (avoid repeating fields everywhere)
  private userSelect = {
    id: true,
    email: true,
    role: true,
    createdAt: true,
  };

  // ✅ Get current user profile
  async getProfile(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: this.userSelect,
      });

      // If user not found → throw proper NestJS exception
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error('Error fetching user profile', error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // ✅ Get all users
  async findAll() {
    try {
      return await this.prisma.user.findMany({
        select: this.userSelect,
        orderBy: {
          createdAt: 'desc', // latest users first
        },
      });
    } catch (error) {
      this.logger.error('Error fetching users', error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // ✅ Get user by ID (extra useful method)
  async findById(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: this.userSelect,
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      this.logger.error(`Error fetching user with ID ${userId}`, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  // ✅ Delete user (admin feature / future use)
  async deleteUser(userId: number) {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return { message: 'User deleted successfully' };
    } catch (error) {
      this.logger.error(`Error deleting user ${userId}`, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}