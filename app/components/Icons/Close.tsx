import {SvgIcon} from '@mui/material';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function CloseIcon({className, style}: Props) {
  return (
    <SvgIcon className={className} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
      </svg>
    </SvgIcon>
  );
}
