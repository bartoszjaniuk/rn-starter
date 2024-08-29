import * as React from 'react';

export const useToggle = (initialValue?: boolean) => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(() => setValue((prev) => !prev), []);
  return React.useMemo(() => ({ value, toggle }), [toggle, value]);
};
