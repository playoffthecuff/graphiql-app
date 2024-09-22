import {Grid, TextField, Typography} from '@mui/material';
import {UrlProps} from './models';
import styles from './Url.module.css';

export const Url: React.FC<UrlProps> = ({label, name, value, onInput, onBlur, onChange, placeholder = ''}) => {
  return (
    <Grid className={styles.urlRow} container spacing={2} alignItems="center">
      <Grid item xs={12} sm={4}>
        <Typography component={'h6'} variant="h6" textAlign="end">
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onInput={onInput}
          onBlur={onBlur}
          value={value}
        />
      </Grid>
    </Grid>
  );
};
