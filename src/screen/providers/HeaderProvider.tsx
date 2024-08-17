import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';

import { F } from '@mobily/ts-belt';

import { makeRandomString } from '../utils';

export type HeaderProps = {
  title?: string;
  renderRight?: () => Nullable<JSX.Element>;
  renderLeft?: () => Nullable<JSX.Element>;
  renderBottom?: () => Nullable<JSX.Element>;
  renderContent?: (options: Nullable<JSX.Element>) => Nullable<JSX.Element>;
  hasBackButton?: boolean;
  hasCloseButton?: boolean;
  variant?: 'primary' | 'transparent' | 'hosted';
  dismissRoute?: Route;
  backgroundColor?: string;
  animationOffset?: number;
  borderColor?: string;
  height?: number;
  shouldBlockNavigation?: boolean;
};

type Props = {
  headerProps: HeaderProps;
  height: number;
  onLayout: (event: LayoutChangeEvent) => void;
  portalName: string;
  setHeaderProps: (options: HeaderProps) => void;
};

const HeaderContext = React.createContext<Props>({
  headerProps: {},
  height: 0,
  onLayout: F.ignore,
  setHeaderProps: F.ignore,
  portalName: makeRandomString(),
});

export const useHeader = () => {
  const context = React.useContext(HeaderContext);
  if (!context) throw new Error('useHeader must be used within a HeaderProvider');

  return context;
};

export const HeaderProvider = (props: React.PropsWithChildren<Props>) => {
  const { children, headerProps, height, onLayout, portalName, setHeaderProps } = props;

  const value = React.useMemo(
    () => ({
      headerProps,
      height,
      onLayout,
      portalName,
      setHeaderProps,
    }),
    [headerProps, height, onLayout, portalName, setHeaderProps],
  );
  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
};
