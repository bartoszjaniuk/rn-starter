import * as React from 'react';

import { Columns, ColumnsProps, Rows, RowsProps } from '@grapp/stacks';

import isEqual from 'react-fast-compare';

type LayoutProps = Omit<ColumnsProps | RowsProps, 'alignX' | 'alignY' | 'ref'>;
type LayoutWithColumnsProps = LayoutProps & {
  columns: number;
};

export const Layout = React.memo((props: LayoutWithColumnsProps) => {
  const { children, columns, ...rest } = props;

  return columns === 1 ? (
    <Rows {...rest}>{children}</Rows>
  ) : (
    <Columns {...rest} flex="fluid">
      {children}
    </Columns>
  );
}, isEqual);
