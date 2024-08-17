import * as React from 'react';
import { Platform, RefreshControl } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { AnimatedRef, ScrollHandlerProcessed } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, type ResponsiveProp, Row, type RowProps, useResponsiveProp, useSpacingHelpers } from '@grapp/stacks';
// import { QueryRefreshControl } from '@qiwa-mobile/core/hooks';
import { useIsFocused } from '@react-navigation/native';

import { useLayout } from '../hooks';
import { useScreen, useTabs } from '../providers';

type AnimatedScrollViewProps = React.ComponentProps<typeof Animated.ScrollView>;

type Props = RowProps &
  Pick<
    AnimatedScrollViewProps,
    'contentContainerStyle' | 'alwaysBounceVertical' | 'alwaysBounceHorizontal' | 'onScroll' | 'onContentSizeChange'
  > & {
    isScrollEnabled?: boolean;
    refreshControlOffset?: number;
    // refreshControl?: QueryRefreshControl;
    isHorizontal?: ResponsiveProp<boolean>;
    onScroll?: ScrollHandlerProcessed<any>;
    scrollRef?: AnimatedRef<Animated.ScrollView>;
    WrapperComponent?: (props: RowProps) => JSX.Element;
  };

const AnimatedKeyboardAwareScrollView = KeyboardAwareScrollView as React.FC<
  Pick<React.ComponentProps<typeof KeyboardAwareScrollView>, 'enabled' | 'bottomOffset'> &
    React.ComponentProps<typeof Animated.ScrollView>
>;

export const ScrollView = Row.from((props: Props) => {
  const {
    children,
    contentContainerStyle,
    flex = 'fluid',
    alignX,
    alignY,
    isHorizontal,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingLeft,
    paddingBottom,
    paddingStart,
    paddingEnd,
    alwaysBounceVertical = false,
    alwaysBounceHorizontal = false,
    onScroll,
    scrollRef,
    WrapperComponent = Box,
    onLayout,
    // refreshControl,
    // refreshControlOffset,
    isScrollEnabled,
    ...rest
  } = props;
  const { paddingX: defaultPaddingX } = useScreen();
  const { multiply } = useSpacingHelpers();

  const resolveResponsiveProp = useResponsiveProp();

  const isFocused = useIsFocused();

  const { styles } = useStyles(stylesheet, {
    alignItems: resolveResponsiveProp(alignX),
    justifyContent: resolveResponsiveProp(alignY),
  });

  //   const isRefreshable = typeof refreshControl !== 'undefined';
  const defaultPadding = multiply(resolveResponsiveProp(padding));
  const defaultPaddingVertical = multiply(resolveResponsiveProp(paddingY));
  const defaultPaddingTop = defaultPadding ?? defaultPaddingVertical ?? multiply(resolveResponsiveProp(paddingTop));

  const { insets } = useLayout();

  const { isEnabled, tabBarHeight } = useTabs();

  //   const defaultRefreshControl = refreshControl ?? {
  //     source: Wave.fromValue(false),
  //     refresh: F.ignore,
  //   };

  //   const isRefreshing = Wave.useSourceState(defaultRefreshControl.source, false);
  const bottomOffset = insets.bottom + insets.top;
  const topOffset = Platform.OS === 'android' ? tabBarHeight : 0;

  const Component = isEnabled ? Tabs.ScrollView : AnimatedKeyboardAwareScrollView;

  return (
    <WrapperComponent flex={flex} {...rest}>
      <Component
        enabled={isFocused}
        onLayout={onLayout}
        ref={scrollRef}
        bottomOffset={bottomOffset}
        onScroll={onScroll}
        scrollEventThrottle={16}
        alwaysBounceVertical={alwaysBounceVertical as boolean}
        alwaysBounceHorizontal={alwaysBounceHorizontal as boolean}
        horizontal={resolveResponsiveProp(isHorizontal)}
        scrollEnabled={isScrollEnabled}
        // refreshControl={
        //   isRefreshable ? (
        //     <RefreshControl
        //       refreshing={isRefreshing}
        //       onRefresh={refreshControl.refresh}
        //       progressViewOffset={refreshControlOffset ? multiply(refreshControlOffset) : defaultPaddingTop}
        //       tintColor={ColorVariants.BRAND_300}
        //       colors={[ColorVariants.BRAND_300]}
        //       style={styles.refreshControl}
        //     />
        //   ) : undefined
        // }
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
      >
        {children}
      </Component>
    </WrapperComponent>
  );
});

const stylesheet = createStyleSheet((_) => {
  return {
    scrollContainer: {
      flexGrow: 1,
      variants: {
        alignItems: {
          left: {
            alignItems: 'flex-start',
          },
          center: {
            alignItems: 'center',
          },
          right: {
            alignItems: 'flex-end',
          },
          stretch: {
            alignItems: 'stretch',
          },
          top: {
            alignItems: 'flex-start',
          },
          bottom: {
            alignItems: 'flex-end',
          },
          between: undefined!,
          around: undefined!,
          evenly: undefined!,
        },
        justifyContent: {
          top: {
            justifyContent: 'flex-start',
          },
          center: {
            justifyContent: 'center',
          },
          bottom: {
            justifyContent: 'flex-end',
          },
          stretch: undefined!,
          left: {
            justifyContent: 'flex-start',
          },
          right: {
            justifyContent: 'flex-end',
          },
          between: {
            justifyContent: 'space-between',
          },
          around: {
            justifyContent: 'space-around',
          },
          evenly: {
            justifyContent: 'space-evenly',
          },
        },
      },
    },
    // refreshControl: {
    //   backgroundColor: theme.colors.grayscale_100,
    // },
  };
});
