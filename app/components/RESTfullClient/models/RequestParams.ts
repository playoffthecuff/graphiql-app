import {Header} from '~/components/HeadersEditor/models/header';
import {HTTPMethods} from '../RestClient/models/HTTPMethods';
import {QueryParam} from '~/components/QueryParamsEditor/models/queryParams';

// export interface RequestParams {
//   endpointUrl: string;
//   method: HTTPMethods;
//   headers?: Header[];
//   variables?: Variable[];
//   body?: string;
// }

export interface RestRequestData {
  uri: string;
  method: HTTPMethods;
  headers: Header[];
  body: string;
}

export interface RestHistoryData extends RestRequestData {
  params: QueryParam[];
  type: 'rest' | 'graphql';
}
