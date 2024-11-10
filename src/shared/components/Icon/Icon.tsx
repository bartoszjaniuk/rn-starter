import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useStyles } from 'react-native-unistyles';

import { IconName, icons } from './icons';

import { ColorKeys } from '../Text/Text.types';

type Props = {
  name: IconName;
  svgProps?: SvgProps;
  color?: ColorKeys;
  style?: StyleProp<ViewStyle>;
};

export const Icon = (props: Props) => {
  const { theme } = useStyles();
  const { svgProps, name, style, color = 'disabled' } = props;

  const SvgIcon = icons[name];

  if (!SvgIcon) {
    console.warn(`Icon with name "${name}" does not exist.`);
    return null;
  }

  return <SvgIcon style={style} fill={theme.colors[color]} color={theme.colors[color]} {...svgProps} />;
};
