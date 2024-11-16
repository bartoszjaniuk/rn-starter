/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { Stack } from '@grapp/stacks';
import { useQueryClient } from '@tanstack/react-query';

import { TraineeFormData } from 'src/activatedUser/screens/FirstLogin/Trainee';
import { useUploadImagesMutation } from 'src/api/upload/hooks';
import { userQueryKeys } from 'src/api/user';
import { useGetUserInfoQuery, useProfileCompletionMutation } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { goTo, popToTop, replace } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { Text } from 'src/shared';

import * as route from '../../../../navigation/routes';
import { ImageFile } from '../../_internals/components/ImageFile';
import { StepLayout } from '../../_internals/components/StepLayout';
import { useImagePicker } from '../../_internals/hooks/useImagePicker';
import { makeFormData } from '../../_internals/utils';

const Content = () => {
  const { onSelectImage, images } = useImagePicker();
  const userInfoQuery = useGetUserInfoQuery(true);
  const { navigationData } = useNavigator<TraineeFormData>();
  const queryClient = useQueryClient();
  const profileCompletionMutation = useProfileCompletionMutation(userInfoQuery.data?.id || '', {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userQueryKeys.getUserInfo()] });
    },
  });
  const uploadImagesMutation = useUploadImagesMutation({
    onSuccess: () => {
      profileCompletionMutation.mutate({
        name: `${navigationData.name} ${navigationData.surname}`,
        role: navigationData.role,
        phoneNumber: navigationData.phoneNumber,
        city: navigationData.city,
        specializations: navigationData.specializations,
        gender: navigationData.gender,
      });
    },
  });
  const handleNextPress = () => {
    images
      .filter((img) => img.fileName)
      .forEach(async (img) => {
        await uploadImagesMutation.mutateAsync(makeFormData(img));
      });
  };

  if (userInfoQuery.isPending) return <LoadingScreen />;

  return (
    <StepLayout
      variant="Photos"
      buttonLabel="Aktywuj profil"
      shouldShowError={false}
      handleButtonClick={handleNextPress}
      innerSpace={0}
      isLoading={profileCompletionMutation.isPending || uploadImagesMutation.isPending}
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
              isLoading={uploadImagesMutation.isPending}
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

export const ActivateAccountTraineePhotos = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
