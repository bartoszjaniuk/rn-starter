import * as React from 'react';

export type HeaderElement = 'HeaderLeftElement' | 'HeaderRightElement' | 'HeaderContentElement' | 'HeaderBottomElement';

export const isHeaderElementType =
  (type: HeaderElement) =>
  (node: React.ReactNode): boolean => {
    return (
      node !== undefined &&
      node !== null &&
      typeof node === 'object' &&
      'type' in node &&
      // @ts-expect-error: this_is_fine.png
      node.type.__type__ === type &&
      React.isValidElement(node)
    );
  };
