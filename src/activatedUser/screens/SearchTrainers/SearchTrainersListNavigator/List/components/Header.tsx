import React from 'react';

import { Inline } from '@grapp/stacks';

import { Icon, PressableScale, Text } from 'src/shared';

type Props = {
  count?: number;
  isSorted?: boolean;
};

export const Header = ({ count, isSorted }: Props) => {
  return (
    <Inline alignX="between" paddingY={4}>
      <Text fontWeight="700" size="sm">
        {count ?? 0} trenerów w okolicy
      </Text>
      <PressableScale>
        <Inline alignY="bottom" space={2}>
          <Text fontWeight="700" size="xs">
            Sortuj
          </Text>
          <Icon name="sortDesc" color="white" style={{ transform: [{ rotate: isSorted ? '180deg' : '0deg' }] }} />
        </Inline>
      </PressableScale>
    </Inline>
  );
};
