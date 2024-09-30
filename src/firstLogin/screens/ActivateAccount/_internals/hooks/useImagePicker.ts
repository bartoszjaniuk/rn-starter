import * as React from 'react';
import { Alert } from 'react-native';
import 'react-native-get-random-values';

import * as ImagePicker from 'expo-image-picker';

import { v4 as uuidV4 } from 'uuid';

import { IMAGE_PLACEHOLDERS, ImageAsset, SELECTION_LIMIT } from '../constants';
import { useImageAction } from '../hooks/useImageAction';
import { updateImages } from '../utils';

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  allowsMultipleSelection: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
};

export const useImagePicker = () => {
  const [images, setImages] = React.useState<ImageAsset[]>(IMAGE_PLACEHOLDERS);

  const deletePhoto = (index: number) => {
    const updatedPhotos = [...images];
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

      setImages(updateImages(images, selectedImages));
    }
  };

  return { images, onSelectImage };
};
