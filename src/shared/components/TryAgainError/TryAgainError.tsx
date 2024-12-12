import { Stack } from '@grapp/stacks';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconWrapper } from '../IconWrapper';
import { Text } from '../Text';

type Props = {
  queryName: string;
  errorTitle?: string;
  errorMessage?: string;
  retryText?: string;
  isLoading?: boolean;
  onRetry?: VoidFunction;
};

export const TryAgainError = (props: Props) => {
  const ERROR_TITLE = 'Coś poszło nie tak';
  const ERROR_MESSAGE = 'Nie udało się pobrać danych z serwera';
  const RETRY_MESSAGE = 'Spróbuj ponownie';

  const {
    errorTitle = ERROR_TITLE,
    errorMessage = ERROR_MESSAGE,
    retryText = RETRY_MESSAGE,
    onRetry,
    queryName,
    isLoading,
  } = props;
  return (
    <Stack space={4} align="center" paddingTop={4}>
      <IconWrapper>
        <Icon name="closeX" />
      </IconWrapper>

      <Stack space={2}>
        <Text fontWeight="700" size="xl" align="center">
          {errorTitle}
        </Text>

        <Text fontWeight="400" size="md" align="center">
          {errorMessage}
        </Text>
      </Stack>
      <Button isLoading={isLoading} onPress={onRetry} variant="danger">
        {retryText}
      </Button>

      <Text fontWeight="300" size="xs" align="right">
        {`endpoint: ${queryName}`}
      </Text>
    </Stack>
  );
};
