import {Container, Box, Typography, Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Link as RemixLink} from '@remix-run/react';
import {pages} from '../../constants/index';
import styles from './History.module.css';

interface RequestData {
  method: string;
  uri: string;
  sdl: string;
  body: string;
  headers: object;
  variables: string;
  encoded: string;
}

export function History() {
  const {t} = useTranslation();
  const [requestsData, setRequestsData] = useState<Record<string, RequestData> | null>(null);

  useEffect(() => {
    const requestsHistory = localStorage.getItem('history');
    if (requestsHistory) {
      setRequestsData(JSON.parse(requestsHistory));
    }
  }, []);

  const renderContent = () => {
    if (!requestsData || Object.keys(requestsData).length === 0) {
      return renderNoRequests();
    }
    return renderHistoryRequests();
  };

  const renderNoRequests = () => (
    <>
      <Typography component="h6" variant="h6" textAlign="center" sx={{mb: 1}} data-testid="text-norequests">
        {t('page.history.noRequests')}
      </Typography>
      <Typography component="h6" variant="h6" textAlign="center" sx={{mb: 3}}>
        {t('page.history.tryRequests')}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{flexWrap: 'wrap'}}>
        <Button variant="contained" color="primary" component={RemixLink} to={pages.restClient.path} sx={{mr: 2}}>
          {t(pages.restClient.translationKey)}
        </Button>
        <Button variant="contained" color="primary" component={RemixLink} to={pages.graphqlClient.path} sx={{mr: 2}}>
          {t(pages.graphqlClient.translationKey)}
        </Button>
      </Box>
    </>
  );

  const renderHistoryRequests = () => (
    <>
      {requestsData &&
        Object.entries(requestsData).map(([key, value]) => (
          <RemixLink className={styles.historyLink} to={value.encoded} key={key}>
            <p className={styles.historyLinkMethod}>{value.method}</p>
            <p className={styles.historyLinkEndpoint}>{value.uri}</p>
          </RemixLink>
        ))}
    </>
  );

  return (
    <Container maxWidth="lg" sx={{py: 6}}>
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
        <Typography component="h2" variant="h3" textAlign="center" sx={{mb: 3}}>
          {t('page.history.title')}
        </Typography>
        {renderContent()}
      </Box>
    </Container>
  );
}
