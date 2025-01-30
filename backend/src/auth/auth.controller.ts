
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'; 
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    async login(@Body() body: { email: string; password: string },  @Res() response: Response) {
      const user = await this.authService.validateUser(body.email, body.password);
      return this.authService.login(user, response);
    }

    @Post('logout')
    async logout(@Res() response: Response) {
      return this.authService.logout(response);
    }
  }
