import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

import { useScreen } from '../providers';

export const useScreenAnimatedHeader = () => {
  const { scrollOffsetY } = useScreen();
  const initialOffsetY = useSharedValue<number | undefined>(undefined);

  return useAnimatedScrollHandler(
    {
      onBeginDrag: (event) => {
        initialOffsetY.value ??= Math.round(event.contentOffset.y);
      },
      onScroll: (event) => {
        const { contentOffset } = event;
        scrollOffsetY.value = Math.round(contentOffset.y) - (initialOffsetY.value ?? 0);
      },
    },
    [scrollOffsetY],
  );
};
