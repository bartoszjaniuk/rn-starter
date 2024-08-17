import { useFocusEffect as useRNFocusEffect } from '@react-navigation/native';

type EffectCallback = () => undefined | void | (() => void);

export const useFocusEffect = (callback: EffectCallback) => {
  try {
    return useRNFocusEffect(callback);
  } catch (_err) {
    return callback();
  }
};
