import * as React from 'react';

import { D, F } from '@mobily/ts-belt';

type AnyObject = Record<string, unknown>;
type Props<T extends AnyObject> = React.PropsWithChildren<{
  //   data: {
  //     navigationData: T;
  //     updateNavigationData: VoidFunction;
  //   };
  data: T;
}>;

type ContextProps<T extends AnyObject> = {
  data: {
    navigationData: T;
    updateNavigationData: (data: Partial<T>) => void;
  };
};

const createNavigatorContext = F.once(<T extends AnyObject>() => {
  return React.createContext<ContextProps<T>>({
    data: {
      navigationData: {} as T,
      updateNavigationData: F.ignore,
    },
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
  const [navigationData, setNavigationData] = React.useState(data);

  const updateNavigationData = React.useCallback((partialData: Partial<T>) => {
    // setNavigationData(D.merge(data.navigationData, partialData));
    setNavigationData((prevData) => D.merge(prevData, partialData));
  }, []);

  const NavigatorContext = createNavigatorContext<T>();

  const value = React.useMemo(
    () => ({
      data: {
        navigationData,
        updateNavigationData,
      },
    }),
    [navigationData, updateNavigationData],
  );

  return <NavigatorContext.Provider value={value}>{children}</NavigatorContext.Provider>;
};

// export const NavigatorProvider = <T extends AnyObject>(props: Props<T>) => {
//   const { children, data } = props;
//   const NavigatorContext = createNavigatorContext<T>();

//   const value = Wave.useSourceState(data.source, {} as T);
//   const next = React.useCallback(
//     (partialData: Partial<T>) => {
//       data.next(D.merge(data.value, partialData));
//     },
//     [data],
//   );

//   return (
//     <NavigatorContext.Provider
//       value={{
//         data: {
//           value,
//           next,
//         },
//       }}
//     >
//       {children}
//     </NavigatorContext.Provider>
//   );
// };
