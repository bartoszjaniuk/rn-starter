import { getPastPresentFutureDates } from 'src/activatedUser/screens/SearchTrainers/SearchTrainersAvailabilityNavigator/_internals/utils/getPastPresentFutureDates';
import { useTrainerAvailabilitiesQuery } from 'src/api/trainer/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Icon, Text } from 'src/shared';
import { PressableScale } from 'src/shared';

import * as route from '../../../../../../navigation/routes';

export const TrainerHeader = ({ trainerId }: { trainerId: string | undefined }) => {
  const { today, lastDay } = getPastPresentFutureDates();

  const trainerAvailabilitiesQuery = useTrainerAvailabilitiesQuery({
    trainerId: trainerId ?? '',
    date: { from: today, to: lastDay },
  });

  const handleNavigateToCalendar = () => {
    goTo(route.toBottomTabsCalendar);
    // FIXME: This is a workaround to navigate to the AddAvailability nested screen
    setTimeout(() => {
      goTo(route.toCalendarTrainerAddAvailability);
    }, 1);
  };
  if (trainerAvailabilitiesQuery.data?.meta.totalItems === 0)
    return (
      <Screen.Header variant="primary">
        <Screen.Header.Left>
          <Text color="white" fontWeight="700" size="xs">
            Dodaj pierwszy wolny termin na trening
          </Text>
        </Screen.Header.Left>
        <Screen.Header.Right>
          <PressableScale onPress={handleNavigateToCalendar}>
            <Icon name="calendarLinear" color="transparent" />
          </PressableScale>
        </Screen.Header.Right>
      </Screen.Header>
    );
  return (
    <Screen.Header variant="primary">
      <Screen.Header.Left>
        <Text color="primary" fontWeight="700" size="xs">
          Wszystkie treningi
        </Text>
      </Screen.Header.Left>
    </Screen.Header>
  );
};
