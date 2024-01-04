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
    UpdateAppActionResponseSchema
} from "../validators";
import { AppApiService, IAppApiService } from "../../api/services/appApi.service";
import InputsService, { IInputsService } from "../../inputs/inputs.service";
import { ExpectedValues, IParsedSample } from "../../types/inputs.types";
import { InputsTypes, Categories, AppComponents, RequestAction } from "../../types/enums";
import { tagify } from "../utils/string.utils";
import { IBuilderInit } from "../../types/index.types";
import { IRequestExtension } from "../../types/requests.types";
import { extractPathParams, extractQueryParams } from "../../api/utils/strings.utils";

export interface IAppBuilderService {
    createApp({ app_name, description }: ICreateAppBuilder): Promise<void>;
    fetchApp(): IApp;
    initializeApp(app_id: string): Promise<void>;
    updateApp(data: Partial<IApp>, component: AppComponents): Promise<void>;
    createEnv(data: IAppEnv): Promise<void>;
    updateEnv(slug: string, data: Partial<IAppEnv>): Promise<void>;
    fetchEnvs(): IAppEnv[];
    fetchEnv(slug: string): IAppEnv;


    createAction(data: Omit<IAppAction, 'app_id' | 'user_id'>): Promise<void>;
    updateAction(tag: string, data: Partial<IAppAction>): Promise<void>;
    fetchAction(identifier: string): IAppAction;
    fetchActions(): Array<IAppAction>;

    createActionRequestData(category: Categories, tag: string, data: Partial<IAppActionBody>, throwErrorIfExists?: boolean): Promise<void>
    updateRequestDataValidation(category: Categories, tag: string, data: Array<Partial<Data>>): Promise<void>;
    fetchActionRequestData(category: Categories, tag: string): Array<IParsedSample>;

    fetchActionRequestSample(category: Categories, tag: string): object | string;
    createAuth(data: Partial<IAppAuth>): Promise<void>;
    updateAuth(tag: string, data: Partial<IAppAuth>): Promise<void>;
    fetchAuth(tag: string): IAppAuth;
    fetchAuths(): Array<IAppAuth>;


    createEvent(data: Partial<IAppEvent>): Promise<void>;
    fetchEvent(tag: string): IAppEvent;
    fetchEvents(): Array<IAppEvent>;


    checkIfAppExists(app_name: string): Promise<IApp | false>

}

export default class AppBuilderService implements IAppBuilderService {
    private user_id: string;
    private workspace_id: string;
    private token: string;
    private app_id: string;
    private public_key: string;
    private app: IApp;
    private appApi: IAppApiService;
    private inputsService: IInputsService;

    constructor({ workspace_id, public_key, user_id, token }: IBuilderInit) {
        this.workspace_id = workspace_id;
        this.user_id = user_id;
        this.public_key = public_key;
        this.token = token;
        this.appApi = new AppApiService();
        this.inputsService = new InputsService();
    }

