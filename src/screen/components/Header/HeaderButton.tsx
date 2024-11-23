import * as React from 'react';
import { I18nManager } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Inline } from '@grapp/stacks';
import { useIsMutating } from '@tanstack/react-query';

import { colord } from 'colord';

import { goBack, goTo } from 'src/navigation';
import { Icon, PressableScale } from 'src/shared';
import { ColorKeys } from 'src/shared/components/Text/Text.types';

import { useHeader, useScreen } from '../../providers';

type Props = {
  onPress: () => void;
  color?: ColorKeys;
  //  TODO:    iconName: IconName;
  iconRotation?: number;
  testID?: string;
  variant?: 'primary' | 'secondary';
  size?: 40 | 44;
  children?: React.ReactNode;
};

type CloseButtonProps = {
  onPress?: () => void;
  route?: Route;
  variant?: Props['variant'];
  shouldBlockNavigation?: boolean;
};

type GoBackButtonProps = Pick<Props, 'variant' | 'children'>;

export const HeaderButton = (props: Props) => {
  const { onPress, color = 'white', iconRotation = 0, testID, variant = 'primary', size = 40 } = props;
  const { styles } = useStyles(stylesheet, {
    variant,
  });

  const content = (
    <>
      {props.children ? (
        <PressableScale testID={testID} onPress={onPress} activeScale={0.94} style={styles.headerButtonWithChildren}>
          <Inline alignY="center" space={2}>
            <Icon name="arrowLeft" color={color} svgProps={{ rotation: iconRotation }} />
            {props.children ? props.children : null}
          </Inline>
        </PressableScale>
      ) : (
        <PressableScale
          testID={testID}
          onPress={onPress}
          activeScale={0.94}
          style={[styles.root, { width: size, height: size, borderRadius: size / 2 }]}
        >
          <Icon name="arrowLeft" color={color} svgProps={{ rotation: iconRotation }} />
        </PressableScale>
      )}
    </>
  );

  return variant === 'secondary' ? <Box>{content}</Box> : content;
};

export const HeaderGoBackButton = (props: GoBackButtonProps) => {
  const { variant, children } = props;
  const { headerProps } = useHeader();
  const isMutating = useIsMutating();

  const handlePress = () => {
    if (isMutating && headerProps.shouldBlockNavigationWhenMutating) return;
    goBack();
  };

  const { backgroundColor: screenBackgroundColor } = useScreen();
  const color = colord(screenBackgroundColor).isDark() ? 'white' : undefined;

  return (
    <HeaderButton
      variant={variant}
      iconRotation={I18nManager.isRTL ? undefined : 180}
      color={color}
      onPress={handlePress}
    >
      {children}
    </HeaderButton>
  );
};

export const HeaderCloseButton = (props: CloseButtonProps) => {
  const { route, onPress, variant } = props;
  const isMutating = useIsMutating();

  const { headerProps } = useHeader();

  const handleClose = React.useCallback(() => {
    if (isMutating && headerProps.shouldBlockNavigationWhenMutating) return;

    if (route) {
      return goTo(route);
    }

    if (onPress) {
      return onPress();
    }

    goBack();
  }, [isMutating, headerProps.shouldBlockNavigationWhenMutating, route, onPress]);

  return <HeaderButton variant={variant} onPress={handleClose} />;
  // return <HeaderButton variant={variant} iconName="closeSmall" onPress={handleClose} />;
};

const stylesheet = createStyleSheet((theme) => {
  return {
    root: {
      justifyContent: 'center',
      alignItems: 'center',
      variants: {
        variant: {
          primary: undefined!,
          secondary: {
            backgroundColor: theme.colors.white,
          },
        },
      },
    },
    headerButtonWithChildren: {
      flex: 1,
      justifyContent: 'center',
    },
  };
});
