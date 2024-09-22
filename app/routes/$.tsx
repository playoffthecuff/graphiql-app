import {Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {GoBackLink, StartOverLink} from '~/components/CustomLinks';

export default function NotFoundPage() {
  const {t} = useTranslation();
  return (
    <section style={{height: '100%', display: 'flex', flexFlow: 'column wrap', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography variant="h4" component={'h1'}>
          404
        </Typography>
        <Typography variant="h3" component={'h2'} style={{transform: 'translateY(-4px)'}}>
          &nbsp;|&nbsp;
        </Typography>
        <Typography variant="h5" component={'h3'}>
          {t('errorBoundary.nonExistence')}
        </Typography>
      </div>
      <GoBackLink />
      <StartOverLink />
    </section>
  );
}
