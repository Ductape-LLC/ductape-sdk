import axios, { AxiosInstance, CancelToken } from "axios";
import { INTEGRATIONS_BASE_URL } from "../api/urls";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const requestInterceptor = async (config: { cancelToken: CancelToken; }) => {
  config.cancelToken = source.token;
  return config;
};
let instance: AxiosInstance;

export const integrationsClient = () => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: INTEGRATIONS_BASE_URL,
    timeout: 15000,
    withCredentials: false
  });

  // @ts-ignore
  instance.interceptors.request.use(requestInterceptor);
  return instance;
};