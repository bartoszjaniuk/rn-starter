import React from 'react';

import { Inline } from '@grapp/stacks';

import { IconWrapper } from 'src/shared';

import AppleIcon from '../../../../../assets/icons/apple.svg';
import FacebookIcon from '../../../../../assets/icons/facebook.svg';
import GoogleIcon from '../../../../../assets/icons/google.svg';

export const SocialIcons = () => {
  return (
    <Inline space={15} alignX="center">
      <IconWrapper>
        <FacebookIcon />
      </IconWrapper>
      <IconWrapper>
        <GoogleIcon />
      </IconWrapper>
      <IconWrapper>
        <AppleIcon />
      </IconWrapper>
    </Inline>
  );
};
