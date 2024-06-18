import {
    IApp,
    ICreateAppBuilder,
    IAppExistsResponse,
    IAppEnv,
    IAppAction,
    IAppActionBody,
    Data,
    IAppActionResponseInfo,
    IAppAuth,
    IAppEvent,
    ISample,
    IAppVariables,
    IAppConstants,
    IEntityData,
} from "../../types/appBuilder.types";
import {
    CreateAppBuilderSchema,
    UpdateAppBuilderSchema,
    CreateAppEnvSchema,
    CreateAppActionBodySchema,
    CreateAppActionSchema,
    UpdateEntityValidationDataSchema,
    CreateAppActionResponseSchema,
    CreateAppAuthSchema,
    CreateAppEventSchema,
    UpdateAppActionSchema,
    UpdateAppActionResponseSchema,
    UpdateAppEventSchema,
    UpdateAppAuthSchema,
    CreateAppVariableSchema,
    CreateAppConstantSchema,
    UpdateAppConstantSchema,
    UpdateAppVariableSchema,
    UpdateAppEnvSchema
} from "../validators";
import { AppApiService, IAppApiService } from "../../api/services/appApi.service";
import InputsService, { IInputsService } from "../../inputs/inputs.service";
import { ExpectedValues, IParsedInput, IParsedSample } from "../../types/inputs.types";
import { InputsTypes, Categories, AppComponents, RequestAction, AuthTypes, AppCategories } from "../../types/enums";
import { tagify } from "../utils/string.utils";
import { IBuilderInit } from "../../types/index.types";
import { IRequestExtension } from "../../types/requests.types";
import { extractPathParams, extractQueryParams, extractURLPath } from "../../api/utils/strings.utils";
import { IWorkspaceApiService, WorkspaceApiService } from "../../api/services/workspaceApi.service";
import { IWorkspace } from "../../types/workspaces.types";
import { extractStages } from "../../integrationsBuilder/utils/string.utils";
import { CleanObj } from "../utils/objects.utils";

export interface IAppBuilderService {
    createApp({ app_name, description }: ICreateAppBuilder): Promise<{ app_id: string }>;
    fetchApp(): IApp;
    initializeApp(app_id: string): Promise<void>;
    initializeAppByName(app_name: string): Promise<void>;
    initializeAppByTag(app_tag: string): Promise<void>
    updateApp(data: Partial<IApp>): Promise<void>;


    createEnv(data: IAppEnv): Promise<void>;
    updateEnv(slug: string, data: Partial<IAppEnv>): Promise<void>;
    fetchEnvs(): IAppEnv[];
    fetchEnv(slug: string): IAppEnv;

    updateDataValidation(locator: string, update: Partial<IParsedSample>): Promise<void>;


    /*createAction(data: Omit<IAppAction, 'app_id' | 'user_id'>): Promise<void>;*/
    updateAction(tag: string, data: Partial<IAppAction>): Promise<void>;
    fetchAction(identifier: string): IAppAction;
    fetchActions(): Array<IAppAction>;

    /*createActionRequestData(category: Categories, tag: string, data: Partial<IAppActionBody>, throwErrorIfExists?: boolean): Promise<void>
    updateRequestDataValidation(category: Categories, tag: string, data: Array<Partial<Data>>): Promise<void>;
    fetchActionRequestData(category: Categories, tag: string): Array<IParsedSample>;

    fetchActionRequestSample(category: Categories, tag: string): object | string;*/
    createAuth(data: Partial<IAppAuth>): Promise<void>;
    updateAuth(tag: string, data: Partial<IAppAuth>): Promise<void>;
    fetchAuth(tag: string): IAppAuth;
    fetchAuths(): Array<IAppAuth>;


    createEvent(data: Partial<IAppEvent>): Promise<void>;
    updateEvent(tag: string, data: Partial<IAppEvent>): Promise<void>;
    fetchEvent(tag: string): IAppEvent;
    fetchEvents(): Array<IAppEvent>;

    // createVariables(data: Partial<IAppVa>)


    checkIfAppExists(app_name: string): Promise<IApp | false>;



    // Parsers

    parseResponsePayload(payload: IAppActionResponseInfo): Promise<IAppActionResponseInfo>;
    parseRequestData(category: Categories, payload: ISample): Promise<ISample>;
    extractResourceData(url: string): Promise<{ query: Partial<ISample>; params: Partial<ISample> }>


