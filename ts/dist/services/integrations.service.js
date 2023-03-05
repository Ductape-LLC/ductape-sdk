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
exports.createIntegrationApp = exports.createIntegrationEnv = exports.fetchIntegrationApps = exports.fetchIntegrationEnvs = exports.updateIntegrationEnv = exports.fetchIntegration = exports.fetchWorkspaceIntegrations = exports.createIntegration = void 0;
const integrations_client_1 = require("../clients/integrations.client");
const config_urls_1 = require("../config/config.urls");
const constant_1 = require("../config/constant");
const createIntegration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, name, public_key, workspace_id, description } = payload;
        //alert(JSON.stringify(payload));
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").post(config_urls_1.INTEGRATIONS_CREATE_URL, { user_id, name, public_key, workspace_id, description });
    }
    catch (e) {
        throw e;
    }
});
exports.createIntegration = createIntegration;
const fetchWorkspaceIntegrations = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key, workspace_id } = payload;
        let { status } = payload;
        if (!status)
            status = "all";
        let URL = (0, constant_1.Parameterize)(config_urls_1.INTEGRATIONS_FETCH_URL, ":workspace_id", workspace_id);
        URL = (0, constant_1.Parameterize)(URL, ":status", status);
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchWorkspaceIntegrations = fetchWorkspaceIntegrations;
const fetchIntegration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key, integration_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.INTEGRATION_FETCH_URL, ":integration_id", integration_id);
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchIntegration = fetchIntegration;
const updateIntegrationEnv = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, env_id } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.ENV_UPDATE_URL, ":env_id", env_id);
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").put(URL, payload);
    }
    catch (e) {
        throw e;
    }
});
exports.updateIntegrationEnv = updateIntegrationEnv;
const fetchIntegrationEnvs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, integration_id, user_id, public_key } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.INTEGRATION_ENVS_URL, ":integration_id", integration_id);
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchIntegrationEnvs = fetchIntegrationEnvs;
const fetchIntegrationApps = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, integration_id, user_id, public_key } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.INTEGRATION_APP_URL, ":integration_id", integration_id);
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").get(`${URL}?user_id=${user_id}&public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchIntegrationApps = fetchIntegrationApps;
const createIntegrationEnv = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, integration_id, public_key, workspace_id, env_name, description, slug, user_id, } = payload;
        // alert(JSON.stringify(payload));
        const URL = (0, constant_1.Parameterize)(config_urls_1.INTEGRATIONS_ENV_CREATE, ":integration_id", integration_id);
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").post(URL, {
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
exports.createIntegrationEnv = createIntegrationEnv;
const createIntegrationApp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key, integration_id, app_id, workspace_id } = payload;
        const URL = config_urls_1.INTEGRATION_APP_CREATE;
        return (0, integrations_client_1.integrationsClient)(`Bearer ${token}`, "application/json").post(URL, {
            public_key,
            user_id,
            integration_id,
            app_id,
            workspace_id,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.createIntegrationApp = createIntegrationApp;
// map integration environments
// create feature
// create data input 
// map data with transformations
//# sourceMappingURL=integrations.service.js.map