import React from 'react';

import { Screen } from 'src/screen';

import { Content } from './components';

export const AuthLogin = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
