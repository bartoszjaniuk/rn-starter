import { Text } from 'react-native';

import { colord } from 'colord';

import { useScreen } from 'src/screen/providers';

export const HeaderTitle = (props: React.PropsWithChildren) => {
  const { children } = props;

  const { backgroundColor: screenBackgroundColor } = useScreen();
  const textColor = colord(screenBackgroundColor).isDark() ? 'white' : undefined;

  return <Text style={{ color: textColor }}>{children}</Text>;
};
