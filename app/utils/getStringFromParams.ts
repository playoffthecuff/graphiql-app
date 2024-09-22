import {Header} from '~/components/HeadersEditor/models/header';
import {QueryParam} from '~/components/QueryParamsEditor/models/queryParams';

export function getStringFromParams(params: QueryParam[]) {
  const checked = params.filter(p => p.checked);
  return checked.length ? checked.reduce((a, v, i) => a + (i > 0 ? '&' : '') + v.name + '=' + v.value, '?') : '';
}

export function getStringFromHeadersParams(vars: Header[]) {
  const checked = vars.filter(v => v.checked);
  return checked.length
    ? checked.reduce(
        (a, v, i) => a + (i > 0 ? '&' : '') + encodeURIComponent(v.key) + '=' + encodeURIComponent(v.value),
        '?',
      )
    : '';
}
