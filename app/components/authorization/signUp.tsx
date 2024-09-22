import React, {useEffect, useState} from 'react';
import {Box, Typography, TextField, Button} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {handlePasswordCheck} from './utils/passwordValidation';
import {FormProps} from './models/formProps';
import {emailPattern} from './models/regex';
import {useTranslation} from 'react-i18next';

const SignUp: React.FC<{onSubmit: SubmitHandler<FormProps>; onInputChange: () => void}> = ({
  onSubmit,
  onInputChange,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
    trigger,
  } = useForm<FormProps>({
    mode: 'onChange',
  });

  const password = watch('password');
  const [lang, setLang] = useState('');
  const {i18n, t} = useTranslation();

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

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
            validate: value => {
              const passwordError = handlePasswordCheck(lang, value);
              return passwordError || true;
            },
            onChange: () => {
              trigger('password');
              onInputChange();
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message || ' '}
        />
        <Typography component={'label'} htmlFor="repeat-password">
          {t('form.repeatPassword')}
        </Typography>
        <TextField
          type="password"
          id="repeat-password"
          {...register('repeatPassword', {
            required: `${t('form.requiredRepeatPasswordMessage')}`,
            validate: value => value === password || 'Passwords do not match',
            onChange: () => {
              onInputChange();
            },
          })}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message || ' '}
        />
      </Box>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} padding={2}>
        <Button variant="contained" type="submit">
          {t('form.signUp')}
        </Button>
      </Box>
    </form>
  );
};

export default SignUp;
