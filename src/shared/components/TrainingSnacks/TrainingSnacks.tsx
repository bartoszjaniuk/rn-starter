import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { TrainingSnack } from './components/TrainingSnack';

type Props = {
  data: string[];
};

export const TrainingSnacks = (props: Props) => {
  const { data } = props;
  return (
    <FlatList
      scrollEnabled={false}
      numColumns={3}
      contentContainerStyle={{ gap: 8 }}
      columnWrapperStyle={{ gap: 8 }}
      data={data}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <TrainingSnack title={item} />}
    />
  );
};
