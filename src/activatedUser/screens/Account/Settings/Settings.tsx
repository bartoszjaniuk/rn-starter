import React from 'react';
import { FlatList } from 'react-native-gesture-handler';

import { Box, Stack } from '@grapp/stacks';

import { useAuth } from 'src/providers/AuthContext';
import { Screen, ScrollView } from 'src/screen';
import { Text } from 'src/shared';
import { LocalImage } from 'src/shared/components/LocalImage/LocalImage';

import { SettingsOption } from './components/SettingsOption';

const settings = ({ onLogout }: { onLogout?: VoidFunction }): SettingsOption[] => {
  return [
    {
      title: 'Edytuj zdjęcia',
      icon: 'photo',
      color: 'primary',
      onPress: () => {},
    },
    {
      title: 'Edytuj informacje na profilu',
      icon: 'profile',
      color: 'primary',
      onPress: () => {},
    },
    {
      title: 'Edytuj rodzaj treningu',
      icon: 'muscule',
      color: 'primary',
      onPress: () => {},
    },
    {
      title: 'Usuń konto',
      icon: 'bin',
      color: 'error',
      onPress: () => {},
    },
    {
      title: 'Wyloguj',
      icon: 'bin',
      color: 'error',
      onPress: () => {
        console.log('jebut');
        onLogout?.();
      },
    },
  ];
};

const ProfileAvatar = ({ src }: { src?: string }) => {
  return (
    <Box>
      <LocalImage
        style={{ borderRadius: 100 }}
        width={150}
        source={require('../../../../../assets/vegeta/vegeta1.jpg')}
      />
    </Box>
  );
};

const Content = () => {
  const { isLoading, onLogout } = useAuth();

  const data = settings({ onLogout });
  console.log(data);
  return (
    <ScrollView>
      <Stack align="center" marginBottom={10}>
        <Box alignX="center" marginBottom={4}>
          <ProfileAvatar />
        </Box>
        <Text size="sm" fontWeight="700">
          Vegeta
        </Text>
      </Stack>
      <FlatList
        contentContainerStyle={{ gap: 16 }}
        scrollEnabled={false}
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <SettingsOption title={item.title} icon={item.icon} color={item.color} onPress={item.onPress} />
        )}
      />
    </ScrollView>
  );
};

export const AccountSettings = () => {
  return (
    <Screen
      backgroundColor="black"
      HeaderComponent={
        <Screen.Header
          variant="transparent"
          title="Edycja profilu"
          hasBackButton={true}
          // hasCloseButton={true}
          //   as={Screen.Header.Animated}
        />
      }
    >
      <Content />
    </Screen>
  );
};
