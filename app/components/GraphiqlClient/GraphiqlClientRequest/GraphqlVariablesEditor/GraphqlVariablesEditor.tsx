import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {Box} from '@mui/material';
import styles from '~/components/QueryEditor/QueryEditor.module.css';
import {useRef} from 'react';
import {styleOverrides, basicSetup, myTheme} from '~/components/QueryEditor/QueryEditorSettings';

interface VariablesEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const GraphqlVariablesEditor: React.FC<VariablesEditorProps> = ({value, onChange}) => {
  const variablesRef = useRef<ReactCodeMirrorRef | null>(null);

  const handleChange = (value: string) => {
    onChange(value);
  };

  const extensionsArray = [styleOverrides];

  return (
    <Box sx={{marginBottom: 3}}>
      <CodeMirror
        ref={variablesRef}
        className={styles.queryEditor}
        height="200px"
        theme={myTheme}
        value={value}
        onChange={handleChange}
        extensions={extensionsArray}
        basicSetup={basicSetup}
      />
    </Box>
  );
};
