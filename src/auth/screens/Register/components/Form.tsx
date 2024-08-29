import React from 'react';

import { Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Checkbox, Text, TextInput } from 'src/shared';
import { Button } from 'src/shared/components/Button';

const string = z.string();

const registerFormSchema = z.object({
  email: string.min(1, 'Pole jest wymagane').email('Podano nieprawidłowy adres email'),
  areTermsAccepted: z.literal<boolean>(true, { errorMap: () => ({ message: 'Pole jest wymagane' }) }),
});

type RegisterFormFieldValues = z.infer<typeof registerFormSchema>;

type Props = {
  onSubmit?: VoidFunction;
};

export const Form = (props: Props) => {
  const { onSubmit: onSubmitEffect } = props;
  const {
    control,
    handleSubmit,
    reset,

    formState: { isValid },
  } = useForm<RegisterFormFieldValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      areTermsAccepted: false,
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    console.log(data);
    onSubmitEffect?.();
    reset();
  });

  return (
    <Stack space={8}>
      <Stack space={6}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              label="Email"
              placeholder="twójmail@gmail.com"
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          name="areTermsAccepted"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Checkbox value={value} onValueChange={onChange} isError={!!error} errorMessage={error?.message}>
              <Inline space={1}>
                <Text fontWeight="500" size="sm" color="gray">
                  Akceptuję
                </Text>
                <Text fontWeight="900" size="sm" color="gray">
                  Regulamin
                </Text>
              </Inline>
            </Checkbox>
          )}
        />
      </Stack>
      <Button onPress={onSubmit}>Wyślij maila aktywacyjnego</Button>
    </Stack>
  );
};
