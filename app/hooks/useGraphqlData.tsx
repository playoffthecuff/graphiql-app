import {useEffect, useState} from 'react';
import {transformGraphUrl} from '../utils/transformGraphUrl';
import {emptySchema} from '../utils/emptyGraphiQLSchema';
import useGraphqlErrors from './useGraphqlErrors';
import {useTranslation} from 'react-i18next';
import {isValidURL} from '../utils/isValidUrl';
import {buildClientSchema} from 'graphql';
import {useLocation} from '@remix-run/react';
import {parseGraphQLUrl} from '../utils/parseGraphqlUrl';
import {Header} from '../components/HeadersEditor/models/header';
import {saveGraphqlDataToLS} from '../utils/saveGraphqlDataToLS';

const useGraphqlData = () => {
  const {t} = useTranslation();
  const [headersParams, setHeaders] = useState<Header[]>([]);
  const {errors, setError, clearError, clearAllErrors} = useGraphqlErrors();
  const [graphqlData, setGraphqlData] = useState({
    endpointUrl: '',
    sdlUrl: '',
    query: '',
    variables: '{\n\n}',
    schema: emptySchema,
    sdl: emptySchema,
    response: {
      status: '',
      statusText: '',
      size: NaN,
      data: {},
      time: NaN,
    },
  });

  const location = useLocation();
  useEffect(() => {
    const result = parseGraphQLUrl(window.location.href);
    if (result) {
      setGraphqlData(prevState => ({
        ...prevState,
        endpointUrl: result.endpoint,
        query: result.query,
        variables: result.variables,
      }));
      setHeaders(result.headerParams);
    }
  }, [location]);

  useEffect(() => {
    transformGraphUrl(graphqlData, headersParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headersParams, graphqlData.variables]);

  const handleEndpointUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      endpointUrl: event.target.value,
    }));
  };

  const handleEndpointUrlBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (isValidURL(value)) {
      transformGraphUrl(graphqlData, headersParams);
      if (graphqlData.sdlUrl === '') {
        setGraphqlData(prevState => ({
          ...prevState,
          sdlUrl: value + '?sdl',
        }));
      }
    }
  };

  const handleSDLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGraphqlData(prevState => ({
      ...prevState,
      sdlUrl: event.target.value,
    }));
  };

  const handleQueryChange = (value: string) => {
    setGraphqlData(prevState => ({
      ...prevState,
      query: value,
    }));
  };

  const handleQueryBlur = () => {
    transformGraphUrl(graphqlData, headersParams);
  };

  const handleVariablesChange = (value: string) => {
    setGraphqlData(prevState => ({
      ...prevState,
      variables: value,
    }));
  };

  const handleSendRequest = async () => {
    clearError('response');
    clearError('request');
    let encodedHeaders: Record<string, string> = {};
    if (headersParams) {
      encodedHeaders = headersParams.reduce<Record<string, string>>((acc, header) => {
        if (header.checked) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {});
    }
    const apiUrl = `${window.location.protocol}//${window.location.host}/api/graphql`;
    if (!graphqlData.endpointUrl && !graphqlData.sdlUrl) {
      setError('request', t('errors.graphql.sendRequest'));
    }
    if (graphqlData.endpointUrl && isValidURL(graphqlData.endpointUrl)) {
      const queryData = new FormData();
      queryData.append('endpointUrl', graphqlData.endpointUrl);
      queryData.append('query', graphqlData.query);
      queryData.append('variables', graphqlData.variables);
      queryData.append('headers', JSON.stringify(encodedHeaders) !== '{}' ? JSON.stringify(encodedHeaders) : '');
      queryData.append('_action', 'QUERY');
      const start = Date.now();
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: queryData,
          redirect: 'follow',
        });
        const result = await response.json();
        const time = Date.now() - start;
        const resultData = result.data;
        const size = new TextEncoder().encode(JSON.stringify(result)).length;
        resultData.time = time;
        resultData.statusText = response.statusText;
        resultData.size = size;
        setGraphqlData(prevState => ({
          ...prevState,
          response: resultData,
        }));
        if (result.data.status !== 200) {
          setError('response', t('errors.graphql.responseErrorStatus') + result.data.status);
        }
      } catch (error) {
        if (error) {
          const time = Date.now() - start;
          setGraphqlData(prevState => ({
            ...prevState,
            response: {status: '', statusText: '', data: {}, time, size: NaN},
          }));
          setError('response', t('errors.graphql.responseError'));
        }
      }
      const saveData = {
        endpoint: graphqlData.endpointUrl,
        sdl: graphqlData.sdlUrl,
        body: graphqlData.query,
        variables: graphqlData.variables,
        headers: headersParams,
      };
      saveGraphqlDataToLS(saveData);
    } else {
      setError('response', t('errors.graphql.notValidEndpoint'));
    }
    if (graphqlData.sdlUrl && isValidURL(graphqlData.sdlUrl)) {
      const introspectionData = new FormData();
      introspectionData.append('_action', 'SDL');
      introspectionData.append('sdlUrl', graphqlData.sdlUrl);
      const start = Date.now();
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: introspectionData,
          redirect: 'follow',
        });
        const result = await response.json();
        const time = Date.now() - start;
        const size = new TextEncoder().encode(JSON.stringify(result)).length;
        const resultData = result.data;
        resultData.time = time;
        resultData.statusText = response.statusText;
        resultData.size = size;
        if (result.data) {
          setGraphqlData(prevState => ({
            ...prevState,
            schema: buildClientSchema(resultData),
          }));
        } else {
          setGraphqlData(prevState => ({
            ...prevState,
            schema: emptySchema,
          }));
        }
      } catch (error) {
        if (error) {
          setGraphqlData(prevState => ({
            ...prevState,
            schema: emptySchema,
          }));
        }
      }
    }
  };

  return {
    errors,
    headersParams,
    setHeaders,
    graphqlData,
    ...graphqlData,
    handleEndpointUrlChange,
    handleEndpointUrlBlur,
    handleSDLChange,
    handleSendRequest,
    handleQueryChange,
    clearAllErrors,
    clearError,
    handleVariablesChange,
    setGraphqlData,
    handleQueryBlur,
  };
};

export default useGraphqlData;
