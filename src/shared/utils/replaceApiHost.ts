import { URL } from '../constants/url';

export const replaceApiHost = (url: string | undefined) => {
  if (!url) return undefined;
  return url.replace('{{fitapka-api-host}}', URL);
};
