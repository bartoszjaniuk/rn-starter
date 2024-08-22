// TODO: TEMPORARY
import * as React from 'react';
import { Image, ListRenderItem, Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Box, FloatBox, Stack } from '@grapp/stacks';

import { Screen } from 'src/screen';
import { Button } from 'src/shared/components/Button';

const data = [
  {
    id: '1',
    name: 'Bartosz',
  },
  {
    id: '2',
    name: 'Janusz',
  },
  {
    id: '3',
    name: 'Tymek',
  },
];

const AnotherComponent = () => {
  // const scrollHandler = Screen.useAnimatedHeader();

  // const keyExtractor = React.useCallback((item: { id: string; name: string }) => {
  //   return item.id;
  // }, []);

  // const renderItem = React.useCallback<ListRenderItem<typeof data>>((data) => {
  //   return (
  // <Box style={{ backgroundColor: '#f8f8f8' }}>
  //   <Text>{data.item.name}</Text>
  // </Box>
  //   );
  // }, []);
  // Screen.useHeader({
  //   renderLeft: () => {
  //     return (
  //       <Screen.Header.Right>
  //         <Screen.Header.GoBackButton variant="primary" />
  //       </Screen.Header.Right>
  //     );
  //   },
  // });

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content alignX="center" alignY="center">
          <Image source={require('../../assets/fitAppkaLogo.png')} />
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer>
        <Stack space={4} paddingBottom={10}>
          <Button>Logowanie</Button>
          <Button>Rejestracja</Button>
        </Stack>
      </Screen.Footer>
    </>
  );
};

export const AuthorizedNavigator = () => {
  return (
    <Screen
      statusBarStyle="light"
      BackgroundComponent={
        <LinearGradient
          // Background Linear Gradient
          colors={['#2E2E35', '#191A1E']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}
        />
      }
    >
      <AnotherComponent />
    </Screen>
  );
};
