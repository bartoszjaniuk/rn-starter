import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { goBack } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import { FromFilters } from './components/FromFilters';
import { GenderFilters } from './components/GenderFilters';
import { SpecializationFilters } from './components/SpecializationFilters';
import { WorkWithFilters } from './components/WorkWithFilters';

import { QueryParamsList } from '../../List';

const Content = ({
  onUpdateFilters,
  filters,
}: {
  filters: QueryParamsList | undefined;
  onUpdateFilters: (key: keyof QueryParamsList, value: string) => void;
}) => {
  const onSelectFrom = (from: string) => onUpdateFilters('from', from);
  // TODO:
  const onSelectWorkWith = (from: string) => onUpdateFilters('from', from);

  const onSelectGender = (gender: string) => onUpdateFilters('gender', gender);

  const onSelectSpecialization = React.useCallback(
    (specialization: string) => onUpdateFilters('specialization', specialization),
    [onUpdateFilters],
  );
  return (
    <Screen.Content>
      <Stack space={6} paddingTop={6}>
        <FromFilters onSelectFrom={onSelectFrom} defaultValue={filters?.from} />
        <WorkWithFilters onSelectFrom={onSelectWorkWith} defaultValue={filters?.from} />
        <GenderFilters onSelectGender={onSelectGender} defaultValue={filters?.gender} />
        <SpecializationFilters
          onSelectSpecialization={onSelectSpecialization}
          defaultValue={React.useMemo(() => filters?.specialization, [filters?.specialization])}
        />
      </Stack>
    </Screen.Content>
  );
};

export const SearchTrainersListFilters = () => {
  const { updateNavigationData, navigationData } = useNavigator<QueryParamsList>();
  const [filtersLocalState, setFiltersLocalState] = React.useState<QueryParamsList | undefined>(navigationData);

  const handleApplyFilters = () => {
    if (filtersLocalState) updateNavigationData(filtersLocalState);
    goBack();
  };

  const onUpdateFilters = React.useCallback(
    (key: keyof QueryParamsList, value: string) => {
      setFiltersLocalState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFiltersLocalState],
  );
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="primary">
          <Screen.Header.Right>
            <PressableScale onPress={handleApplyFilters}>
              <Text fontWeight="700" size="xs" color="primary">
                Zapisz filtry
              </Text>
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Content filters={filtersLocalState} onUpdateFilters={onUpdateFilters} />
    </Screen>
  );
};
