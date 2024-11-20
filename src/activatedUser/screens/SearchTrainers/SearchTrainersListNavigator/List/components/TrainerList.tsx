import { FlatList } from 'react-native-gesture-handler';

import { useTrainersQuery } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useNavigator } from 'src/screen';
import { RefreshControl, Text } from 'src/shared';
import { TryAgainError } from 'src/shared/components/TryAgainError/TryAgainError';
import { getQueryStringFromParams } from 'src/shared/utils/getQueryStringFromParams';

import { Header } from './Header';
import { TrainerListItem } from './TrainerListItem';

import { QueryParamsList } from '../../../List';

export const TrainersList = () => {
  const { navigationData } = useNavigator<QueryParamsList>();
  const queryString = getQueryStringFromParams(navigationData);

  const trainersQuery = useTrainersQuery(queryString);

  if (trainersQuery.isPending) return <LoadingScreen />;

  if (trainersQuery.isError) {
    return <TryAgainError onRefetch={trainersQuery.refetch} isLoading={trainersQuery.isPending} />;
  }

  if (trainersQuery.data.data.length === 0) {
    return <Text>Brak danych do wyświetlenia 🗿</Text>;
  }

  return (
    <>
      <Header count={trainersQuery.data.meta.total} isSorted={false} />
      <FlatList
        refreshControl={<RefreshControl refreshing={trainersQuery.isPending} onRefresh={trainersQuery.refetch} />}
        contentContainerStyle={{ gap: 24 }}
        keyExtractor={(item) => item.id}
        data={trainersQuery.data.data}
        renderItem={({ item }) => <TrainerListItem trainer={item} />}
      />
    </>
  );
};
