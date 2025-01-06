import { Inline, Stack } from '@grapp/stacks';

import { Text } from 'src/shared';

import { Tile } from './Tile';

import { Booking } from '../models/booking.model';

export const BookingItem = ({ date, trainer, availabilitySlots, type }: Booking) => {
  return (
    <Stack space={2} paddingTop={4}>
      <Inline alignX="center">
        <Text fontWeight="500" size="xs">
          {date}
        </Text>
      </Inline>
      <Tile
        date={date}
        name={trainer.name}
        specialization={type}
        timeStart={availabilitySlots[0]?.start}
        timeEnd={availabilitySlots[availabilitySlots.length - 1]?.end}
        onPress={() => null}
      />
    </Stack>
  );
};
