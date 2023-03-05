export interface IActionTriggerInput{
    name?: string;
    description?: string;
    action_id: string;
    input: unknown;
    env_slug: string;
}

export enum ReturnTypes {
    ALL = "all",
    SINGLE = "single"
}

export interface ImportPostmanCollectionPayload {
    app_id?: string;
    public_key: string;
    user_id: string;
    token: string;
    collectionJSON: PostmanCollectionV21;
    workspace_id: string;
    type: CollectionJSONTypes;
}

export enum CollectionJSONTypes {
    v2 = "v2",
    v21 = "v2.1"
}

export interface PostmanCollectionV21 {
    info?: {
        name: string;
        description: string;
    },
    item: Array<PostmanFoldersV21>
}

export interface PostmanFoldersV21 {
    name?: string;
    item?: Array<PostmanFoldersV21>;
    request?: PostmanRequestV21;
    response?: Array<PostmanResponseV21>;
    description?: string;
}

export interface PostmanRequestV21 {
    method: string;
    header: Array<KeyValuePair>;
    body: PostmanBodyV21;
    url: PostmanURLV21
}

export interface PostmanResponseV21 {
    name: string;
    originalRequest: PostmanRequestV21;
    status: string;
    code: number;
    _postman_previewlanguage: string;
    header: Array<KeyValuePair>;
    cookie: Array<KeyValuePair>;
    body: string;
}

export interface PostmanURLV21 {
    raw: string;
    host: [string];
    path: [string];
    query?: Array<KeyValuePair>;
    variable?: Array<KeyValuePair>
}

export interface PostmanOptionsV21 {
    raw: {
        language: string;
    }
}

export interface PostmanBodyV21 {
    mode: string;
    raw: string;
    options: PostmanOptionsV21;
    url: PostmanURLV21,
    description: string;
}

export interface KeyValuePair {
    key: string;
    value: string | number;
    description?: string;
    type?: string;
}

export enum ResponseFormats {
    JSON="application/json",
    URLENCODED="application/x-www-form-urlencoded",
    FORMDATA="multipart/form-data",
    SOAP="SOAP"
}

export enum EntityTypes {
    ACTION = "action",
    FOLDER = "folder",
    APP = "app",
}

export enum Formats {
    JSON = "json"
}

export enum Modes {
    RAW = "raw"
}

export enum Categories {
    BODY = 'body',
    RESPONSE = 'response',
    HEADERS = 'header',
    QUERY = 'query',
    PARAMS = 'params'
}