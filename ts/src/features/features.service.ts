import { ProcessEventsPayload } from "./features.types";

export interface IFeaturesService {
    processEvents (payload: ProcessEventsPayload): Promise<unknown>;
}

export default class FeaturesService implements IFeaturesService{

    async processEvents(payload: ProcessEventsPayload): Promise<unknown> {
        return '';
    }

}