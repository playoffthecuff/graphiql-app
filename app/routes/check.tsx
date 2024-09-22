import {Button} from '@mui/material';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';

export function ErrorBoundary() {
  const {t} = useTranslation();
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message={t('errorBoundary.startOver')} />
    </ErrorBoundaryWrapper>
  );
}

export default function Check() {
  const [error, setError] = useState(false);
  const {t} = useTranslation();

  useEffect(() => {
    if (error) throw new Error('test');
  }, [error]);
  return (
    <Button onClick={() => setError(true)} variant="contained">
      {t('errorBoundary.throw')}
    </Button>
  );
}
