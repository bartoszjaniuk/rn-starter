import * as React from 'react';
import { Dimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import { Bleed, Box, FloatBox } from '@grapp/stacks';

import { Pagination } from './components/Pagination';

import { LocalImage } from '../LocalImage/LocalImage';

const images = [
  {
    id: 1,
    uri: require('../../../../assets/vegeta/vegeta1.jpg'),
  },
  {
    id: 2,
    uri: require('../../../../assets/vegeta/vegeta2.webp'),
  },
  {
    id: 3,
    uri: require('../../../../assets/vegeta/vegeta3.jpg'),
  },
];

export const CarouselGallery = () => {
  const { styles } = useStyles(stylesheet);
  const width = UnistylesRuntime.screen.width;
  const height = UnistylesRuntime.screen.height;
  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <Bleed space={8} flex="fluid" backgroundColor="transparent">
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={height / 2.5}
        pagingEnabled={true}
        // mode="parallax"
        data={images}
        scrollAnimationDuration={1000}
        snapEnabled={true}
        onProgressChange={(_offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }) => (
          <Box flex="fluid">
            <LocalImage source={item.uri} style={styles.image} />
          </Box>
        )}
      />
      <FloatBox bottom={20} left="50%" right="50%">
        <Pagination progress={progress} data={images} onPress={onPressPagination} />
      </FloatBox>
    </Bleed>
  );
};

const stylesheet = createStyleSheet((_theme) => ({
  container: {
    flex: 1,
    backgroundColor: '#181A1E',
  },

  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
}));
