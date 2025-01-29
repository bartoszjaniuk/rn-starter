import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

import { LinearGradient } from 'expo-linear-gradient';
import { StatusBarStyle, setStatusBarBackgroundColor, setStatusBarStyle } from 'expo-status-bar';

import { Portal } from '@gorhom/portal';
import { Box, ColumnsProps, FloatBox, ResponsiveProp, RowsProps, useResponsiveProp } from '@grapp/stacks';
import { G } from '@mobily/ts-belt';
import { type BottomTabHeaderProps, type BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { type NativeStackHeaderProps } from '@react-navigation/native-stack';

import { platform } from 'src/core';
import { useFocusEffect, useLazy, usePreventBack } from 'src/shared/hooks';

import { BottomTabBar } from './BottomTabBar';
import { Content } from './Content';
import { FlatList } from './FlatList';
import { Footer } from './Footer';
import { Header, HeaderHostElement } from './Header';
import { Layout } from './Layout';
import { Navigator } from './Navigator';
import { ScrollView } from './ScrollView';
import { Section } from './Section';

import { useLayout, useScreenAnimatedHeader, useScreenHeader } from '../hooks';
import { HeaderProps, HeaderProvider, ScreenProvider, useScreen, useTabs } from '../providers';
import { FooterProvider } from '../providers/FooterProvider';
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
  HeaderComponent?: React.ReactNode;
};

type LayoutProps = Omit<ColumnsProps | RowsProps, 'alignX' | 'alignY' | 'ref'>;

export const Screen = (props: Props) => {
  const {
    children,
    paddingX = 4,
    backgroundColor = '#181A1E',
    topInset,
    bottomInset,
    columns = 1,
    statusBarStyle = 'light',
    canGoBack = true,
    navigationBarBackgroundColor = '#181A1E',
    HeaderComponent,
    ...rest
  } = props;

  const [footerHeight, setFooterHeight] = React.useState<number | undefined>(undefined);

  const headerConfig = getHeaderProps(HeaderComponent);
  const [headerHeight, setHeaderHeight] = React.useState(0);
  const [headerProps, setHeaderProps] = React.useState<HeaderProps>(headerConfig);

  const { insets } = useLayout();

  const navigation = useNavigation<BottomTabNavigationProp<BottomTabHeaderProps | NativeStackHeaderProps>>();
  const resolveResponsiveProp = useResponsiveProp();

  const handleFooterLayout = React.useCallback((event: LayoutChangeEvent) => {
    setFooterHeight(event.nativeEvent.layout.height);
  }, []);
  const handleHeaderLayout = React.useCallback((event: LayoutChangeEvent) => {
    setHeaderHeight(event.nativeEvent.layout.height);
  }, []);

  const headerPortalName = useLazy(makeRandomString);
  const scrollOffsetY = useSharedValue(0);

  const themeNavigationBarBackgroundColor = navigationBarBackgroundColor;

  const paddingBottom = (resolveResponsiveProp(bottomInset) ?? insets.stacks.bottom) + (platform.isAndroid ? 1 : 0); // MARK: Globally increase bottom padding.

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
    <Box flex="fluid" backgroundColor={backgroundColor}>
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
          <FloatBox height="100%" top={0} left={0} right={0} bottom={0} backgroundColor="#181A1E">
            <LinearGradient colors={['#181A1E', '#181A1E']} start={[0, 0]} end={[0, 1]} style={{ flex: 1 }} />
            <LinearGradient colors={['#2E2E35', '#191A1E']} start={[0, 1]} end={[0, 0]} style={{ flex: 1 }} />
          </FloatBox>
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
            <FooterProvider height={footerHeight} onLayout={handleFooterLayout}>
              {children}
            </FooterProvider>
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
Screen.Navigator = Navigator;
Screen.Section = Section;
Screen.Footer = Footer;
Screen.Content = Content;
Screen.ScrollView = ScrollView;
Screen.FlatList = FlatList;
Screen.BottomTabBar = BottomTabBar;
Header.Host = HeaderHostElement;
