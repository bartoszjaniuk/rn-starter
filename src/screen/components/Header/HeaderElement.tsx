import * as React from 'react';
import Animated from 'react-native-reanimated';

import { PortalHost } from '@gorhom/portal';
import { Box, BoxProps, FloatBox } from '@grapp/stacks';

import { useLayout } from '../../hooks';
import { useHeader, useScreen } from '../../providers';

export const HeaderLeftElement = (props: BoxProps) => {
  const { paddingX: defaultPadding } = useScreen();
  const { paddingLeft = defaultPadding, flex = 'fluid', alignY = 'center', ...rest } = props;

  return <Box as={Animated.View} flex={flex} alignY={alignY} paddingLeft={paddingLeft} {...rest} />;
};

export const HeaderRightElement = (props: BoxProps) => {
  const { paddingX: defaultPadding } = useScreen();
  const { paddingRight = defaultPadding, flex = 'fluid', alignY = 'center', ...rest } = props;

  return <Box as={Animated.View} flex={flex} alignY={alignY} paddingRight={paddingRight} {...rest} />;
};

export const HeaderContentElement = (props: BoxProps) => {
  return <Box as={Animated.View} {...props} />;
};

export const HeaderBottomElement = (props: BoxProps) => {
  const { paddingX: defaultPadding } = useScreen();
  const { paddingX = defaultPadding, ...rest } = props;
  return <Box as={Animated.View} paddingX={paddingX} {...rest} />;
};

export const HeaderHostElement = React.memo(() => {
  const { portalName } = useHeader();
  const { insets } = useLayout();
  return (
    <FloatBox offset={0} top={-insets.top} bottom={undefined}>
      <PortalHost name={portalName} />
    </FloatBox>
  );
});

HeaderLeftElement.__type__ = 'HeaderLeftElement';
HeaderRightElement.__type__ = 'HeaderRightElement';
HeaderContentElement.__type__ = 'HeaderContentElement';
HeaderBottomElement.__type__ = 'HeaderBottomElement';
