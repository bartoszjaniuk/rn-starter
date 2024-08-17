import React from 'react';

import { D } from '@mobily/ts-belt';

import { HeaderProps, useHeader } from '../providers';

export const useScreenHeader = (options: HeaderProps, deps: React.DependencyList = []) => {
  const { headerProps, setHeaderProps } = useHeader();

  React.useEffect(() => {
    setHeaderProps(D.merge(headerProps, options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
