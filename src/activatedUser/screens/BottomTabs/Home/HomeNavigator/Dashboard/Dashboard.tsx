import * as React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Image } from 'expo-image';

import { FloatBox, Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { useAuth } from 'src/providers/AuthContext';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';

import * as route from '../../../../../navigation/routes';

const Card = ({ text, source, onPress }: { text: string; source: string; onPress?: () => void }) => {
  const { styles } = useStyles(stylesheet);

  return (
    <PressableScale style={styles.card} onPress={onPress}>
      <Image contentFit="cover" style={{ width: '100%', height: '100%' }} source={source} />
      <FloatBox padding={2} borderRadius={10}>
        <Text color="white" size="lg" fontWeight="900">
          {text}
        </Text>
      </FloatBox>
    </PressableScale>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.snacks,
    padding: 3,
    borderRadius: 10,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Content = () => {
  const auth = useAuth();
  return (
    <Screen.ScrollView>
      <Stack space={4}>
        <Text color="primary" size="lg" fontWeight="700">
          Witaj, {auth.user?.name?.split(' ')[0]}
        </Text>

        {auth.user?.role === 'trainee' ? (
          <Card
            text="Zaktualizuj swoje wymiary"
            source={require('../../../../../../../assets/images/pexel1.jpg')}
            onPress={() => goTo(route.toHomeUpdateParameters)}
          />
        ) : null}
        <Card
          text="Przejdź do treningów"
          source={require('../../../../../../../assets/images/pexel2.jpg')}
          onPress={() => goTo(route.toHomeTrainingList)}
        />
        {auth.user?.role === 'trainee' ? (
          <Card
            text="Wyszukaj trenera"
            source={require('../../../../../../../assets/images/pexel3.jpg')}
            onPress={() => goTo(route.toSearchTrainersList)}
          />
        ) : null}
      </Stack>
    </Screen.ScrollView>
  );
};

export const HomeDashboard = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />}>
      <Content />
    </Screen>
  );
};
