import {SvgIcon} from '@mui/material';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function ArrowBackIcon({className, style}: Props) {
  return (
    <SvgIcon className={className} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
      </svg>
    </SvgIcon>
  );
}
