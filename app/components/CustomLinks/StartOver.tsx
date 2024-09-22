import {Link} from '@mui/material';
import {pages} from '~/constants';
import {HomeIcon} from '../Icons';
import {useTranslation} from 'react-i18next';

type Props = {
  message: string;
};

export const StartOverLink = ({message = 'or start over'}: Partial<Props>) => {
  const {t} = useTranslation();
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Link href={pages.main.path}>
        <HomeIcon style={{marginRight: '4px', transform: 'translateY(4px)'}} />
        <span>{message === 'or start over' ? t('errorBoundary.orOver') : message}</span>
      </Link>
    </div>
  );
};
