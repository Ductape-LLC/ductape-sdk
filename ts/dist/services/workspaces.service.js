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
exports.createAccess = exports.updateDefaultEnvs = exports.updateDefaultAccess = exports.fetchWorkspaces = exports.createWorkspace = void 0;
const workspace_client_1 = require("../clients/workspace.client");
const config_urls_1 = require("../config/config.urls");
const constant_1 = require("../config/constant");
const createWorkspace = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, name, public_key } = payload;
        return (0, workspace_client_1.workspaceClient)(`Bearer ${token}`, "application/json").post(config_urls_1.WORKSPACE_CREATE_URL, { user_id, name, public_key });
    }
    catch (e) {
        throw e;
    }
});
exports.createWorkspace = createWorkspace;
const fetchWorkspaces = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, public_key } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.WORKSPACE_FETCH_URL, ":user_id", user_id);
        return (0, workspace_client_1.workspaceClient)(`Bearer ${token}`, "application/json").get(`${URL}?public_key=${public_key}`);
    }
    catch (e) {
        throw e;
    }
});
exports.fetchWorkspaces = fetchWorkspaces;
const updateDefaultAccess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, workspace_id, public_key } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.WORKSPACE_DEFAULT_CHANGE, ":user_id", user_id);
        return (0, workspace_client_1.workspaceClient)(`Bearer ${token}`, "application/json").put(URL, { workspace_id, public_key });
    }
    catch (e) {
        throw e;
    }
});
exports.updateDefaultAccess = updateDefaultAccess;
const updateDefaultEnvs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, workspace_id, public_key, envs } = payload;
        const URL = (0, constant_1.Parameterize)(config_urls_1.WORKSPACE_UPDATE_ENVS, ":workspace_id", workspace_id);
        return (0, workspace_client_1.workspaceClient)(`Bearer ${token}`, "application/json").put(URL, { user_id, public_key, envs });
    }
    catch (e) {
        throw e;
    }
});
exports.updateDefaultEnvs = updateDefaultEnvs;
const createAccess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, user_id, workspace_id, public_key, email, access_level } = payload;
        return (0, workspace_client_1.workspaceClient)(`Bearer ${token}`, "application/json").post(config_urls_1.WORKSPACE_ACCESS_CREATE, { user_id, workspace_id, public_key, email, access_level });
    }
    catch (e) {
        throw e;
    }
});
exports.createAccess = createAccess;
//# sourceMappingURL=workspaces.service.js.map