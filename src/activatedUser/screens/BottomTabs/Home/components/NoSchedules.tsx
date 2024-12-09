import * as React from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

import { Box, Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Text } from 'src/shared';
import { LocalImage } from 'src/shared/components/LocalImage/LocalImage';

type Props = { title?: string; paragraph1?: string; paragraph2?: string };

export const NoSchedules = (props: Props) => {
  const {
    title = 'Brak umówionych zajęć!',
    paragraph1 = 'Czekaj na pierwsze zajęcia albo zaproś',
    paragraph2 = 'swojego podopiecznego do aplikacji!',
  } = props;

  return (
    <Box flex="fluid" alignY="between" paddingTop={24}>
      <Screen.Content>
        <Stack space={4}>
          <Stack align="center" space={4}>
            <Text size="lg" fontWeight="700">
              {title}
            </Text>
            <Stack>
              <Text numberOfLines={2} size="sm" fontWeight="400" color="gray">
                {paragraph1}
              </Text>
              <Text numberOfLines={2} size="sm" fontWeight="400" color="gray">
                {paragraph2}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Screen.Content>
      <LocalImage
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        source={require('../../../../../../assets/images/no-schedules.png')}
        width={UnistylesRuntime.screen.width}
      />
    </Box>
  );
};
