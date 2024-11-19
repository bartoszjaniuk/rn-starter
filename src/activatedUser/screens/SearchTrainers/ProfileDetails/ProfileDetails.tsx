import React, { useMemo } from 'react';
import { View } from 'react-native';

import { Box, Inline, Stack } from '@grapp/stacks';

import { useRouteParams } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Badge, Button, Icon, PressableScale, Text } from 'src/shared';
import { CarouselGallery } from 'src/shared/components/CarouselGallery';
import { TrainingSnacks } from 'src/shared/components/TrainingSnacks/TrainingSnacks';
import { replaceApiHost } from 'src/shared/utils/replaceApiHost';

import * as route from '../../../navigation/routes';

const Content = () => {
  const routeParams = useRouteParams(route.toSearchTrainersProfileDetails);

  const images = useMemo(
    () =>
      routeParams.images.map((img) => {
        const char = 'file/';
        const index = img.indexOf(char);
        const id = img.slice(index + char.length);

        return { id, uri: replaceApiHost(img) };
      }),
    [routeParams.images],
  );

  console.log(routeParams.specializations, 'routeParams.specializations');

  return (
    <Screen.ScrollView backgroundColor="transparent">
      <Screen.Content>
        <Stack space={3}>
          <CarouselGallery images={images} />
          <Stack space={2} paddingTop={8}>
            <Box>
              <Inline alignX="between">
                <Text fontWeight="700" size="xxl">
                  {routeParams.name}
                </Text>
                <Inline alignY="center" space={1}>
                  <Icon name="star" color="transparent" />
                  <Text fontWeight="500" size="lg">
                    {routeParams.averageBookingRating}
                  </Text>
                </Inline>
              </Inline>
              <Text fontWeight="400" size="sm">
                {routeParams.city}
              </Text>
            </Box>
            <View style={{ flexDirection: 'row', gap: 24, width: '100%' }}>
              <Inline alignY="center" space={1}>
                <Icon name="phone" color="transparent" />
                <Text fontWeight="400" size="sm">
                  {routeParams.phoneNumber}
                </Text>
              </Inline>
              <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center', flex: 1 }}>
                <Icon name="mail" color="transparent" />
                <Text fontWeight="400" size="sm" numberOfLines={1} ellipsizeMode="tail">
                  {routeParams.email}
                </Text>
              </View>
            </View>
          </Stack>
          <Stack space={2}>
            <Text fontWeight="700" size="sm">
              Przeprowadzam trening:
            </Text>
            <TrainingSnacks data={routeParams.specializations} />
          </Stack>
          <Stack space={2}>
            <Text fontWeight="700" size="sm">
              O mnie:
            </Text>
            <Text fontWeight="400" size="sm" color="white">
              Jestem certyfikowanym trenerem personalnym z pasją do pomagania innym w osiąganiu ich celów fitness.
              Specjalizuję się w spersonalizowanych planach treningowych i wsparciu motywacyjnym, które pomagają
              zwiększać siłę, poprawiać kondycję i budować zdrowe nawyki na długie lata.
            </Text>
          </Stack>
        </Stack>
      </Screen.Content>
      <Screen.Footer>
        <Button isLoading={false} onPress={() => null}>
          Zobacz kalendarz
        </Button>
      </Screen.Footer>
    </Screen.ScrollView>
  );
};

export const SearchTrainersProfileDetails = () => {
  const goToCalendar = () =>
    goTo(route.toSearchTrainersAvailabilitySlots, { trainerId: 'c1b8bbc5-5cc3-476c-962b-3b09505eb639' });
  return (
    <Screen
      HeaderComponent={
        <Screen.Header variant="transparent">
          <Screen.Header.Right>
            <PressableScale onPress={goToCalendar}>
              <Text fontWeight="700" size="xs" color="primary">
                Zobacz kalendarz
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
