/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { PaginationItem } from './PaginationItem';

export type BasicProps<T extends {} = {}> = {
  progress: SharedValue<number>;
  data: Array<T>;
  renderItem?: (item: T, index: number) => React.ReactNode;
  size?: number;
  onPress?: (index: number) => void;
};

export const Pagination = <T extends {}>(props: BasicProps<T>) => {
  const { styles } = useStyles(stylesheet);

  const { progress, data, renderItem, onPress } = props;

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <PaginationItem
            key={index}
            index={index}
            count={data.length}
            dotStyle={styles.dotStyle}
            animValue={progress}
            horizontal={true}
            activeDotStyle={styles.activeDotStyle}
            onPress={() => onPress?.(index)}
          >
            {renderItem?.(item, index)}
          </PaginationItem>
        );
      })}
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  activeDotStyle: {
    backgroundColor: theme.colors.primary,
  },
  dotStyle: {
    backgroundColor: theme.colors.gray,
  },
}));
