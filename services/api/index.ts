import axios from 'axios'
import { BASE_API_URL } from '@/config/api'

const BASE_REQUEST_OPTIONS = {
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/json',
    'redirect': 'follow'
  }
}

const proxyApi = axios.create({
  baseURL: '/api',
  ...BASE_REQUEST_OPTIONS
});

const marketplaceApi = axios.create({
  baseURL: BASE_API_URL,
  ...BASE_REQUEST_OPTIONS
});

proxyApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

marketplaceApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {
  proxyApi,
  marketplaceApi
}