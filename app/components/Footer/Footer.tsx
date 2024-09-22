import {Box, Container, Link, Stack, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {GitHub as GitHubIcon} from '@mui/icons-material';

export function Footer() {
  const theme = useTheme();
  const links = [
    {href: 'https://github.com/playoffthecuff/', alt: 'Github'},
    {href: 'https://github.com/elizaveta-tukailo/', alt: 'Github'},
    {href: 'https://github.com/yuliaraitsyna', alt: 'Github'},
  ];
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.primary.main,
        py: 3,
      }}>
      <Container maxWidth="lg" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{width: '33%'}}>
          {links.map((link, index) => (
            <Link key={index} href={link.href} sx={{color: 'white'}}>
              <GitHubIcon />
            </Link>
          ))}
        </Stack>
        <Typography sx={{color: 'white', width: '33%', textAlign: 'center'}}>© {new Date().getFullYear()}</Typography>
        <Link href="https://rs.school/react/" sx={{color: 'white', width: '33%', textAlign: 'right'}}>
          <img width="30" src="https://rs.school/assets/rss-logo-CM8B7fA7.svg" alt="RSSchool logo" />
        </Link>
      </Container>
    </Box>
  );
}