    // constants
    createConstant(data: Partial<IAppConstants>): Promise<void>;
    updateConstant(key: string, data: Partial<IAppConstants>): Promise<void>;
    fetchConstants(): Array<IAppConstants>;
    fetchConstant(key: string): IAppConstants;


    // variables
    createVariable(data: Partial<IAppVariables>): Promise<void>;
    updateVariable(key: string, data: Partial<IAppVariables>): Promise<void>;
    fetchVariables(): Array<IAppVariables>;
    fetchVariable(key: string): IAppVariables;

}

export default class AppBuilderService implements IAppBuilderService {
    private user_id: string;
    private workspace_id: string;
    private token: string;
    private app_id: string;
    private public_key: string;
    private app: IApp;
    private workspace: IWorkspace;
    private appApi: IAppApiService;
    private workspaceApi: IWorkspaceApiService;
    private inputsService: IInputsService;

    constructor({ workspace_id, public_key, user_id, token }: IBuilderInit) {
        this.workspace_id = workspace_id;
        this.user_id = user_id;
        this.public_key = public_key;
        this.token = token;
        this.appApi = new AppApiService();
        this.workspaceApi = new WorkspaceApiService();
        this.inputsService = new InputsService();
    }

    async createApp(data: ICreateAppBuilder): Promise<{ app_id: string }> {
        try {
            await CreateAppBuilderSchema.validateAsync(data);
            const exists = await this.checkIfAppExists(data.app_name);

            if (exists && exists?._id) {
                this.app = exists;
                this.app_id = exists?._id;
            } else {
                const app = await this.createNewApp(data);
                await this.initializeApp(app._id);
            }

            return { app_id: this.app._id }
        } catch (e) {
            throw e;
        }
    }

    async initializeAppByTag(app_tag: string): Promise<void> {
        try {

            this.app = await this.appApi.fetchAppByTag(app_tag, this.getUserAccess());
            this.app_id = this.app._id
        } catch (e) {
            throw e;
        }
    }

    async initializeApp(app_id: string): Promise<void> {
        try {
            this.app = await this.appApi.fetchApp(app_id, this.getUserAccess());
            this.app_id = app_id;
        } catch (e) {
            throw e;
        }
    }

    async initializeWorkspace(): Promise<void> {
        if (!this.workspace) {
            this.workspace = await this.workspaceApi.fetchWorkspaceById(this.getUserAccess())
        }
    }

    private async createNewApp(data: ICreateAppBuilder): Promise<IApp> {

        await this.initializeWorkspace();

        return this.appApi.createApp(
            { ...data, tag: `${tagify(this.workspace.name)}:${tagify(data.app_name)}` }
            , this.getUserAccess());
    }

    async initializeAppByName(app_name: string): Promise<void> {
        try {

            const app = await this.checkIfAppExists(app_name);

            if (!app) throw new Error(`${app_name} not found in workspace`)

            this.app = app;
            this.app_id = app._id;

        } catch (e) {
            throw e
        }
    }

    async checkIfAppExists(app_name: string): Promise<IApp | false> {
        try {
            return await this.appApi.checkAppNameExists(app_name, this.getUserAccess());
        } catch (e) {
            return false;
        }
    }

    fetchApp(): IApp {
        return this.app;
    }

    async updateApp(data: Partial<IApp>): Promise<void> {
        try {
            if (!this.app_id) throw new Error("App not initialized");
            await UpdateAppBuilderSchema.validateAsync(data);
            await this.appApi.updateApp(this.app_id, {
                ...data,
                component: AppComponents.APP,
            }, this.getUserAccess());

            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }
    }

