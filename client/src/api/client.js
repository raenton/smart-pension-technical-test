import axios from 'axios';
import config from '../config';

function createClient(http) {
  const client = {};

  client.get = (url, params) => http.get(url, params);

  client.post = (url, params) => http.post(url, params);

  client.put = (url, params) => http.put(url, params);

  client.patch = (url, params) => http.patch(url, params);

  client.delete = (url, params) => http.delete(url, params);

  return client;
}

const axiosInstance = axios.create({
  baseURL: config.API_URL,
});

const client = createClient(axiosInstance);

export default client;
