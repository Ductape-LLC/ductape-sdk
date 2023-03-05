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
exports.fetchDomains = exports.fetchSetup = exports.fetchAppSetupsEnvs = exports.fetchAppSetups = exports.createAppSetup = exports.deleteAppFaq = exports.updateAppFaq = exports.createAppFaq = exports.createAppEnv = exports.updateAppEnv = exports.fetchAppEnv = exports.fetchApp = exports.fetchWorkspaceApps = exports.updateApp = exports.createApp = void 0;
const apps_client_1 = require("../clients/apps.client");
const config_urls_1 = require("../config/config.urls");
const constant_1 = require("../config/constant");
const createApp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, app_name, public_key, workspace_id, description, returned } = payload;
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').post(config_urls_1.APPS_CREATE_URL, {
            user_id,
            app_name,
            public_key,
            workspace_id,
            description,
            returned,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.createApp = createApp;
const updateApp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.APP_FETCH_URL, ':app_id', app_id);
        delete payload.token;
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').put(URL, payload);
    }
    catch (e) {
        throw e;
    }
});
exports.updateApp = updateApp;
const fetchWorkspaceApps = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key, workspace_id } = payload;
        let { status } = payload;
        if (!status)
            status = 'all';
        let URL = (0, constant_1.Parameterize)(config_urls_1.APPS_FETCH_URL, ':workspace_id', workspace_id);
        URL = (0, constant_1.Parameterize)(URL, ':status', status);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchWorkspaceApps = fetchWorkspaceApps;
const fetchApp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key, app_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.APP_FETCH_URL, ':app_id', app_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchApp = fetchApp;
const fetchAppEnv = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key, env_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.ENV_UPDATE_URL, ':env_id', env_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchAppEnv = fetchAppEnv;
const updateAppEnv = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, env_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.ENV_UPDATE_URL, ':env_id', env_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').put(URL, payload);
    }
    catch (e) {
        throw e;
    }
});
exports.updateAppEnv = updateAppEnv;
const createAppEnv = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, public_key, workspace_id, env_name, description, slug, user_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.APP_ENV_CREATE, ':app_id', app_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').post(URL, {
            public_key,
            workspace_id,
            env_name,
            description,
            slug,
            user_id,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.createAppEnv = createAppEnv;
const createAppFaq = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, public_key, question, answer, user_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.APP_FAQ_CREATE, ':app_id', app_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').post(URL, {
            public_key,
            question,
            answer,
            user_id,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.createAppFaq = createAppFaq;
const updateAppFaq = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, faq_id, public_key, question, answer, user_id } = payload;
        let URL = (0, constant_1.Parameterize)(config_urls_1.APP_FAQ_UPDATE, ':app_id', app_id);
        URL = (0, constant_1.Parameterize)(URL, ':faq_id', faq_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').put(URL, {
            public_key,
            question,
            answer,
            user_id,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.updateAppFaq = updateAppFaq;
const deleteAppFaq = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, public_key, user_id, faq_id } = payload;
        let URL = (0, constant_1.Parameterize)(config_urls_1.APP_FAQ_UPDATE, ':app_id', app_id);
        URL = (0, constant_1.Parameterize)(URL, ':faq_id', faq_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').delete(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.deleteAppFaq = deleteAppFaq;
const createAppSetup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, public_key, user_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.APP_CREATE_SETUP, ':app_id', app_id);
        delete payload.token;
        delete payload.app_id;
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').post(URL, Object.assign({ public_key,
            user_id }, payload));
    }
    catch (e) {
        throw e;
    }
});
exports.createAppSetup = createAppSetup;
const fetchAppSetups = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, public_key, user_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.APP_SETUP_FETCH, ':app_id', app_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchAppSetups = fetchAppSetups;
const fetchAppSetupsEnvs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, app_id, public_key, user_id, env_id } = payload;
        let URL = (0, constant_1.Parameterize)(config_urls_1.APP_SETUP_ENV_FETCH, ':app_id', app_id);
        URL = (0, constant_1.Parameterize)(URL, ':env_id', env_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchAppSetupsEnvs = fetchAppSetupsEnvs;
const fetchSetup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, setup_id, user_id, public_key } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.SETUP_FETCH_URL, ':setup_id', setup_id);
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchSetup = fetchSetup;
const fetchDomains = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key } = payload;
        const URL = config_urls_1.DOMAINS_FETCH_URL;
        return (0, apps_client_1.default)(`Bearer ${token}`, 'application/json').get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchDomains = fetchDomains;
//# sourceMappingURL=apps.service.js.map