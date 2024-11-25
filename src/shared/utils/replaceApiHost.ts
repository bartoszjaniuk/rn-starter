import { URL } from '../constants/url';

export const replaceApiHost = (url: string | undefined) => {
  if (!url) return '';
  return url.replace('{{fitapka-api-host}}', URL);
};
