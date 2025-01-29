import * as React from 'react';
import { SharedValue, makeMutable } from 'react-native-reanimated';

import { ResponsiveProp } from '@grapp/stacks';

export type Props = {
  paddingX: ResponsiveProp<number>;
  columns: number;
  backgroundColor: string;
  navigationBarBackgroundColor: string;
  canGoBack: boolean;
  scrollOffsetY: SharedValue<number>;
};

const ScreenContext = React.createContext<Props>({
  paddingX: 4,
  columns: 1,
  backgroundColor: '#181A1E',
  navigationBarBackgroundColor: 'purple',
  canGoBack: false,
  scrollOffsetY: makeMutable(0),
});

export const useScreen = () => {
  const context = React.useContext(ScreenContext);
  if (context === undefined) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
};

export const ScreenProvider = (props: React.PropsWithChildren<Props>) => {
  const { children, backgroundColor, canGoBack, columns, navigationBarBackgroundColor, paddingX, scrollOffsetY } =
    props;
  const value = React.useMemo(
    () => ({ backgroundColor, canGoBack, columns, navigationBarBackgroundColor, paddingX, scrollOffsetY }),
    [backgroundColor, canGoBack, columns, navigationBarBackgroundColor, paddingX, scrollOffsetY],
  );
  return <ScreenContext.Provider value={value}>{children}</ScreenContext.Provider>;
};
