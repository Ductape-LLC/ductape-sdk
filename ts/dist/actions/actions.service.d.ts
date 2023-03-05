import { IActionsRepo } from "./actions.repo";
import { ImportPostmanCollectionPayload } from "./actions.types";
export interface IActionsService {
    parsePostmanCollectionv21(payload: ImportPostmanCollectionPayload): Promise<void>;
}
export default class ActionsService {
    actionsRepo: IActionsRepo;
    constructor();
    parsePostmanCollectionv21(payload: ImportPostmanCollectionPayload): Promise<void>;
}
