import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { Interceptors } from "./interceptors";
export interface RxiosConfig extends AxiosRequestConfig {
    localCache?: boolean;
}
export declare class Rxios {
    protected options: RxiosConfig;
    private httpClient;
    readonly interceptors: Interceptors;
    constructor(options?: RxiosConfig);
    get<T>(url: string, queryParams?: object): Observable<T>;
    post<T>(url: string, body: object, queryParams?: object): Observable<T>;
    put<T>(url: string, body: object, queryParams?: object): Observable<T>;
    patch<T>(url: string, body: object, queryParams?: object): Observable<T>;
    delete(url: string, queryParams?: object): Observable<{}>;
    head(url: string, queryParams?: object): Observable<{}>;
    private _makeRequest;
}
