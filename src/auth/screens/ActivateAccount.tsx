import * as React from 'react';

import { Box, Inline, Stack } from '@grapp/stacks';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useActivateAccountMutation } from 'src/api/auth/hooks';
import { useRouteParams } from 'src/core/hooks';
import { goTo } from 'src/navigation';
import { Screen } from 'src/screen';
import { Checkbox, Text, TextInput } from 'src/shared';
import { Button } from 'src/shared/components/Button';

import * as route from '../navigation/routes';

const activateAccountFormSchema = z
  .object({
    password: z.string().min(3, 'Hasło musi posiadać conajmniej 3 znaków'),
    confirmPassword: z.string().min(3, 'Hasło musi posiadać conajmniej 3 znaków'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Hasła muszą być identyczne',
    path: ['confirmPassword'],
  });

type ActivateAccountFormFieldValues = z.infer<typeof activateAccountFormSchema>;

const Content = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ActivateAccountFormFieldValues>({
    resolver: zodResolver(activateAccountFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const handleNavigateToLogin = () => goTo(route.toAuthLogin);

  const activateAccountMutation = useActivateAccountMutation({ onSuccess: handleNavigateToLogin });

  const { token } = useRouteParams(route.toAuthActivateAccount);

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;
    activateAccountMutation.mutate({ password: data.password, token });
    reset();
  });

  Screen.useHeader({
    renderLeft: () => {
      return (
        <Screen.Header.Left>
          <Screen.Header.GoBackButton />
        </Screen.Header.Left>
      );
    },
  });

  return (
    <>
      <Screen.ScrollView backgroundColor="transparent">
        <Screen.Content>
          <Stack space={14}>
            <Box>
              <Text fontWeight="700" size="heading">
                Wpisz hasło i aktywuj konto
              </Text>
            </Box>

            <Stack space={8}>
              <Text>{activateAccountMutation.error ? <Text color="error">Coś poszlo nie tak...</Text> : null}</Text>

              <Stack space={6}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      label="Hasło"
                      placeholder="*********"
                      isError={!!error}
                      errorMessage={error?.message}
                    />
                  )}
                  name="password"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      label="Powtórz hasło"
                      placeholder="*********"
                      isError={!!error}
                      errorMessage={error?.message}
                      secureTextEntry={true}
                      multiline={false}
                    />
                  )}
                  name="confirmPassword"
                />
                <Inline>
                  <Checkbox value={true} onValueChange={() => null}>
                    <Inline space={1}>
                      <Text fontWeight="500" size="sm" color="gray">
                        Akceptuję
                      </Text>
                      <Text fontWeight="900" size="sm" color="gray">
                        Regulamin
                      </Text>
                    </Inline>
                  </Checkbox>
                </Inline>
              </Stack>
              <Button isLoading={activateAccountMutation.isPending} onPress={onSubmit}>
                Aktywuj
              </Button>
            </Stack>
          </Stack>
        </Screen.Content>
      </Screen.ScrollView>
      <Screen.Footer alignX="center" marginBottom={10}>
        <Inline space={2}>
          <Text fontWeight="400" size="sm">
            Masz już konto?
          </Text>
          <Text fontWeight="700" size="sm" onPress={handleNavigateToLogin}>
            Zaloguj się
          </Text>
        </Inline>
      </Screen.Footer>
    </>
  );
};

export const AuthActivateAccount = () => {
  return (
    <Screen HeaderComponent={<Screen.Header variant="transparent" />} statusBarStyle="light">
      <Content />
    </Screen>
  );
};
