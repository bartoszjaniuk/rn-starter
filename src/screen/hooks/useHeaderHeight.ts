import { useHeaderHeight as useRNHeaderHeight } from '@react-navigation/elements';

export const useHeaderHeight = () => {
  try {
    return useRNHeaderHeight();
  } catch (_e) {
    return 0;
  }
};
