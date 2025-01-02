import Constants from 'expo-constants';

import { z } from 'zod';

const schema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_URL: z.string().url(),
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_URL: string;
    }
  }
}

// https://github.com/expo/expo/issues/24236#issuecomment-1729692361

export const env = schema.parse({
  EXPO_PUBLIC_API_URL: Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ?? '',
  EXPO_PUBLIC_URL: Constants.expoConfig?.extra?.EXPO_PUBLIC_URL ?? '',
});
