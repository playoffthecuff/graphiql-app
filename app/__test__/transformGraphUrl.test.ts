import '@testing-library/jest-dom';
import encodeHeaders from '../utils/encodeGraphqlHeaders';
import {processGraphQLQuery} from '../utils/processGraphqlQuery';
import {transformGraphUrl} from '../utils/transformGraphUrl';
import {Header} from '../components/HeadersEditor/models/header';

describe('encodeHeaders', () => {
  test('Check if return an empty string for empty string', () => {
    expect(encodeHeaders('')).toBe('');
  });

  test('Check if correctly encode a headers object', () => {
    const headers = {'Content-Type': 'application/json', Authorization: 'Bearer token'};
    const result = encodeHeaders(headers);
    expect(result).toMatch(/Content-Type=application%2Fjson&Authorization=Bearer%20token/);
  });

  test('Check if correctly encode a JSON string of headers', () => {
    const headersStr = JSON.stringify({'Content-Type': 'application/json', Authorization: 'Bearer token'});
    const result = encodeHeaders(headersStr);
    expect(result).toMatch(/Content-Type=application%2Fjson&Authorization=Bearer%20token/);
  });

  test('Check if return an empty string for an empty headers object', () => {
    expect(encodeHeaders({})).toBe('');
  });
});

describe('Test processGraphQLQuery', () => {
  test('Check if return the original query if variables string is empty', () => {
    const query = 'query GetBooks { books { title } }';
    const result = processGraphQLQuery(query, '{}');
    expect(result).toBe(query);
  });

  test('Check if replace variables in the query with their values', () => {
    const query = 'query GetBooks($first: Int!, $after: String) { books(first: $first, after: $after) { title } }';
    const variables = '{"first": 10, "after": null}';
    const result = processGraphQLQuery(query, variables);
    expect(result).toContain(
      'query GetBooks($first: Int!, $after: String) { books(first: 10, after: null) { title } }',
    );
  });

  test('Check if return the original query if variable name does not exist in variables', () => {
    const query = 'query GetBooks($first: Int!) { books(first: $first) { title } }';
    const variables = '{"after": null}';
    const result = processGraphQLQuery(query, variables);
    expect(result).toBe(query);
  });

  test('Check if handle JSON parse errors gracefully', () => {
    const query = 'query GetBooks($first: Int!) { books(first: $first) { title } }';
    const result = processGraphQLQuery(query, '{first: 10}');
    expect(result).toBe(query);
  });
});

describe('transformGraphUrl', () => {
  beforeEach(() => {
    jest.spyOn(window.history, 'replaceState').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('Check if construct the URL correctly if headers are present', () => {
    const data = {
      endpointUrl: 'http://example.com/graphql',
      query: 'query GetBooks { books { title } }',
      variables: '{"first": 10}',
    };

    const headers: Header[] = [
      {key: 'Authorization', value: 'Bearer token', checked: true},
      {key: 'Content-Type', value: 'application/json', checked: false},
    ];

    transformGraphUrl(data, headers);

    expect(window.history.replaceState).toHaveBeenCalled();
    const expectedUrlPart = `GRAPHQL/${btoa(data.endpointUrl)}/${btoa(data.query)}?Authorization=Bearer%20token`;
    expect((window.history.replaceState as jest.Mock).mock.calls[0][1]).toBe('');
    expect((window.history.replaceState as jest.Mock).mock.calls[0][2]).toContain(expectedUrlPart);
  });

  test('Check if handle no headers', () => {
    const data = {
      endpointUrl: 'http://example.com/graphql',
      query: 'query GetBooks { books { title } }',
      variables: '{"first": 10}',
    };

    const headers: Header[] = [];

    transformGraphUrl(data, headers);

    const expectedUrlPart = `GRAPHQL/${btoa(data.endpointUrl)}/${btoa(data.query)}`;
    expect(window.history.replaceState).toHaveBeenCalled();
    expect((window.history.replaceState as jest.Mock).mock.calls[0][2]).toContain(expectedUrlPart);
  });
});
