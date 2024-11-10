import { TextProps as RNTextProps, TextStyle } from 'react-native';

import { TypographyKey } from 'src/providers';

type FontKeys = 'small' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'heading';
export type ColorKeys =
  | 'typography'
  | 'white'
  | 'gray'
  | 'background'
  | 'primary'
  | 'disabled'
  | 'error'
  | 'border'
  | 'asteriskError'
  | 'transparent';

export type TextProps = {
  color?: ColorKeys;
  variant?: 'light' | 'dark';
  fontWeight?: TypographyKey;
  /**
    * small: 10,
    xxs: 12,
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 22,
    xxl: 24,
    xxxl: 26,
    heading: 40,
   */
  size?: FontKeys;
  lineHeight?: number;
  letterSpacing?: number;
  align?: TextStyle['textAlign'];
} & RNTextProps;
