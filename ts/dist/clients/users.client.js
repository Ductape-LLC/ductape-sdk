"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userClient = void 0;
const axios_1 = require("axios");
const config_urls_1 = require("../config/config.urls");
const CancelToken = axios_1.default.CancelToken;
const source = CancelToken.source();
const requestInterceptor = (config) => __awaiter(void 0, void 0, void 0, function* () {
    config.cancelToken = source.token;
    return config;
});
let instance;
const userClient = (auth, contentType) => {
    if (instance)
        return instance;
    instance = axios_1.default.create({
        baseURL: config_urls_1.USER_BASE_URL,
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
exports.userClient = userClient;
//# sourceMappingURL=users.client.js.map