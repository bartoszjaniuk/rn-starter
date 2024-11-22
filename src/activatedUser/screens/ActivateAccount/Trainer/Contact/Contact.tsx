import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Control, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { TextInput } from 'src/shared';

import * as route from '../../../../navigation/routes';
import { StepLayout } from '../../_internals/components/StepLayout';

const contactFormSchema = z.object({
  phoneNumber: z.string().min(9, 'Pole jest wymagane'),
  // email: z.string().min(1, 'Pole jest wymagane').email('Podano nieprawidłowy adres email'),
});

type ProfileFormFieldValues = z.infer<typeof contactFormSchema>;

type Props = {
  control: Control<ProfileFormFieldValues>;
};

const Form = (props: Props) => {
  const { control } = props;
  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            isRequired={true}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="Numer telefonu"
            placeholder="123-457-789"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="phoneNumber"
      />

      {/* <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            isRequired={false}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="Email"
            placeholder="twojmail@mail.com"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="email"
      /> */}
    </>
  );
};

const Content = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ProfileFormFieldValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      // email: '',
      phoneNumber: '',
    },
  });

  const { updateNavigationData } = useNavigator();

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    updateNavigationData(data);
    goTo(route.toActivateAccountTrainerOffer);
  });

  return (
    <StepLayout variant="Contact" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={onSubmit}>
      <Form control={control} />
    </StepLayout>
  );
};

export const ActivateAccountTrainerContact = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
