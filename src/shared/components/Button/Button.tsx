import React from 'react';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Box, Inline } from '@grapp/stacks';

import { ActivityIndicator } from '../ActivityIndicator';
// import { F } from '@mobily/ts-belt';
// import { match } from 'ts-pattern';
import { PressableScale } from '../Pressable';

type Props = {
  variant?: 'primary' | 'danger';
  size?: 'small' | 'large';
  isDisabled?: boolean;
  children: string;
  onPress?: () => void;
  isGhost?: boolean;
  isLoading?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  testID?: string;
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
          <Text style={styles.label}>{children}</Text>
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
    label: {
      fontFamily: 'satoshiBold',
      color: theme.colors.typography,
      // fontWeight: '700',
      variants: {
        size: {
          large: {
            fontSize: 16,
          },
          small: {
            fontSize: 16,
          },
        },
        isRaw: {
          true: {
            color: '#0060FF',
          },
        },
        isDisabled: {
          true: {
            color: '#667085',
          },
        },
      },
    },
    // extraStyle: (variant: Props['variant'], isGhost: boolean, isDisabled: boolean) => {
    //   return match({ variant, isGhost, isDisabled })
    //     .with({ variant: 'primary', isGhost: true, isDisabled: false }, () => {
    //       return {
    //         color: '#274A77',
    //       };
    //     })
    //     .with({ variant: 'danger', isGhost: true, isDisabled: false }, () => {
    //       return {
    //         color: '#E83326',
    //       };
    //     })

    //     .otherwise(F.always({}));
    // },
  };
});
