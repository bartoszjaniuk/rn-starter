import * as React from 'react';

import { CommonActions, NavigationAction, NavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<Record<string, unknown>>>();

export const dispatch = (action: NavigationAction) => {
  const payload = action.payload as Record<string, Record<string, unknown>>;
  navigationRef.current?.dispatch(action);

  console.log('🗿 action.type: ', action.type);
  console.log('🗿 payload: ', payload);
};

export const goTo = <T extends Route>(route: T, params?: RouteParams<T>) => {
  const coercedRoute = route as string | string[];
  const coercedParams = params as Record<string, unknown>;

  if (typeof coercedRoute === 'string') {
    return dispatch(StackActions.push(coercedRoute, coercedParams));
  }

  const [routeName, screenName] = coercedRoute;

  if (routeName) {
    return dispatch(
      CommonActions.navigate(routeName, {
        screen: screenName ?? routeName,
        params: coercedParams,
      }),
    );
  }
};

export const replace = <T extends Route>(route: T, params?: RouteParams<T>) => {
  const coercedRoute = route as string | string[];
  const coercedParams = params as Record<string, unknown>;

  if (typeof coercedRoute === 'string') {
    return dispatch(StackActions.replace(route, coercedParams));
  }

  const [routeName, screenName] = coercedRoute;

  if (screenName) {
    return dispatch(StackActions.replace(screenName, coercedParams));
  }

  if (routeName) {
    dispatch(StackActions.replace(routeName, coercedParams));
  }
};

export const goBack = () => {
  dispatch(CommonActions.goBack());
};

export const popToTop = () => {
  dispatch(StackActions.popToTop());
};

export const pop = (count?: number) => {
  dispatch(StackActions.pop(count));
};

const getRoutes = () => {
  return navigationRef.current?.getState()?.routes[0]?.state?.routes ?? [];
};

export const getCurrentRoute = () => {
  const routes = getRoutes();
  return routes.at(-1)?.name;
};

export const getPreviousRoute = () => {
  const routes = getRoutes();
  return routes.at(-2)?.name;
};
