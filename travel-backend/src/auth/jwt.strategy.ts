import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-here',
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    // Extract token from request
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    
    // Check if token is blacklisted
    const isValid = await this.authService.validateToken(token);
    
    if (!isValid) {
      throw new UnauthorizedException('Token is invalid or expired');
    }

    return { 
      userId: payload.sub, 
      email: payload.email, 
      name: payload.name,
      role: payload.role 
    };
  }
}