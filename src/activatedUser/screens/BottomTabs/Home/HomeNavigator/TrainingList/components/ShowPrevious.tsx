import * as React from 'react';

import { Inline, Stack } from '@grapp/stacks';

import { Icon, PressableScale, Text } from 'src/shared';

export const ShowPrevious = (props: React.PropsWithChildren) => {
  const { children } = props;
  const [isShown, setIsShown] = React.useState(false);
  return (
    <Stack>
      <PressableScale onPress={() => setIsShown((prev) => !prev)}>
        <Inline space={2} alignX="center" paddingY={4} alignY="center">
          <Text fontWeight="500" size="xs">
            Pokaż wcześniejsze
          </Text>
          <Icon
            name="chevron"
            style={{ transform: [{ rotate: isShown ? '180deg' : '0deg' }] }}
            svgProps={{ width: 12, height: 12 }}
            color="typography"
          />
        </Inline>
      </PressableScale>
      {isShown ? children : null}
    </Stack>
  );
};
