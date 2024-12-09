import * as React from 'react';

import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';

import { Text } from '../Text';

type Props = React.PropsWithChildren<{ role: 'trainee' | 'trainer' }>;

export const CanAccess = (props: Props) => {
  const { role, children } = props;
  const userInfoQuery = useGetUserInfoQuery();

  const hasAccess = userInfoQuery.data?.role === role;

  if (userInfoQuery.isLoading) return <LoadingScreen />;

  if (userInfoQuery.isError) return <Text>Coś poszlo nie tak...</Text>;

  if (!hasAccess) return null;

  return children;
};
