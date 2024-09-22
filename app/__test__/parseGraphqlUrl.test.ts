import '@testing-library/jest-dom';
import {parseGraphQLUrl} from '../utils/parseGraphqlUrl';
import {extractVariablesFromGraphQLQuery} from '../utils/exctractVariablesFromQuery';

describe('Test extractVariablesFromGraphQLQuery function', () => {
  test('Check if not extract not variable from query', () => {
    const query = `query Query { country(code: "BR") { name native capital emoji currency languages { code name } } }`;

    const expectedVariables = JSON.stringify({});
    const result = extractVariablesFromGraphQLQuery(query);
    expect(result.variables).toEqual(expectedVariables);
  });
  test('Check if handle variables with quoted values', () => {
    const query = `query Example($name: String!) {
      items(name: 2) {
        name
      }
    }`;

    const expectedVariables = JSON.stringify({name: 2});
    const result = extractVariablesFromGraphQLQuery(query);
    expect(result.variables).toEqual(expectedVariables);
  });
});

describe('Test parseGraphQLUrl function', () => {
  const base64Encode = (str: string) => btoa(str);

  test('Check if parse a valid GraphQL URL and return endpoint, query, headerParams, and variables', () => {
    const url = `http://localhost:3022/GRAPHQL/${base64Encode('https://rickandmortyapi.com/graphql')}/${base64Encode(`query GetCharacters($page: Int!) {characters(page: 2) {info {count} results { name } }}`)}?Content-Type=Application%2Fjson`;

    const result = parseGraphQLUrl(url);

    expect(result).toBeDefined();
    expect(result?.endpoint).toEqual('https://rickandmortyapi.com/graphql');
    expect(result?.query).toContain(
      `query GetCharacters($page: Int!) {characters(page: $page) {info {count} results { name } }}`,
    );
    expect(result?.headerParams).toEqual([{checked: true, key: 'Content-Type', value: 'Application/json'}]);
    expect(result?.variables).toContain(`{"page":2}`);
  });

  test('Check if return null for an invalid URL', () => {
    const result = parseGraphQLUrl('not-a-valid-url');
    expect(result).toBeNull();
  });

  test('Check if handle cases where no path exists', () => {
    const url = 'http://example.com/';
    const result = parseGraphQLUrl(url);
    expect(result).toBeNull();
  });
});
