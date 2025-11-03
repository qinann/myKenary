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
<<<<<<< HEAD
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
=======
    if (__DEV__) {
      console.log('[API] Metro host resolved:', metroHost ?? 'null');
    }

    // Special handling for Android in development
    if (Platform.OS === 'android') {
      // If Metro host is localhost/127.0.0.1, we're likely on emulator
      const isLocalHost = metroHost === 'localhost' || metroHost === '127.0.0.1';
      if (isLocalHost) {
        const url = 'http://10.0.2.2:3006';
        if (__DEV__) console.log('[API] Using Android emulator base URL:', url);
        return url;
      }

      // If Metro host is available and not localhost, use it (physical device or LAN)
      if (metroHost) {
        const url = `http://${metroHost}:3006`;
        if (__DEV__) console.log('[API] Using detected host base URL:', url);
        return url;
      }

      // If Metro host cannot be resolved, force a LAN IP override for physical device
      // NOTE: Update this IP if your PC's LAN address changes
      const overrideUrl = 'http://192.168.1.33:3006';
      if (__DEV__) console.log('[API] Using Android physical device base URL override:', overrideUrl);
      return overrideUrl;
    }

    // Non-Android platforms
    if (metroHost) {
      const url = `http://${metroHost}:3006`;
      if (__DEV__) console.log('[API] Using detected host base URL (non-Android):', url);
      return url;
    }

    // Fallbacks: if host cannot be resolved, use configured BASE_URL
    const url = API_CONFIG.BASE_URL;
    if (__DEV__) console.log('[API] Using fallback base URL:', url);
    return url;
>>>>>>> e895365 (feat(web): My Kenary branding & logo)
  }
  
  // TODO: Set production API base URL
  return 'https://your-production-api.com';
};
