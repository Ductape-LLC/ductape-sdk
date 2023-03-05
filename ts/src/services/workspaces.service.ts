import { workspaceClient } from "../clients/workspace.client";
import { WORKSPACE_CREATE_URL, WORKSPACE_FETCH_URL, WORKSPACE_DEFAULT_CHANGE, WORKSPACE_UPDATE_ENVS, WORKSPACE_ACCESS_CREATE } from "../config/config.urls";
import { Parameterize } from "../config/constant"

export const createWorkspace = async(payload: any)=> {
    try {
        const {token, user_id, name, public_key} = payload;
        return workspaceClient(`Bearer ${token}`, "application/json").post(WORKSPACE_CREATE_URL, {user_id, name, public_key})
    } catch (e) {
        throw e;
    }
}

export const fetchWorkspaces = async(payload: any)=> {
    try {
        const {token, user_id, public_key} = payload;
        const URL = Parameterize(WORKSPACE_FETCH_URL,":user_id", user_id);
        return workspaceClient(`Bearer ${token}`, "application/json").get(`${URL}?public_key=${public_key}`)
    } catch (e) {
        throw e;
    }
}

export const updateDefaultAccess = async(payload: any)=> {
    try {

        const {token, user_id, workspace_id, public_key} = payload;
        const URL = Parameterize(WORKSPACE_DEFAULT_CHANGE,":user_id", user_id);
        return workspaceClient(`Bearer ${token}`, "application/json").put(URL, {workspace_id, public_key})

    } catch(e) {
        throw e;
    }
}

export const updateDefaultEnvs = async(payload: any)=> {
    try{

        const {token, user_id, workspace_id, public_key, envs} = payload;

        const URL = Parameterize(WORKSPACE_UPDATE_ENVS, ":workspace_id", workspace_id);
        return workspaceClient(`Bearer ${token}`, "application/json").put(URL, {user_id, public_key, envs});

    } catch(e) {
        throw e;
    }
}

export const createAccess = async(payload: any)=> {
    try {

        const {token, user_id, workspace_id, public_key, email, access_level} = payload;
        return workspaceClient(`Bearer ${token}`, "application/json").post(WORKSPACE_ACCESS_CREATE, {user_id, workspace_id, public_key, email, access_level});

    } catch(e) {
        throw e;
    } 
}