import * as React from 'react';

/*
    useLazy performs invoke passed fn once at initial render

*/

export const useLazy = <T>(lazyFn: () => T) => {
  return React.useState(lazyFn)[0];
};
