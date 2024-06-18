import mongoose from "mongoose";
import { AuthTypes, AppEventSetupTypes, Categories, DataFormats, DataTypes, HttpMethods, InputsTypes, PublicStates, StatusCodes, SuccessMarkerType, TokenPeriods } from "./enums";
import { IParsedInput, IParsedSample, IResponseSuccessMarkers } from "./inputs.types";
import { IRequestExtension } from "./requests.types";

export interface ICreateAppBuilder {
    app_name: string;
    description: string;
    unique?: boolean;
    returned?: string;
}

export interface ICreateApp extends ICreateAppBuilder {
    tag: string;
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
    envs?: Array<string>;
    query: ISample;
    params: ISample;
    request?: ISample;
    response?: ISample;
    body?: ISample;
    created: Date;
    __v?: number;
}

export interface IAppEventEnv {
    _id?: string;
    webhook_id: string;
    env_id: string;
    __v?: number
}

export interface IAppAccess {
    access_tag: string;
    access: boolean;
}

export interface IAppAuth {
    _id: string;
    user_id: string;
    app_id: string;
    name: string;
    tag: string;
    setup_type: AuthTypes;
    expiry: number;
    period: TokenPeriods;
    action_tag?: string;
    tokens?: ISample;
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
    app_id?: string;
    user_id?: string;
    folder_id?: mongoose.Types.ObjectId;
    folder_level?: number;
    description: string;
    resource: string;
    /*url: string;*/
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

export interface IAppFolders {
    _id: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    parent_id: mongoose.Types.ObjectId | null;
    level: number;
}

export interface IApp {
    _id?: string;
    workspace_id: string;
    user_id: string;
    tag: string;
    app_name: string;
    require_whitelist?: boolean;
    active?: boolean;
    __v?: number;
    status?: PublicStates;
    description?: string;
    returned: string;
    aboutHTML?: string;
    aboutText?: string;
    folders?: Array<IAppFolders>;
    domains?: Array<string>;
    envs?: Array<IAppEnv>;
    actions?: Array<IAppAction>;
    auths?: Array<IAppAuth>;
    events?: Array<IAppEvent>;
    variables?: Array<IAppVariables>;
    constants?: Array<IAppConstants>;
    retries?: IAppRetryPolicy;
}


export interface IAppRetryPolicy {
    max: number;
    policy: {
        500: IRetrySettings;
        502: IRetrySettings;
        503: IRetrySettings;
        504: IRetrySettings;
        400: IRetrySettings;
        401: IRetrySettings;
        403: IRetrySettings;
        404: IRetrySettings;
        default?: IRetrySettings; 
    }
}

export interface IRetrySettings  {
    available?: boolean
    lag?: number; // in milliseconds
};

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
    action_id?: string;
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
    _id?: string;
    action_id?: string;
    name: string;
    tag?: string;
    response_format: DataFormats;
    status_code: StatusCodes;
    success: boolean;
    envs?: Array<string>;
    body: ISample;
    marker_type?: SuccessMarkerType;
    success_markers?: Array<IParsedInput>;
    data?: ISample;
    success_values?: ISuccessValues;
    is_status_code_success?: boolean;
    created?: Date
}


export interface ISample extends IEntityData {
    type: InputsTypes,
    status_code?: StatusCodes,
    method?: HttpMethods,
}

export interface IAppAuthEnv {
    _id?: string;
    setup_id?: string;
    env_id: string;
    __v?: number;
    base_url?: string;
}

/* export interface IAppEvent {
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
} */

export interface IAppEventEnv {
    _id?: string;
    webhook_id: string;
    env_id: string;
    __v?: number
}

export interface IAppVariables {
    _id?: string;
    key: string;
    type: DataTypes;
    required: boolean;
    description: string;
    minlength: number;
    maxlength: number;
}

export interface IAppConstants {
    _id?: string;
    key: string;
    value: string;
    type: DataTypes;
    description: string;
}