import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import SignIn from './signIn';
import SignUp from './signUp';
import {SubmitHandler} from 'react-hook-form';
import {FormProps} from './models/formProps';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '~/utils/firebaseConfig';
import {FormAction} from './models/formAction';
import {useNavigate, useLocation} from '@remix-run/react';
import {red} from '@mui/material/colors';
import {useAuth} from '~/hooks/Authorization/useAuth';
import {useTranslation} from 'react-i18next';

const Authorization: React.FC = () => {
  const location = useLocation();
  const initialAction = location.pathname === '/sign-up' ? FormAction.SIGN_UP : FormAction.SIGN_IN;
  const {login} = useAuth();
  const {t} = useTranslation();

  const [action, setAction] = useState<FormAction>(initialAction);
  const [authError, setAuthError] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    setAction(initialAction);
    setAuthError('');
  }, [initialAction]);

  const handleSubmit: SubmitHandler<FormProps> = async (data: FormProps) => {
    try {
      if (action === FormAction.SIGN_IN) {
        const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
        login(userCredentials);
        setAuthError('');
        navigate('/');
      } else if (action === FormAction.SIGN_UP) {
        const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password);
        login(userCredentials);
        setAuthError('');
        navigate('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(`${t('form.authErrorMessage')}`);
    }
  };

  const handleInputChange = () => {
    setAuthError('');
  };

  const toggleAction = () => {
    const newAction = action === FormAction.SIGN_IN ? FormAction.SIGN_UP : FormAction.SIGN_IN;
    setAction(newAction);

    if (newAction === FormAction.SIGN_IN) {
      navigate('/sign-in', {replace: true});
    } else {
      navigate('/sign-up', {replace: true});
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component={'h5'} variant="h5" textAlign={'center'}>
        {action === FormAction.SIGN_IN ? `${t('form.signIn')}` : `${t('form.signUp')}`}
      </Typography>
      {action === FormAction.SIGN_IN ? (
        <SignIn onSubmit={handleSubmit} onInputChange={handleInputChange} />
      ) : (
        <SignUp onSubmit={handleSubmit} onInputChange={handleInputChange} />
      )}
      <Typography color={red[500]} textAlign={'center'}>
        {authError}
      </Typography>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'}>
        <Button onClick={toggleAction}>
          {action === FormAction.SIGN_IN ? `${t('form.signUp')}` : `${t('form.signIn')}`}
        </Button>
      </Box>
    </Container>
  );
};

export default Authorization;
