import * as React from 'react';

import { Image, type ImageProps } from 'expo-image';

import { adjustSize, resolveAssetSource } from './utils';

type Props = {
  readonly source: number;
  readonly contentFit?: ImageProps['contentFit'];
  readonly width?: number;
  readonly height?: number;
  readonly onLoadEnd?: () => void;
  readonly onError?: () => void;
  readonly style?: ImageProps['style'];
  readonly blurRadius?: ImageProps['blurRadius'];
};

export const LocalImage = (props: Props) => {
  const {
    source,
    contentFit = 'cover',
    width,
    height,
    onLoadEnd: handleLoadEnd,
    onError: handleError,
    blurRadius,
    style,
  } = props;

  const getSize = adjustSize({ width, height });
  const dimensions = getSize(resolveAssetSource(source));

  return (
    <Image
      style={[dimensions, style]}
      source={source}
      contentFit={contentFit}
      onLoadEnd={handleLoadEnd}
      onError={handleError}
      blurRadius={blurRadius}
    />
  );
};
