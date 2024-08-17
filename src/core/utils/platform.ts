import { Platform } from 'react-native';

const isiOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export const platform = Object.freeze({
  isiOS,
  isAndroid,
});
