import * as React from 'react';
import { useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';

import { Box, FloatBox, Inline, Stack } from '@grapp/stacks';

import { Trainer } from 'src/api/trainer';
import { goTo } from 'src/navigation';
import { useAuth } from 'src/providers/AuthContext';
import { Icon, PressableScale, Text } from 'src/shared';
import { replaceApiHost } from 'src/shared/utils/replaceApiHost';

import * as route from '../../../../../navigation/routes';

const formatSpecializations = (specializations: string[]): string => {
  if (specializations.length <= 2) {
    return specializations.join(', ');
  } else {
    return `${specializations.slice(0, 2).join(', ')} i ${specializations.length - 2} inne`;
  }
};

export function randomIntBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomBetween1And5(): number {
  return parseFloat((Math.random() * 4 + 1).toFixed(1));
}

type Props = {
  trainer: Trainer;
};

export const TrainerListItem = ({ trainer }: Props) => {
  const { theme } = useStyles();
  const { authState } = useAuth();

  const JWT = `Bearer ${authState?.token}`;

  const placeholderImage = `https://i.pravatar.cc/${randomIntBetween(1, 300)}`;

  const handleNavigateProfileDetails = () => {
    goTo(route.toSearchTrainersProfileDetails, {
      id: trainer.id,
      trainerId: trainer.id,
      name: trainer.name,
      city: trainer.city,
      phoneNumber: trainer.phoneNumber,
      specializations: trainer.specializations,
      images: trainer.images,
      email: trainer.email,
      averageBookingRating: trainer.averageRating ?? 0,
    });
  };

  return (
    <PressableScale onPress={handleNavigateProfileDetails}>
      <Inline alignX="between" alignY="center">
        <Inline space={5} alignY="center">
          <Box>
            {trainer.images[0] ? (
              <Image
                source={{ uri: replaceApiHost(trainer.images[0]), headers: { Authorization: JWT } }}
                style={{ borderRadius: 62, width: 72, height: 72 }}
              />
            ) : (
              <Image source={{ uri: placeholderImage }} style={{ borderRadius: 62, width: 72, height: 72 }} />
            )}

            {trainer.averageRating ? (
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
                    {trainer.averageRating ?? 0}
                  </Text>
                </Box>
              </FloatBox>
            ) : null}
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
