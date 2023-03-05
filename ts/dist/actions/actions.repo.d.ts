import { ImportPostmanCollectionPayload } from "./actions.types";
export interface IActionsRepo {
    parsePostmanCollectionV21(payload: ImportPostmanCollectionPayload): Promise<void>;
}
export declare const ActionsRepo: IActionsRepo;
