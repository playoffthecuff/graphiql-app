import {BasicSetupOptions, EditorView} from '@uiw/react-codemirror';
import {tags as tag} from '@lezer/highlight';
import {createTheme} from '@uiw/codemirror-themes';

export const myTheme = createTheme({
  theme: 'light',
  settings: {
    background: '#eeeeee',
    backgroundImage: '',
    foreground: '#4D4D4C',
    caret: '#AEAFAD',
    selection: '#D6D6D6',
    selectionMatch: '#D6D6D6',
    gutterBackground: '#eeeeee',
    gutterForeground: '#4D4D4C',
    gutterBorder: '#dddddd',
    gutterActiveForeground: '#000000',
    lineHighlight: '#EFEFEF',
  },
  styles: [
    {tag: tag.comment, color: '#787b80'},
    {tag: tag.definition(tag.typeName), color: '#194a7b'},
    {tag: tag.typeName, color: '#194a7b'},
    {tag: tag.tagName, color: '#008a02'},
    {tag: tag.variableName, color: '#1a00db'},
  ],
});

export const styleOverrides = EditorView.theme({
  '&.cm-editor': {
    borderRadius: '10px',
    overflow: 'hidden',
  },
  '&.cm-gutters': {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
  },
  '&.cm-gutterElemen': {
    borderRadius: '10px',
  },
  '&.cm-editor.cm-focused': {outline: '2px solid transparent', outlineOffset: '2px'},
  '.cm-content': {transition: 'opacity 0.1s'},
});

export const basicSetup: BasicSetupOptions = {
  tabSize: 2,
  lineNumbers: true,
  highlightActiveLine: true,
  highlightActiveLineGutter: true,
  autocompletion: true,
  foldGutter: true,
  foldKeymap: true,
};
