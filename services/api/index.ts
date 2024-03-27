import axios from "axios";
import { BASE_API_URL } from "@/config/api";

const BASE_REQUEST_OPTIONS = {
  timeout: 5000,
  headers: {
    redirect: "follow",
  },
};

const marketplaceApi = axios.create({
  baseURL: BASE_API_URL,
  ...BASE_REQUEST_OPTIONS,
});

const launchpadAPi = axios.create({
  baseURL: BASE_API_URL,
  ...BASE_REQUEST_OPTIONS,
});

marketplaceApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

launchpadAPi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

export { marketplaceApi, launchpadAPi };
