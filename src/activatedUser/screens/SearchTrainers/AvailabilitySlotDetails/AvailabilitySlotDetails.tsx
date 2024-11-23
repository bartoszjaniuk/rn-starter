import * as React from 'react';

import { Screen } from 'src/screen';
import { Text, TimelineWeekly } from 'src/shared';

const Content = () => <TimelineWeekly />;

export const SearchTrainersAvailabilitySlotDetails = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="primary" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
