import React from 'react';

import { Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { useAuth } from 'src/providers/AuthContext';
import { Text, TextInput } from 'src/shared';
import { Button } from 'src/shared/components/Button';

const string = z.string();

const loginFormSchema = z.object({
  email: string.min(1, 'Pole jest wymagane').email('Podano nieprawidłowy adres email'),
  // password: string.min(8, 'Hasło musi posiadać conajmniej 8 znaków'),
  password: string.min(3, 'Hasło musi posiadać conajmniej 3 znaków'),
});

type LoginFormFieldValues = z.infer<typeof loginFormSchema>;

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

  const auth = useAuth();

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    auth.signIn?.(data);
    reset();
  });

  return (
    <Stack space={4}>
      {/* <Text>{auth.loginError ? <Text color="error">{auth.loginError?.response?.data.message}</Text> : null}</Text> */}
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
        <Button isLoading={auth.isLoading} onPress={onSubmit}>
          Zaloguj
        </Button>
      </Stack>
    </Stack>
  );
};
