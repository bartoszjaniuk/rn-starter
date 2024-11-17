/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { Screen } from 'src/screen';

import { PhotosStep } from '../../_internals/components/PhotosStep';

export const ActivateAccountTraineePhotos = () => {
  return (
    <Screen.Navigator.Item>
      <PhotosStep />
    </Screen.Navigator.Item>
  );
};
