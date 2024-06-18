import axios, { AxiosInstance, CancelToken } from "axios";
import { LOGS_BASE_URL } from "../api/urls";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const requestInterceptor = async (config: { cancelToken: CancelToken; }) => {
  config.cancelToken = source.token;
  return config;
};
let instance: AxiosInstance;

export const logsClient = (auth: string, contentType: string) => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: LOGS_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': contentType,
      Authorization: auth
    },
    withCredentials: false
  });

  // @ts-ignore
  instance.interceptors.request.use(requestInterceptor);
  return instance;
};