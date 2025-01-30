import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { firstValueFrom, Observable } from 'rxjs'; 
import { Response } from 'express'; 
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService
  ) {
      super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const response: Response = context.switchToHttp().getResponse();
      const accessToken = request.headers['authorization']?.split(' ')[1];

      
     
      
      if (!accessToken) {
          throw new UnauthorizedException('Access token missing');
      }

      const secretKey = this.configService.get<string>('JWT_SECRET_KEY');
      
      if (!secretKey) {
          throw new UnauthorizedException('JWT_SECRET_KEY is not defined');
      }

      try {
          
          const decodedToken = jwt.verify(accessToken, secretKey) as { exp: number };

          
          const result = await super.canActivate(context);
          if (typeof result === 'boolean') {
              return result;
          }
          return await firstValueFrom(result as Observable<boolean>);

      } catch (error) {
          if (error instanceof jwt.TokenExpiredError) {
              console.log('Token expired, logging out user.');

              
              response.clearCookie('accessToken');

          
              throw new UnauthorizedException('Token has expired, please log in again');
          }

          console.log('Error during token verification:', error);
          throw new UnauthorizedException('Invalid access token');
      }
  }
}
