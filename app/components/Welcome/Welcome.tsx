import {Box, Button, Container, Typography} from '@mui/material';
import {Link as RemixLink} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {pages} from '~/constants';
import {useAuth} from '~/hooks/Authorization/useAuth';

export function Welcome() {
  const {t} = useTranslation();
  const [name, setName] = useState<string>('');
  const {isLoggedIn, user} = useAuth();

  useEffect(() => {
    const emailName = user?.user.email?.split('@')[0];
    setName(emailName || 'User');
  }, [user]);

  return (
    <Container maxWidth="lg" sx={{paddingTop: '50px', paddingBottom: '50px'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          width: '100%',
          boxShadow: 2,
        }}>
        <Typography component={'h2'} variant="h3" textAlign={'center'} style={{marginBottom: '24px'}}>
          {!isLoggedIn ? `${t('page.main.welcome')}, User!` : `${t('page.main.welcomeBack')}, ${name}!`}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
          }}>
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{marginBottom: 2, marginRight: 1}}
                component={RemixLink}
                to={pages.signIn.path}>
                {t(pages.signIn.translationKey)}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{marginBottom: 2}}
                component={RemixLink}
                to={pages.signUp.path}>
                {t(pages.signUp.translationKey)}
              </Button>
            </>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexWrap: 'wrap',
          }}>
          <Button
            variant="contained"
            color="primary"
            sx={{marginBottom: 2, marginRight: 1}}
            component={RemixLink}
            to={pages.restClient.path}>
            {t(pages.restClient.translationKey)}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{marginBottom: 2, marginRight: 1}}
            component={RemixLink}
            to={pages.graphqlClient.path}>
            {t(pages.graphqlClient.translationKey)}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{marginBottom: 2}}
            component={RemixLink}
            to={pages.history.path}>
            {t(pages.history.translationKey)}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
