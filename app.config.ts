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
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
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
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
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
      projectId: process.env.EAS_PROJECT_ID,
    },
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
    EXPO_PUBLIC_URL: process.env.EXPO_PUBLIC_URL,
  },
  owner: process.env.EAS_PROJECT_OWNER,
};

export default config;
