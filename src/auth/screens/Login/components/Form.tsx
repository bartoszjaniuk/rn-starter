import React from 'react';

import { Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Text, TextInput } from 'src/shared';
import { Button } from 'src/shared/components/Button';
import { login } from 'src/user';

const string = z.string();

const loginFormSchema = z.object({
  email: string.min(1, 'Pole jest wymagane').email('Podano nieprawidłowy adres email'),
  password: string.min(8, 'Hasło musi posiadać conajmniej 8 znaków'),
});

type LoginFormFieldValues = z.infer<typeof loginFormSchema>;

const useLogin = () => {
  return useMutation({ mutationFn: login });
};

export const Form = () => {
  const {
    control,
    handleSubmit,
    reset,

    formState: { isValid },
  } = useForm<LoginFormFieldValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, error, data } = useLogin();
  console.log({ mutate, error, data });

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    console.log(data);
    mutate();
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
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              label="Hasło"
              placeholder="*********"
              secureTextEntry={true}
              multiline={false}
              isError={!!error}
              errorMessage={error?.message}
            />
          )}
          name="password"
        />
        <Inline alignX="right">
          <Text color="gray" size="sm" fontWeight="500">
            Nie pamiętasz hasła?
          </Text>
        </Inline>
      </Stack>
      <Button onPress={onSubmit}>Zaloguj</Button>
    </Stack>
  );
};
