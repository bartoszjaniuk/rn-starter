import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { ActivityList } from 'src/firstLogin/screens/ActivateAccount/_internals/components';
import { useTrainerSpecializations } from 'src/firstLogin/screens/ActivateAccount/_internals/hooks';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import { CheckboxList } from './components/CheckboxList';

const today = new Date().toLocaleDateString('pl-PL');
const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL');
//   const thisWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL');

const Content = () => {
  const { specializations, isLoading, setSpecializations } = useTrainerSpecializations();
  const [error, setError] = React.useState('');

  const onActivityPress = React.useCallback(
    (activityId: number) => {
      const updatedActivities = specializations.map((specialization) => {
        if (specialization.value === activityId) {
          return { ...specialization, isSelected: !specialization.isSelected };
        }
        return specialization;
      });
      setSpecializations(updatedActivities);
      setError('');
    },
    [setSpecializations, specializations],
  );

  return (
    <Screen.Content>
      <Stack space={6} paddingTop={6}>
        <CheckboxList
          heading="Pokaż dostępnych:"
          data={[
            { key: 'fromToday', value: today, title: 'Dzisiaj' },
            { key: 'fromTomorrow', value: tomorrow, title: 'Jutro' },
            { key: 'fromNextWeek', value: tomorrow, title: 'W tym tygodniu' },
          ]}
        />
        <CheckboxList
          heading="Pokaż:"
          data={[
            { key: 'trainersIWorkedWith', value: today, title: 'Trenerów z którymi ćwiczyłem' },
            { key: 'trainersIdidNotWorkedWith', value: today, title: 'Trenerów z innych lokalizacji' },
          ]}
        />
        <CheckboxList
          heading="Wybierz płeć"
          data={[
            { key: 'genderWoman', value: 'woman', title: 'Kobieta' },
            { key: 'genderMan', value: 'man', title: 'Mężczyzna' },
          ]}
        />
        <Stack space={4}>
          <Text fontWeight="700" size="sm">
            Znajdź trening:
          </Text>
          <ActivityList activities={specializations} onPress={onActivityPress} error={error} />
        </Stack>
      </Stack>
    </Screen.Content>
  );
};

export const SearchTrainersFilters = () => {
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="primary">
          <Screen.Header.Right>
            <PressableScale>
              <Text fontWeight="700" size="xs" color="primary">
                Filtruj
              </Text>
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Content />
    </Screen>
  );
};
