import { ParsedInput, ParsedSample, ParsePayload } from "../inputs/inputs.types";
export interface IFeatureTriggerInput {
    name?: string;
    description?: string;
    feature_id: string;
    integration_key: string;
    input: ParsePayload;
    env_slug: string;
}
export interface ProcessEventsPayload {
    env_id: string;
    feature_id: string;
    integration_id: string;
    data: Array<ParsedInput | ParsedSample>;
}
