import * as React from 'react';

import { useAuth } from 'src/providers/AuthContext';

type Props = React.PropsWithChildren<{ role: 'trainee' | 'trainer' }>;

export const CanAccess = (props: Props) => {
  const { role, children } = props;
  const auth = useAuth();
  const hasAccess = auth.user?.role === role;

  if (!hasAccess) return null;

  return children;
};
