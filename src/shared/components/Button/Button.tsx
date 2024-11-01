import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Inline } from '@grapp/stacks';

import { ActivityIndicator } from '../ActivityIndicator';
// import { F } from '@mobily/ts-belt';
// import { match } from 'ts-pattern';
import { PressableScale } from '../Pressable';
import { Text } from '../Text';
import { ColorKeys } from '../Text/Text.types';

type Props = {
  variant?: 'primary' | 'danger' | 'inverted';
  size?: 'small' | 'large';
  isDisabled?: boolean;
  children: string;
  onPress?: () => void;
  isGhost?: boolean;
  isLoading?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  testID?: string;
  color?: ColorKeys;
};

export const Button = (props: Props) => {
  const {
    children,
    onPress,
    variant = 'primary',
    size = 'large',
    isGhost = false,
    isDisabled = false,
    isLoading = false,
    textAlign = 'center',
    testID,
    color,
  } = props;

  const shouldDisplayDisabled = isDisabled || isLoading;

  const { styles } = useStyles(stylesheet, {
    variant,
    size,
    isGhost,
    isDisabled: shouldDisplayDisabled,
  });

  return (
    <PressableScale testID={testID} isDisabled={shouldDisplayDisabled} onPress={onPress} activeScale={0.97}>
      <Box borderRadius={48} alignX={textAlign} alignY="center" direction="row" style={styles.view}>
        <Inline space={3} paddingX={4}>
          <Text fontWeight="700" size="sm" color={color ? color : shouldDisplayDisabled ? 'disabled' : 'typography'}>
            {children}
          </Text>
          {isLoading ? <ActivityIndicator color="#667085" size={14} /> : null}
        </Inline>
      </Box>
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((theme) => {
  return {
    view: {
      variants: {
        variant: {
          primary: {
            backgroundColor: theme.colors.primary,
          },
          danger: {
            backgroundColor: '#E83326',
          },
          inverted: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.colors.primary,
            color: theme.colors.primary,
          },
        },
        size: {
          large: {
            height: 48,
          },
          small: {
            height: 40,
          },
        },
        isGhost: {
          true: {
            backgroundColor: undefined,
            borderWidth: 1,
            borderColor: '#D0D5DD',
          },
        },
        isDisabled: {
          true: {
            backgroundColor: '#EEEFF2',
          },
        },
      },
    },
  };
});
