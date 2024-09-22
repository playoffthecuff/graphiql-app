import {Box, Card, CardContent, Container, Grid, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';

export function AboutApp() {
  const {t} = useTranslation();
  return (
    <Container maxWidth="lg" style={{paddingTop: '50px', paddingBottom: '50px'}}>
      <Typography component={'h3'} variant="h3" textAlign={'center'} style={{marginBottom: '16px'}}>
        {t('page.main.aboutProjectTitle')}
      </Typography>
      <Typography variant="body1" sx={{marginBottom: '20px'}}>
        {t('page.main.aboutRSSchool')}
      </Typography>
      <Typography variant="body1" sx={{marginBottom: '20px'}}>
        {t('page.main.aboutCourse')}
      </Typography>
      <Typography variant="body1" sx={{marginBottom: '20px'}}>
        {t('page.main.aboutTeam')}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6} md={6}>
          <Box display="flex" height="100%">
            <Card
              style={{flexGrow: 1}}
              sx={{
                flexGrow: 1,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {boxShadow: 6},
              }}>
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  {t('page.main.restTitle')}
                </Typography>
                <img
                  src="/app/assets/images/restclient.svg"
                  alt="Rest api"
                  style={{display: 'block', margin: '16px auto', maxHeight: '200px', maxWidth: '100%'}}
                />
                <Typography variant="body1" component="div" align="center">
                  {t('page.main.restDescription')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box display="flex" height="100%">
            <Card
              style={{flexGrow: 1}}
              sx={{
                flexGrow: 1,
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {boxShadow: 6},
              }}>
              <CardContent>
                <Typography variant="h4" component="div" align="center">
                  {t('page.main.graphTitle')}
                </Typography>
                <img
                  src="/app/assets/images/graphql.png"
                  alt="Rest api"
                  style={{display: 'block', margin: '16px auto', maxHeight: '200px', maxWidth: '100%'}}
                />
                <Typography variant="body1" component="div" align="center">
                  {t('page.main.graphDescription')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
