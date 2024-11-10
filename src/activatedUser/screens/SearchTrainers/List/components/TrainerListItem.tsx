import React from 'react';
import { useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';

import { Box, FloatBox, Inline, Stack } from '@grapp/stacks';

import { Trainer } from 'src/api/trainer';
import { Icon, PressableScale, Text } from 'src/shared';
import { LocalImage } from 'src/shared/components/LocalImage/LocalImage';

const formatSpecializations = (specializations: string[]): string => {
  if (specializations.length <= 2) {
    return specializations.join(', ');
  } else {
    return `${specializations.slice(0, 2).join(', ')} i ${specializations.length - 2} inne`;
  }
};

function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBetween1And5(): number {
  return parseFloat((Math.random() * 4 + 1).toFixed(1));
}

type Props = {
  trainer: Trainer;
};

export const TrainerListItem = ({ trainer }: Props) => {
  const { theme } = useStyles();

  const placeholderImage = `https://avatar.iran.liara.run/public/${randomIntBetween(1, 93)}`;
  return (
    <PressableScale>
      <Inline alignX="between" alignY="center">
        <Inline space={5} alignY="center">
          <Box>
            <Image
              source={{ uri: trainer.profileImage ?? placeholderImage }}
              style={{ borderRadius: 62, width: 72, height: 72 }}
              // width={72}
              // height={72}
            />
            <FloatBox offset={0} alignY="bottom">
              <Box
                width={38}
                height={20}
                borderRadius={12}
                backgroundColor={theme.colors.primary}
                alignX="center"
                alignY="center"
              >
                <Text size="xxs" fontWeight="700" color="typography">
                  {trainer.rating ?? randomBetween1And5()}
                </Text>
              </Box>
            </FloatBox>
          </Box>
          <Stack>
            <Text size="md" fontWeight="700">
              {trainer.name}
            </Text>
            <Text size="xs" fontWeight="400">
              {formatSpecializations(trainer.specializations)}
            </Text>
          </Stack>
        </Inline>
        <PressableScale>
          <Icon name="dots" color="white" svgProps={{ width: 18 }} />
        </PressableScale>
      </Inline>
    </PressableScale>
  );
};
