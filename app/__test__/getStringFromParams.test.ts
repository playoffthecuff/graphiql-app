import '@testing-library/jest-dom';
import {getStringFromParams} from '~/utils/getStringFromParams';
import {QueryParam} from '~/components/QueryParamsEditor/models/queryParams';

describe('getStringFromParams', () => {
  test('should return query string with checked parameters', () => {
    const params: QueryParam[] = [
      {name: 'param1', value: 'value1', checked: true},
      {name: 'param2', value: 'value2', checked: false},
      {name: 'param3', value: 'value3', checked: true},
    ];
    const result = getStringFromParams(params);
    expect(result).toBe('?param1=value1&param3=value3');
  });

  test('should return an empty string if no parameters are checked', () => {
    const params: QueryParam[] = [
      {name: 'param1', value: 'value1', checked: false},
      {name: 'param2', value: 'value2', checked: false},
    ];
    const result = getStringFromParams(params);
    expect(result).toBe('');
  });

  test('should return only the checked parameters', () => {
    const params: QueryParam[] = [
      {name: 'param1', value: 'value1', checked: true},
      {name: 'param2', value: 'value2', checked: true},
    ];
    const result = getStringFromParams(params);
    expect(result).toBe('?param1=value1&param2=value2');
  });
});
