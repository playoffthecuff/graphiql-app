import {RestRequestData} from '~/components/RESTfullClient/models/RequestParams';
import {HTTPMethods} from '~/components/RESTfullClient/RestClient/models/HTTPMethods';
import {getStringFromHeadersParams} from './getStringFromParams';

export default function createRestEncodedUri(requestData: RestRequestData) {
  const uriSegment = btoa(requestData.uri);
  const isBodyNecessary =
    !!requestData.body &&
    (requestData.method === HTTPMethods.PATCH ||
      requestData.method === HTTPMethods.POST ||
      requestData.method === HTTPMethods.PUT);
  const bodySegment = isBodyNecessary ? '/' + btoa(JSON.stringify(JSON.parse(requestData.body))) : '';
  const headersSegment = getStringFromHeadersParams(requestData.headers);
  return uriSegment + bodySegment + headersSegment;
}
