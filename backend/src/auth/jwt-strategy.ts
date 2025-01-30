import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const secretKey = configService.get<string>('JWT_SECRET_KEY');
        if (!secretKey) throw new Error('JWT_SECRET_KEY is not defined');
        
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: secretKey,
        });
      }

  async validate(payload: any) {
    console.log('Decoded Payload:', payload); 

    return { sub: payload.sub, email: payload.email, role: payload.role, name: payload.name };
  }
}
