import { FetchEnvAndIntegrationIdPayload, FetchEnvAndIntegrationIdResponse, ValidateIntegrationKeyPayload } from "./integrations.types";
export interface IIntegrationsService {
    fetchEnvIntegrationIdAndInputs(payload: FetchEnvAndIntegrationIdPayload): Promise<FetchEnvAndIntegrationIdResponse>;
    validateIntegrationKey(payload: ValidateIntegrationKeyPayload): Promise<unknown>;
}
export default class IntegrationsService implements IIntegrationsService {
    fetchEnvIntegrationIdAndInputs(payload: FetchEnvAndIntegrationIdPayload): Promise<FetchEnvAndIntegrationIdResponse>;
    validateIntegrationKey(payload: ValidateIntegrationKeyPayload): Promise<unknown>;
}
