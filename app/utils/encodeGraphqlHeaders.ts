export default function encodeHeaders(headers: Record<string, string> | string) {
  if (!headers) return '';

  if (typeof headers === 'string') {
    headers = JSON.parse(headers);
  }
  if (headers) {
    return Object.entries(headers)
      .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
      .join('&');
  }
}
