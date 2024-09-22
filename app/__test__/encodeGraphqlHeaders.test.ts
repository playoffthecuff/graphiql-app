import '@testing-library/jest-dom';
import encodeHeaders from '../utils/encodeGraphqlHeaders';

describe('Test function encodeHeaders', () => {
  test('Check if return an empty string for empty string', () => {
    expect(encodeHeaders('')).toBe('');
  });

  test('Check if return an empty string for an empty object', () => {
    expect(encodeHeaders({})).toBe('');
  });

  test('Check if correctly encode a headers object', () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
      'X-Custom-Header': 'Some Value',
    };
    const result = encodeHeaders(headers);
    expect(result).toBe('Content-Type=application%2Fjson&Authorization=Bearer%20token&X-Custom-Header=Some%20Value');
  });

  test('Check if correctly encode a JSON string input', () => {
    const headersString = '{"Content-Type":"application/json","Authorization":"Bearer token"}';
    const result = encodeHeaders(headersString);
    expect(result).toBe('Content-Type=application%2Fjson&Authorization=Bearer%20token');
  });

  test('Check if handle special characters in keys and values', () => {
    const headers = {
      'X-Special-Header': 'Space Value%',
      'Another&Header': 'Value with / slash',
    };
    const result = encodeHeaders(headers);
    expect(result).toBe('X-Special-Header=Space%20Value%25&Another%26Header=Value%20with%20%2F%20slash');
  });
});
