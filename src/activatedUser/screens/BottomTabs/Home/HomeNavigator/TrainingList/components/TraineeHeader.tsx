import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, Text } from 'src/shared';
import { PressableScale } from 'src/shared';

import * as route from '../../../../../../navigation/routes';

export const TraineeHeader = () => {
  return (
    <Screen.Header variant="primary">
      <Screen.Header.Left>
        <Text color="primary" fontWeight="700" size="xs">
          Zaktualizuj swoje wymiary
        </Text>
      </Screen.Header.Left>
      <Screen.Header.Right>
        <PressableScale onPress={() => goTo(route.toHomeUpdateParameters)}>
          <Icon name="plusThin" color="primary" />
        </PressableScale>
      </Screen.Header.Right>
    </Screen.Header>
  );
};
