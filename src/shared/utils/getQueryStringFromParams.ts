import { stringify } from 'qs';

export const getQueryStringFromParams = (queryParams: { [key: string]: unknown }) => {
  const options: qs.IStringifyOptions = {
    addQueryPrefix: true,
    skipNulls: true,
  };

  const filteredQueryParams = Object.keys(queryParams).reduce((params, paramName) => {
    if (!queryParams[paramName]) {
      return params;
    }

    return { ...params, [paramName]: queryParams[paramName] };
  }, {});

  return stringify(filteredQueryParams, options);
};
