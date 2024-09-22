import {Header} from '~/components/HeadersEditor/models/header';
import {Variable} from '~/components/models/variable';

export type RequestStatus = 'idle' | 'pending' | 'fullfilled' | 'rejected';

export interface GraphqlRequestState {
  endpointUrl: string;
  sdlUrl: string;
  query: string;
  headers: Header | Header[] | null;
  variables: Variable | Variable[] | null;
}

export const initialStateGraphqlRequest: GraphqlRequestState = {
  endpointUrl: '',
  sdlUrl: '',
  query: '',
  headers: null,
  variables: null,
};
