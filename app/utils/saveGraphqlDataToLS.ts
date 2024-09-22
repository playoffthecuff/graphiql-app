interface Data {
  endpoint: string;
  sdl: string;
  body: string;
  headers: object;
  variables: string;
}
export function saveGraphqlDataToLS(data: Data) {
  const existingData = localStorage.getItem('history');
  const historyData = existingData ? JSON.parse(existingData) : [];
  const localStorageData = {
    uri: data.endpoint,
    sdl: data.sdl,
    method: 'GRAPHQL',
    headers: data.headers,
    body: data.body,
    variables: data.variables,
    encoded: `${window.location.pathname}${window.location.search}`,
  };
  historyData.push(localStorageData);
  localStorage.setItem('history', JSON.stringify(historyData));
}