    async createEnv(data: IAppEnv, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchEnv(data.slug, false)) {


                await CreateAppEnvSchema.validateAsync(data);
                await this.appApi.updateApp(this.app_id, {
                    ...data,
                    component: AppComponents.ENV,
                    action: RequestAction.CREATE
                },
                    this.getUserAccess()
                );
                await this.initializeApp(this.app_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Environment ${data.slug} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateEnv(slug: string, data: Partial<IAppEnv>): Promise<void> {
        try {

            // const { _id } = this.fetchEnv(slug);

            await UpdateAppEnvSchema.validateAsync({ ...data, slug });

            if (data.slug && this.fetchEnv(data.slug)) {
                throw new Error(`slug ${slug} is in use`); // TODO: also check on the backend
            }

            // TODO: check 
            await this.appApi.updateApp(this.app_id, {
                slug,
                ...data,
                component: AppComponents.ENV,
                action: RequestAction.UPDATE,
            },
                this.getUserAccess()
            );
            await this.initializeApp(this.app_id);

        } catch (e) {
            throw e;
        }
    }

    fetchEnvs(): IAppEnv[] {
        return this.app.envs;
    }

    fetchEnv(slug: string, throwErrorIfExists: boolean = true): IAppEnv {
        const env = this.app.envs.find((data: IAppEnv) => data.slug === slug);
        if (!env && throwErrorIfExists) throw new Error(`Env ${slug} not found`);
        return env;
    }

    async extractResourceData(url: string): Promise<{ query: Partial<ISample>; params: Partial<ISample> }> {

        const pathParamsSample = extractPathParams(url);
        const pathParamsData = await this.inputsService.parseData({ data: pathParamsSample, category: Categories.PARAMS, type: InputsTypes.JSON, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;


        const queryParamsSample = extractQueryParams(url);
        const queryParamsData = await this.inputsService.parseData({ data: queryParamsSample, category: Categories.QUERY, type: InputsTypes.JSON, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;

        return {
            query: {
                sample: JSON.stringify(queryParamsSample),
                data: queryParamsData
            },
            params: {
                sample: JSON.stringify(pathParamsSample),
                data: pathParamsData,
            }
        }
    }

    async createAction(data: Omit<IAppAction, 'app_id' & 'user_id'>, throwErrorIfExists: boolean = false): Promise<void> {

        try {
            let url = data.resource;
            if (!data.resource) throw new Error('resource is required')

            data.resource = extractURLPath(url);
            await CreateAppActionSchema.validateAsync(data);
            data.tag = tagify(data.tag);

            const { tag } = data;
            let exists

            try {
                exists = this.fetchAction(tag);
            } catch (e) {
                exists = false;
            }

            console.log("EXISTSSSSSSSS =====>>>>>>>", exists);

            if (!exists) {

                data.resource = url;
                console.log("URLSSSSSSSS =====>>>>>>>", url, data.resource);
                await this.updateActionProcess(tag, { ...data }, RequestAction.CREATE);

            } else {
                delete data.tag;
                this.updateAction(tag, data)
            }

            if (exists && throwErrorIfExists) {
                throw new Error(`App action ${tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    fetchActions(): Array<IAppAction> {
        return this.app.actions;
    }

    fetchAction(identifier: string): IAppAction {

        const action = this.app.actions.find((data: IAppAction) => data.tag === identifier || data._id === identifier);

        if (!action) throw new Error(`Action ${identifier} not found`);

        return action;
    }

    async updateAction(tag: string, data: Partial<IAppAction>): Promise<void> {


        await UpdateAppActionSchema.validateAsync(data);
        // TODO: add logic to see whether it has run before, halt if it has 

        this.fetchAction(tag);

        console.log("FOLLOW THE TRAIL")

        await this.updateActionProcess(tag, data, RequestAction.UPDATE);
    }

    async updateActionProcess(tag: string, data: Partial<IAppAction>, action: RequestAction): Promise<void> {



        if (data.envs) {
            /*data.envs = data.envs.map((slug) => {
                const { _id: env_id } = this.fetchEnv(slug);

                return {env_id};
            });*/
        }

        let responses = [] as unknown as IAppActionResponseInfo[];
        if (data.responses) {
            responses = data.responses;
            delete data.responses;
        }

        const query = {
            tag,
            ...data,
            component: AppComponents.ACTION,
            action,
        }

        if (data.resource) {
            const { params, query: queryData } = await this.extractResourceData(data.resource);

            data.resource = extractURLPath(data.resource)

            Object.assign(query, {
                params: {
                    ...params,
                    type: InputsTypes.JSON,
                },
                query: {
                    ...queryData,
                    type: InputsTypes.JSON,
                }
            })
        }

        if (data.body) {
            const parsedData = await this.inputsService.parseData({ data: data.body.sample, category: Categories.BODY, type: data.body.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;

            Object.assign(data.body, { data: parsedData, sample: JSON.stringify(data.body.sample) })
        }


        if (data.headers) {
            const parsedData = await this.inputsService.parseData({ data: data.headers.sample, category: Categories.HEADER, type: data.headers.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;

            Object.assign(data.headers, { data: parsedData, sample: JSON.stringify(data.headers.sample) })
        }

        console.log("QUERY!!! ======>>>>>>>", query);
        await this.appApi.updateApp(this.app_id, query,
            this.getUserAccess()
        )

        await this.initializeApp(this.app_id);
        if (responses.length) {
            const promises = responses.map((response: IAppActionResponseInfo) => {

                console.log("RESPONSES =========>>>>>>", response)
                this.createAppActionResponse(tag, response)
            })

            Promise.all(promises);
        }
        this.initializeApp(this.app_id);

    }

    async createActionRequestData(category: Categories, tag: string, payload: IAppActionBody, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            const bodyData = await this.fetchActionRequestData(category, tag);

            const exists = bodyData && bodyData.length > 0

            if (!(exists)) {
                let data = await this.parseRequestData(category, payload)

                await this.appApi.updateApp(this.app_id, {
                    ...data,
                    app_id: this.app_id,
                    category: Categories.BODY
                }, this.getUserAccess())
            } else if (throwErrorIfExists) {
                throw new Error(`Body exists for action ${tag}`)
            }

        } catch (e) {
            throw e;
        }
    }

    async parseRequestData(category: Categories, payload: ISample): Promise<ISample> {
        await CreateAppActionBodySchema.validateAsync(payload);
        const data = await this.inputsService.parseData({ data: payload.sample, category, type: payload.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;

        let sample: string = (payload.sample).toString();
        if (payload.type === InputsTypes.JSON) {
            sample = JSON.stringify(payload.sample)
        }

        return { ...payload, sample, data }
    }

    // private fetc

    fetchActionRequestData(category: Categories, tag: string): Array<IParsedSample> {

        try {

            let data;
            const action = this.fetchAction(tag);
            if (category === Categories.BODY) {
                const { body } = action;
                data = body.data;
            } else if (category === Categories.QUERY) {
                const { query } = action;
                data = query.data;
            } else if (category === Categories.PARAMS) {
                const { params } = action;
                data = params.data;
            } else if (category === Categories.HEADER) {
                const { headers } = action;
                data = headers.data;
            } else {
                throw new Error(`Category ${category} doesn't exist`)
            }


            return data;

        } catch (e) {
            throw e;
        }

    }

    fetchActionRequestSample(category: Categories, tag: string): object | string {

        try {

            let sample;
            const action = this.fetchAction(tag);
            if (category === Categories.BODY) {
                const { body } = action;
                sample = body.sample;
            } else if (category === Categories.QUERY) {
                const { query } = action;
                sample = query.sample;
            } else if (category === Categories.PARAMS) {
                const { params } = action;
                sample = params.sample;
            } else if (category === Categories.HEADER) {
                const { headers } = action;
                sample = headers.sample;
            } else {
                throw new Error(`Category ${category} doesn't exist`)
            }

            return sample;
        } catch (e) {
            throw e;
        }

    }

    async updateRequestDataValidation(category: Categories, action_tag: string, body: Array<Partial<IParsedSample>>): Promise<void> {
        try {

            const { _id: action_id } = this.fetchAction(action_tag);

            await UpdateEntityValidationDataSchema.validateAsync({ body, type: category });

            const original = this.fetchActionRequestData(category, action_tag);

            const missingKeys = this.inputsService.compareIndexes(original, body as unknown as Array<IParsedSample>);

            if (!missingKeys.length) {
                throw new Error(`KEYS: parent_key_level_key_index ${JSON.stringify(missingKeys)} do not exist in original sample`)
            }

            await this.appApi.updateApp(this.app_id, {
                action_id, body,
            }, this.getUserAccess());
        } catch (e) {
            throw e;
        }
    }

    async createAppActionResponse(action_tag: string, payload: IAppActionResponseInfo): Promise<void> {
        try {

            this.fetchAction(action_tag);
            await CreateAppActionResponseSchema.validateAsync({ ...payload });

            payload.tag = tagify(payload.tag);

            const exists = this.fetchAppActionResponse(action_tag, payload.tag)

            if (!exists) {
                payload = await this.parseResponsePayload(payload);

                await this.appApi.updateApp(this.app_id, {
                    ...payload,
                    action_tag,
                    action: RequestAction.CREATE,
                    component: AppComponents.ACTION_RESPONSE,
                }, this.getUserAccess());
            } else {
                await UpdateAppActionResponseSchema.validateAsync({ ...payload });
            }
        } catch (e) {
            throw e;
        }
    }

    async parseResponsePayload(payload: IAppActionResponseInfo): Promise<IAppActionResponseInfo> {
        await CreateAppActionResponseSchema.validateAsync({ ...payload });

        const data = await this.inputsService.parseData({ data: payload.body.sample, category: Categories.RESPONSE, type: payload.body.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;


        if (payload.success && !(payload.success_values && (Object.keys(payload.success_values).length) || payload.is_status_code_success)) {
            throw new Error('success_values or is_status_code_success required for success responses')
        }

        if (payload.success && payload.success_values && payload.success_values.body && payload.success_values.body.sample && Object.keys(payload.success_values.body.sample).length) {

            const success_markers = await this.inputsService.parseData({ data: payload.success_values.body.sample, category: Categories.RESPONSE, type: InputsTypes.JSON, expected: ExpectedValues.PARSEINPUT }) as unknown as Array<IParsedInput>

            const invalidMarkers = await this.inputsService.compareIndexes(data, success_markers as unknown as Array<IParsedSample>);

            if (invalidMarkers.length) throw new Error(`SUCCESS MARKERS KEYS: parent_key_level_key_index ${JSON.stringify(invalidMarkers)} do not exist in original sample`)
            else {
                payload.success_markers = success_markers;
                payload.marker_type = payload.success_values.type;
            }

        }

        payload.body.data = data;
        payload.body.sample = JSON.stringify(payload.body.sample);

        if (payload.envs && payload.envs.length) {
            payload.envs = payload.envs.map((slug) => {
                const { _id: env_id } = this.fetchEnv(slug);

                return env_id;
            });
        }

        return payload
    }


    fetchAppActionResponse(action_tag: string, response_tag: string, throwErrorIfExists: boolean = false): IAppActionResponseInfo {
        const { responses } = this.fetchAction(action_tag);

        const action = responses.find((data: IAppActionResponseInfo) => data.tag === response_tag);

        if (!action && throwErrorIfExists) throw new Error(`Response ${response_tag} not found`);

        return action;

    }

    async extractEventData(data: Partial<IAppEvent>): Promise<Partial<IAppEvent>> {
        if (data.response) {
            data.response.data = await this.inputsService.parseData({ data: data.response.sample, category: Categories.WEBHOOK, type: data.response.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;
            data.response.sample = JSON.stringify(data.response.sample);
        }

        if (data.request) {
            data.request.data = await this.inputsService.parseData({ data: data.request.sample, category: Categories.WEBHOOK, type: data.response.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;
            data.request.sample = JSON.stringify(data.request.sample);
        }

        if (data.body) {
            data.body.data = await this.inputsService.parseData({ data: data.body.sample, category: Categories.WEBHOOK, type: data.body.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;
            data.body.sample = JSON.stringify(data.body.sample);
        }

        if (data.resource) {
            const { query, params } = await this.extractResourceData(data.resource)

            data.query = { type: InputsTypes.JSON, ...query } as unknown as ISample;
            data.params = { type: InputsTypes.JSON, ...params } as unknown as ISample;
            data.resource = extractURLPath(data.resource)

        }

        return data;
    }


    // TODO: make this better
    async createEvent(data: Partial<IAppEvent>): Promise<void> {
        try {

            const { resource } = data;

            if (data.resource)
                data.resource = extractURLPath(data.resource);

            await CreateAppEventSchema.validateAsync(data);
            data = await this.extractEventData({ ...data, resource });

            await this.appApi.updateApp(this.app_id, {
                ...data,
                action: RequestAction.CREATE,
                component: AppComponents.EVENT,
            }, this.getUserAccess())

            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }
    }

    async updateEvent(tag: string, data: Partial<IAppEvent>): Promise<void> {
        try {


            const { resource } = data;

            if (data.resource)
                data.resource = extractURLPath(data.resource);

            await UpdateAppEventSchema.validateAsync(data);

            data = await this.extractEventData({ ...data, resource });

            const { _id } = this.fetchEvent(tag);

            data = await this.extractEventData(data);
            await this.appApi.updateApp(this.app_id, {
                _id, tag, ...data, action: RequestAction.UPDATE,
                component: AppComponents.EVENT,
            }, this.getUserAccess())

            await this.initializeApp(this.app_id);

        } catch (e) {
            throw e;
        }
    }

    fetchEvents(): Array<IAppEvent> {
        return this.app.events;
    }

    fetchEvent(tag: string): IAppEvent {

        const auth = this.app.events.find((data: IAppEvent) => data.tag === tag);

        if (!auth) throw new Error(`Auth ${tag} not found`);

        return auth;
    }

    async extractAuthData(data: Partial<IAppAuth>): Promise<Partial<IAppAuth>> {
        if (data.tokens) {
            data.tokens.data = await this.inputsService.parseData({ data: data.tokens.sample, category: Categories.SETUP, type: data.tokens.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;
            data.tokens.sample = JSON.stringify(data.tokens.sample);
        }

        return data;
    }

    // TODO: make this better
    async createAuth(data: Partial<IAppAuth>): Promise<void> {

        try {
            const { setup_type, action_tag, tokens } = data;

            if (setup_type === AuthTypes.CREDENTIALS && !action_tag) {
                throw new Error(`Action tag required for setup type ${setup_type}`)
            }

            if (setup_type === AuthTypes.TOKEN && !tokens) {
                throw new Error(`tokens sample required for setup type ${setup_type}`)
            }

            await CreateAppAuthSchema.validateAsync(data);

            if (setup_type === AuthTypes.CREDENTIALS) {
                this.fetchAction(action_tag);
            }

            data = await this.extractAuthData({ ...data });
            await this.appApi.updateApp(this.app_id, {
                ...data,
                action: RequestAction.CREATE,
                component: AppComponents.AUTH,
            }, this.getUserAccess())

            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }

    }

    async updateAuth(tag: string, data: Partial<IAppAuth>): Promise<void> {
        try {
            await UpdateAppAuthSchema.validateAsync(data);

            this.fetchAuth(tag);

            data = await this.extractAuthData({ ...data });
            await this.appApi.updateApp(this.app_id, {
                tag, ...data, action: RequestAction.UPDATE,
                component: AppComponents.AUTH,
            }, this.getUserAccess())

            await this.initializeApp(this.app_id);

            await this.initializeApp(this.app_id);

        } catch (e) {
            throw e;
        }
    }

    fetchAuths(): Array<IAppAuth> {
        return this.app.auths;
    }

    fetchAuth(tag: string): IAppAuth {

        const auth = this.app.auths.find((data: IAppAuth) => data.tag === tag);

        if (!auth) throw new Error(`Auth ${tag} not found`);

        return auth;
    }

    async createVariable(data: Partial<IAppVariables>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            await CreateAppVariableSchema.validateAsync(data);
            const exists = this.fetchVariable(data.key, false);

            if (exists && throwErrorIfExists) throw new Error(`Variable ${data.key} exists`);

            if (!exists) {
                await this.appApi.updateApp(this.app_id, {
                    ...data,
                    action: RequestAction.CREATE,
                    component: AppComponents.VARIABLE,
                }, this.getUserAccess())
            }
            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }
    }

    async updateVariable(key: string, data: Partial<IAppVariables>): Promise<void> {
        try {
            await UpdateAppVariableSchema.validateAsync(data);

            this.fetchVariable(key);
            await this.appApi.updateApp(this.app_id, {
                ...data, action: RequestAction.UPDATE,
                component: AppComponents.VARIABLE,
            }, this.getUserAccess())

            await this.initializeApp(this.app_id);

        } catch (e) {
            throw e;
        }
    }

    fetchVariables(): Array<IAppVariables> {
        return this.app.variables;
    }

    fetchVariable(key: string, throwErrorIfExists: boolean = true): IAppVariables {
        const variable = this.app.variables.find((data: IAppVariables) => data.key === key);

        if (!variable && throwErrorIfExists) throw new Error(`Variable ${key} not found`);

        return variable;
    }

    async createConstant(data: Partial<IAppConstants>, throwErrorIfExists: boolean = false): Promise<void> {

        try {
            await CreateAppConstantSchema.validateAsync(data);
            const exists = this.fetchConstant(data.key, false);

            if (exists && throwErrorIfExists) throw new Error(`Constant ${data.key} exists`);

            await this.appApi.updateApp(this.app_id, {
                ...data,
                action: RequestAction.CREATE,
                component: AppComponents.CONSTANT,
            }, this.getUserAccess())

            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }
    }

    async updateConstant(key: string, data: Partial<IAppConstants>): Promise<void> {
        await UpdateAppConstantSchema.validateAsync(data);

        this.fetchConstant(key);
        await this.appApi.updateApp(this.app_id, {
            ...data, action: RequestAction.UPDATE,
            component: AppComponents.CONSTANT,
        }, this.getUserAccess())

        await this.initializeApp(this.app_id);
    }

    fetchConstants(): Array<IAppConstants> {
        return this.app.constants;
    }

    fetchConstant(key: string, throwErrorIfExists: boolean = true): IAppConstants {
        const variable = this.app.constants.find((data: IAppConstants) => data.key === key);

        if (!variable && throwErrorIfExists) throw new Error(`Constant ${key} not found`);

        return variable;
    }

    async updateDataValidation(locator: string, update: Partial<IParsedSample>): Promise<void> {

        const stages = extractStages(locator);

        if (stages.length === 0) {
            throw new Error(`Missing locators in ${locator}`)
        }

        if (locator.startsWith('$Body{')) {
            await this.updateValidation(AppCategories.BODY, stages, update)

        } else if (locator.startsWith('$Query{')) {
            await this.updateValidation(AppCategories.QUERY, stages, update);

        } else if (locator.startsWith('$Params{')) {

            await this.updateValidation(AppCategories.PARAMS, stages, update);

        } else if (locator.startsWith('$Header{')) {
            await this.updateValidation(AppCategories.HEADER, stages, update);
        } else {
            throw new Error(`Invalid input ${locator}`)
        }

    }

    private async updateValidation(category: AppCategories, stages: Array<string>, update: Partial<IParsedSample>) {
        try {
            const action_tag = stages[0];

            const action = this.fetchAction(action_tag);


            const data = action[category] as unknown as ISample;

            let level = -1;
            let key = "";
            let datapoint;
            let datapointIndex;

            const exclude =
                category === AppCategories.BODY ? [AppCategories.HEADER, AppCategories.PARAMS, AppCategories.QUERY] :
                    category === AppCategories.HEADER ? [AppCategories.BODY, AppCategories.PARAMS, AppCategories.QUERY] :
                        category === AppCategories.PARAMS ? [AppCategories.BODY, AppCategories.HEADER, AppCategories.QUERY] :
                            [AppCategories.BODY, AppCategories.PARAMS, AppCategories.HEADER];

            for (let i = 1; i < stages.length; i++) {
                const parent_key = key;
                key = stages[i];
                level++

                const index = data.data.findIndex((item) => item.level === level && item.key === key && item.parent_key === parent_key)

                if (index === -1) {
                    throw new Error(`Datapoint ${key} not found in Action ${action_tag}'s ${category} data`)
                }

                if (index > -1 && i === stages.length - 1) {
                    datapoint = data.data[index];
                    datapointIndex = index;
                }
            }


            data.data[datapointIndex] = { ...data.data[datapointIndex], ...update }

            console.log("OYEBOLA!!! ====>>>", data.data[datapointIndex])

            action[category] = data as unknown as ISample;

            const cleaned_action = CleanObj(action, ['tag', '_id', 'created', 'envs', 'resource', 'name', 'method', 'responses', ...exclude])

            //console.log(JSON.stringify(cleaned_action))

            await this.appApi.updateApp(this.app_id, {
                tag: action_tag,
                ...cleaned_action,
                component: AppComponents.VALIDATION,
                action: RequestAction.UPDATE
            },
                this.getUserAccess()
            )

            await this.initializeApp(this.app_id);

        } catch (e) {
            throw e;
        }



    }

    private getUserAccess(): IRequestExtension {
        return {
            user_id: this.user_id,
            workspace_id: this.workspace_id,
            token: this.token,
            public_key: this.public_key,
        }
    }

}
