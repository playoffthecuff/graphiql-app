import {SvgIcon} from '@mui/material';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function HomeIcon({className, style}: Props) {
  return (
    <SvgIcon className={className} style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    </SvgIcon>
  );
}
