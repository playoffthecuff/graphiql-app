import {Container, Grid, Typography} from '@mui/material';
import {TeamCard} from '../TeamCard/TeamCard';
import {useTranslation} from 'react-i18next';

export function AboutTeam() {
  const {t} = useTranslation();
  const team = t('page.main.team', {returnObjects: true});
  return (
    <Container maxWidth="lg" style={{paddingTop: '50px', paddingBottom: '50px'}}>
      <Typography component={'h3'} variant="h3" textAlign={'center'} style={{marginBottom: '16px'}}>
        {t('page.main.aboutUsTitle')}
      </Typography>
      <Grid container spacing={2} sx={{marginBottom: '16px'}}>
        <Grid item xs={12} sm={12}>
          <Typography variant="body1" sx={{marginBottom: '20px'}}>
            {t('page.main.aboutText1')}
          </Typography>
          <Typography variant="body1" sx={{marginBottom: '20px'}}>
            {t('page.main.aboutText2')}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {Object.entries(team).map(([key, value]) => (
          <TeamCard team={value} key={Number(key)} />
        ))}
      </Grid>
    </Container>
  );
}
