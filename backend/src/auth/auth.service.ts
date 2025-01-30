import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
@Injectable()
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
  async login(user: any, @Res() response: Response) {
    const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not defined');
    }
    const payload = {
       email: user.email,
       sub: user._id.toString(), 
      role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1hr',
      secret: secretKey,
    });

    // Set access token in cookie
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    return response.json({ 
      message: 'Login successful',
      
        user:{
          email: user.email,
          role: user.role,
          name: user.name,
          id: user.id,
          accessToken: accessToken
        }
    
    });
  }

  async logout(@Res() response: Response) {
    response.clearCookie('accessToken');
    return response.json({ message: 'Logged out successfully' });
  }
 }
