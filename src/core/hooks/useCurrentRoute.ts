import * as React from 'react';

import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';

const takeLastSegment = (route: Route | undefined) => {
  return route?.at(route.length - 1);
};

export const useCurrentRoute = () => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) as Route | undefined;

  const isRouteActive = React.useCallback(
    (value: Route | undefined, defaultValue?: Route) => {
      if (value) {
        const lastSegment = takeLastSegment(value);
        return lastSegment === (routeName ?? takeLastSegment(defaultValue));
      }

      return false;
    },
    [routeName],
  );

  return { routeName, isRouteActive };
};
