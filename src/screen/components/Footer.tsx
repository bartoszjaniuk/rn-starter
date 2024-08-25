import * as React from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Bleed, Box, Row, type RowProps } from '@grapp/stacks';
// import * as Wave from '@grapp/wave';
// import { useServices } from '@qiwa-mobile/core/hooks';
// import { platform } from '@qiwa-mobile/core/utils';
import { useIsFocused } from '@react-navigation/native';

import { useLayout } from '../hooks';
import { useScreen } from '../providers';

type Props = Omit<RowProps, 'flex' | 'paddingBottom'> & {
  variant?: 'rounded' | 'transparent';
  isSticky?: boolean;
};

export const Footer = Row.from((props: Props) => {
  const { children, paddingX, paddingTop = 4, style, variant = 'rounded', isSticky = false, ...rest } = props;

  const { paddingX: defaultPaddingX, backgroundColor } = useScreen();

  const { styles } = useStyles(stylesheet, {
    variant,
  });

  const isFocused = useIsFocused();

  //   const isKeyboardVisible = Wave.useSourceState(services.device.isKeyboardVisible(), false);
  const { header, insets } = useLayout();

  //   const isAndroidWorkaround = platform.isAndroid ? isKeyboardVisible : true;
  //   const isEnabled = isSticky && isFocused && isAndroidWorkaround;
  const isEnabled = isSticky && isFocused;
  const paddingBottom = insets.stacks.bottom || 4;
  const bottomGap = insets.stacks.bottom;
  const keyboardVerticalOffset = header.height + (insets.stacks.bottom === 0 ? 0 : 16);

  return (
    <KeyboardAvoidingView enabled={isEnabled} behavior="position" keyboardVerticalOffset={keyboardVerticalOffset}>
      <Bleed bottom={bottomGap} style={[styles.container, style]} backgroundColor={backgroundColor}>
        <Box
          {...rest}
          paddingTop={paddingTop}
          paddingBottom={paddingBottom}
          paddingX={paddingX ?? defaultPaddingX}
          flex="content"
        >
          {children}
        </Box>
      </Bleed>
    </KeyboardAvoidingView>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    variants: {
      variant: {
        rounded: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: 'transparent',
          shadowColor: '#101828',
          shadowOffset: {
            width: 0,
            height: -8,
          },
          shadowOpacity: 0.14,
          shadowRadius: 22,
        },
        transparent: undefined!,
      },
    },
  },
}));
