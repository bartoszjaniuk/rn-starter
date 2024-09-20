import * as React from 'react';
import { type FlatListProps } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import Animated, { ScrollHandlerProcessed, SharedValue } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Row, type RowProps, useResponsiveProp, useSpacingHelpers } from '@grapp/stacks';

import { platform } from 'src/core/utils';

// import { QueryRefreshControl } from '@qiwa-mobile/core/hooks';
import { useScreen, useTabs } from '../providers';

type Props<T> = RowProps &
  Pick<
    FlatListProps<T>,
    | 'renderItem'
    | 'ItemSeparatorComponent'
    | 'ListEmptyComponent'
    | 'ListFooterComponent'
    | 'ListHeaderComponent'
    | 'keyExtractor'
    | 'onRefresh'
    | 'onEndReached'
    | 'contentContainerStyle'
    | 'keyboardDismissMode'
  > & {
    refreshControlOffset?: number;
    // refreshControl?: QueryRefreshControl;
    data: T[];
    endReachedThreshold?: number;
    onScroll?: ScrollHandlerProcessed;
    numColumns?: number | (number & SharedValue<number | undefined>) | undefined;
  };

export const FlatList = Row.from(<T,>(props: Props<T>) => {
  const {
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingLeft,
    paddingBottom,
    paddingStart,
    paddingEnd,
    flex = 'fluid',
    data,
    keyboardDismissMode,
    renderItem,
    ItemSeparatorComponent,
    ListEmptyComponent,
    ListFooterComponent,
    ListHeaderComponent,
    keyExtractor,
    endReachedThreshold,
    onEndReached,
    contentContainerStyle,
    onScroll,
    onLayout,
    numColumns,
    // refreshControl,
    // refreshControlOffset,
    ...rest
  } = props;

  const { styles } = useStyles(stylesheet);
  const resolveResponsiveProp = useResponsiveProp();

  const { paddingX: defaultPaddingX } = useScreen();
  const { multiply } = useSpacingHelpers();

  //   const isRefreshable = typeof refreshControl !== 'undefined';

  const defaultPadding = multiply(resolveResponsiveProp(padding));
  const defaultPaddingVertical = multiply(resolveResponsiveProp(paddingY));
  const defaultPaddingTop = defaultPadding ?? defaultPaddingVertical ?? multiply(resolveResponsiveProp(paddingTop));

  const { isEnabled, tabBarHeight } = useTabs();

  //   const defaultRefreshControl = refreshControl ?? {
  //     source: Wave.fromValue(false),
  //     refresh: undefined,
  //   };

  //   const isRefreshing = Wave.useSourceState(defaultRefreshControl.source, false);

  const topOffset = platform.isAndroid ? tabBarHeight : 0;
  const Component = isEnabled ? Tabs.FlatList : Animated.FlatList;

  return (
    <Box flex={flex} onLayout={onLayout} {...rest}>
      <Component
        numColumns={numColumns}
        renderItem={renderItem}
        keyboardDismissMode={keyboardDismissMode}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={keyExtractor}
        // onRefresh={defaultRefreshControl.refresh}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
        onEndReachedThreshold={endReachedThreshold}
        onEndReached={onEndReached}
        onScroll={onScroll}
        nestedScrollEnabled={true}
        data={data}
        // refreshing={isRefreshing}
        // refreshControl={
        //   isRefreshable ? (
        //     <RefreshControl
        //       refreshing={isRefreshing}
        //       onRefresh={refreshControl.refresh}
        //       progressViewOffset={refreshControlOffset ? multiply(refreshControlOffset) : defaultPaddingTop}
        //       tintColor={ColorVariants.BRAND_300}
        //       colors={[ColorVariants.BRAND_300]}
        //       style={{ backgroundColor: ColorVariants.GRAYSCALE_100 }}
        //     />
        //   ) : undefined
        // }
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContainer,
          {
            padding: defaultPadding,
            paddingHorizontal: multiply(resolveResponsiveProp(paddingX ?? defaultPaddingX)),
            paddingVertical: defaultPaddingVertical,
            paddingTop: isEnabled ? (defaultPaddingTop ?? 0) + topOffset : defaultPaddingTop,
            paddingBottom: multiply(resolveResponsiveProp(paddingBottom)),
            paddingLeft: multiply(resolveResponsiveProp(paddingLeft)),
            paddingRight: multiply(resolveResponsiveProp(paddingRight)),
            paddingEnd: multiply(resolveResponsiveProp(paddingEnd)),
            paddingStart: multiply(resolveResponsiveProp(paddingStart)),
          },
          contentContainerStyle,
        ]}
      />
    </Box>
  );
});

const stylesheet = createStyleSheet((_theme) => {
  return {
    scrollContainer: {
      flexGrow: 1,
    },
  };
});
