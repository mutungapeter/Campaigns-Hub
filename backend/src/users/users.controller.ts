
import { UsersService } from './users.service';
import { Controller, Post, Body, UseGuards,Request, Get } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('register')
    async register(
      @Body() body: { email: string; password: string; name: string; role: 'influencer' | 'brand' },
    ) {
      const { email, password, name, role } = body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await this.usersService.findUserByEmail(email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
  
      // Create new user
      const newUser = await this.usersService.createUser(email, hashedPassword, name, role);
      return {
        message: 'Account created successfully',
        user: {
          email: newUser.email,
          role: newUser.role,
          name: newUser.name,
        },
      };
    }
  @UseGuards(JwtAuthGuard) 
  @Get('me')
  async getMe(@Request() req: Request) {
    return {
      message: 'I am protected',
    };
  }
  }
  