/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { Stack } from '@grapp/stacks';

import { useGetUserInfoQuery, useProfileCompletionMutation } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { Text } from 'src/shared';

import * as route from '../../../../navigation/routes';
import { ImageFile, StepLayout } from '../../_internals/components';
import { useImagePicker } from '../../_internals/hooks/useImagePicker';

const Content = () => {
  const { onSelectImage, images } = useImagePicker();
  const { data, isLoading } = useGetUserInfoQuery(true);
  const { navigationData } = useNavigator();
  const { mutate: activateProfile } = useProfileCompletionMutation(data?.id || '');

  const handleNextPress = () => {
    // goTo(route.toActivateAccountForTraineePhotos);
    console.log('navigationData', navigationData);
  };

  if (isLoading) return <LoadingScreen />;

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
          data={images}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <ImageFile
              uri={item.item.uri}
              assetId={item.item.assetId}
              id={item.item.id}
              index={item.index}
              onPress={onSelectImage}
              isPrimary={item.index === 0}
            />
          )}
          columnWrapperStyle={{ gap: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </Stack>
    </StepLayout>
  );
};

export const ActivateAccountForTrainerPhotos = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
