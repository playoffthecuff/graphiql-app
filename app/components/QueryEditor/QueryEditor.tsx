import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {useTranslation} from 'react-i18next';
import {Box, Button, Typography} from '@mui/material';
import styles from './QueryEditor.module.css';
import {useEffect, useRef} from 'react';
import {GraphQLSchema} from 'graphql';
import {styleOverrides, basicSetup, myTheme} from './QueryEditorSettings';
import {graphql} from './utils/graphqlLinter';
import {updateSchema} from 'cm6-graphql';
import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/parser-babel';
import * as prettierPluginGraphql from 'prettier/plugins/graphql';

interface QueryEditorProps {
  schema: GraphQLSchema;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export const QueryEditor: React.FC<QueryEditorProps> = ({value, onChange, schema, onBlur}) => {
  const {t} = useTranslation();
  const queryRef = useRef<ReactCodeMirrorRef | null>(null);

  const handleFormatQuery = async () => {
    try {
      const formattedCode = prettier.format(value, {
        parser: 'graphql',
        plugins: [parserBabel, prettierPluginGraphql],
      });
      onChange(await formattedCode);
    } catch (err) {
      if (err) {
        onChange(value);
      }
    }
  };

  useEffect(() => {
    if (queryRef.current?.view) {
      updateSchema(queryRef.current.view, schema);
    }
  }, [schema]);
  const handleChange = (value: string) => {
    onChange(value);
  };
  const extensionsArray = [styleOverrides, graphql(schema)];

  return (
    <Box sx={{marginBottom: 3}}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{marginBottom: 1}}>
        <Typography component={'h6'} variant="h6">
          {t('page.graphiql.queryEditor')}
        </Typography>
        <Button size="small" onClick={handleFormatQuery}>
          {t('page.graphiql.format')}
        </Button>
      </Box>
      <CodeMirror
        ref={queryRef}
        className={styles.queryEditor}
        height="200px"
        theme={myTheme}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        extensions={extensionsArray}
        basicSetup={basicSetup}
      />
    </Box>
  );
};
