import * as React from 'react';
import { FlatList, View } from 'react-native';

import { Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Text } from 'src/shared';

import { ImageFile } from './components/ImageFile';

import * as route from '../../../../navigation/routes';
import { StepLayout } from '../../_internals/components';

const photos = [
  { id: 1, src: '' },
  { id: 2, src: '' },
  { id: 3, src: '' },
  { id: 4, src: '' },
  { id: 5, src: '' },
  { id: 6, src: '' },
];

const Content = () => {
  const handleNextPress = () => {
    goTo(route.toActivateAccountForTraineePhotos);
  };

  return (
    <StepLayout
      variant="Photos"
      buttonLabel="Aktywuj profil"
      shouldShowError={false}
      handleButtonClick={handleNextPress}
      innerSpace={0}
    >
      <Stack space={1}>
        <Text fontWeight="500" size="xs">
          Zdjęcie profilowe
        </Text>
        <FlatList
          data={photos}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(item) => <ImageFile isPrimary={item.index === 0} />}
          columnWrapperStyle={{ gap: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </Stack>
    </StepLayout>
  );
};

export const ActivateAccountForTraineePhotos = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
