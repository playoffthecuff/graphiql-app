import {Header} from '../components/HeadersEditor/models/header';
import {extractVariablesFromGraphQLQuery} from './exctractVariablesFromQuery';

function extractHeaderParams(searchParams: URLSearchParams): Header[] {
  const headerParams: Header[] = [];
  searchParams.forEach((value: string, key: string) => {
    headerParams.push({
      key: key,
      value: value,
      checked: true,
    });
  });
  return headerParams;
}

function decodePathname(pathname: string) {
  const parts = pathname.split('/');
  const endpointBase64 = parts[2];
  const bodyBase64 = parts[3];
  const endpoint = atob(endpointBase64);
  const queryUrl = atob(bodyBase64);
  return {endpoint, queryUrl};
}

export function parseGraphQLUrl(url: string) {
  try {
    const urlObject = new URL(url);
    const decodedPath = decodePathname(urlObject.pathname);
    const {endpoint, queryUrl} = decodedPath;
    const {updatedQuery, variables} = extractVariablesFromGraphQLQuery(queryUrl);
    const query = updatedQuery ?? queryUrl;
    const headerParams = extractHeaderParams(urlObject.searchParams);
    return {
      endpoint,
      query,
      headerParams,
      variables,
    };
  } catch (error) {
    if (error) {
      return null;
    }
  }
}
