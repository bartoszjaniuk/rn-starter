/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UnistylesRegistry } from 'react-native-unistyles';

const theme = {
  colors: {
    typography: '#000000',
    white: '#ffffff',
    gray: '#B6B6B6',
    disabled: '#667085',
    background: '#ffffff',
    primary: '#BFFF41',
    error: '#FB5558',
    asteriskError: '#F00000',
    snacks: '#303033',
    border: '#3A3A40',
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
  stacks: {
    spacing: 4,
    debug: false,
  },
  fontFamily: {
    satoshiLight: '300',
    satoshiLightItalic: '300_italic',
    satoshiRegular: '400',
    satoshiItalic: '400_italic',
    satoshiMedium: '500',
    satoshiMediumItalic: '500_italic',
    satoshiBoldItalic: '700_italic',
    satoshiBold: '700',
    satoshiBlack: '900',
    satoshiBlackItalic: '900_italic',
  },
  fontSize: {
    small: 10,
    xxs: 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24,
    xxxl: 26,
    heading: 40,
  },
} as const;

export const breakpoints = {
  xs: 0,
  md: 768,
} as const;

export type AppBreakpoints = typeof breakpoints;
export type AppThemes = {
  light: typeof theme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

declare module '@grapp/stacks' {
  export interface StacksBreakpoints extends AppBreakpoints {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    light: theme,
  })
  .addConfig({
    initialTheme: 'light',
  });
