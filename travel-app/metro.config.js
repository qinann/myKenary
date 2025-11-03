const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
<<<<<<< HEAD
const config = {};
=======
const config = {
  resolver: {
    assetExts: [
      // Keep defaults and ensure pdf is included
      'txt','png','jpg','jpeg','gif','webp','svg','ttf','otf','woff','woff2','mp3','wav','mp4','mov','json','pdf'
    ],
  },
};
>>>>>>> e895365 (feat(web): My Kenary branding & logo)

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
