import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';

import { Box, Inline, Stack } from '@grapp/stacks';

import { randomIntBetween } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersListNavigator/List/components/TrainerListItem';
import { Icon, PressableScale, Text } from 'src/shared';
import { capitalizeFirstLetter } from 'src/shared/utils/capitalizeFirstLetter';

type Props = {
  onPress?: () => void;
  name: string;
  timeStart?: string;
  timeEnd?: string;
  imageURL?: string;
  specialization: string;
  isPast?: boolean;
  date?: string;
};

export const Tile = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { onPress, imageURL = '', name, specialization, timeEnd, timeStart, isPast, date } = props;
  const placeholderImage = `https://i.pravatar.cc/${randomIntBetween(1, 300)}`;

  return (
    <PressableScale style={styles.container} onPress={onPress}>
      <Inline alignX="between" alignY="center">
        <Inline space={4}>
          <Image style={styles.image} source={{ uri: placeholderImage }} />
          <Stack space={1}>
            <Text fontWeight="500" size="md">
              {name}
            </Text>
            <Inline space={2}>
              <Inline alignY="center" space={2}>
                <Icon name="clock" color="transparent" />
                {timeStart && timeEnd ? (
                  <Inline alignY="center">
                    <Text fontWeight="300" size="xs">
                      {timeStart}
                    </Text>
                    <Text fontWeight="300" size="xs">
                      -
                    </Text>
                    <Text fontWeight="300" size="xs">
                      {timeEnd}
                    </Text>
                  </Inline>
                ) : null}
              </Inline>
              {/* {isPast ? (
                <Inline alignX="center" alignY="center" space={2}>
                  <Icon name="calendar" color="gray" svgProps={{ width: 16, height: 16 }} />
                  <Text fontWeight="500" size="xs">
                    {date}
                  </Text>
                </Inline>
              ) : (
                <Box backgroundColor="black" paddingX={2} borderRadius={4} alignY="center" alignX="center">
                  <Text fontWeight="500" size="xs">
                    {capitalizeFirstLetter(specialization)}
                  </Text>
                </Box>
              )} */}
              <Box backgroundColor="black" paddingX={2} borderRadius={4} alignY="center" alignX="center">
                <Text fontWeight="500" size="xs">
                  {capitalizeFirstLetter(specialization)}
                </Text>
              </Box>
            </Inline>
          </Stack>
        </Inline>

        <PressableScale onPress={onPress}>
          <Icon name="chevron" svgProps={{ width: 16, height: 16 }} style={{ transform: [{ rotate: '270deg' }] }} />
        </PressableScale>
      </Inline>
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((_theme) => ({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#373739',
    borderColor: '#545458',
  },
  image: {
    borderRadius: 4,
    width: 40,
    height: 40,
  },
}));
