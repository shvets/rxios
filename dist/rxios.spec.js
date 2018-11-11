"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nock = require("nock");
const rxios_1 = require("./rxios");
const mockServer = nock('http://test.com');
describe('GET method', () => {
    let rxiosInstance;
    beforeEach(() => {
        rxiosInstance = new rxios_1.Rxios({
            baseURL: 'http://test.com/'
        });
    });
    it('makes a successful GET req', () => __awaiter(this, void 0, void 0, function* () {
        const expected = { id: 1, title: 'rxios is so cool!', author: 'davguij' };
        mockServer.get('/posts/1').reply(200, expected);
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.get('http://test.com/posts/1').subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toEqual(expected);
    }));
    it('throws an error on a failed GET req', () => __awaiter(this, void 0, void 0, function* () {
        mockServer.get('/posts/1').replyWithError('Request failed with status code 500');
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.get('http://test.com/posts/1').subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).rejects.toBeInstanceOf(Error);
    }));
    it('accepts queryParams', () => __awaiter(this, void 0, void 0, function* () {
        mockServer
            .get('/posts')
            .query({ title: 'rxios', author: 'davguij' })
            .reply(200);
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.get('http://test.com/posts', { title: 'rxios', author: 'davguij' }).subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toBeDefined();
    }));
    it('accepts a type for the response', () => __awaiter(this, void 0, void 0, function* () {
        const response = { cool: true };
        mockServer.get('/post/1').reply(200, response);
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.get('http://test.com/post/1').subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toBeDefined();
    }));
});
describe('POST method', () => {
    let rxiosInstance;
    beforeEach(() => {
        rxiosInstance = new rxios_1.Rxios({
            baseURL: 'http://test.com/'
        });
    });
    it('makes a successful POST req', () => __awaiter(this, void 0, void 0, function* () {
        mockServer.post('/posts').reply(201);
        const body = { title: 'json-server', author: 'davguij' };
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.post('posts', body).subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toBeDefined();
    }));
    it('throws an error on a failed POST req', () => __awaiter(this, void 0, void 0, function* () {
        mockServer.post('/posts').replyWithError('Request failed with status code 500');
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.post('http://test.com/posts', {}).subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).rejects.toBeInstanceOf(Error);
    }));
});
describe('rest of methods', () => {
    let rxiosInstance;
    beforeEach(() => {
        rxiosInstance = new rxios_1.Rxios({
            baseURL: 'http://test.com/'
        });
    });
    it('makes a successful PUT req', () => __awaiter(this, void 0, void 0, function* () {
        const body = { title: 'json-server', author: 'davguij' };
        mockServer.put('/post/1').reply(200, body);
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.put('post/1', body).subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toEqual(body);
    }));
    it('makes a successful PATCH req', () => __awaiter(this, void 0, void 0, function* () {
        const body = { title: 'json-server', author: 'davguij' };
        mockServer.patch('/post/1').reply(200, body);
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.patch('post/1', body).subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toEqual(body);
    }));
    it('makes a successful DELETE req', () => __awaiter(this, void 0, void 0, function* () {
        mockServer.delete('/post/1').reply(200);
        const promise = new Promise((resolve, reject) => {
            rxiosInstance.delete('post/1').subscribe((resp) => {
                resolve(resp);
            }, (err) => {
                reject(err);
            });
        });
        yield expect(promise).resolves.toBeDefined();
    }));
});
//# sourceMappingURL=rxios.spec.js.map