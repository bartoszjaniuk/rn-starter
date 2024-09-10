import { useStyles } from 'react-native-unistyles';

import { Box, Stack } from '@grapp/stacks';

import { Text } from 'src/shared';

import { HeaderVariant } from './StepLayout';

type Props = {
  variant: HeaderVariant;
};

const headerTitleMap: Record<HeaderVariant, string> = {
  Profile: 'Uzupełnij swój profil',
  Target: 'Jaki trening cię interesuje?',
  Photos: 'Dodaj zdjęcia',
};

const headerDescriptionMap: Record<HeaderVariant, string> = {
  Profile: '',
  Target: 'Wybierz rodzaj preferowanego treningu.  Będziesz mógł edytować te informacje po utworzeniu konta.',
  Photos: '',
};

const getVariantContent = (variant: HeaderVariant) => {
  return {
    title: headerTitleMap[variant],
    description: headerDescriptionMap[variant],
  };
};

export const StepHeader = (props: Props) => {
  const { variant } = props;
  const { title, description } = getVariantContent(variant);

  return (
    <Stack space={4}>
      <Text fontWeight="700" size="heading">
        {title}
      </Text>
      <Box width={300}>
        <Text fontWeight="500" size="sm" color="gray">
          {description}
        </Text>
      </Box>
    </Stack>
  );
};
