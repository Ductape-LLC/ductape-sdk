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
exports.forgotUser = exports.loginUser = exports.registerUser = void 0;
const users_client_1 = require("../clients/users.client");
const config_urls_1 = require("../config/config.urls");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, users_client_1.userClient)("", "application/json").post(config_urls_1.USER_CREATE_URL, payload);
    }
    catch (e) {
        throw e;
    }
});
exports.registerUser = registerUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, users_client_1.userClient)("", "application/json").post(config_urls_1.USER_LOGIN_URL, payload);
});
exports.loginUser = loginUser;
const forgotUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, users_client_1.userClient)("", "application/json").post(config_urls_1.USER_FORGOT_URL, payload);
});
exports.forgotUser = forgotUser;
//# sourceMappingURL=users.service.js.map