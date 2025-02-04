import * as React from 'react';

import { Stack } from '@grapp/stacks';

import { goBack } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import { FromFilters } from './components/FromFilters';
import { GenderFilters } from './components/GenderFilters';
import { SpecializationFilters } from './components/SpecializationFilters';
import { WorkWithFilters } from './components/WorkWithFilters';

import { QueryParamsList, initialQueryParamsList } from '../../List';

const Content = ({
  onUpdateFilters,
  onClearFilters,
  filters,
}: {
  filters: QueryParamsList | undefined;
  onUpdateFilters: (key: keyof QueryParamsList, value: string) => void;
  onClearFilters: VoidFunction;
}) => {
  const onSelectFrom = (from: string) => onUpdateFilters('from', from);
  // TODO:
  const onSelectWorkWith = (from: string) => onUpdateFilters('from', from);

  const onSelectGender = (gender: string) => onUpdateFilters('gender', gender);

  const onSelectSpecialization = React.useCallback(
    (specialization: string) => onUpdateFilters('specializations', specialization),
    [onUpdateFilters],
  );

  return (
    <Screen.Content>
      <Stack space={6} paddingTop={6}>
        <PressableScale onPress={onClearFilters}>
          {Object.entries(filters).some(([key, value]) => !!value) ? (
            <Text fontWeight="700" size="xs" color="white">
              Wyczyść filtry X
            </Text>
          ) : null}
        </PressableScale>
        <FromFilters onSelectFrom={onSelectFrom} defaultValue={filters?.from} />
        <WorkWithFilters onSelectFrom={onSelectWorkWith} defaultValue={undefined} />
        <GenderFilters onSelectGender={onSelectGender} defaultValue={filters?.gender} />
        <SpecializationFilters
          onSelectSpecialization={onSelectSpecialization}
          defaultValue={React.useMemo(() => filters?.specializations, [filters?.specializations])}
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

  const onClearFilters = () => {
    if (filtersLocalState) updateNavigationData(initialQueryParamsList);
    goBack();
  };

  const onUpdateFilters = React.useCallback(
    (key: keyof QueryParamsList, value: string) => {
      setFiltersLocalState((prev) => {
        const newValue = prev?.[key] === value ? undefined : value;
        return {
          ...prev,
          [key]: newValue,
        };
      });
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
      <Content filters={filtersLocalState} onUpdateFilters={onUpdateFilters} onClearFilters={onClearFilters} />
    </Screen>
  );
};
