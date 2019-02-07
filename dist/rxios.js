"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const rxjs_1 = require("rxjs");
class Rxios {
    constructor(options = {}) {
        this.options = options;
        this.httpClient = axios_1.default.create(options);
    }
    // noinspection JSUnusedGlobalSymbols
    get interceptors() {
        return this.httpClient.interceptors;
    }
    get(url, queryParams) {
        return this._makeRequest('GET', url, queryParams);
    }
    post(url, body, queryParams) {
        return this._makeRequest('POST', url, queryParams, body);
    }
    put(url, body, queryParams) {
        return this._makeRequest('PUT', url, queryParams, body);
    }
    patch(url, body, queryParams) {
        return this._makeRequest('PATCH', url, queryParams, body);
    }
    delete(url, queryParams) {
        return this._makeRequest('DELETE', url, queryParams);
    }
    head(url, queryParams) {
        return this._makeRequest('HEAD', url, queryParams);
    }
    _makeRequest(method, url, queryParams, body) {
        let request;
        switch (method) {
            case 'GET':
                request = this.httpClient.get(url, { params: queryParams });
                break;
            case 'POST':
                request = this.httpClient.post(url, body, { params: queryParams });
                break;
            case 'PUT':
                request = this.httpClient.put(url, body, { params: queryParams });
                break;
            case 'PATCH':
                request = this.httpClient.patch(url, body, { params: queryParams });
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
        return new rxjs_1.Observable((subscriber) => {
            request
                .then((response) => {
                subscriber.next(response.data);
                subscriber.complete();
            })
                .catch((err) => {
                subscriber.error(err);
                subscriber.complete();
            });
        });
    }
}
exports.Rxios = Rxios;
//# sourceMappingURL=rxios.js.map