import {Menu, MenuItem} from '@mui/material';
import {Link as RemixLink} from '@remix-run/react';
import WhiteButton from '../UI/WhiteButton';
import {useTranslation} from 'react-i18next';
import {pages} from '~/constants';
import {useAuth} from '~/hooks/Authorization/useAuth';

interface MobileMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({anchorEl, open, onClose}) => {
  const {t} = useTranslation();
  const {isLoggedIn, logout} = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiMenu-list': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
      }}>
      <MenuItem onClick={onClose}>
        <WhiteButton component={RemixLink} to={pages.main.path}>
          {t(pages.main.translationKey)}
        </WhiteButton>
      </MenuItem>
      {isLoggedIn && (
        <MenuItem onClick={onClose}>
          <WhiteButton component={RemixLink} to={pages.signOut.path} onClick={handleLogout}>
            {t(pages.signOut.translationKey)}
          </WhiteButton>
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem onClick={onClose}>
          <WhiteButton component={RemixLink} to={pages.signIn.path}>
            {t(pages.signIn.translationKey)}
          </WhiteButton>
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem onClick={onClose}>
          <WhiteButton component={RemixLink} to={pages.signUp.path}>
            {t(pages.signUp.translationKey)}
          </WhiteButton>
        </MenuItem>
      )}
    </Menu>
  );
};
