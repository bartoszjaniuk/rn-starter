import * as React from 'react';
import { Alert } from 'react-native';
import 'react-native-get-random-values';

import * as ImagePicker from 'expo-image-picker';

import { v4 as uuidV4 } from 'uuid';

import { useUploadImagesMutation } from 'src/api/upload/hooks';
import { useDeleteImageMutation } from 'src/api/upload/hooks/useDeleteImageMutation';

import { useImageAction } from './useImageAction';

import { IMAGE_PLACEHOLDERS, ImageAsset, SELECTION_LIMIT } from '../constants';
import { makeFormData, updateImages } from '../utils';

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  allowsMultipleSelection: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
};

export const useImagePicker = () => {
  const [images, setImages] = React.useState<ImageAsset[]>(IMAGE_PLACEHOLDERS);
  const uploadImagesMutation = useUploadImagesMutation();
  const deleteImageMutation = useDeleteImageMutation();

  const deletePhoto = (index: number) => {
    const updatedPhotos = [...images];
    if (updatedPhotos[index]?.id) deleteImageMutation.mutate(updatedPhotos[index].id);
    updatedPhotos.splice(index, 1);
    updatedPhotos.push({ ...IMAGE_PLACEHOLDERS[0], id: uuidV4(), height: 0, uri: '', width: 0 });
    setImages(updatedPhotos);
  };

  const setAsDefault = (index: number) => {
    const updatedPhotos = [...images];
    const selectedPhoto = updatedPhotos.splice(index, 1)[0];
    if (!selectedPhoto) return;
    updatedPhotos.unshift(selectedPhoto);
    setImages(updatedPhotos);
  };

  const onImageAction = useImageAction({ deletePhoto, setAsDefault });

  const onSelectImage = async (index: number, shouldUseLibrary = true, assetId?: string | null) => {
    let result;

    if (assetId) return onImageAction(index);
    const opts = { ...imagePickerOptions, selectionLimit: SELECTION_LIMIT - images.filter((img) => img.uri).length };

    if (shouldUseLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(opts);
    } else {
      const hasPermissions = await ImagePicker.requestCameraPermissionsAsync();
      if (!hasPermissions) return Alert.alert('Brak uprawnień do aparatu');

      result = await ImagePicker.launchCameraAsync(imagePickerOptions);
    }

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        ...asset,
        id: uuidV4(),
      }));

      const updatedImages = [...images];

      for (let i = 0; i < selectedImages.length; i++) {
        const tempImage = selectedImages[i];
        if (!tempImage) return;
        const data = await uploadImagesMutation.mutateAsync(makeFormData(tempImage));

        if (data.fileId) {
          updatedImages[index + i] = {
            ...tempImage,
            id: data.fileId,
          };
        }
      }

      const shapedImages = updateImages(images, updatedImages);

      setImages(shapedImages);
    }
  };

  return { images, onSelectImage, isLoading: uploadImagesMutation.isPending || deleteImageMutation.isPending };
};
