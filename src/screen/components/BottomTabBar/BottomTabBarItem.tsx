import * as React from 'react';

import { Box, Stack } from '@grapp/stacks';

import { useCurrentRoute } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { useBottomTabBar } from 'src/screen/providers';
import { Icon, PressableScale, Text } from 'src/shared';
import { IconName } from 'src/shared/components/Icon/icons';

type Props = {
  title: string;
  icon: IconName;
  to: Route;
};

export const BottomTabBarItem = (props: Props) => {
  const { title, icon, to } = props;

  const { defaultRoute } = useBottomTabBar();

  const { isRouteActive } = useCurrentRoute();
  const isActive = isRouteActive(to, defaultRoute);

  const handlePress = React.useCallback(() => {
    goTo(to);
  }, [to]);

  return (
    <Box alignY="center" flex="fluid">
      <PressableScale onPress={handlePress}>
        <Stack space={1}>
          <Box alignX="center">
            <Icon color={isActive ? 'primary' : 'gray'} name={icon} />
          </Box>

          <Text align="center" numberOfLines={1} size="xxs" color="white">
            {title}
          </Text>
        </Stack>
      </PressableScale>
    </Box>
  );
};
