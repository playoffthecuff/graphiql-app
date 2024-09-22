import React, {ForwardRefExoticComponent, ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import {Button} from '@mui/material';
import {ButtonProps} from '@mui/material/Button';
import {RemixLinkProps} from '@remix-run/react/dist/components';

const StyledWhiteButton = styled(Button)({
  backgroundColor: 'white',
  color: '#1976d2',
  '&:hover': {
    backgroundColor: 'lightgray',
  },
});

interface WhiteButtonProps extends ButtonProps {
  children: ReactNode;
  to?: string;
  component?: ForwardRefExoticComponent<RemixLinkProps & React.RefAttributes<HTMLAnchorElement>>;
}

const WhiteButton: React.FC<WhiteButtonProps> = ({children, ...props}) => {
  return <StyledWhiteButton {...props}>{children}</StyledWhiteButton>;
};

export default WhiteButton;
