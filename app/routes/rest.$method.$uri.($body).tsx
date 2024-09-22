import {Box} from '@mui/material';
import {useLoaderData} from '@remix-run/react';
import {json, LoaderFunctionArgs} from '@vercel/remix';
import {useTranslation} from 'react-i18next';
import {StartOverLink} from '~/components/CustomLinks';
import {ErrorBoundaryWrapper} from '~/components/ErrorBoundary/ErrorBoundary';
import JsonEditor from '~/components/JsonEditor/JsonEditor';
import ProtectedRoute from '~/components/ProtectedRoute/ProtectedRoute';
import ResponseBar from '~/components/ResponseBar/ResponseBar';
import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import fetchRestData, {ResponseData} from '~/utils/fetchRestData';

type Routes = {
  method: HTTPMethods;
  uri: string;
  body: string;
  params: string;
};

interface LoaderResponseData extends ResponseData {
  isText: boolean;
}

type LoaderData = {
  loaderData: LoaderResponseData;
};

export function ErrorBoundary() {
  const {t} = useTranslation();
  return (
    <ErrorBoundaryWrapper>
      <StartOverLink message={t('errorBoundary.startOver')} />
    </ErrorBoundaryWrapper>
  );
}

export async function loader({params, request}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const method = params.method as HTTPMethods;
  const routes: Routes = {
    method,
    uri: params.uri ?? '',
    body: params.body ?? '',
    params: url.search ?? '',
  };
  const data = await fetchRestData(routes.method, routes.uri, routes.body, routes.params);
  data.time = Date.now() - data.time;
  const headersObj = Object.fromEntries(data.headers.entries());
  const isText = headersObj['content-type']?.includes('text') ?? false;
  const loaderData: LoaderResponseData = {...data, isText};

  return json({routes, loaderData});
}

export default function RESTMethodRoute() {
  const {loaderData} = useLoaderData<LoaderData>();
  return (
    <>
      <ProtectedRoute>
        <ResponseBar
          status={loaderData.status}
          statusText={loaderData.statusText}
          size={loaderData.size}
          time={loaderData.time}
        />
        <Box sx={{marginTop: '1rem'}}>
          <JsonEditor mode="view" defaultValue={loaderData.payload} type={loaderData.isText ? 'text' : 'JSON'} />
        </Box>
      </ProtectedRoute>
    </>
  );
}
