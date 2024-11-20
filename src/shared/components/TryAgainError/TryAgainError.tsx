import { Stack } from '@grapp/stacks';

import { Button } from '../Button';
import { IconWrapper } from '../IconWrapper';
import { Text } from '../Text';

type Props = {
  message?: string;
  onRefetch: VoidFunction;
  isLoading: boolean;
};

export const TryAgainError = (props: Props) => {
  const { isLoading, onRefetch, message = ' Nie udało się pobrać danych z serwera.' } = props;
  return (
    <Stack space={6} align="center">
      <IconWrapper>
        <Text>❌</Text>
      </IconWrapper>

      <Stack space={2}>
        <Text fontWeight="700" size="xl" align="center">
          Coś poszło nie tak
        </Text>

        <Text fontWeight="400" size="md" align="center">
          {message}
        </Text>
      </Stack>
      <Button isLoading={isLoading} onPress={onRefetch} variant="danger">
        Spróbuj ponownie
      </Button>
    </Stack>
  );
};
