/* eslint-disable import/no-unresolved */
import {Box, Container, Tab, Tabs, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import {SendRequestButton} from './SendRequestButton';
import {Url} from './Url';
import useGraphqlData from '~/hooks/useGraphqlData';
import {QueryEditor} from '~/components/QueryEditor';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JsonEditor from '~/components/JsonEditor/JsonEditor';
import ErrorHandler from '~/components/UI/ErrorHandler';
import {GraphqlVariablesEditor} from './GraphqlVariablesEditor';
import {CSSProperties, useState} from 'react';
import ResponseBar from '~/components/ResponseBar/ResponseBar';
import prettifyJson from '~/utils/prettifyJson';

export const GraphiqlRequest: React.FC = () => {
  const {t} = useTranslation();
  const {
    errors,
    response,
    variables,
    endpointUrl,
    sdlUrl,
    headersParams,
    query,
    schema,
    handleEndpointUrlChange,
    handleEndpointUrlBlur,
    handleSDLChange,
    setHeaders,
    handleSendRequest,
    handleQueryChange,
    clearError,
    handleVariablesChange,
    handleQueryBlur,
  } = useGraphqlData();
  const [tab, setTab] = useState(0);

  type Tabs = 'Headers' | 'Variables' | 'Query' | 'Response';

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: CSSProperties;
  }

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

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return (
    <Container sx={{width: '80%', margin: '4rem auto'}}>
      <ToastContainer />
      <ErrorHandler errors={errors} clearError={clearError} />
      <Typography component={'h4'} variant="h4" textAlign={'center'}>
        {t('links.graphqlClient')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          padding: 2,
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          gap: '1rem',
        }}>
        <Box sx={{width: '80%'}}>
          <Url
            label={t('page.graphiql.endpointUrl')}
            name="endpoint"
            value={endpointUrl}
            onChange={handleEndpointUrlChange}
            onBlur={handleEndpointUrlBlur}
            placeholder={t('page.graphiql.placeholderEndpointUrl')}
          />
          <Url
            label={t('page.graphiql.sdlUrl')}
            name="sdl"
            value={sdlUrl}
            onChange={handleSDLChange}
            placeholder={t('page.graphiql.placeholderSdlUrl')}
          />
        </Box>
        <SendRequestButton
          handleRequest={() => {
            handleSendRequest();
            setTab(3);
          }}
        />
      </Box>
      <Box sx={{width: '100%'}}>
        <Box sx={{borderBottom: 1, borderColor: 'divider', width: 'fit-content', margin: '1rem auto'}}>
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab label={t('editors.variablesTitle')} {...a11yProps(0)} />
            <Tab label={t('editors.queryTitle')} {...a11yProps(1)} />
            <Tab label={t('editors.headersTitle')} {...a11yProps(2)} />
            <Tab label={t('editors.responseTitle')} {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0} style={{maxWidth: '920px', margin: '0 auto'}}>
          <Typography component={'h5'} variant="h6" textAlign={'left'}>
            {t('common.variables')}
          </Typography>
          <GraphqlVariablesEditor value={variables} onChange={handleVariablesChange} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1} style={{maxWidth: '920px', margin: '0 auto'}}>
          <QueryEditor schema={schema} value={query} onBlur={handleQueryBlur} onChange={handleQueryChange} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2} style={{maxWidth: '920px', margin: '0 auto'}}>
          <HeadersEditor decodedHeaders={headersParams} setStoredHeaders={setHeaders} />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          <ResponseBar
            status={Number(response.status)}
            statusText={response.statusText}
            size={response.size}
            time={response.time}
          />
          <Box sx={{marginTop: '1rem'}}>
            <JsonEditor mode="view" defaultValue={prettifyJson(JSON.stringify(response.data)).json} />
          </Box>
        </CustomTabPanel>
      </Box>
    </Container>
  );
};
