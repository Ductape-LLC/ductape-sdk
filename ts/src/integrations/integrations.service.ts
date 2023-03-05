import { FetchEnvAndIntegrationIdPayload, FetchEnvAndIntegrationIdResponse, ValidateIntegrationKeyPayload } from "./integrations.types";

export interface IIntegrationsService {
    fetchEnvIntegrationIdAndInputs(payload: FetchEnvAndIntegrationIdPayload): Promise<FetchEnvAndIntegrationIdResponse>;
    validateIntegrationKey(payload: ValidateIntegrationKeyPayload): Promise<unknown>
}

export default class IntegrationsService implements IIntegrationsService {
    
    async fetchEnvIntegrationIdAndInputs(payload: FetchEnvAndIntegrationIdPayload): Promise<FetchEnvAndIntegrationIdResponse> {
        throw new Error("Method not implemented.");
    }

    async validateIntegrationKey(payload: ValidateIntegrationKeyPayload): Promise<unknown> {
        throw new Error("Method not implemented.");
    }

}