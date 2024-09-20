import React from 'react';

import { Box } from '@grapp/stacks';

import { Tile } from './Tile';

export type Activity = {
  label: string;
  value: number;
  isSelected: boolean;
};

export const activitiesInitialValue = [
  { label: 'Siłowy', value: 1, isSelected: false },
  { label: 'Joga', value: 2, isSelected: false },
  { label: 'Sylwetkowy', value: 3, isSelected: false },
  { label: 'Dla dzieci', value: 4, isSelected: false },
  { label: 'Kalistenika', value: 5, isSelected: false },
  { label: 'Online', value: 6, isSelected: false },
  { label: 'Dla małych grup', value: 7, isSelected: false },
  { label: 'Dla seniorów', value: 8, isSelected: false },
  { label: 'Dla osób otyłych', value: 9, isSelected: false },
  { label: 'Przed/po ciązy', value: 10, isSelected: false },
];

export const ActivityList = () => {
  const [activities, setActivities] = React.useState(activitiesInitialValue);

  const onActivityPress = React.useCallback(
    (activityId: number) => {
      const updatedActivities = activities.map((activity) => {
        if (activity.value === activityId) {
          return { ...activity, isSelected: !activity.isSelected };
        }
        return activity;
      });
      setActivities(updatedActivities);
    },
    [activities],
  );

  return (
    <Box direction="row" gap={4} wrap="wrap">
      {activities.map((activity) => (
        <Tile
          label={activity.label}
          key={activity.value}
          value={activity.value}
          isSelected={activity.isSelected}
          onPress={onActivityPress}
        />
      ))}
    </Box>
  );
};

// const stylesheet = createStyleSheet((theme) => ({
//   tile: {
//     backgroundColor: theme.colors.primary,
//     borderRadius: 5,
//     height: 48,
//     minWidth: 103,
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }));
