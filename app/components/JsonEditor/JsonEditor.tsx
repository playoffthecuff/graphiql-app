import '@fontsource/roboto-mono';
import styles from './JsonEditor.module.css';
import {useEffect, useState} from 'react';
import {Box, Button, FormHelperText, Typography, useTheme} from '@mui/material';
import {EditIcon, VisibleIcon} from '../Icons';
import prettifyJson from '~/utils/prettifyJson';
import {useTranslation} from 'react-i18next';

type EditorProps = {
  mode: 'view' | 'edit';
  type: 'JSON' | 'text';
  defaultValue: string;
  errorMessage: string;
  onChange: (v: string) => void;
  onBlur: () => void;
};

function StrNum({content}: {content: string}) {
  const numStr = Array.from({length: content.split('\n').length}, (_, k) => k + 1).join('\n');
  return <pre className={styles.numeration}>{numStr}</pre>;
}

export default function JsonEditor({
  mode = 'view',
  type = 'JSON',
  defaultValue = '',
  errorMessage = '',
  onChange,
  onBlur,
}: Partial<EditorProps>) {
  const [content, setContent] = useState(type === 'JSON' ? prettifyJson(defaultValue).json : defaultValue);
  const [formattable, setFormattable] = useState(false);
  const {t} = useTranslation();

  useEffect(() => setContent(defaultValue), [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    if (type === 'JSON') {
      setFormattable(!!v && v !== prettifyJson(v).json && !errorMessage);
    }
    setContent(v);
    if (onChange) {
      onChange(v);
    }
  };

  const formatJson = () => {
    const fC = prettifyJson(content).json;
    setContent(fC);
    setFormattable(false);
    if (onChange) {
      onChange(fC);
    }
  };

  const theme = useTheme();

  return (
    <Box component="section" className={styles.editor}>
      <Box component="div" className={styles.marker}>
        {mode === 'view' ? (
          <VisibleIcon style={{width: '16px', height: '16px'}} />
        ) : (
          <EditIcon style={{width: '16px', height: '16px'}} />
        )}
      </Box>
      <Box component="div" className={styles.heading}>
        <Typography variant="subtitle1" component="p">
          {type === 'JSON' ? t('jsonEditor.jsonContent') : t('jsonEditor.textContent')}
        </Typography>
        {type === 'JSON' && (
          <Button size="small" onClick={formatJson} disabled={!formattable}>
            {t('jsonEditor.format')}
          </Button>
        )}
      </Box>
      <Box component="div" className={styles.body}>
        <Box component="div" className={styles.wrapper}>
          {type === 'JSON' && <StrNum content={content} />}
          <Box>
            <Box component="div" className={styles.inputWrapper} data-replicated-value={content}>
              <textarea value={content} onChange={handleChange} onBlur={onBlur} disabled={mode === 'view'} />
            </Box>
          </Box>
        </Box>
      </Box>
      <FormHelperText
        className={styles.helper}
        style={{color: theme.palette.error.main, marginTop: 0, marginLeft: '8px', fontSize: '14px'}}>
        {errorMessage}
      </FormHelperText>
    </Box>
  );
}
