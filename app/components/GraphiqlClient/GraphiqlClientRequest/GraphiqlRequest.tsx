/* eslint-disable import/no-unresolved */
import {Box, Container, Typography} from '@mui/material';
import {useTranslation} from 'react-i18next';
import HeadersEditor from '~/components/HeadersEditor/HeadersEditor';
import VariablesEditor from '~/components/VariablesEditor/VariablesEditor';
import {SendRequestButton} from './SendRequestButton';
import {Url} from './Url';
import useGraphqlData from '~/hooks/useGraphqlData';
import {Documentation} from '../Documentation';
import JsonEditor from '~/components/JsonEditor/JsonEditor';

export const GraphiqlRequest: React.FC = () => {
  const {t} = useTranslation();
  const {
    errors,
    sdl,
    endpointUrl,
    sdlUrl,
    handleEndpointUrlChange,
    handleEndpointUrlBlur,
    handleSDLChange,
    handleSendRequest,
    handleQueryChange,
  } = useGraphqlData();

  return (
    <Container maxWidth="xl">
      {errors ? Object.entries(errors).map(([key, value]) => <div key={key}>Errors: {value as string}</div>) : null}
      <Typography component={'h4'} variant="h4" textAlign={'center'}>
        {t('links.graphqlClient')}
      </Typography>
      <div>
        <Box sx={{flexGrow: 1, padding: 2}}>
          <SendRequestButton handleRequest={handleSendRequest} />
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
        <HeadersEditor />
        <JsonEditor defaultValue="" type="JSON" mode="edit" onChange={handleQueryChange} />
        <VariablesEditor />
      </div>
    </Container>
  );
};
