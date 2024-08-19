// TODO: TEMPORARY
import { Text } from 'react-native';

import { Box } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { PressableScale } from 'src/shared';

export const AuthorizedNavigator = () => {
  Screen.useHeader({
    title: 'siemaa',
    backgroundColor: 'purple',
    renderLeft: () => <Text>Righto✈️</Text>,
  });

  return (
    <Screen statusBarStyle="dark" HeaderComponent={<Screen.Header variant="hosted" />}>
      <Screen.Content>
        <Box>
          <Text>Test</Text>
        </Box>
      </Screen.Content>
    </Screen>
  );
};
