import React from 'react';
import { Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Box, Stack } from '@grapp/stacks';

import { useGetUserInfoQuery } from 'src/api/user/hooks';
import { LoadingScreen } from 'src/core/components/LoadingScreen';
import { useAuth } from 'src/providers/AuthContext';
import { Screen, ScrollView } from 'src/screen';
import { Text, replaceApiHost } from 'src/shared';
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
        console.log('Logout');
        onLogout?.();
      },
    },
  ];
};

const ProfileAvatar = ({ src, token }: { src?: string; token?: string | null | undefined }) => {
  return (
    <Box width={150} height={150}>
      {src && token ? (
        <Image
          width={150}
          height={150}
          style={{ borderRadius: 100 }}
          // eslint-disable-next-line @typescript-eslint/no-require-imports
          source={{ uri: src, headers: { Authorization: `Bearer ${token}` } }}
        />
      ) : (
        <LocalImage
          style={{ borderRadius: 100 }}
          width={150}
          source={require('../../../../../assets/vegeta/vegeta1.jpg')}
        />
      )}
    </Box>
  );
};

const Content = () => {
  const { signOut, session } = useAuth();
  const userInfoQuery = useGetUserInfoQuery();

  const data = settings({ onLogout: signOut });

  if (userInfoQuery.isLoading) return <LoadingScreen />;

  return (
    <ScrollView>
      <Stack align="center" marginBottom={10}>
        <Box alignX="center" marginBottom={4}>
          <ProfileAvatar token={session} src={replaceApiHost(userInfoQuery.data?.profileImage)} />
        </Box>
        <Text size="sm" fontWeight="700">
          {userInfoQuery.data?.name}
        </Text>
      </Stack>
      <FlatList
        onRefresh={userInfoQuery.refetch}
        refreshing={userInfoQuery.isRefetching}
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
      HeaderComponent={<Screen.Header variant="transparent" title="Edycja profilu" hasBackButton={true} />}
    >
      <Content />
    </Screen>
  );
};
