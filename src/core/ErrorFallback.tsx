import React from 'react';
import RNRestart from 'react-native-restart';

import { LinearGradient } from 'expo-linear-gradient';

import { FloatBox, Inline, Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Button, IconWrapper, Text } from 'src/shared';

const Content = () => {
  const handleRestart = () => RNRestart.restart();
  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content paddingTop={60}>
          <Stack space={6} align="center">
            <IconWrapper>
              <Text>❌</Text>
            </IconWrapper>

            <Stack space={6}>
              <Text fontWeight="700" size="xl" align="center">
                Coś poszło nie tak
              </Text>

              <Text fontWeight="400" size="md" align="center">
                Nie mogliśmy poprawnie załadować strony i musimy ponownie uruchomić aplikację. Jeśli problem będzie się
                powtarzał, skontaktuj się z naszym zespołem wsparcia.
              </Text>
            </Stack>
          </Stack>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer alignX="center" marginBottom={10}>
        <Stack space={6}>
          <Button onPress={handleRestart}>Restart aplikacji</Button>
          <Inline space={2}>
            <Text fontWeight="400" size="sm">
              Potrzebujesz pomocy?
            </Text>
            <Text fontWeight="700" size="sm">
              Skontaktuj się z nami
            </Text>
          </Inline>
        </Stack>
      </Screen.Footer>
    </>
  );
};

export const ErrorFallback = () => {
  return (
    <Screen
      statusBarStyle="light"
      BackgroundComponent={
        <FloatBox height="100%" top={0} left={0} right={0} bottom={0} backgroundColor={'#181A1E'}>
          <LinearGradient colors={['#181A1E', '#181A1E']} start={[0, 0]} end={[0, 1]} style={{ flex: 1 }} />
          <LinearGradient colors={['#2E2E35', '#191A1E']} start={[0, 1]} end={[0, 0]} style={{ flex: 1 }} />
        </FloatBox>
      }
    >
      <Content />
    </Screen>
  );
};
