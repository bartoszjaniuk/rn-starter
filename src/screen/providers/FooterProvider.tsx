import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';

import { F } from '@mobily/ts-belt';

type Props = {
  height?: number;
  onLayout: (event: LayoutChangeEvent) => void;
};

const FooterContext = React.createContext<Props>({
  height: undefined,
  onLayout: F.ignore,
});

export const useFooter = () => {
  const context = React.useContext(FooterContext);
  if (context === undefined) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};

export const FooterProvider = (props: React.PropsWithChildren<Props>) => {
  const { children, height, onLayout } = props;

  const value = React.useMemo(
    () => ({
      height,
      onLayout,
    }),
    [height, onLayout],
  );

  return <FooterContext.Provider value={value}>{children}</FooterContext.Provider>;
};
