import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
<<<<<<< HEAD
=======
import { PrismaService } from '../prisma/prisma.service';
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-here',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
<<<<<<< HEAD
  providers: [AuthService, JwtStrategy],
=======
  providers: [AuthService, JwtStrategy, PrismaService],
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  exports: [AuthService, JwtModule],
})
export class AuthModule {}