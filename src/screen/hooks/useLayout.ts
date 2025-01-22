import * as React from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

import { useSpacingHelpers } from '@grapp/stacks';
import { D } from '@mobily/ts-belt';

import { useHeader } from '../providers';
import { useTabs } from '../providers/TabsProvider';

export const useLayout = () => {
  const { divide } = useSpacingHelpers();
  const insets = React.useMemo(
    () => ({
      raw: UnistylesRuntime.insets,
      stacks: D.map(UnistylesRuntime.insets, divide),
    }),
    [divide],
  );

  const { height: headerHeight } = useHeader();
  const { tabBarHeight } = useTabs();
  const bottomTabBarHeight = 64 + (insets.raw.bottom || 6);

  return {
    screen: UnistylesRuntime.screen,
    insets: {
      ...insets.raw,
      stacks: insets.stacks as Record<keyof typeof insets.raw, number>,
    },
    header: {
      height: headerHeight,
      stacks: {
        height: divide(headerHeight),
      },
    },
    tabBar: {
      height: tabBarHeight,
      stacks: {
        height: divide(tabBarHeight),
      },
    },
    bottomTabBar: {
      height: bottomTabBarHeight,
      stacks: {
        height: divide(bottomTabBarHeight),
      },
    },
  };
};
