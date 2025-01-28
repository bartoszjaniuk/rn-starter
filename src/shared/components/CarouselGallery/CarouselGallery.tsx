import * as React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';

import { Bleed, Box, FloatBox } from '@grapp/stacks';

import { useAuth } from 'src/providers/AuthContext';

import { Pagination } from './components/Pagination';

const mock = [
  {
    id: '1',
    uri: 'https://avatar.iran.liara.run/public/1',
  },
  {
    id: '2',
    uri: 'https://avatar.iran.liara.run/public/2',
  },
  {
    id: '3',
    uri: 'https://avatar.iran.liara.run/public/3',
  },
];

type Props = {
  images?: {
    id: string;
    uri: string;
  }[];
};

export const CarouselGallery = (props: Props) => {
  const { images = mock } = props;
  const { session } = useAuth();

  const JWT = `Bearer ${session}`;

  const { styles } = useStyles(stylesheet);
  const width = UnistylesRuntime.screen.width;
  const height = UnistylesRuntime.screen.height;
  const progress = useSharedValue<number>(0);

  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };
  const data = images.length > 0 ? images : mock;

  return (
    <Bleed space={8} flex="fluid" backgroundColor="transparent">
      <Carousel
        ref={ref}
        loop={true}
        width={width}
        height={height / 2.5}
        pagingEnabled={true}
        data={data}
        scrollAnimationDuration={1000}
        snapEnabled={true}
        onProgressChange={(_offsetProgress, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }) => (
          <Box flex="fluid">
            <Image
              style={styles.image}
              source={{
                uri: item.uri,
                headers: { Authorization: JWT },
              }}
            />
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
