import { Screen } from 'src/screen';

import { Content } from './components';

export const AuthRegister = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
