import appsClient from "../../clients/apps.client";
import { IApp, IAppAccess, IAppExistsResponse, IBuilderSession, IBuilderSessionCreatePayload, ICreateApp, ICreateAppBuilder, IPrivKeyLoginPayload } from "../../types/appBuilder.types";
import { DataFormats, PublicStates } from "../../types/enums";
import { IAccess } from "../../types/integrationsBuilder.types";
import { IRequestExtension } from "../../types/requests.types";
import {
    APPS_CREATE_URL,
    APPS_FETCH_ACCESS_BY_TAG,
    APPS_FETCH_URL,
    APP_CREATE_ACCESS_TAG,
    APP_CRUD_URL, APP_FETCH_BY_TAG, CHECK_APP_EXISTS, CREATE_APP_BUILDER_SESSION,
    VALIDATE_APP_BUILDER_SESSION
} from "../urls";
import { generateAxiosConfig } from "../utils/auth.utils";
import { Parameterize } from "../utils/strings.utils";

export interface IAppApiService {
    fetchAppBuilderSession(payload: Omit<IPrivKeyLoginPayload, 'private_key'>): Promise<IBuilderSession>;
    createAppBuilderSession(payload: IBuilderSessionCreatePayload): Promise<IBuilderSession>;
    checkAppNameExists(name: string, payload: IRequestExtension): Promise<IApp>;
    fetchApp(app_id: string, auth: IRequestExtension): Promise<IApp>;
    createApp(payload: ICreateApp, auth: IRequestExtension): Promise<IApp>;
    updateApp(app_id: string, payload: Record<string, unknown>, auth: IRequestExtension): Promise<void>;
    fetchWorkspaceApps(status: PublicStates, payload: IRequestExtension): Promise<Array<IApp>>;
    fetchAccessByTag(access_tag: string, payload: IRequestExtension): Promise<IAccess>;
    fetchAppByTag(app_tag: string, payload: IRequestExtension): Promise<IApp>;
    createAppAccess(app_id: string, integration_id: string, access_tag: string, payload: IRequestExtension): Promise<IAppAccess>;
}

export class AppApiService implements IAppApiService {

    constructor() { }

    async fetchAppBuilderSession(payload: Omit<IPrivKeyLoginPayload, 'private_key'>): Promise<IBuilderSession> {
        try {
            const res = await appsClient().post(
                VALIDATE_APP_BUILDER_SESSION, payload
            );
            return res.data.data as unknown as IBuilderSession;

        } catch (e) {
            console.log("BAMA!!!!", e);
            throw e;
        }
    }

    async updateAppBuilderSession() { }

    async createAppBuilderSession(payload: IBuilderSessionCreatePayload): Promise<IBuilderSession> {
        try {

            const res = await appsClient().post(
                CREATE_APP_BUILDER_SESSION, payload
                , generateAxiosConfig(payload.token, DataFormats.JSON));

            return res.data.data as unknown as IBuilderSession;

        } catch (e) {
            throw e;
        }
    }

    async checkAppNameExists(app_name: string, auth: IRequestExtension): Promise<IApp> {
        try {

            const { token, ...user_access } = auth
            const res = await appsClient().post(CHECK_APP_EXISTS, { ...user_access, app_name }, generateAxiosConfig(token, DataFormats.JSON))

            return res.data.data as unknown as IApp;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async fetchApp(app_id: string, auth: IRequestExtension): Promise<IApp> {
        try {

            const URL = Parameterize(APP_CRUD_URL, ':app_id', app_id);

            const res = await appsClient().get(`${URL}?user_id=${auth.user_id}&public_key=${auth.public_key}`,
                 generateAxiosConfig(auth.token, DataFormats.JSON));

            return res.data.data as unknown as IApp;
        } catch (e) {
            console.log("SABINUS!!! ===>>>>",e);
            throw e;
        }
    };

    async createApp(payload: ICreateAppBuilder, auth: IRequestExtension): Promise<IApp> {
        try {
            const { token, ...user_access } = auth;
            const res = await appsClient().post(APPS_CREATE_URL, {
                ...user_access,
                ...payload
            }, generateAxiosConfig(token, DataFormats.JSON));

            return res.data.data as unknown as IApp;
        } catch (e) {
            throw e;
        }
    }

    async updateApp(app_id: string, payload: Record<string, unknown>, auth: IRequestExtension): Promise<void> {
        try {
            const { token, ...user_access } = auth;
            const URL = Parameterize(APP_CRUD_URL, ':app_id', app_id);
            await appsClient().put(URL, {...payload, ...user_access}, generateAxiosConfig(token, DataFormats.JSON))

        } catch (e) {
            throw e;
        }
    }

    async fetchWorkspaceApps(status: PublicStates, payload: IRequestExtension): Promise<Array<IApp>> {

        try {

            const {token, workspace_id, user_id, public_key} = payload;

            let URL = Parameterize(APPS_FETCH_URL, ':workspace_id', workspace_id)
            URL = Parameterize(URL, ':status', status);

            const res = await appsClient().get(`${URL}?user_id=${user_id}&public_key=${public_key}`, generateAxiosConfig(token, DataFormats.JSON))

            return res.data.data as unknown as Array<IApp>
        } catch (e) {
            throw e;
        }

    }

    async fetchAccessByTag(access_tag: string, payload: IRequestExtension): Promise<IAccess> {

        try { 

            const { workspace_id, token, user_id, public_key } = payload; 

            let URL = Parameterize(APPS_FETCH_ACCESS_BY_TAG, ':workspace_id', workspace_id)
            URL = Parameterize(URL, ':access_tag', access_tag);

            const res = await appsClient().get(`${URL}?user_id=${user_id}&public_key=${public_key}`, generateAxiosConfig(token, DataFormats.JSON))

            return res.data.data as unknown as IAccess

        } catch (e) {
            throw e;
        }
        
    }


    async fetchAppByTag(app_tag: string, payload: IRequestExtension): Promise<IApp> {

        try { 

            const { workspace_id, token, user_id, public_key } = payload; 

            let URL = Parameterize(APP_FETCH_BY_TAG, ':tag', app_tag);

            const res = await appsClient().get(`${URL}?user_id=${user_id}&public_key=${public_key}&tag=${app_tag}`, generateAxiosConfig(token, DataFormats.JSON))

            return res.data.data as unknown as IApp

        } catch (e) {
            throw e;
        }
        
    }

    async createAppAccess(app_id: string, integration_id: string, access_tag: string, payload: IRequestExtension): Promise<IAppAccess> {
        try { 

            const { token, ...data } = payload; 

            const res = await appsClient().post(`${APP_CREATE_ACCESS_TAG}`, {app_id, integration_id, access_tag, ...data}, generateAxiosConfig(token, DataFormats.JSON))

            return res.data.data as unknown as IAppAccess;

        } catch (e) {
            throw e;
        }       
    }

}