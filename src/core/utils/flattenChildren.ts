import * as React from 'react';

export const flattenChildren = (children: React.ReactNode): ReturnType<typeof React.Children.toArray> => {
  return React.Children.toArray(children).reduce(
    (acc: ReturnType<typeof React.Children.toArray>, child) => {
      if (React.isValidElement(child) && child.type === React.Fragment) {
        return acc.concat(flattenChildren(child.props.children));
      }
      acc.push(child);
      return acc;
    },
    [] as ReturnType<typeof React.Children.toArray>,
  );
};
