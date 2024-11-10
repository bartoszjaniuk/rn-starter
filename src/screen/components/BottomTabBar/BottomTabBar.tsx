import React from 'react';

import { Box, Columns } from '@grapp/stacks';

import { useLayout } from 'src/screen/hooks';
import { BottomTabBarProvider } from 'src/screen/providers';

import { BottomTabBarItem } from './BottomTabBarItem';

type Props = React.PropsWithChildren<{
  defaultRoute: Route;
}>;

export const BottomTabBar = (props: Props) => {
  const { children, defaultRoute } = props;

  const { bottomTabBar, insets } = useLayout();

  return (
    <BottomTabBarProvider defaultRoute={defaultRoute}>
      <Box>
        <Columns
          height={bottomTabBar.height}
          backgroundColor="#303033"
          paddingBottom={insets.stacks.bottom}
          paddingTop={2}
        >
          {children}
        </Columns>
      </Box>
    </BottomTabBarProvider>
  );
};

BottomTabBar.Item = BottomTabBarItem;
