import { Image } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { ActivityIndicator, Icon, PressableScale } from 'src/shared';

type Props = {
  isPrimary?: boolean;
  id: string;
  onPress: (index: number, shouldUseLibrary?: boolean, assetId?: string | null) => Promise<void>;
  uri?: string;
  assetId?: string | null;
  index: number;
  isLoading?: boolean;
};

export const ImageFile = (props: Props) => {
  const { isPrimary = false, onPress, uri, assetId, index, isLoading } = props;
  const { styles } = useStyles(stylesheet, { isPrimary });
  const handlePress = () => onPress(index, true, assetId);

  return (
    <PressableScale style={styles.card} onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator />
      ) : uri ? (
        <Image width={isPrimary ? 160 : 162} height={isPrimary ? 149 : 151} source={{ uri }} />
      ) : (
        <Icon name="plus" color="primary" />
      )}
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
