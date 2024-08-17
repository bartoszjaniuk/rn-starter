/* eslint-disable @typescript-eslint/no-empty-object-type */
import { UnistylesRegistry } from 'react-native-unistyles';

const theme = {
  colors: {
    typography: '#000000',
    background: '#ffffff',
    white: '#ffffff',
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
