import 'react-native-get-random-values';

import { v4 as uuidV4 } from 'uuid';

import { ImageAsset } from '../constants';

export const updateImages = (existingImages: ImageAsset[], selectedImages: ImageAsset[]) => {
  const updatedImages = [...existingImages];

  let selectedIndex = 0;

  for (let i = 0; i < updatedImages.length && selectedIndex < selectedImages.length; i++) {
    if (!updatedImages[i]?.uri) {
      updatedImages[i] = {
        ...selectedImages[selectedIndex],
        id: selectedImages[selectedIndex]?.id || uuidV4(),
      };
      selectedIndex++;
    }
  }

  return updatedImages;
};

export const makeFormData = (imageAsset: ImageAsset) => {
  const formData = new FormData();
  const file = {
    uri: imageAsset.uri,
    type: imageAsset.type,
    name: imageAsset.fileName,
  };
  formData.append('file', file);
  return formData;
};
