import * as React from 'react';
import { UnistylesRuntime } from 'react-native-unistyles';

import { Box, Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Text } from 'src/shared';
import { LocalImage } from 'src/shared/components/LocalImage/LocalImage';

export const NoSchedules = (props: React.PropsWithChildren) => {
  return (
    <Box flex="fluid" alignY="between">
      <Screen.Content>
        <Stack space={4}>
          {props.children}
          <Stack align="center" space={4}>
            <Text size="lg" fontWeight="700">
              Brak umówionych zajęć!
            </Text>
            <Stack>
              <Text numberOfLines={2} size="sm" fontWeight="400" color="gray">
                Czekaj na pierwsze zajęcia albo zaproś
              </Text>
              <Text numberOfLines={2} size="sm" fontWeight="400" color="gray">
                swojego podopiecznego do aplikacji!
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Screen.Content>
      <LocalImage
        source={require('../../../../../../assets/images/no-schedules.png')}
        width={UnistylesRuntime.screen.width}
        // height={200}
      />
    </Box>
  );
};
