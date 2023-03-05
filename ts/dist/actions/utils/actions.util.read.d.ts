import { Categories, EntityTypes, ImportPostmanCollectionPayload, KeyValuePair, PostmanFoldersV21, PostmanRequestV21, PostmanResponseV21, PostmanURLV21 } from "../actions.types";
export declare const parsePostmanCollectionV21: (data: ImportPostmanCollectionPayload) => Promise<void>;
export declare const parsePostmanFoldersV21: (payload: {
    name: string;
    item: Array<PostmanFoldersV21>;
    user_id: string;
    public_key: string;
    app_id?: string;
    description: string;
    type: EntityTypes;
    parent_folder_id?: string;
    level: number;
    token: string;
}) => Promise<void>;
export declare const parsePostmanActionV2: (payload: {
    name: string;
    request: PostmanRequestV21;
    response: Array<PostmanResponseV21>;
    description: string;
    app_id?: string;
    type: EntityTypes;
    folder_id: string;
    public_key: string;
    user_id: string;
    token: string;
}) => Promise<void>;
export declare const parsePostmanURLV21: (data: PostmanURLV21, payload: {
    entity_id: string;
    user_id: string;
    public_key: string;
    token: string;
}) => Promise<void>;
export declare const parsePostmanKeyValuePairsV21: (data: Array<KeyValuePair>, payload: {
    entity_id: string;
    user_id: string;
    public_key: string;
    token: string;
    category: Categories;
}) => Promise<void>;
export declare const parsePostmanResponsesV21: (payload: Array<PostmanResponseV21>, data: {
    entity_id: string;
    user_id: string;
    public_key: string;
    token: string;
    category: Categories;
}) => Promise<void>;
export declare const extractActionDataV21: (request: PostmanRequestV21) => {
    httpVerb: string;
    resource: string;
    type: string;
};
