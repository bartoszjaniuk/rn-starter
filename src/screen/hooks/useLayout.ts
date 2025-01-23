import { UnistylesRuntime } from 'react-native-unistyles';

import { useSpacingHelpers } from '@grapp/stacks';
import { D } from '@mobily/ts-belt';

import { platform } from 'src/core/utils';
import { useLazy } from 'src/shared';

import { useHeader } from '../providers';
import { useFooter } from '../providers/FooterProvider';
import { useTabs } from '../providers/TabsProvider';

export const useLayout = () => {
  const { divide } = useSpacingHelpers();

  const insets = useLazy(() => {
    const raw = UnistylesRuntime.insets;
    const top = platform.isAndroid ? raw.top || UnistylesRuntime.statusBar.height : raw.top;
    const insets = {
      ...raw,
      top,
    };

    return {
      raw: insets,
      stacks: D.map(insets, divide),
    };
  });

  const { height: headerHeight } = useHeader();
  const { tabBarHeight } = useTabs();
  const { height: footerHeight } = useFooter();

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
    footer: {
      height: footerHeight,
      stacks: {
        height: divide(footerHeight),
      },
    },
  };
};
