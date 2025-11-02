// API Configuration
import { Platform, NativeModules } from 'react-native';

// Helper to resolve the host from Metro bundler script URL (works in dev)
function resolveHostFromMetro(): string | null {
  try {
    const scriptURL: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!scriptURL) return null;
    const match = scriptURL.match(/https?:\/\/([^/]+)\//);
    if (!match) return null;
    // Extract hostname part without port
    const hostWithPort = match[1];
    const hostname = hostWithPort.split(':')[0];
    return hostname;
  } catch {
    return null;
  }
}

export const API_CONFIG = {
  // Default to backend dev port 3006 (as configured in NestJS)
  BASE_URL: 'http://localhost:3006',
  
  // Endpoints
  ENDPOINTS: {
    AUTH: '/auth',
    STUDENTS: '/students',
    BUSES: '/buses',
  },
  
  // Request timeout
  TIMEOUT: 10000,
  
  // Default pagination
  DEFAULT_LIMIT: 10,
};

// Development vs Production configuration
export const getApiBaseUrl = () => {
  if (__DEV__) {
    // Try resolve host dynamically from Metro bundler script URL
    const metroHost = resolveHostFromMetro();
    if (metroHost) {
      // Use detected host with backend port 3006
      return `http://${metroHost}:3006`;
    }
    // Fallbacks: Android emulator vs iOS simulator/local web
    if (Platform.OS === 'android') {
      // 10.0.2.2 points to host loopback from Android emulator
      return 'http://10.0.2.2:3006';
    }
    // iOS simulator or RN web dev
    return 'http://localhost:3006';
  }
  
  // TODO: Set production API base URL
  return 'https://your-production-api.com';
};
