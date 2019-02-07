import {AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse} from "axios";

export interface Interceptors {
  request: AxiosInterceptorManager<AxiosRequestConfig>;

  response: AxiosInterceptorManager<AxiosResponse>;
}
