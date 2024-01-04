import axios, { AxiosInstance, CancelToken } from "axios";
import { WORKSPACES_BASE_URL, USER_BASE_URL } from "../api/urls";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const requestInterceptor = async (config: { cancelToken: CancelToken; }) => {
  config.cancelToken = source.token;
  return config;
};
let instance: AxiosInstance;

export const userClient = (auth: string, contentType: string) => {
  if (instance) return instance;
  instance = axios.create({
    baseURL: USER_BASE_URL,
    timeout: 5000,
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
