import {AppBar, Box, Container, IconButton, Stack, Toolbar, useScrollTrigger} from '@mui/material';
import {useTranslation} from 'react-i18next';
import {Link as RemixLink} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {Menu as MenuIcon} from '@mui/icons-material';
import LanguageToggler from '../UI/LanguageToggler';
import WhiteButton from '../UI/WhiteButton';
import Logo from '../../../public/logo.svg';
import WhiteLink from '../UI/WhiteLink';
import {MobileMenu} from '../MobileMenu/MobileMenu';
import {pages} from '../../constants/index';
import {useAuth} from '~/hooks/Authorization/useAuth';

export function Header() {
  const {t} = useTranslation();
  const theme = useTheme();
  const [bgColor, setBgColor] = useState(theme.palette.primary.main);
  const {isLoggedIn, logout} = useAuth();

  const trigger = useScrollTrigger({
    threshold: 0,
  });

  useEffect(() => {
    if (trigger) {
      setBgColor('#96B3D0');
    } else {
      setBgColor(theme.palette.primary.main);
    }
  }, [trigger, theme.palette.primary.main]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <AppBar position="sticky" style={{backgroundColor: bgColor, transition: 'all .8s'}}>
      <Container maxWidth="lg">
        <Toolbar sx={{padding: 0}}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            sx={{
              padding: {xs: '10px 0', sm: '0'},
            }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <WhiteLink to={pages.main.path}>
                <img width="40" src={Logo} alt={t('common.altAppLogo')} />
              </WhiteLink>
              <Box display={{xs: 'none', md: 'flex'}} alignItems="center">
                <WhiteLink to={pages.main.path}>{t(pages.main.translationKey)}</WhiteLink>
              </Box>
            </Stack>
            <Box display={{xs: 'flex', md: 'none'}}>
              <LanguageToggler />
              <IconButton onClick={handleMenuClick}>
                <MenuIcon sx={{color: 'white'}} />
              </IconButton>
            </Box>
            <Box display={{xs: 'none', md: 'flex'}} alignItems="center">
              <LanguageToggler />
              <Stack direction="row" spacing={1} ml={2}>
                {isLoggedIn ? (
                  <WhiteButton component={RemixLink} to={pages.main.path} onClick={handleSignOut}>
                    {t(pages.signOut.translationKey)}
                  </WhiteButton>
                ) : (
                  <>
                    <WhiteButton component={RemixLink} to={pages.signIn.path}>
                      {t(pages.signIn.translationKey)}
                    </WhiteButton>
                    <WhiteButton component={RemixLink} to={pages.signUp.path}>
                      {t(pages.signUp.translationKey)}
                    </WhiteButton>
                  </>
                )}
              </Stack>
            </Box>
          </Box>
        </Toolbar>
        <Box display={{xs: 'flex', md: 'none'}}>
          <MobileMenu data-testid="mobile-menu-btn" anchorEl={anchorEl} open={open} onClose={handleMenuClose} />
        </Box>
      </Container>
    </AppBar>
  );
}