    async createApp(data: ICreateAppBuilder): Promise<void> {
        try {
            await CreateAppBuilderSchema.validateAsync(data);

            console.log("APP_NAME!!!!!! ========>>>>>>>>>>", data.app_name);
            const exists = await this.checkIfAppExists(data.app_name);

            if (exists && exists?._id) {
                this.app = exists;
                this.app_id = exists?._id;
            } else {
                const app = await this.createNewApp(data);
                await this.initializeApp(app._id);
            }
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

    private async createNewApp(data: ICreateAppBuilder): Promise<IApp> {
        return this.appApi.createApp({
            ...data,
        }, this.getUserAccess());
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

            await CreateAppEnvSchema.validateAsync({ ...data, slug });

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

    async createAction(data: Omit<IAppAction, 'app_id' & 'user_id'>, throwErrorIfExists: boolean = false): Promise<void> {

        try {
            await CreateAppActionSchema.validateAsync(data);
            data.tag = tagify(data.tag);

            const { tag } = data;

            const pathParamsSample = extractPathParams(data.resource);
            const pathParamsData = await this.inputsService.parseData({ data: pathParamsSample, category: Categories.PARAMS, type: InputsTypes.JSON, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;

            let exists

            try {
                exists = this.fetchAction(tag);
            } catch (e) {
                exists = false;
            }

            console.log("EXISTSSSSSSSS =====>>>>>>>", exists);

            if (!exists) {

                await this.appApi.updateApp(this.app_id, {
                    ...data,
                    params: {
                        sample: JSON.stringify(pathParamsSample),
                        data: pathParamsData,
                        type: InputsTypes.JSON,
                    },
                    component: AppComponents.ACTION,
                    action: RequestAction.CREATE,
                },
                    this.getUserAccess()
                )

                console.log("REFRESH!!! =====>>>>>>>>")
                await this.initializeApp(this.app_id);
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
            action: RequestAction.UPDATE,
        }

        if (data.resource) {
            const pathParamsSample = extractPathParams(data.resource);
            const pathParamsData = await this.inputsService.parseData({ data: pathParamsSample, category: Categories.PARAMS, type: InputsTypes.JSON, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;


            const queryParamsSample = extractQueryParams(data.resource);
            const queryParamsData = await this.inputsService.parseData({ data: queryParamsSample, category: Categories.QUERY, type: InputsTypes.JSON, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;



            Object.assign(query, {
                params: {
                    sample: JSON.stringify(pathParamsSample),
                    data: pathParamsData,
                    type: InputsTypes.JSON,
                },
                query: {
                    sample: JSON.stringify(queryParamsSample),
                    data: queryParamsData,
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

        if (responses.length) {
            const promises = responses.map((response: IAppActionResponseInfo) => {
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
                await CreateAppActionBodySchema.validateAsync(payload);

                const { _id: action_id } = this.fetchAction(tag);
                const data = await this.inputsService.parseData({ data: payload.sample, category, type: payload.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;

                let sample: string = (payload.sample).toString();
                if (payload.type === InputsTypes.JSON) {
                    sample = JSON.stringify(payload)
                }

                await this.appApi.updateApp(this.app_id, {
                    ...payload,
                    data,
                    action_id,
                    sample,
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
                await CreateAppActionResponseSchema.validateAsync({ ...payload });

                const data = await this.inputsService.parseData({ data: payload.body.sample, category: Categories.RESPONSE, type: payload.body.type, expected: ExpectedValues.PARSESAMPLE }) as unknown as Array<IParsedSample>;


                if(payload.success && ! (payload.success_values && (Object.keys(payload.success_values).length) || payload.is_status_code_success)) {
                    throw new Error('success_values or is_status_code_success required for success responses')
                }

                if (payload.success && payload.success_values && payload.success_values.body && payload.success_values.body.sample && Object.keys(payload.success_values.body.sample).length) {

                    const success_markers = await this.inputsService.parseData({ data: payload.success_values.body.sample, category: Categories.RESPONSE, type: InputsTypes.JSON, expected: ExpectedValues.PARSEINPUT })

                    const invalidMarkers = await this.inputsService.compareIndexes(data, success_markers as unknown as Array<IParsedSample>);

                    if (invalidMarkers.length) throw new Error(`SUCCESS MARKERS KEYS: parent_key_level_key_index ${JSON.stringify(invalidMarkers)} do not exist in original sample`)
                    else {
                        payload.success_markers = success_markers;
                        payload.marker_type = payload.success_values.type;
                    }

                }

                payload.body.data = data;

                if (payload.envs && payload.envs.length) {
                    payload.envs = payload.envs.map((slug) => {
                        const { _id: env_id } = this.fetchEnv(slug);

                        return env_id;
                    });
                }

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


    fetchAppActionResponse(action_tag: string, response_tag: string, throwErrorIfExists: boolean = false): IAppActionResponseInfo {
        const { responses } = this.fetchAction(action_tag);

        const action = responses.find((data: IAppActionResponseInfo) => data.tag === response_tag);

        if (!action && throwErrorIfExists) throw new Error(`Response ${response_tag} not found`);

        return action;

    }


    // TODO: make this better
    async createEvent(data: Partial<IAppEvent>): Promise<void> {

        try {

            await CreateAppEventSchema.validateAsync(data);

            await this.appApi.updateApp(this.app_id, data, this.getUserAccess())

            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }
    }

    async updateEvent(tag: string, data: Partial<IAppAuth>): Promise<void> {
        try {
            await CreateAppEventSchema.validateAsync(data);

            const { _id } = this.fetchEvent(tag);

            await this.appApi.updateApp(this.app_id, { _id, ...data }, this.getUserAccess())

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

    // TODO: make this better
    async createAuth(data: Partial<IAppAuth>): Promise<void> {

        try {
            await CreateAppAuthSchema.validateAsync(data);

            await this.appApi.updateApp(this.app_id, { ...data }, this.getUserAccess());

            await this.initializeApp(this.app_id);
        } catch (e) {
            throw e;
        }

    }

    async updateAuth(tag: string, data: Partial<IAppAuth>): Promise<void> {
        try {
            await CreateAppAuthSchema.validateAsync(data);

            const { _id } = this.fetchAuth(tag);

            await this.appApi.updateApp(this.app_id, { _id, ...data }, this.getUserAccess())

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

    private getUserAccess(): IRequestExtension {
        return {
            user_id: this.user_id,
            workspace_id: this.workspace_id,
            token: this.token,
            public_key: this.public_key,
        }
    }
}
