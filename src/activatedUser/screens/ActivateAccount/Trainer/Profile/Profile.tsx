import * as React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Control, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { goTo } from 'src/navigation';
import { Screen, useNavigator } from 'src/screen';
import { SelectDropdown, TextInput } from 'src/shared';

import * as route from '../../../../navigation/routes';
import { StepLayout } from '../../_internals/components/StepLayout';

const profileFormSchema = z.object({
  firstName: z.string().min(1, 'Pole jest wymagane'),
  surname: z.string().optional(),
  gender: z.string().min(1, 'Pole jest wymagane').trim(),
  city: z.string().min(3, 'Pole jest wymagane'),
  description: z.string().min(3, 'Pole jest wymagane'),
});

type ProfileFormFieldValues = z.infer<typeof profileFormSchema>;

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
            label="Imię"
            placeholder="Przedstaw się wszytkim"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="firstName"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            isRequired={false}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="Nazwisko"
            placeholder="Dostępne tylko dla podopiecznego"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="surname"
      />

      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <SelectDropdown
            error={error}
            selectedValue={value}
            onValueChange={(v: string | null) => {
              if (v === null) onChange('');
              else onChange(v);
            }}
            label="Płeć"
            placeholder="Wybierz płeć"
            options={[
              { label: 'Męzczyzna', value: 'man' },
              { label: 'Kobieta', value: 'woman' },
            ]}
          />
        )}
        name="gender"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            isRequired={true}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="Miasto"
            placeholder="W jakim mieście pracujesz?"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="city"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            multiline={true}
            isRequired={true}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            label="O mnie"
            placeholder="Dodaj informację o kursach i osiągnięciach"
            isError={!!error}
            errorMessage={error?.message}
          />
        )}
        name="description"
      />
    </>
  );
};

const Content = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ProfileFormFieldValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: '',
      surname: '',
      gender: '',
      city: '',
      description: '',
    },
  });

  const { updateNavigationData } = useNavigator();

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    updateNavigationData(data);
    goTo(route.toActivateAccountTrainerContact);
  });

  return (
    <StepLayout variant="Profile" buttonLabel="Dalej" shouldShowError={false} handleButtonClick={onSubmit}>
      <Form control={control} />
    </StepLayout>
  );
};

export const ActivateAccountTrainerProfile = () => {
  return (
    <Screen.Navigator.Item>
      <Content />
    </Screen.Navigator.Item>
  );
};
