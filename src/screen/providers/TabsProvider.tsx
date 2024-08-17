import * as React from 'react';

type Props = {
  isEnabled: boolean;
  tabBarHeight: number;
};

const TabsContext = React.createContext<Props>({
  isEnabled: false,
  tabBarHeight: 0,
});

export const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};

export const TabsProvider = (props: React.PropsWithChildren<Props>) => {
  const { children, isEnabled, tabBarHeight } = props;

  const value = React.useMemo(
    () => ({
      isEnabled,
      tabBarHeight,
    }),
    [isEnabled, tabBarHeight],
  );

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
