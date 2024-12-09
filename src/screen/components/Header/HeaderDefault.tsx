import * as React from 'react';

import { Column, Columns, FloatBox } from '@grapp/stacks';

import { useLayout } from 'src/screen/hooks';
import { useHeader } from 'src/screen/providers';
import { DEFAULT_HEADER_HEIGHT, LayoutProps } from 'src/screen/utils';

import { HeaderContainer } from './HeaderContainer';

export const HeaderDefault = (props: LayoutProps) => {
  const { left, right, content } = props;

  const { headerProps } = useHeader();

  const { insets } = useLayout();

  const height = headerProps.height ?? DEFAULT_HEADER_HEIGHT;

  return (
    <HeaderContainer height={height}>
      <Columns defaultFlex="content" alignX="between" alignY="center" flex="fluid">
        <Column flex="fluid">{left}</Column>
        <Column paddingStart={4}>{right}</Column>
      </Columns>
      <FloatBox
        offset={0}
        top={headerProps.isModal ? 0 : insets.top}
        height={height}
        alignX="center"
        alignY="center"
        pointerEvents="box-none"
      >
        {content}
      </FloatBox>
    </HeaderContainer>
  );
};
