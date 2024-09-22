import {
  Box,
  Button,
  Container,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Tab,
  Tabs,
  FormHelperText,
  useTheme,
} from '@mui/material';
import React, {CSSProperties, ReactNode, useEffect, useState} from 'react';
import {useLocation, useNavigate} from '@remix-run/react';
import {HTTPMethods} from './models/HTTPMethods';
import {grey} from '@mui/material/colors';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import createRestEncodedUri from '~/utils/createRestEncodedURL';
import {RestHistoryData} from '../models/RequestParams';
import JsonEditor from '~/components/JsonEditor/JsonEditor';
import {useTranslation} from 'react-i18next';
import {Header} from '~/components/HeadersEditor/models/header';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import {getStringFromParams} from '~/utils/getStringFromParams';
import prettifyJson from '~/utils/prettifyJson';
import QueryParamsEditor from '~/components/QueryParamsEditor/QueryParamsEditor';
import getParamsFromUri from '~/utils/getParamsFromUri';
import {Variable} from '~/components/VariablesEditor/models/variable';
import {QueryParam} from '~/components/QueryParamsEditor/models/queryParams';
import {replaceJsonVariables, replaceVariables} from '~/utils/replaceVariables';

type Tabs = 'Headers' | 'Variables' | 'Body' | 'Response';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  style?: CSSProperties;
}

type Props = {
  children: ReactNode;
  initialBody: string;
  initialHeaders: Header[];
  initialUri: string;
};

function CustomTabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{p: 3}}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RestClient: React.FC<Partial<Props>> = ({children, initialBody = '', initialUri = '', initialHeaders = []}) => {
  const location = useLocation();
  const pathMethod = location.pathname.slice(1).toUpperCase() as HTTPMethods;
  const isValidMethod = Object.values(HTTPMethods).includes(pathMethod);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.split('/').length > 3) setTab(4);
  }, [location]);

  const {t} = useTranslation();
  const [method, setMethod] = useState<HTTPMethods>(isValidMethod ? pathMethod : HTTPMethods.GET);
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const [body, setBody] = useState<string>(initialBody);
  const [editorMode, setEditorMode] = useState<'JSON' | 'text'>('JSON');
  const [prevBody, setPrevBody] = useState<string>(initialBody);
  const [headers, setHeaders] = useState<Header[]>(initialHeaders);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [params, setParams] = useState<QueryParam[]>([]);
  const [url, setUrl] = useState<string>('');
  const [uri, setUri] = useState<string>(initialUri);
  const theme = useTheme();
  const [tab, setTab] = React.useState(0);
  const [errorUriMessage, setErrorUriMessage] = useState('');
  const [errorJsonMessage, setErrorJsonMessage] = useState('');

  const handleHeadersChange = (updatedHeaders: Header[]) => {
    setHeaders(updatedHeaders);
  };

  const updateUri = () => {
    if (!errorUriMessage && !errorJsonMessage) {
      const requestData: RestHistoryData = {
        uri: replaceVariables(uri, variables),
        method,
        headers,
        params,
        body: replaceJsonVariables(body, variables),
        type: 'rest',
      };

      const encodedUri = createRestEncodedUri(requestData);
      const routeArr = window.location.pathname.split('/');
      const route = routeArr[1] + '/' + routeArr[2];
      const updatedUrl = `${window.location.origin}/${route}/${encodedUri}`;
      window.history.replaceState({}, '', updatedUrl);
    }
  };

  useEffect(() => {
    if (location.state) {
      const request: RestHistoryData = location.state as RestHistoryData;

      setMethod(request.method);
      setUrl(request.uri);
      setHeaders(request.headers);
      setBody(request.body);
      setParams(request.params);
    }
  }, [location.state]);

  useEffect(() => {
    setMode(
      method === HTTPMethods.PATCH || method === HTTPMethods.POST || method === HTTPMethods.PUT ? 'edit' : 'view',
    );
  }, [method]);

  const handleVariablesChange = (updatedVariables: Variable[]) => {
    setVariables(updatedVariables);
    let replacedBody = '';
    try {
      replacedBody = replaceJsonVariables(body, updatedVariables);
      if (mode === 'edit') {
        const message = replacedBody ? (prettifyJson(replacedBody).error?.message ?? '') : '';
        setErrorJsonMessage(message);
      }
    } catch (error) {
      if (error instanceof ReferenceError) setErrorJsonMessage(error.message);
    }
    try {
      replaceVariables(uri, updatedVariables);
      setErrorUriMessage('');
    } catch (error) {
      if (error instanceof ReferenceError) setErrorUriMessage(error.message);
    }
  };

  const handleParamsChange = (updatedParams: QueryParam[]) => {
    setParams(updatedParams);
    const params = getStringFromParams(updatedParams);
    setUri(params ? url + params : url);
  };

  const handleSendingRequest = async () => {
    const requestData: RestHistoryData = {
      uri: replaceVariables(uri, variables),
      method,
      headers,
      params,
      body: replaceJsonVariables(body, variables),
      type: 'rest',
    };
    const encodedUri = createRestEncodedUri(requestData);
    const history: RestHistoryData[] = JSON.parse(localStorage.getItem('history') || '[]');
    const additionalData = {
      encoded: `${window.location.origin}/${requestData.type}/${requestData.method}/${encodedUri}`,
    };
    history.push({...requestData, ...additionalData});

    localStorage.setItem('history', JSON.stringify(history));
    navigate(encodedUri);
    setTab(4);
  };

  const handleMethodSelection = (event: SelectChangeEvent) => {
    navigate(`/rest/${event.target.value}`);
    setMethod(event.target.value as HTTPMethods);
  };

  const handleFocusOut = () => {
    updateUri();
  };

  const handleUrlChange = (value: string) => {
    let urlStr = '';
    let searchStr = '';
    try {
      replaceVariables(value, variables);
      const url: URL = new URL(value);
      const {href, search} = url;
      searchStr = search;
      urlStr = search ? href.slice(0, -search.length) : href;
      if (value + '/' === urlStr) urlStr = value;
      setErrorUriMessage('');
    } catch (error) {
      if (error instanceof ReferenceError) setErrorUriMessage(error.message);
      if (error instanceof TypeError && !!value) setErrorUriMessage(error.message);
    }
    const newUrlStr = urlStr || value;
    setUrl(newUrlStr);
    const uri = newUrlStr + searchStr;
    setUri(uri);
    setParams(getParamsFromUri(uri));
  };

  const handleBodyChange = (body: string) => {
    setBody(body);
    let replacedBody = '';
    try {
      replacedBody = replaceJsonVariables(body, variables);
      if (method === HTTPMethods.PATCH || method === HTTPMethods.POST || method === HTTPMethods.PUT) {
        const message = replacedBody ? (prettifyJson(replacedBody).error?.message ?? '') : '';
        setErrorJsonMessage(message);
      }
    } catch (error) {
      if (error instanceof ReferenceError) setErrorJsonMessage(error.message);
    }
  };

  const handleJsonClick = () => {
    if (editorMode === 'text') {
      setPrevBody(body);
      setBody(prevBody);
      setEditorMode('JSON');
    }
  };

  const handleTextClick = () => {
    if (editorMode === 'JSON') {
      setPrevBody(body);
      setBody(prevBody);
      setEditorMode('text');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Container sx={{width: '80%', margin: '4rem auto'}}>
      <Typography component={'h4'} variant="h4" textAlign={'center'} sx={{marginBottom: '2rem'}}>
        {t('page.rest.title')}
      </Typography>
      <Box
        sx={{
          border: `1px solid ${grey[400]}`,
          borderRadius: '5px',
          display: 'flex',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
        <Select fullWidth value={method} onChange={handleMethodSelection} sx={{maxWidth: '120px'}}>
          {Object.values(HTTPMethods).map((value, index) => (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <Input
          placeholder={t('page.rest.placeholder')}
          sx={{width: '80%', margin: '5px'}}
          disableUnderline
          value={uri}
          onChange={e => handleUrlChange(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSendingRequest}
          disabled={!!errorUriMessage || !uri || !!errorJsonMessage}>
          {t('page.rest.send')}
        </Button>
      </Box>
      <FormHelperText
        style={{
          color: theme.palette.error.main,
          maxWidth: '600px',
          margin: '0 auto',
          paddingLeft: '8px',
          fontSize: '14px',
          height: '1.5rem',
        }}>
        {errorUriMessage}
      </FormHelperText>
      <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider', width: 'fit-content', margin: '1rem auto'}}>
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label={t('editors.variablesTitle')} {...a11yProps(0)} />
            <Tab label={t('editors.queryTitle')} {...a11yProps(1)} />
            <Tab label={t('editors.headersTitle')} {...a11yProps(2)} />
            <Tab label={t('editors.bodyTitle')} {...a11yProps(3)} />
            <Tab label={t('editors.responseTitle')} {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0} style={{maxWidth: '920px', margin: '0 auto'}}>
          <VariablesEditor onChange={handleVariablesChange} vars={variables} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1} style={{maxWidth: '920px', margin: '0 auto'}}>
          <QueryParamsEditor onParamsChange={handleParamsChange} queryParams={params} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2} style={{maxWidth: '920px', margin: '0 auto'}}>
          <HeadersEditor setStoredHeaders={handleHeadersChange} decodedHeaders={headers} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          <Button onClick={handleJsonClick} disabled={mode === 'view'}>
            JSON
          </Button>
          <Button onClick={handleTextClick} disabled={mode === 'view'}>
            {t('jsonEditor.text')}
          </Button>
          <JsonEditor
            data-testid="json-editor"
            mode={mode}
            type={editorMode}
            onChange={handleBodyChange}
            defaultValue={body}
            onBlur={handleFocusOut}
            errorMessage={errorJsonMessage}
          />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={4}>
          {children}
        </CustomTabPanel>
      </Box>
    </Container>
  );
};

export default RestClient;
