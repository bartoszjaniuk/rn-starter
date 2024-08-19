import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

// import { Color } from 'react-native-unistyles/lib/typescript/src/types';
import { StatusBar, StatusBarStyle, setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';

import { Portal } from '@gorhom/portal';
import { Box, ColumnsProps, ResponsiveProp, RowsProps, useResponsiveProp } from '@grapp/stacks';
import { G } from '@mobily/ts-belt';
import { type BottomTabHeaderProps, type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackHeaderProps } from '@react-navigation/native-stack';

import { platform } from 'src/core';
import { useFocusEffect, useLazy, usePreventBack } from 'src/shared/hooks';

import { Content } from './Content';
import { FlatList } from './FlatList';
import { Header } from './Header';
import { Layout } from './Layout';
import { ScrollView } from './ScrollView';

import { useLayout, useScreenAnimatedHeader, useScreenHeader } from '../hooks';
import { HeaderProps, HeaderProvider, ScreenProvider, useScreen, useTabs } from '../providers';
import { getHeaderProps, makeRandomString, setNavigationBarBackgroundColor } from '../utils';

type Props = Omit<
  RowsProps,
  'paddingTop' | 'paddingBottom' | 'paddingRight' | 'paddingLeft' | 'alignX' | 'alignY' | 'backgroundColor'
> & {
  topInset?: ResponsiveProp<number>;
  bottomInset?: ResponsiveProp<number>;
  columns?: ResponsiveProp<number>;
  statusBarStyle?: StatusBarStyle;
  navigationBarBackgroundColor?: string;
  canGoBack?: boolean;
  backgroundColor?: string;
  BackgroundComponent?: React.ReactNode;
  HeaderComponent?: React.ReactNode;
};

type LayoutProps = Omit<ColumnsProps | RowsProps, 'alignX' | 'alignY' | 'ref'>;

export const Screen = (props: Props) => {
  const {
    children,
    paddingX = 4,
    backgroundColor = '#f8f8f8',
    topInset,
    bottomInset,
    columns = 1,
    statusBarStyle = 'dark',
    canGoBack = true,
    navigationBarBackgroundColor = '#fafafafa',
    BackgroundComponent,
    HeaderComponent,
    ...rest
  } = props;

  // const { theme } = useStyles();
  const { insets } = useLayout();

  const navigation = useNavigation<BottomTabNavigationProp<BottomTabHeaderProps | NativeStackHeaderProps>>();
  const resolveResponsiveProp = useResponsiveProp();

  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [headerProps, setHeaderProps] = React.useState<HeaderProps>(getHeaderProps(HeaderComponent));
  const handleHeaderLayout = React.useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const headerPortalName = useLazy(makeRandomString);
  //   const headerSubject = Wave.useBehaviorSubject<HeaderProps>(headerProps);
  const scrollOffsetY = useSharedValue(0);

  const themeNavigationBarBackgroundColor = navigationBarBackgroundColor;
  // const themeNavigationBarBackgroundColor = navigationBarBackgroundColor
  //   ? theme.colors[navigationBarBackgroundColor]
  //   : themeBackgroundColor;

  const paddingBottom = resolveResponsiveProp(bottomInset) ?? insets.stacks.bottom;
  const paddingTop =
    G.isNullable(HeaderComponent) || headerProps.variant === 'hosted'
      ? (resolveResponsiveProp(topInset) ?? insets.stacks.top)
      : 0;
  const numOfColumns = resolveResponsiveProp(columns);
  const isInsideBottomTabNavigator = typeof navigation.jumpTo === 'function';

  usePreventBack(canGoBack);

  useFocusEffect(
    React.useCallback(() => {
      setStatusBarStyle(statusBarStyle, true);

      if (platform.isAndroid) {
        setNavigationBarBackgroundColor(themeNavigationBarBackgroundColor);
        setStatusBarBackgroundColor('#00000000', false);
      }
    }, [statusBarStyle, themeNavigationBarBackgroundColor]),
  );

  return (
    // <Box flex="fluid" backgroundColor={themeBackgroundColor}>
    <Box flex="fluid" backgroundColor={backgroundColor}>
      {/* <StatusBar style={statusBarStyle} backgroundColor="transparent" translucent={true} /> */}
      <StatusBar style="dark" backgroundColor="transparent" translucent={true} />

      <ScreenProvider
        canGoBack={canGoBack}
        paddingX={paddingX}
        columns={numOfColumns}
        backgroundColor={backgroundColor}
        navigationBarBackgroundColor={themeNavigationBarBackgroundColor}
        scrollOffsetY={scrollOffsetY}
      >
        <HeaderProvider
          headerProps={headerProps}
          height={headerHeight}
          onLayout={handleHeaderLayout}
          portalName={headerPortalName}
          setHeaderProps={setHeaderProps}
        >
          {BackgroundComponent}
          {headerProps.variant === 'hosted' ? (
            <Portal hostName={headerPortalName}>{HeaderComponent}</Portal>
          ) : (
            HeaderComponent
          )}
          <Layout
            {...(rest as LayoutProps)}
            columns={numOfColumns}
            paddingTop={paddingTop}
            paddingBottom={isInsideBottomTabNavigator ? 0 : paddingBottom}
            pointerEvents="box-none"
          >
            {children}
          </Layout>
        </HeaderProvider>
      </ScreenProvider>
    </Box>
  );
};

Screen.useHeader = useScreenHeader;
Screen.useAnimatedHeader = useScreenAnimatedHeader;
Screen.use = useScreen;
Screen.useTabs = useTabs;
Screen.useLayout = useLayout;
// Screen.useLeaveProcess = useLeaveProcess;

Screen.Header = Header;
Screen.Content = Content;
Screen.ScrollView = ScrollView;
Screen.FlatList = FlatList;
