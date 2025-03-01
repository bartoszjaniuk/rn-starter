import { FlatList, View } from 'react-native';

import { Stack } from '@grapp/stacks';
import { useQueryClient } from '@tanstack/react-query';

import { TraineeFormData } from 'src/activatedUser/screens/FirstLogin/Trainee';
import { useProfileCompletionMutation } from 'src/api/user/hooks';
import { userQueryKeys } from 'src/api/user/user.keys';
import { useAuth } from 'src/providers/AuthContext';
import { useNavigator } from 'src/screen';
import { Text } from 'src/shared';

import { ImageFile } from './ImageFile';
import { StepLayout } from './StepLayout';

import { useImagePicker } from '../hooks/useImagePicker';

export const PhotosStep = () => {
  const auth = useAuth();
  const { onSelectImage, images, isLoading } = useImagePicker();
  const { navigationData } = useNavigator<TraineeFormData>();

  const profileCompletionMutation = useProfileCompletionMutation(auth.user?.id || '', {
    onSuccess: async () => {
      await auth.refreshUser();
    },
  });
  const handleNextPress = () => {
    profileCompletionMutation.mutate({
      name: `${navigationData.name} ${navigationData.surname}`,
      role: navigationData.role,
      phoneNumber: navigationData.phoneNumber,
      city: navigationData.city,
      specializations: navigationData.specializations,
      gender: navigationData.gender,
    });
  };

  return (
    <StepLayout
      variant="Photos"
      buttonLabel="Aktywuj profil"
      shouldShowError={false}
      handleButtonClick={handleNextPress}
      innerSpace={0}
      isLoading={profileCompletionMutation.isPending || isLoading}
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
              isLoading={isLoading}
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
