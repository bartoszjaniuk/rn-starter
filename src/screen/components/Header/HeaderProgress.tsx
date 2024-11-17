import * as React from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Box, Column, Columns } from '@grapp/stacks';
import { F } from '@mobily/ts-belt';
import { NavigationState, useNavigation, useRoute } from '@react-navigation/native';
import { useIsMutating } from '@tanstack/react-query';

import { goBack, goTo } from 'src/navigation';
import { WithHeaderProps } from 'src/screen/providers';
import { ProgressBar, Text } from 'src/shared';

import { HeaderCloseButton } from './HeaderButton';
import { HeaderContainer } from './HeaderContainer';
import { HeaderBottomElement, HeaderRightElement } from './HeaderElement';
import { HeaderTitle } from './HeaderTitle';

import { DEFAULT_HEADER_HEIGHT } from '../../utils';

const DEFAULT_HEADER_PROGRESS_HEIGHT = 90;

type NavigationRoute = UnpackArray<NavigationState['routes']>;

type Props = Omit<WithHeaderProps, 'height'>;

export const HeaderProgress = (props: Props) => {
  const { dismissRoute, shouldBlockNavigationWhenMutating } = props;
  const isMutating = useIsMutating();

  const navigation = useNavigation();
  const currentRoute = useRoute();
  const progress = useSharedValue(0);

  const [state, setState] = React.useState<NavigationRoute | null>(null);
  const [progressValue, setProgressValue] = React.useState(0);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', (event) => {
      const path = event.data.state.routes.find((route) => route.key === currentRoute.key);
      if (path?.state) {
        setState(path);
      }
    });

    return () => unsubscribe();
  }, [navigation, currentRoute]);

  React.useEffect(() => {
    if (state) {
      const coerced = F.coerce<Required<NavigationRoute>>(state);
      const { routeNames = [], index = 0 } = coerced.state;
      const current = index + 1;
      const count = routeNames.length;
      progress.value = current / count;
      setProgressValue(current / count);
    }
  }, [progress, state]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${progress.value * 100}%`),
    };
  });

  //   const leaveProcess = Wave.useContextSelector(LeaveProcessContext, F.identity);

  const handleClose = React.useCallback(() => {
    if (isMutating && shouldBlockNavigationWhenMutating) return;
    const actionFn = () => {
      if (dismissRoute) {
        return goTo(dismissRoute);
      }

      goBack();
    };

    // if (leaveProcess.isEntireFormDirty.current) {
    //   return leaveProcess.open(actionFn);
    // }

    actionFn();
  }, [dismissRoute, isMutating, shouldBlockNavigationWhenMutating]);

  return (
    <HeaderContainer
    // height={DEFAULT_HEADER_PROGRESS_HEIGHT}
    // borderColor={borderColor}
    // backgroundColor={backgroundColor}
    // variant="transparent"
    >
      <Box alignY="top">
        <HeaderBottomElement>
          <ProgressBar value={0} style={animatedStyle} />
        </HeaderBottomElement>
        <Columns defaultFlex="content" alignX="between" alignY="center" height={DEFAULT_HEADER_HEIGHT}>
          <Column paddingStart={4}>
            <HeaderRightElement>
              <HeaderCloseButton onPress={handleClose} />
            </HeaderRightElement>
          </Column>
          <Column paddingStart={4}>
            <HeaderRightElement>
              <Text>{Math.floor(progressValue * 100)}%</Text>
            </HeaderRightElement>
          </Column>
        </Columns>
      </Box>
    </HeaderContainer>
  );
};
