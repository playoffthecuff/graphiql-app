import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import prettifyJson from './prettifyJson';

export type ResponseData = {
  headers: Headers;
  payload: string;
  status: number;
  statusText: string;
  size: number;
  time: number;
};

const ErrorResponse: ResponseData = {
  headers: new Headers(),
  payload: '',
  status: NaN,
  statusText: 'Failed to fetch',
  size: NaN,
  time: NaN,
};

export default async function fetchRestData(
  method: HTTPMethods,
  encodedUri: string,
  encodedBody: string = '',
  queryParams: string = '',
): Promise<ResponseData> {
  const headersArr = Array.from(new URLSearchParams(queryParams)).map(h => h.map(v => decodeURIComponent(v)));
  const headers: Record<string, string> = Object.fromEntries(headersArr);

  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const uri = atob(encodedUri);

  const body = atob(encodedBody);

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if ([HTTPMethods.POST, HTTPMethods.PUT, HTTPMethods.PATCH].includes(method)) {
    fetchOptions.body = body || '{}';
  }
  const start = Date.now();
  try {
    const response = await fetch(uri, fetchOptions);
    const cloneResponse = response.clone();
    const blob = await cloneResponse.blob();
    const headers = response.headers;
    let payload = '';
    if (headers.get('content-type')?.includes('json')) {
      const responseObj: object = await response.json();
      payload = prettifyJson(JSON.stringify(responseObj)).json;
    }
    if (headers.get('content-type')?.includes('text')) {
      payload = await response.text();
    }
    const status = response.status;
    const statusText = response.statusText;
    const size = blob.size;
    return {headers, payload, status, statusText, size, time: start};
  } catch (error) {
    console.error('Fetch error:', error);
    const data = ErrorResponse;
    data.time = start;
    return data;
  }
}
