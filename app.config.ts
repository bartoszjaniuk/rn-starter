import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'FitApka',
  slug: 'rn-starter',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  scheme: 'fitapka',
  platforms: ['ios', 'android'],
  userInterfaceStyle: 'automatic',
  backgroundColor: '#181A1E',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#181A1E',
  },

  ios: {
    backgroundColor: '#181A1E',
    associatedDomains: ['applinks:fitapka.netlify.app'],
    supportsTablet: true,
    bundleIdentifier: 'com.i3artosh.rnstarter',
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoads: true,
      },
    },
    config: {
      usesNonExemptEncryption: false,
    },
  },
  android: {
    // usesCleartextTraffic: true,
    softwareKeyboardLayoutMode: 'pan',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#181A1E',
    },
    package: 'com.i3artosh.rnstarter',
    versionCode: 1,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/logo.png',
  },

  plugins: [
    'expo-router',
    'expo-system-ui',
    'expo-splash-screen',
    'expo-secure-store',
    'expo-file-system',
    [
      'expo-image-picker',
      {
        photosPermission: 'Zaznacz oraz wgraj zdjęcia',
        cameraPermission: 'Pozwól $(PRODUCT_NAME) otworzyć aparat',
      },
    ],
    'expo-font',
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: process.env.EAS_PROJECT_ID || '51102590-38be-4cfe-8a29-dd5bbaf61e96',
    },
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_URL: process.env.EXPO_PUBLIC_URL,
  },
  owner: process.env.EAS_PROJECT_OWNER,
};

export default config;
