import React from 'react';
import {Box, Typography, TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FormProps} from './models/formProps';
import {emailPattern} from './models/regex';
import {useTranslation} from 'react-i18next';

const SignIn: React.FC<{onSubmit: SubmitHandler<FormProps>; onInputChange: () => void}> = ({
  onSubmit,
  onInputChange,
}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormProps>({
    mode: 'onChange',
  });

  const {t} = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
        <Typography component={'label'} htmlFor="email">
          {t('form.email')}
        </Typography>
        <TextField
          type="email"
          id="email"
          {...register('email', {
            required: `${t('form.requiredEmailMessage')}`,
            pattern: {
              value: emailPattern,
              message: `${t('form.invalidEmailMessage')}`,
            },
            onChange: () => {
              onInputChange();
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message || ' '}
        />
        <Typography component={'label'} htmlFor="password">
          {t('form.password')}
        </Typography>
        <TextField
          type="password"
          id="password"
          {...register('password', {
            required: `${t('form.requiredPasswordMessage')}`,
            onChange: () => {
              onInputChange();
            },
          })}
          error={!!errors.password}
        />
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} padding={2}>
        <Button variant="contained" type="submit">
          {t('form.signIn')}
        </Button>
      </Box>
    </form>
  );
};

export default SignIn;
