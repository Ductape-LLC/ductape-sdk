import { AppEventSetupTypes, Categories, DataFormats, HttpMethods, InputsTypes, PublicStates, StatusCodes, SuccessMarkerType } from "./enums";
import { IParsedInput, IParsedSample, IResponseSuccessMarkers } from "./inputs.types";
import { IRequestExtension } from "./requests.types";

export interface ICreateAppBuilder {
    app_name: string;
    description: string;
    unique?: boolean;
    returned?: string;
}

export interface IAppEvent {
    _id?: string;
    app_id: string;
    user_id: string;
    name: string;
    tag: string;
    setup_type: AppEventSetupTypes;
    description: string;
    resource: string;
    method: HttpMethods;
    private_key: string;
    created: Date;
    __v?: number;
}

export interface IAppEventEnv {
    _id?: string;
    webhook_id: string;
    env_id: string;
    __v?: number
}

export interface IAppAuth {
    _id: string;
    user_id: string;
    app_id: string;
    name: string;
    setup_type: string;
    expiry: number;
    period: string;
    resource: string;
    method: HttpMethods;
    description: string;
    __v: number;
}

export interface IAppAuthEnv {
    _id?: string;
    setup_id?: string;
    env_id: string;
    __v?: number;
    base_url?: string;
}

export interface IAppEnv {
    _id?: string;
    env_name: string;
    slug: string;
    description?: string;
    whitelist?: boolean;
    active?: boolean;
    __v?: number;
    base_url?: string;
    request_type?: DataFormats;
}

export interface ICustomEnv {
    env_id: string;
    base_url?: string;
    config?: Record<string, unknown>;
    active: boolean;
}

export interface IAppAction {
    _id?: string;
    app_id: string;
    user_id: string;
    folder_id?: string;
    description: string;
    resource: string;
    name: string;
    method: HttpMethods;
    tag: string;
    request_type: DataFormats;
    base_url?: string;
    created?: Date;
    params?: ISample;
    query?: ISample; // TODO add to backend
    headers?: ISample;
    envs?: Array<ICustomEnv>; // TODO
    body?: ISample;
    responses?: Array<IAppActionResponseInfo>
}

export interface IApp {
    _id?: string;
    workspace_id: string;
    user_id: string;
    app_name: string;
    require_whitelist?: boolean;
    active?: boolean;
    __v?: number;
    status?: PublicStates;
    description?: string;
    returned: string;
    aboutHTML?: string;
    aboutText?: string;
    domains?: Array<string>;
    envs?: Array<IAppEnv>;
    actions?: Array<IAppAction>;
    auths?: Array<IAppAuth>;
    events?: Array<IAppEvent>;
}


export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IPrivKeyLoginPayload {
    user_id: string;
    public_key?: string;
    private_key: string;
    workspace_id: string;
}

export interface IBuilderSessionCreatePayload {
    private_key?: string;
    workspace_id: string;
    user_id: string;
    public_key: string;
    token: string;
}

export interface IAppNameExistsPayload {
    workspace_id: string;
    user_id: string;
    public_key: string;
    app_name: string;
}

export interface IAppActionExistsPayload {
    workspace_id: string;
    user_id: string;
    tag: string;

}

export interface IAppExistsResponse {
    _id: string;
}

export interface IBuilderSession extends IBuilderSessionCreatePayload {

}

export interface IUserAuthResponse {
    auth_token: string;
    public_key: string;
    active: boolean;
}

export interface IFetchAppPayload extends IRequestExtension {
    app_id: string;
}

export interface IAppActionBody extends Omit<IRequestExtension, 'workspace_id'>, IEntityData {
    app_id?: string;
    action_id: string;
    // category?: string;
    type: InputsTypes;
}

export interface IEntityData {
    sample: object | string;
    data?: Array<IParsedSample>;
}

export interface Data extends IParsedSample {
    _id?: string;
    action_id: string;
    entity_id?: string;
    category: Categories;
    created?: Date;
};

export interface ISuccessValues {
    type: SuccessMarkerType;
    body: ISample;
}


export interface IAppActionResponseInfo {
    action_id?: string;
    name: string;
    tag: string;
    response_format: DataFormats;
    status_code: StatusCodes;
    success: boolean;
    envs?: Array<string>;
    body: ISample;
    marker_type?: SuccessMarkerType;
    success_markers?: Array<IParsedInput>;
    success_values?: ISuccessValues;
    is_status_code_success?: boolean;
}

export interface IAppAuth {
    _id: string;
    user_id: string;
    app_id: string;
    name: string;
    tag: string;
    setup_type: string;
    expiry: number;
    period: string;
    resource: string;
    method: HttpMethods;
    description: string;
    request: ISample;
    response: ISample;
    body: ISample;
}

export interface ISample extends IEntityData {
    type: InputsTypes,
}

export interface IAppAuthEnv {
    _id?: string;
    setup_id?: string;
    env_id: string;
    __v?: number;
    base_url?: string;
}

export interface IAppEvent {
    _id?: string;
    app_id: string;
    user_id: string;
    name: string;
    tag: string;
    setup_type: AppEventSetupTypes;
    description: string;
    resource: string;
    method: HttpMethods;
    private_key: string;
    created: Date;
    sample: ISample;
    __v?: number;
}

export interface IAppEventEnv {
    _id?: string;
    webhook_id: string;
    env_id: string;
    __v?: number
}