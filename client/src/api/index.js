import client from './client';
import WeblogService from './services/WeblogService';

const Api = (httpClient) => {
  /**
   * redux has problems with Error objects so I am catching everything here
   * and mapping it to a format that won't make redux complain
   * and circumvents the need to map the errors repeatedly in
   * every single thunk
   */
  function sanitiseErrorHandling(fn) {
    return function () {
      return fn(...arguments)
        .then(result => result)
        .catch(err => Promise.reject({
          message: err?.response?.data?.message ?? 'An unknown error occurred. Please contact the developer.',
          status: err?.response?.status ?? '000',
          statusText: err?.response?.statusText ?? 'Unknown',
        }));
    };
  }

  // This could be improved
  const sanitisedClient = {
    ...httpClient,
    get: sanitiseErrorHandling(httpClient.get),
    post: sanitiseErrorHandling(httpClient.post),
    put: sanitiseErrorHandling(httpClient.put),
    patch: sanitiseErrorHandling(httpClient.patch),
    delete: sanitiseErrorHandling(httpClient.delete),
  };

  return {
    weblogService: WeblogService(sanitisedClient)
  };
};

export default Api(client);
