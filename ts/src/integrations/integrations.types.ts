import { ParsedSample } from "../inputs/inputs.types";

export interface FetchEnvAndIntegrationIdPayload {
    feature_id: string;
    env_slug: string
}

export interface FetchEnvAndIntegrationIdResponse {
    env_id: string;
    integration_id: string;
    inputs: Array<ParsedSample>;
}

export interface ValidateIntegrationKeyPayload {
    integration_id: string; 
    integration_key: string
}