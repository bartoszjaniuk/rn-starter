import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Color } from 'react-native-unistyles/lib/typescript/src/types';

import { Box } from '@grapp/stacks';
import { D, G } from '@mobily/ts-belt';
import { RouteProp, useRoute } from '@react-navigation/native';

import { platform } from 'src/core';

import { useLayout } from '../../hooks';
import { HeaderProps, useHeader } from '../../providers';
import { DEFAULT_HEADER_HEIGHT, DEFAULT_HEADER_VARIANT } from '../../utils';

type RouteParams = {
  params: RouteMetaParams;
};

type ExtraStyle = {
  variant: HeaderProps['variant'];
  backgroundColor?: string;
  borderColor?: Color; //  TODO:  is that correct?
};

type Props = React.PropsWithChildren<{
  height?: number;
}>;

export const HeaderContainer = (props: Props) => {
  const { children, height = DEFAULT_HEADER_HEIGHT } = props;

  const { headerProps, onLayout } = useHeader();

  const { insets } = useLayout();

  const route = useRoute<RouteProp<RouteParams>>();
  const isModal = route.params.meta.presentation === 'modal' && platform.isiOS;

  const { styles } = useStyles(stylesheet, { variant: headerProps.variant || DEFAULT_HEADER_VARIANT });

  const headerHeight = height + (isModal ? 0 : insets.top);
  const paddingTop = isModal ? 0 : insets.stacks.top;
  const extraStyle = styles.extraStyle({
    variant: headerProps.variant,
    borderColor: headerProps.borderColor,
    backgroundColor: headerProps.backgroundColor,
  });

  return (
    <Box
      style={[styles.root, extraStyle, { height: headerHeight }]}
      paddingTop={paddingTop}
      pointerEvents="box-none"
      onLayout={onLayout}
    >
      {children}
    </Box>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    root: {
      variants: {
        variant: {
          primary: {
            backgroundColor: theme.colors.white,
            borderBottomWidth: 1,
            // borderBottomColor: theme.colors.grayscale_200,
          },
          transparent: {
            backgroundColor: 'transparent',
          },
          hosted: undefined!,
        },
      },
    },
    extraStyle: (options: ExtraStyle) => {
      const { variant, backgroundColor, borderColor } = options;

      const style: Record<string, unknown> = {
        borderBottomColor: borderColor,
      };

      if (variant !== 'primary') {
        style.backgroundColor = backgroundColor;
      }

      return D.reject(style, G.isNullable);
    },
  };
});
