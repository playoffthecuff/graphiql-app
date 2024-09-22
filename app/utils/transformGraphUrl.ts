import encodeHeaders from './encodeGraphqlHeaders';
import {Header} from '../components/HeadersEditor/models/header';
import {processGraphQLQuery} from './processGraphqlQuery';

interface Url {
  endpointUrl: string;
  query: string;
  variables: string;
}
type encodedHValue = Record<string, string>;

export function transformGraphUrl(data: Url, headers: Header[]): void {
  const {endpointUrl, query, variables} = data;

  const method = 'GRAPHQL';
  let encodedHeaders = {};
  let encodedHeadersUrl: string = '';
  const encodedEndpoint = endpointUrl ? `${btoa(endpointUrl)}/` : '';
  if (headers) {
    encodedHeaders = headers.reduce<encodedHValue>((acc, header) => {
      if (header.checked) {
        acc[header.key] = header.value;
      }
      return acc;
    }, {});
    encodedHeadersUrl = encodeHeaders(JSON.stringify(encodedHeaders)) as string;
  }
  const encodedBody = btoa(processGraphQLQuery(query, variables));
  const urlParts = [
    `${method}/`,
    `${encodedEndpoint}`,
    encodedBody ? `${encodedBody}` : '',
    encodedHeadersUrl ? `?${encodedHeadersUrl}` : '',
  ];
  const newUrl = `/${urlParts.join('')}`;
  window.history.replaceState({}, '', newUrl);
}
