import { URL } from 'src/providers/AuthContext';

export const replaceApiHost = (url: string | undefined) => {
  if (!url) return undefined;
  return url.replace('{{fitapka-api-host}}', URL);
};
