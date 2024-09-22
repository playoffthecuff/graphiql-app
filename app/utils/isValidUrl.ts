export function isValidURL(urlString: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(urlString);
}
