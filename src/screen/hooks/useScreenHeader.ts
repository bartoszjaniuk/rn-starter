import React from 'react';

import { D } from '@mobily/ts-belt';

import { HeaderProps, useHeader } from '../providers';

export const useScreenHeader = (options: HeaderProps, deps: React.DependencyList = []) => {
  const { ...props } = useHeader();

  React.useLayoutEffect(() => {
    const combinedProps = D.merge(props.headerProps, options);

    props.setHeaderProps(combinedProps);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
