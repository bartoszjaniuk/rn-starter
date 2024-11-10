import { Image, type ImageRequireSource } from 'react-native';

type Dimensions = {
  width: number;
  height: number;
};

type SourceDimensions = {
  imageWidth: number;
  imageHeight: number;
};

type AllDimensions = Partial<Dimensions> & SourceDimensions;

const resolveRatio = (dimensions: AllDimensions) => {
  const { width, height, imageWidth, imageHeight } = dimensions;

  if (width !== undefined && height !== undefined) {
    return Math.min(width / imageWidth, height / imageHeight);
  } else if (width !== undefined) {
    return width / imageWidth;
  } else if (height !== undefined) {
    return height / imageHeight;
  }

  return 1; // Default ratio if no width or height is provided
};

export const adjustSize =
  (dimensions: Partial<Dimensions>) =>
  (imageSize: Dimensions): Dimensions => {
    const { width: imageWidth, height: imageHeight } = imageSize;
    const { width, height } = dimensions;
    const ratio = resolveRatio({ width, height, imageHeight, imageWidth });

    return {
      width: imageWidth * ratio,
      height: imageHeight * ratio,
    };
  };

export const resolveAssetSource = (source: ImageRequireSource): Dimensions => {
  return Image.resolveAssetSource(source);
};
