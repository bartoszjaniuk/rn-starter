import * as React from 'react';
import { I18nManager } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box } from '@grapp/stacks';
import { useIsMutating } from '@tanstack/react-query';

import { colord } from 'colord';

import { goBack, goTo } from 'src/navigation';
import { Icon, PressableScale } from 'src/shared';

import { useHeader, useScreen } from '../../providers';

type Props = {
  onPress: () => void;
  color?: string;
  //  TODO:    iconName: IconName;
  iconRotation?: number;
  testID?: string;
  variant?: 'primary' | 'secondary';
  size?: 40 | 44;
};

type CloseButtonProps = {
  onPress?: () => void;
  route?: Route;
  variant?: Props['variant'];
  shouldBlockNavigation?: boolean;
};

type GoBackButtonProps = Pick<Props, 'variant'>;

export const HeaderButton = (props: Props) => {
  const { onPress, color, iconRotation = 0, testID, variant = 'primary', size = 40 } = props;
  const { styles } = useStyles(stylesheet, {
    variant,
  });

  const content = (
    <PressableScale
      testID={testID}
      onPress={onPress}
      activeScale={0.94}
      style={[styles.root, { width: size, height: size, borderRadius: size / 2 }]}
    >
      {/* <Icon name={iconName} rotation={iconRotation} size={24} color={color} /> */}
      {/* <Image source={require('../../../../assets/images/leftArrow.png')} /> */}
      <Icon />
    </PressableScale>
  );

  return variant === 'secondary' ? <Box>{content}</Box> : content;
};

export const HeaderGoBackButton = (props: GoBackButtonProps) => {
  const { variant } = props;
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
      // iconName="arrow"
      iconRotation={I18nManager.isRTL ? undefined : 180}
      color={color}
      onPress={handlePress}
    />
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
  };
});
