import { useRoute } from '@react-navigation/native';

export const useRouteParams = <T extends Route<unknown>>(_: T): RouteParams<T> => {
  const route = useRoute();
  return (route.params ?? {}) as unknown as RouteParams<T>;
};
