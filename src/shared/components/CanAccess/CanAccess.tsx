import * as React from 'react';

import { useAuthStore } from 'src/store/auth';

type Props = React.PropsWithChildren<{ role: 'trainee' | 'trainer' }>;

export const CanAccess = (props: Props) => {
  const { role, children } = props;
  const auth = useAuthStore();
  const hasAccess = auth.user?.role === role;

  if (!hasAccess) return null;

  return children;
};
