import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Observable } from 'rxjs';
import {Interceptors} from "./interceptors";

export interface RxiosConfig extends AxiosRequestConfig {
  localCache?: boolean;
}

export class Rxios {
  private httpClient: AxiosInstance;

  // noinspection JSUnusedGlobalSymbols
  public get interceptors(): Interceptors {
    return this.httpClient.interceptors;
  }

  public constructor(protected options: RxiosConfig = {}) {
    this.httpClient = axios.create(options);
  }

  public get<T>(url: string, queryParams?: object) {
    return this._makeRequest<T>('GET', url, queryParams);
  }

  public post<T>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('POST', url, queryParams, body);
  }

  public put<T>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('PUT', url, queryParams, body);
  }

  public patch<T>(url: string, body: object, queryParams?: object) {
    return this._makeRequest<T>('PATCH', url, queryParams, body);
  }

  public delete(url: string, queryParams?: object) {
    return this._makeRequest('DELETE', url, queryParams);
  }

  public head(url: string, queryParams?: object) {
    return this._makeRequest('HEAD', url, queryParams);
  }

  private _makeRequest<T>(method: string, url: string, queryParams?: object, body?: object) {
    let request: AxiosPromise<T>;
    switch (method) {
      case 'GET':
        request = this.httpClient.get<T>(url, { params: queryParams });
        break;
      case 'POST':
        request = this.httpClient.post<T>(url, body, { params: queryParams });
        break;
      case 'PUT':
        request = this.httpClient.put<T>(url, body, { params: queryParams });
        break;
      case 'PATCH':
        request = this.httpClient.patch<T>(url, body, { params: queryParams });
        break;
      case 'DELETE':
        request = this.httpClient.delete(url, { params: queryParams });
        break;
      case 'HEAD':
        request = this.httpClient.head(url, { params: queryParams });
        break;

      default:
        throw new Error('Method not supported');
    }
    return new Observable<T>((subscriber: any) => {
      request
        .then((response) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
        .catch((err: Error) => {
          subscriber.error(err);
          subscriber.complete();
        });
    });
  }
}
