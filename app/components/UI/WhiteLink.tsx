import {Link as RemixLink} from '@remix-run/react';
import {Link as MUILink, LinkProps as MUILinkProps} from '@mui/material';
import {styled} from '@mui/material/styles';
import React from 'react';

interface CustomLinkProps extends MUILinkProps {
  to: string;
  children: React.ReactNode;
}

const StyledLink = styled(MUILink)({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const WhiteLink: React.FC<CustomLinkProps> = ({children, ...props}) => {
  return (
    <StyledLink component={RemixLink} {...props}>
      {children}
    </StyledLink>
  );
};

export default WhiteLink;
