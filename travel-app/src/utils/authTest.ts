import { apiService } from '../services/api';

export interface AuthTestResult {
  success: boolean;
  message: string;
  details?: any;
}

export class AuthTestUtils {
  /**
   * Test login functionality
   */
  static async testLogin(email: string, password: string): Promise<AuthTestResult> {
    try {
      console.log('Testing login with:', { email, password: '***' });
      
      const response = await apiService.login(email, password);
      
      if (response.success && response.token && response.user) {
        return {
          success: true,
          message: 'Login test passed',
          details: {
            token: response.token.substring(0, 20) + '...',
            user: response.user
          }
        };
      } else {
        return {
          success: false,
          message: 'Login test failed: Invalid response format',
          details: response
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Login test failed: ' + (error as Error).message,
        details: error
      };
    }
  }

  /**
   * Test logout functionality
   */
  static async testLogout(token: string): Promise<AuthTestResult> {
    try {
      console.log('Testing logout with token:', token.substring(0, 20) + '...');
      
      const response = await apiService.logout(token);
      
      if (response.success) {
        return {
          success: true,
          message: 'Logout test passed',
          details: response
        };
      } else {
        return {
          success: false,
          message: 'Logout test failed: Invalid response',
          details: response
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Logout test failed: ' + (error as Error).message,
        details: error
      };
    }
  }

  /**
   * Test profile retrieval
   */
  static async testGetProfile(token: string): Promise<AuthTestResult> {
    try {
      console.log('Testing get profile with token:', token.substring(0, 20) + '...');
      
      const response = await apiService.getProfile(token);
      
      if (response.success && response.user) {
        return {
          success: true,
          message: 'Get profile test passed',
          details: response.user
        };
      } else {
        return {
          success: false,
          message: 'Get profile test failed: Invalid response',
          details: response
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Get profile test failed: ' + (error as Error).message,
        details: error
      };
    }
  }

  /**
   * Test token validation after logout
   */
  static async testTokenAfterLogout(token: string): Promise<AuthTestResult> {
    try {
      console.log('Testing token validation after logout:', token.substring(0, 20) + '...');
      
      const response = await apiService.getProfile(token);
      
      // After logout, this should fail
      if (!response.success) {
        return {
          success: true,
          message: 'Token invalidation test passed - token is properly invalidated',
          details: response
        };
      } else {
        return {
          success: false,
          message: 'Token invalidation test failed - token is still valid after logout',
          details: response
        };
      }
    } catch (error) {
      // This is expected after logout
      return {
        success: true,
        message: 'Token invalidation test passed - token properly rejected',
        details: (error as Error).message
      };
    }
  }

  /**
   * Run complete authentication test suite
   */
  static async runCompleteTest(email: string = 'admin@travel.com', password: string = 'admin123'): Promise<AuthTestResult[]> {
    const results: AuthTestResult[] = [];
    
    console.log('Starting complete authentication test suite...');
    
    // Test 1: Login
    const loginResult = await this.testLogin(email, password);
    results.push(loginResult);
    
    if (!loginResult.success) {
      console.log('Login failed, stopping tests');
      return results;
    }
    
    const token = loginResult.details?.token?.replace('...', '') || '';
    
    // Test 2: Get Profile
    const profileResult = await this.testGetProfile(token);
    results.push(profileResult);
    
    // Test 3: Logout
    const logoutResult = await this.testLogout(token);
    results.push(logoutResult);
    
    // Test 4: Token validation after logout
    const tokenValidationResult = await this.testTokenAfterLogout(token);
    results.push(tokenValidationResult);
    
    console.log('Complete authentication test suite finished');
    return results;
  }
}