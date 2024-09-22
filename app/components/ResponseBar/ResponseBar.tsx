import {List, ListItem, ListItemText, useTheme} from '@mui/material';
import {useTranslation} from 'react-i18next';
import formatBytes from '~/utils/formatBytes';
import formatMs from '~/utils/formatMs';

type Props = {
  status: number;
  statusText: string;
  size: number;
  time: number;
};

export default function ResponseBar({status, statusText, size, time}: Props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const statusColor =
    status < 300 ? theme.palette.success.main : status < 400 ? theme.palette.warning.main : theme.palette.error.main;

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
        margin: '0 auto',
        maxWidth: '640px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #eee',
        borderRadius: '8px',
        '@media (max-width: 900px)': {
          flexDirection: 'column',
          maxWidth: '100%',
        },
      }}>
      <ListItem sx={{gap: '8px', justifyContent: 'center'}}>
        <ListItemText
          primary={t('response.status')}
          sx={{flexGrow: 0}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
        <ListItemText
          primary={status || ''}
          sx={{flexGrow: 0, color: statusColor}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
        <ListItemText
          primary={statusText}
          sx={{flexGrow: 0, color: statusColor}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
      </ListItem>
      <ListItem sx={{gap: '8px', justifyContent: 'center'}}>
        <ListItemText
          primary={t('response.size')}
          sx={{flexGrow: 0}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
        <ListItemText
          primary={formatBytes(size)}
          sx={{flexGrow: 0, color: theme.palette.success.main}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
      </ListItem>
      <ListItem sx={{gap: '8px', justifyContent: 'center'}}>
        <ListItemText
          primary={t('response.time')}
          sx={{flexGrow: 0}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
        <ListItemText
          primary={formatMs(time)}
          sx={{flexGrow: 0, color: theme.palette.success.main}}
          primaryTypographyProps={{
            fontWeight: 600,
          }}
        />
      </ListItem>
    </List>
  );
}
