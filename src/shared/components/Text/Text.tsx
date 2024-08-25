import * as React from 'react';
import { Text as RNText } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { TextProps } from './Text.types';

export const Text = (props: TextProps) => {
  const { children, variant = 'light', fontWeight = '400', size = 'sm', color = 'white', ...rest } = props;
  const { styles } = useStyles(stylesheet, { variant, fontWeight, size, color });

  return (
    <RNText style={styles.text} {...rest}>
      {children}
    </RNText>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    text: {
      variants: {
        variant: {
          light: {
            color: theme.colors.white,
          },
          dark: {
            color: theme.colors.typography,
          },
        },
        fontWeight: {
          '300': { fontFamily: theme.fontFamily.satoshiLight },
          '300_italic': { fontFamily: theme.fontFamily.satoshiLightItalic },
          '400': { fontFamily: theme.fontFamily.satoshiRegular },
          '400_italic': { fontFamily: theme.fontFamily.satoshiItalic },
          '500': { fontFamily: theme.fontFamily.satoshiMedium },
          '500_italic': { fontFamily: theme.fontFamily.satoshiMediumItalic },
          '700_italic': { fontFamily: theme.fontFamily.satoshiBoldItalic },
          '700': { fontFamily: theme.fontFamily.satoshiBold },
          '900': { fontFamily: theme.fontFamily.satoshiBlack },
          '900_italic': { fontFamily: theme.fontFamily.satoshiBlackItalic },
        },
        size: {
          small: { fontSize: theme.fontSize.small, lineHeight: 13.5 },
          xxs: { fontSize: theme.fontSize.xxs, lineHeight: 18 },
          xs: { fontSize: theme.fontSize.xs, lineHeight: 21 },
          sm: { fontSize: theme.fontSize.sm, lineHeight: 24 },
          md: { fontSize: theme.fontSize.md },
          lg: { fontSize: theme.fontSize.lg },
          xl: { fontSize: theme.fontSize.xl },
          xxl: { fontSize: theme.fontSize.xxl, lineHeight: 36 },
          xxxl: { fontSize: theme.fontSize.xxxl },
          heading: { fontSize: theme.fontSize.heading },
        },
        color: {
          typography: {
            color: theme.colors.typography,
          },
          white: {
            color: theme.colors.white,
          },
          gray: {
            color: theme.colors.gray,
          },
          background: {
            color: theme.colors.background,
          },
          primary: {
            color: theme.colors.primary,
          },
          disabled: {
            color: theme.colors.disabled,
          },
          error: {
            color: theme.colors.error,
          },
          border: {
            color: theme.colors.border,
          },
        },
      },
    },
  };
});
