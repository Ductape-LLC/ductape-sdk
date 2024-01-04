import axios, { AxiosInstance, CancelToken } from "axios";
import { APPS_BASE_URL } from "../api/urls";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const requestInterceptor = async (config: { cancelToken: CancelToken; }) => {
  config.cancelToken = source.token;
  return config;
};
let instance: AxiosInstance;

const appsClient = () => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: APPS_BASE_URL,
    timeout: 15000,
    withCredentials: false
  });

  // @ts-ignore
  instance.interceptors.request.use(requestInterceptor);
  return instance;
};

export default appsClient;