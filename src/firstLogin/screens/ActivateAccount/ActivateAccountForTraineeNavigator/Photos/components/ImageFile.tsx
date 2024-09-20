import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { PressableScale } from 'src/shared';

import PlusSvg from '../../../../../../../assets/icons/plus.svg';

type Props = {
  isPrimary?: boolean;
};

export const ImageFile = (props: Props) => {
  const { isPrimary = false } = props;
  const { styles } = useStyles(stylesheet, { isPrimary });
  return (
    <PressableScale style={styles.card}>
      <PlusSvg />
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  card: {
    width: 163,
    height: 152,
    borderRadius: 5,
    backgroundColor: theme.colors.snacks,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      isPrimary: {
        true: {
          borderWidth: 1,
          borderColor: theme.colors.primary,
        },
      },
    },
  },
}));
