import * as React from 'react';

import { D, F } from '@mobily/ts-belt';

type AnyObject = Record<string, unknown>;
type Props<T extends AnyObject> = React.PropsWithChildren<{
  data: T;
  // updateNavigationData: VoidFunction;
}>;

type ContextProps<T extends AnyObject> = {
  navigationData: T;
  updateNavigationData: (data: Partial<T>) => void;
};

const createNavigatorContext = F.once(<T extends AnyObject>() => {
  return React.createContext<ContextProps<T>>({
    navigationData: {} as T,
    updateNavigationData: F.ignore,
  });
});

export const useNavigator = <T extends AnyObject>() => {
  const context = React.useContext(createNavigatorContext<T>());
  if (context === undefined) {
    throw new Error('useNavigator must be used within a NavigatorProvider');
  }
  return context;
};

export const NavigatorProvider = <T extends AnyObject>(props: Props<T>) => {
  const { children, data } = props;
  console.log('data from props', data);
  const [navigationData, setNavigationData] = React.useState(data);

  const updateNavigationData = React.useCallback((partialData: Partial<T>) => {
    // setNavigationData(D.merge(data.navigationData, partialData));
    setNavigationData((prevData) => D.merge(prevData, partialData));
  }, []);

  const NavigatorContext = createNavigatorContext<T>();

  const value = React.useMemo(
    () => ({
      navigationData,
      updateNavigationData,
    }),
    [navigationData, updateNavigationData],
  );

  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
};
