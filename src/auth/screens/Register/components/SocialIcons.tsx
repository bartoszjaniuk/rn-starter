import React from 'react';

import { Inline } from '@grapp/stacks';

import { Icon, IconWrapper } from 'src/shared';

export const SocialIcons = () => {
  return (
    <Inline space={15} alignX="center">
      <IconWrapper>
        <Icon name="facebook" />
      </IconWrapper>
      <IconWrapper>
        <Icon name="google" />
      </IconWrapper>
      <IconWrapper>
        <Icon name="apple" color="white" />
      </IconWrapper>
    </Inline>
  );
};
