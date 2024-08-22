import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const Icon = (props: SvgProps) => (
  <Svg width={24} height={12} viewBox="0 0 24 12" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 7.50006L10.0854 7.50006L10.0854 11.8229L-2.54523e-07 6.00006L10.0854 0.177245L10.0854 4.50006L24 4.50006L24 7.50006Z"
      fill="white"
    />
  </Svg>
);
