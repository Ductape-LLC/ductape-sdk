import axios, { AxiosInstance, CancelToken } from "axios";
import { WORKSPACES_BASE_URL } from "../config/config.urls";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const requestInterceptor = async (config: { cancelToken: CancelToken; }) => {
  config.cancelToken = source.token;
  return config;
};
let instance: AxiosInstance;

export const workspaceClient = (auth: string, contentType: string) => {
    if (instance) return instance;
    instance = axios.create({
      baseURL: WORKSPACES_BASE_URL,
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