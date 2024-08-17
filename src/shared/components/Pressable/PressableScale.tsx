import * as React from 'react';
import {
  type GestureResponderEvent,
  TouchableWithoutFeedback,
  type TouchableWithoutFeedbackProps,
  View,
  type ViewProps,
} from 'react-native';
import Animated, { type WithSpringConfig, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = Omit<TouchableWithoutFeedbackProps, 'disabled'> &
  Partial<Omit<WithSpringConfig, 'mass' | 'overshootClamping'>> & {
    children: React.ReactNode;
    activeScale?: number;
    weight?: 'light' | 'medium' | 'heavy';
    isDisabled?: boolean;
    shouldOvershootClamping?: boolean;
    touchableStyle?: ViewProps['style'];
  };

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

export const PressableScale = (props: Props) => {
  const {
    activeScale = 0.95,
    weight = 'light',
    damping = 10,
    stiffness = 200,
    shouldOvershootClamping = true,
    restSpeedThreshold = 0.001,
    restDisplacementThreshold = 0.001,
    style,
    onPressIn,
    onPressOut,
    delayPressIn = 0,
    isDisabled = false,
    children,
    touchableStyle: animatedStyle,
    ...rest
  } = props;

  const mass = React.useMemo(() => {
    switch (weight) {
      case 'light':
        return 0.15;
      case 'medium':
        return 0.2;
      case 'heavy':
      default:
        return 0.3;
    }
  }, [weight]);

  const isPressedIn = useSharedValue(false);

  const springConfig = React.useMemo(() => {
    return {
      damping,
      mass,
      stiffness,
      overshootClamping: shouldOvershootClamping,
      restSpeedThreshold,
      restDisplacementThreshold,
    };
  }, [damping, mass, shouldOvershootClamping, restDisplacementThreshold, restSpeedThreshold, stiffness]);

  const touchableStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isPressedIn.value ? activeScale : 1, springConfig as WithSpringConfig),
        },
      ],
    };
  });

  const handlePressIn = (event: GestureResponderEvent) => {
    isPressedIn.value = true;
    if (!isDisabled) onPressIn?.(event);
  };
  const handlePressOut = (event: GestureResponderEvent) => {
    isPressedIn.value = false;
    if (!isDisabled) onPressOut?.(event);
  };

  return (
    <AnimatedTouchableWithoutFeedback
      delayPressIn={delayPressIn}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[touchableStyle, animatedStyle]}
      disabled={isDisabled}
      {...rest}
    >
      <View style={style}>{children}</View>
    </AnimatedTouchableWithoutFeedback>
  );
};
