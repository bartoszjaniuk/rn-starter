import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';

import { Inline, Stack } from '@grapp/stacks';

import { randomIntBetween } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersListNavigator/List/components/TrainerListItem';
import { Icon, PressableScale, Text } from 'src/shared';

type Props = {
  onPress?: () => void;
  name: string;
  imageURL?: string;
  city: string;
};

export const Tile = (props: Props) => {
  const { styles } = useStyles(stylesheet);
  const { onPress, imageURL, name, city } = props;
  const placeholderImage = `https://i.pravatar.cc/${randomIntBetween(1, 300)}`;

  return (
    <PressableScale onPress={onPress}>
      <Inline alignX="between" alignY="center">
        <Inline space={3} alignY="center">
          <Image style={styles.image} source={{ uri: placeholderImage }} />
          <Stack>
            <Text fontWeight="700" size="xxl">
              {name}
            </Text>
            <Text fontWeight="400" size="sm">
              {city}
            </Text>
          </Stack>
        </Inline>

        <PressableScale onPress={onPress}>
          <Icon name="chevron" svgProps={{ width: 24, height: 24 }} style={{ transform: [{ rotate: '270deg' }] }} />
        </PressableScale>
      </Inline>
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((_theme) => ({
  image: {
    borderRadius: 4,
    width: 50,
    height: 50,
  },
}));
