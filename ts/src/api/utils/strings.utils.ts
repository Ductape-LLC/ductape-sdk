import { PathParams } from "../../types/inputs.types";

export const Parameterize = (URL: string, datapoint: string, replacement: string) => {
  return URL.replace(datapoint, replacement);
}

export const extractPathParams = (path: string): PathParams => {
  const regex = /:(\w+)/g;
  const matches = path.match(regex);

  if (!matches) {
    return {};
  }

  return matches.reduce((params: PathParams, match) => {
    const paramName = match.slice(1); // Remove leading ":"
    params[paramName] = match;
    return params;
  }, {});
}

export const extractQueryParams = (url: string): Record<string, string> => {
  const queryString = url.split('?')[1];

  if (!queryString) {
    return {}; // No query parameters found
  }

  const queryParamsArray = queryString.split('&');
  const params: Record<string, string> = {};

  queryParamsArray.forEach((param) => {
    const [key, value] = param.split('=');
    params[key] = decodeURIComponent(value);
  });

  return params;
}