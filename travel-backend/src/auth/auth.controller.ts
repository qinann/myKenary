import { Controller, Post, Body, HttpException, HttpStatus, Headers, Get, UseGuards, Request } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      // Generate JWT token
      const token = await this.authService.generateToken(user);

      return {
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('logout')
  async logout(@Headers('authorization') authorization: string) {
    try {
      if (!authorization) {
        throw new HttpException('Authorization header is required', HttpStatus.BAD_REQUEST);
      }

      // Extract token from "Bearer <token>"
      const token = authorization.replace('Bearer ', '');
      
      const success = await this.authService.logout(token);
      
      if (!success) {
        throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    try {
      return {
        success: true,
        user: {
          id: req.user.userId,
          email: req.user.email,
          name: req.user.name,
          role: req.user.role,
        },
      };
    } catch (error) {
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}