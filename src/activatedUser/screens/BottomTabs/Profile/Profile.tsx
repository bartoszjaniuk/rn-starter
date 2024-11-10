import React from 'react';
import { FlatList } from 'react-native';

import { Stack } from '@grapp/stacks';

import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { PressableScale, Text } from 'src/shared';
import { CarouselGallery } from 'src/shared/components/CarouselGallery';

import { Snack } from './components/Snack';
import { TrainingSnack } from './components/TrainingSnack';

import * as route from '../../../navigation/routes';

const parameters = [
  {
    title: 'Klatka',
    value: '135cm',
  },
  {
    title: 'Biceps',
    value: '42cm',
  },
  {
    title: 'Talia',
    value: '86cm',
  },
  {
    title: 'Biodra',
    value: '86cm',
  },
  {
    title: 'Udo',
    value: '55cm',
  },
  {
    title: 'Łydka',
    value: '19cm',
  },
  {
    title: 'Wzrost',
    value: '180cm',
  },
  {
    title: 'Waga',
    value: '90kg',
  },
];

const Content = () => {
  return (
    <Screen.ScrollView backgroundColor="transparent">
      <Screen.Content>
        <Stack space={4}>
          <CarouselGallery />
          <Stack paddingTop={6}>
            <Text fontWeight="700" size="xxl">
              Vegeta
            </Text>
            <Text fontWeight="400" size="sm">
              Planeta Vegeta
            </Text>
          </Stack>
          <FlatList
            scrollEnabled={false}
            numColumns={3}
            contentContainerStyle={{ gap: 8 }}
            columnWrapperStyle={{ gap: 8 }}
            data={parameters}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <Snack value={{ title: item.title, value: item.value }} />}
          />
          <Stack space={4}>
            <Text fontWeight="700" size="sm">
              Interesuje mnie trening:
            </Text>
            <FlatList
              scrollEnabled={false}
              numColumns={3}
              contentContainerStyle={{ gap: 8 }}
              columnWrapperStyle={{ gap: 8 }}
              data={['Joga', 'Sylwetkowy', 'Kalistenika']}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <TrainingSnack title={item} />}
            />
          </Stack>
        </Stack>
      </Screen.Content>
    </Screen.ScrollView>
  );
};

export const BottomTabsProfile = () => {
  const handleEditProfile = () => goTo(route.toAccountSettings);
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="transparent">
          <Screen.Header.Right alignY="center" paddingTop={2.5}>
            <PressableScale onPress={handleEditProfile}>
              <Text fontWeight="700" size="xs">
                Edytuj profil
              </Text>
            </PressableScale>
          </Screen.Header.Right>
        </Screen.Header>
      }
      statusBarStyle="light"
    >
      <Content />
    </Screen>
  );
};
