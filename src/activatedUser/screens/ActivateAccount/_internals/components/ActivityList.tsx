import React from 'react';

import { Box, Stack } from '@grapp/stacks';

import { Text } from 'src/shared';

import { Tile } from './Tile';

type Props = {
  variant?: 'primary' | 'secondary';
  onPress: (activityId: string | number) => void;
  activities: {
    label: string;
    value: string;
    isSelected: boolean;
  }[];
  error?: string;
};

export const ActivityList = (props: Props) => {
  const { onPress, activities, error, variant = 'primary' } = props;
  return (
    <Stack space={2}>
      <Box direction="row" gap={4} wrap="wrap">
        {activities.map((activity) => (
          <Tile
            variant={variant}
            key={activity.value}
            label={activity.label}
            value={activity.value}
            isSelected={activity.isSelected}
            onPress={onPress}
          />
        ))}
      </Box>
      {error ? (
        <Text fontWeight="500" color="error" size="xs">
          {error}
        </Text>
      ) : null}
    </Stack>
  );
};
