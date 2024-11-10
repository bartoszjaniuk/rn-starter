import * as React from 'react';

type Props = {
  defaultRoute: Route;
};

const randomString = () => (Math.random() + 1).toString(36).substring(7);

export const BottomTabBarContext = React.createContext<Props>({
  defaultRoute: randomString() as Route,
});

export const useBottomTabBar = () => {
  const context = React.useContext(BottomTabBarContext);
  if (!context) throw new Error('useBottomTabBar must be used within a BottomTabBarProvider');

  return context;
};

export const BottomTabBarProvider = (props: React.PropsWithChildren<Props>) => {
  const { children, ...rest } = props;
  return <BottomTabBarContext.Provider value={rest}>{children}</BottomTabBarContext.Provider>;
};
