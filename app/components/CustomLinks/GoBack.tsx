import {Link} from '@mui/material';
import {ArrowBackIcon} from '../Icons';
import {useNavigate} from '@remix-run/react';
import {useTranslation} from 'react-i18next';

export function GoBackLink() {
  const navigate = useNavigate();
  const {t} = useTranslation();
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Link onClick={() => navigate(-1)} component="button">
        <ArrowBackIcon style={{marginRight: '4px', transform: 'translateY(4px)'}} />
        <span>{t('errorBoundary.goBack')}</span>
      </Link>
    </div>
  );
}
