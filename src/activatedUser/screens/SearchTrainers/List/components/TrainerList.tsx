import { FlatList } from 'react-native-gesture-handler';

import { useTrainersQuery } from 'src/api/trainer';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { RefreshControl, Text } from 'src/shared';

import { TrainerListItem } from './TrainerListItem';

export const TrainersList = () => {
  const trainersQuery = useTrainersQuery();

  if (trainersQuery.isPending) return <LoadingScreen />;

  if (trainersQuery.isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={trainersQuery.isPending} onRefresh={trainersQuery.refetch} />}
      contentContainerStyle={{ gap: 24 }}
      keyExtractor={(item) => item.id}
      data={trainersQuery.data.data}
      renderItem={({ item }) => <TrainerListItem trainer={item} />}
    />
  );
};
