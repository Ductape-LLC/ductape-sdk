import { integrationsClient } from "../../clients/integrations.client";
import { DataFormats, PublicStates } from "../../types/enums";
import { ICreateIntegrationCachePayload, ICreateIntegrationDatabasePayload, ICreateIntegrationEnvPayload, ICreateIntegrationFunctionPayload, ICreateIntegrationNotificationPayload, ICreateIntegrationsBuilder, ICreateIntegrationsPayload, IIntegration } from "../../types/integrationsBuilder.types";
import { IRequestExtension } from "../../types/requests.types";
import { CHECK_INTEGRATION_EXISTS, INTEGRATIONS_CREATE_URL, INTEGRATIONS_FETCH_URL, INTEGRATION_CRUD_URL } from "../urls";
import { generateAxiosConfig } from "../utils/auth.utils";
import { Parameterize } from "../utils/strings.utils";

export interface IIntegrationsApiService {

    createIntegration(payload: ICreateIntegrationsBuilder, auth: IRequestExtension): Promise<IIntegration>;
    updateIntegration(integration_id: string, payload: Record<string, unknown>, auth: IRequestExtension): Promise<void>;
    checkIntegrationNameExists(name: string, auth: IRequestExtension): Promise<IIntegration>;
    fetchIntegration(integration_id: string, auth: IRequestExtension): Promise<IIntegration>;
    fetchWorkspaceIntegrations(status: PublicStates, payload: IRequestExtension): Promise<Array<IIntegration>>;
}

export class IntegrationsApiService implements IIntegrationsApiService {
    constructor() { }

    async createIntegration(payload: ICreateIntegrationsPayload, auth: IRequestExtension): Promise<IIntegration> {
        try {

            const { token, ...userAuthData } = auth;
            const res = await integrationsClient().post(INTEGRATIONS_CREATE_URL, { ...payload, ...userAuthData }, generateAxiosConfig(token, DataFormats.JSON))
            return res.data.data as unknown as IIntegration;

        } catch (e) {
            throw e;
        }
    }

    async updateIntegration(integration_id: string, payload: Partial<ICreateIntegrationsPayload>, auth: IRequestExtension): Promise<void> {
        try {

            const URL = Parameterize(INTEGRATION_CRUD_URL, ":integration_id", integration_id);
            const { token, ...userAuthData } = auth;
            // console.log("PAYLOAD ====>>>>>",payload)
            await integrationsClient().put(URL, {...payload, ...userAuthData}, generateAxiosConfig(token, DataFormats.JSON));

        } catch (e) {
            throw e;
        }
    }

    async fetchIntegration(integration_id: string, auth: IRequestExtension): Promise<IIntegration> {
        try {

            let URL = Parameterize(INTEGRATION_CRUD_URL, ":integration_id", integration_id);

            URL = `${URL}?workspace_id=${auth.workspace_id}&public_key=${auth.public_key}&user_id=${auth.user_id}`
            const res = await integrationsClient().get(URL, generateAxiosConfig(auth.token, DataFormats.JSON));

            return res.data.data as unknown as IIntegration;
        } catch (e) {
            throw e;
        }
    }

    async checkIntegrationNameExists(name: string, auth: IRequestExtension): Promise<IIntegration> {
        try {

            const { token, ...userAuthData } = auth;

            const res = await integrationsClient().post(CHECK_INTEGRATION_EXISTS, { name, ...userAuthData}, generateAxiosConfig(token, DataFormats.JSON))

            // console.log(res);
            return res.data.data as unknown as IIntegration;
        } catch (e) {
            // console.log(e);
            throw e;
        }
    }

    async fetchWorkspaceIntegrations(status: PublicStates, payload: IRequestExtension): Promise<Array<IIntegration>> {

        try {

            const {token, workspace_id, user_id, public_key} = payload;

            let URL = Parameterize(INTEGRATIONS_FETCH_URL, ':workspace_id', workspace_id)
            URL = Parameterize(URL, ':status', status);

            const res = await integrationsClient().get(`${URL}?user_id=${user_id}&public_key=${public_key}`, generateAxiosConfig(token, DataFormats.JSON))

            return res.data.data as unknown as Array<IIntegration>
        } catch (e) {
            throw e;
        }
    }
}