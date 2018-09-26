import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON);
}

const paramString = (params) => {
  if (params.length === 0) {
    return null;
  }

  const filteredParams = Object.keys(params).filter(
    (key) => params[key] != null && params[key] !== ''
  );

  return filteredParams.map(
    (key) => `${key}=${window.encodeURIComponent(params[key])}`
  ).join('&');
};

const BASE_URL = process.env.NODE_ENV !== 'production' ? (
  'http://localhost:8000'
) : 'https://api.insurance.rexhepberlajolli.me';

const apiFetch = (path, options) => {
  const {
    urlParams,
    data,
    method,
    headers,
    ...remOptions
  } = options || {};

  const url = [
    [BASE_URL, '/api/v1', path].join(''),
    paramString(urlParams || [])
  ].filter((e) => e != null).join('?');

  let modifiedHeaders = Object.assign({}, headers);
  modifiedHeaders = Object.assign(modifiedHeaders, {
    'Content-Type': 'application/json',
  });

  // const token = getToken();
  // if (token) {
  //   modifiedHeaders = Object.assign(modifiedHeaders, { Authorization: `JWT ${token}` });
  // }

  let requestOptions = {
    headers: modifiedHeaders,
    remOptions,
  };

  if (method !== 'GET' && method !== 'HEAD') {
    const body = JSON.stringify(data);
    requestOptions = Object.assign(requestOptions, {
      body,
      method,
    });
  }
  return request(url, ...requestOptions);
};

export default apiFetch;
