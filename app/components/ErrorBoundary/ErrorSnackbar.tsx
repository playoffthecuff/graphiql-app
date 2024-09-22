import {Alert, AlertTitle, Box, Snackbar, SnackbarCloseReason} from '@mui/material';
import {ReactNode} from 'react';

type Props = {
  title: string;
  isOpen: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
};

export default function ErrorSnackbar({children, onChange, title = '', isOpen = false}: Partial<Props>) {
  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }
    if (onChange) onChange(false);
  };

  return (
    <>
      <Snackbar
        open={isOpen}
        autoHideDuration={10000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        style={{marginTop: '8rem'}}>
        <Box sx={{maxWidth: '512px'}}>
          <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
            <AlertTitle>{title}</AlertTitle>
            {children}
          </Alert>
        </Box>
      </Snackbar>
    </>
  );
}
