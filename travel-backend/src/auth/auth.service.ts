import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  private pool: Pool;
  private blacklistedTokens: Set<string> = new Set();

  constructor(private jwtService: JwtService) {
    this.pool = new Pool({
      host: 'localhost',
      port: 5432,
      database: 'mykenary',
      user: 'postgres',
      password: String('12345678'),
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    try {
      console.log('🔍 Validating user with email:', email);
      
      // Cari user berdasarkan email
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await this.pool.query(query, [email]);

      console.log('📊 Query result rows count:', result.rows.length);
      
      if (result.rows.length === 0) {
        console.log('❌ No user found with email:', email);
        return null;
      }

      const user = result.rows[0];
      console.log('👤 Found user:', { id: user.id, email: user.email, name: user.name });

      // Verifikasi password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('🔐 Password validation result:', isPasswordValid);
      
      if (!isPasswordValid) {
        console.log('❌ Invalid password for user:', email);
        return null;
      }

      console.log('✅ User validation successful');
      // Return user tanpa password
      const { password: _, ...userResult } = user;
      return userResult;
    } catch (error) {
      console.error('💥 Error validating user:', error);
      return null;
    }
  }

  async generateToken(user: any): Promise<string> {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      name: user.name,
      role: user.role 
    };
    return this.jwtService.sign(payload);
  }

  async logout(token: string): Promise<boolean> {
    try {
      // Add token to blacklist
      this.blacklistedTokens.add(token);
      console.log('🚪 Token added to blacklist');
      return true;
    } catch (error) {
      console.error('💥 Error during logout:', error);
      return false;
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      // Check if token is blacklisted
      if (this.blacklistedTokens.has(token)) {
        console.log('❌ Token is blacklisted');
        return null;
      }

      // Verify and decode token
      const decoded = this.jwtService.verify(token);
      console.log('✅ Token validated successfully');
      return decoded;
    } catch (error) {
      console.error('💥 Error validating token:', error);
      return null;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}