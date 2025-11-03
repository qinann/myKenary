// Web (Next.js Admin) base URL configuration for fetching booklet
import { Platform, NativeModules } from 'react-native';

function resolveHostFromMetro(): string | null {
  try {
    const scriptURL: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
    if (!scriptURL) return null;
    const match = scriptURL.match(/https?:\/\/([^/]+)\//);
    if (!match) return null;
    const hostWithPort = match[1];
    const hostname = hostWithPort.split(':')[0];
    return hostname;
  } catch {
    return null;
  }
}

function resolveHostFromDevSettings(): string | null {
  try {
    const getConstants = (NativeModules as any)?.DevSettings?.getConstants;
    const constants = typeof getConstants === 'function' ? getConstants() : null;
    const serverHost: string | undefined = constants?.serverHost; // e.g. '192.168.0.10:8081' or 'localhost:8081'
    if (!serverHost) return null;
    const hostname = serverHost.split(':')[0];
    return hostname;
  } catch {
    return null;
  }
}

// Optional: set your PC/LAN host to override detection.
// Accepts either plain host (e.g. '192.168.0.10') or full URL (e.g. 'http://192.168.0.10:3010').
const HOST_OVERRIDE = '';

function formatOverrideBaseUrl(host: string): string {
  if (!host) return '';
  if (/^https?:\/\//.test(host)) return host; // already full URL
  // Assume default dev port 3010
  return `http://${host}:3010`;
}

export const WEB_CONFIG = {
  BASE_URL: 'http://localhost:3010',
  BASE_PATH: '/admin',
};

export const getWebBaseUrl = () => {
  const override = formatOverrideBaseUrl(HOST_OVERRIDE);
  if (override) {
    if (__DEV__) console.log('[WEB] Using HOST_OVERRIDE:', override);
    return override;
  }

  if (__DEV__) {
    const metroHost = resolveHostFromMetro() || resolveHostFromDevSettings();
    if (__DEV__) {
      console.log('[WEB] Metro host resolved:', metroHost ?? 'null');
    }

    if (Platform.OS === 'android') {
      // Prefer a real IP from Metro/DevSettings; otherwise default to emulator alias
      if (metroHost && metroHost !== 'localhost' && metroHost !== '127.0.0.1') {
        return `http://${metroHost}:3010`;
      }
      // Default Android dev fallback
      return 'http://10.0.2.2:3010';
    }

    // iOS / other platforms
    if (metroHost) {
      return `http://${metroHost}:3010`;
    }
    return WEB_CONFIG.BASE_URL;
  }

  // TODO: set production URL if different
  return WEB_CONFIG.BASE_URL;
};

export const getBookletApiUrl = () => {
  const base = getWebBaseUrl();
  return `${base}${WEB_CONFIG.BASE_PATH}/api/booklet`;
};

export const makeAbsoluteWebUrl = (pathOrUrl: string) => {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  const base = getWebBaseUrl();
  if (__DEV__) {
    console.log('[WEB] makeAbsoluteWebUrl base:', base, 'path:', pathOrUrl);
  }
  return `${base}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
};