import { date, object } from "joi";
import { AppApiService, IAppApiService } from "../../api/services/appApi.service";
import { IIntegrationsApiService, IntegrationsApiService } from "../../api/services/integrationsApi.service";
import { IUserApiService, UserApiService } from "../../api/services/userApi.service";
import InputsService, { IInputsService } from "../../inputs/inputs.service";
import { validateInputSchema } from "../../inputs/utils/inputs.utils.create";
import { IApp, IAppAccess, IAppAction, IAppActionResponseInfo, IAppAuth, IAppEnv, IAppVariables, IBuilderSession, ISample } from "../../types/appBuilder.types";
import { AuthTypes, Categories, DataTypes, InputsTypes, IntegrationComponents, RequestAction } from "../../types/enums";
import { IBuilderInit } from "../../types/index.types";
import { FeatureEventTypes, IAccess, IActionDataParserInput, IActionRequest, ICreateIntegrationsBuilder, IFeatureEvent, IFeatureInput, IFeatureSequence, IIntegration, IIntegrationApp, IIntegrationAppAuth, IIntegrationAppEnvs, IIntegrationCache, IIntegrationDatabase, IIntegrationEnv, IIntegrationFeature, IIntegrationFunction, IIntegrationJobs, IIntegrationNotification, IParseActionEventInput, IParseInputStringInput, IParseInputStringMetaData } from "../../types/integrationsBuilder.types";
import { IRequestExtension } from "../../types/requests.types";
import { CreateIntegrationAppSchema, CreateIntegrationBuilderSchema, CreateIntegrationCacheSchema, CreateIntegrationDatabaseSchema, CreateIntegrationEnvSchema, CreateIntegrationFeatureSchema, CreateIntegrationFunctionSchema, CreateIntegrationJobSchema, CreateIntegrationNotificationSchema, UpdateIntegrationAppSchema, UpdateIntegrationCacheSchema, UpdateIntegrationDatabaseSchema, UpdateIntegrationEnvSchema, UpdateIntegrationFeatureSchema, UpdateIntegrationFunctionSchema, UpdateIntegrationJobSchema, UpdateIntegrationNotificationSchema } from "../validators";
import { deepEqual, validateObjectKeys } from "../utils/objects.utils";
import { KeyValuePair } from "../../imports/imports.types";
import { ExpectedValues, IParsedIndexes, IParsedInput, IParsedSample } from "../../types/inputs.types";
import { extractStages } from "../utils/string.utils";
import { IWorkspace } from "../../types/workspaces.types";
import { IWorkspaceApiService, WorkspaceApiService } from "../../api/services/workspaceApi.service";
import { tagify } from "../../appBuilder/utils/string.utils";

export interface IIntegrationsBuilderService {

    fetchThirdPartyAppByAccessTag(access_tag: string): Promise<IApp>;

    // INTEGRATIONS
    createIntegration(data: ICreateIntegrationsBuilder): Promise<void>;
    updateIntegration(data: Partial<IIntegration>): Promise<void>;
    initializeIntegration(integration_id: string): Promise<void>;
    fetchIntegration(): IIntegration;


    createEnv(data: Partial<IIntegrationEnv>, throwErrorIfExists: boolean): Promise<void>;
    updateEnv(tag: string, data: Partial<IIntegrationEnv>): Promise<void>;
    fetchEnv(tag: string, throwErrorIfExists: boolean): IIntegrationEnv;
    fetchEnvs(): Array<IIntegrationEnv>;

    // FUNCTIONS
    createFunction(data: Partial<IIntegrationFunction>, throwErrorIfExists: boolean): Promise<void>;
    updateFunction(tag: string, data: Partial<IIntegrationFunction>): Promise<void>;
    fetchFunction(tag: string): IIntegrationFunction;
    fetchFunctions(): Array<IIntegrationFunction>;

    // CACHE
    createCache(data: Partial<IIntegrationCache>, throwErrorIfExists?: boolean): Promise<void>;
    updateCache(tag: string, data: Partial<IIntegrationCache>): Promise<void>;
    fetchCache(tag: string): IIntegrationCache;
    fetchCaches(): Array<IIntegrationCache>;


    // NOTIFICATIONS
    createNotification(data: Partial<IIntegrationNotification>, throwErrorIfExists: boolean): Promise<void>;
    updateNotification(tag: string, data: Partial<IIntegrationNotification>): Promise<void>;
    fetchNotification(tag: string): IIntegrationNotification;
    fetchNotifications(): Array<IIntegrationNotification>;


    // createApp(data: Partial<IIntegrationApp>, throwErrorIfExists: boolean): Promise<void>;
    updateApp(tag: string, data: Partial<IIntegrationApp>): Promise<void>;
    fetchApp(tag: string): IIntegrationApp;
    fetchApps(): Array<IIntegrationApp>;
    addApp(app: IIntegrationApp, throwErrorIfExists?: boolean): Promise<void>; // expect env mapping data and credentials setup here


    // FEATURES
    createFeature(data: Partial<IIntegrationFeature>, throwErrorIfExists?: boolean): Promise<void>;
    updateFeature(tag: string, data: Partial<IIntegrationFeature>): Promise<void>;
    fetchFeature(tag: string): IIntegrationFeature;
    fetchFeatures(): Array<IIntegrationFeature>;


    // DATABASE
    createDatabase(data: Partial<IIntegrationDatabase>, throwErrorIfExists: boolean): Promise<void>;
    updateDatabase(tag: string, data: Partial<IIntegrationDatabase>): Promise<void>;
    fetchDatabase(tag: string): IIntegrationDatabase;
    fetchDatabases(): Array<IIntegrationDatabase>;

    // JOBS
    createJob(data: Partial<IIntegrationJobs>, throwErrorIfExists: boolean): Promise<void>;
    updateJob(tag: string, data: Partial<IIntegrationJobs>): Promise<void>;
    fetchJob(tag: string): IIntegrationJobs;
    fetchJobs(): Array<IIntegrationJobs>;
    runJobs(): Promise<void>;

    createAppAccessTag(app_tag: string): Promise<IAppAccess>;
    extractStages(input: string): Array<string>;
}

export default class IntegrationsBuilderService implements IIntegrationsBuilderService {
    private user_id: string;
    private workspace_id: string;
    private workspace: IWorkspace;
    private private_key: string;
    private integration_id: string;
    private token: string | null;
    private app_id: string | null;
    private public_key: string | null;
    private session: IBuilderSession;
    private integration: IIntegration;
    private userApi: IUserApiService;
    private appApi: IAppApiService;
    private integrationApi: IIntegrationsApiService;
    private workspaceApi: IWorkspaceApiService;
    private inputsService: IInputsService;
    private thirdPartyApps: Array<{ access_tag: string, app: IApp }>

    constructor({ workspace_id, public_key, user_id, token }: IBuilderInit) {
        this.workspace_id = workspace_id;
        this.public_key = public_key;
        this.user_id = user_id;
        this.token = token;
        this.userApi = new UserApiService();
        this.integrationApi = new IntegrationsApiService();
        this.workspaceApi = new WorkspaceApiService();
        this.appApi = new AppApiService();
        this.inputsService = new InputsService();
        this.thirdPartyApps = [];
    }


    async createIntegration(data: ICreateIntegrationsBuilder): Promise<void> {
        try {

            await CreateIntegrationBuilderSchema.validateAsync(data);

            const exists = await this.checkIfIntegrationExists(data.name);

            if (exists && exists?._id) {
                await this.initializeIntegration(exists?._id);
            } else {
                const integration = await this.createNewIntegration(data);
                await this.initializeIntegration(integration._id);
            }
        } catch (e) {
            throw e;
        }
    }

    async initializeWorkspace(): Promise<void> {
        if (!this.workspace) {
            this.workspace = await this.workspaceApi.fetchWorkspaceById(this.getUserAccess())
        }
    }

    async initializeIntegration(integration_id: string): Promise<void> {
        try {
            this.integration = await this.integrationApi.fetchIntegration(integration_id, this.getUserAccess());
            this.integration_id = integration_id;
        } catch (e) {
            throw e;
        }
    }

    async updateIntegration(data: Partial<IIntegration>): Promise<void> {
        try {
            if (!this.app_id) throw new Error("Integration not initialized");
            await CreateIntegrationBuilderSchema.validateAsync(data);
            await this.integrationApi.updateIntegration(this.integration_id, {
                ...data,
            }, this.getUserAccess());

            await this.initializeIntegration(this.integration_id);
        } catch (e) {
            throw e;
        }
    }

    private async createNewIntegration(data: ICreateIntegrationsBuilder): Promise<IIntegration> {
        return this.integrationApi.createIntegration({ ...data }, this.getUserAccess())
    }

    async checkIfIntegrationExists(name: string) {
        try {
            return await this.integrationApi.checkIntegrationNameExists(name, this.getUserAccess());
        } catch (e) {
            return false;
        }
    }

    fetchIntegration(): IIntegration {
        if (!this.integration) {
            throw new Error('Integration not yet initiated')
        }

        return this.integration;
    }

    async createEnv(data: IIntegrationEnv, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchEnv(data.slug)) {


                await CreateIntegrationEnvSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.ENV,
                    action: RequestAction.CREATE,
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Environment ${data.slug} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateEnv(slug: string, data: Partial<IIntegrationEnv>): Promise<void> {
        try {

            const { _id } = this.fetchEnv(slug, true);

            await UpdateIntegrationEnvSchema.validateAsync(data); // Change to update;

            if (data.slug && this.fetchEnv(data.slug)) {
                throw new Error(`slug ${slug} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.ENV,
                action: RequestAction.UPDATE,
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchEnvs(): IIntegrationEnv[] {
        return this.integration.envs;
    }

    fetchEnv(slug: string, throwErrorIfExists = false): IIntegrationEnv {
        const env = this.integration.envs.find((data: IIntegrationEnv) => data.slug === slug);
        if (!env && throwErrorIfExists) throw new Error(`Env ${slug} not found`);
        return env;
    }

    private async validateAppData(appData: IApp, app: IIntegrationApp): Promise<void> {
        // TODO: 

        const { envs } = app;

        // const { envs: appEnvs, auths: appAuths } = appData

        await this.validateAppEnvs(envs, appData);
        // await this.validateAppAuth(auth, appData);
    }

    private validateVariablesSchema(variables: Array<KeyValuePair>, appVariables: Array<IAppVariables>): void {

        if (variables && variables.length) {
            variables.map((data) => {
                const appVar = appVariables.find((value) => value.key === data.key)

                if (!appVar) {
                    throw new Error(`variable key: ${data.key} not found`)
                }

                // if()
            })
        }
    }

    private validateVariablesValues(variables: Array<KeyValuePair>, appVariables: Array<IAppVariables>): void {
        if (appVariables && appVariables.length) {
            appVariables.map((data) => {
                const find = variables.find((value) => value.key === data.key)
                if (data.required) {

                    if (!find) {
                        throw new Error(`variable key: ${data.key} is required`)
                    }
                }

                if (find && data.type === DataTypes.STRING) {
                    this.inputsService.validateLength(data, find);
                }

                if (find && data.type === DataTypes.BOOLEAN) {
                    this.inputsService.validateBoolean(find);
                }

                if (find && data.type === DataTypes.NUMBER_STRING) {
                    this.inputsService.validateNumberString(data, find);
                }

                if (find && data.type === DataTypes.UUID) {
                    this.inputsService.validateUUID(find);
                }


            })
        }
    }

    private async validateAppEnvs(envs: IIntegrationAppEnvs[], app: IApp): Promise<void> {

        const { envs: appEnvs } = app;
        envs.map(async (env) => {
            const { auth } = env;
            this.fetchEnv(env.integration_env_slug, true)

            const appEnv = appEnvs.find((appEnv) => appEnv.slug === env.app_env_slug)

            if (!appEnv) {
                throw new Error(`app_env_slug ${env.app_env_slug} not found`)
            }

            await this.validateAppAuth(auth, app);

            this.validateVariablesSchema(env.variables, app.variables);
            this.validateVariablesValues(env.variables, app.variables);
        })
    }

    private async validateAppAuth(auth: IIntegrationAppAuth, app: IApp): Promise<void> {

        const { auths: appAuth, actions } = app;
        const exists = appAuth.find((appAuth) => appAuth.tag === auth.auth_tag);

        if (!exists) {
            throw new Error(`app_auth ${auth.auth_tag} not found`)
        }

        const { data } = auth;

        let bodySchema;
        let headerSchema;
        let paramsSchema;
        let querySchema

        if (exists.action_tag) {

            const action = actions.find((action) => action.tag === exists.action_tag);
            if (!action) throw new Error(`Auth action tag ${exists.action_tag} not found`);

            bodySchema = action.body;
            headerSchema = action.headers;
            paramsSchema = action.params;
            querySchema = action.query;

            const { body, headers, params, query } = data;

            if (!body) throw new Error(`Auth body not allowed to be undefined. If empty set as {}`)
            if (!headers) throw new Error(`Auth headers not allowed to be undefined. If empty set as {}`)
            if (!params) throw new Error(`Auth params not allowed to be undefined. If empty set as {}`)
            if (!query) throw new Error(`Auth query not allowed to be undefined. If empty set as {}`)


            if (bodySchema && bodySchema.data) {
                const bodyValues = await this.inputsService.parseData({ data: body as unknown as Object, category: Categories.SETUP, expected: ExpectedValues.PARSEINPUT, type: InputsTypes.JSON }) as unknown as Array<IParsedInput>;
                validateInputSchema(bodyValues, bodySchema);
            }

            if (headerSchema && headerSchema.data) {
                const headerValues = await this.inputsService.parseData({ data: headers as unknown as Object, category: Categories.SETUP, expected: ExpectedValues.PARSEINPUT, type: InputsTypes.JSON }) as unknown as Array<IParsedInput>;
                validateInputSchema(headerValues, headerSchema);
            }

            if (paramsSchema && paramsSchema.data) {
                const paramsValues = await this.inputsService.parseData({ data: params as unknown as Object, category: Categories.SETUP, expected: ExpectedValues.PARSEINPUT, type: InputsTypes.JSON }) as unknown as Array<IParsedInput>;
                validateInputSchema(paramsValues, paramsSchema);
            }
            if (querySchema && querySchema.data) {
                const queryValues = await this.inputsService.parseData({ data: query as unknown as Object, category: Categories.SETUP, expected: ExpectedValues.PARSEINPUT, type: InputsTypes.JSON }) as unknown as Array<IParsedInput>;
                validateInputSchema(queryValues, querySchema);
            }
        }

    }

    async createAppAccessTag(app_tag: string): Promise<IAppAccess> {

        await this.initializeWorkspace();

        const { name: workspace_name } = this.workspace;

        const app = await this.appApi.fetchAppByTag(app_tag, this.getUserAccess());

        if (!app) {
            throw new Error(`App ${app_tag} not found`);
        }

        const { _id: app_id } = app;

        const access_tag = `${app_tag}:${tagify(workspace_name)}`


        const { access } = await this.appApi.createAppAccess(app_id, this.integration_id, access_tag, this.getUserAccess());


        return {
            access_tag,
            access
        }
    }

    async addApp(app: IIntegrationApp, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            await CreateIntegrationAppSchema.validateAsync(app);
            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchApp(app.access_tag, throwErrorIfExists)) {
                // console.log("ZOOMER =====>", app);
                const access = await this.appApi.fetchAccessByTag(app.access_tag, this.getUserAccess());
                if (!access) {
                    throw new Error(`Access to app ${app.access_tag} not found`);
                }

                const appData = await this.appApi.fetchApp(access.app_id, this.getUserAccess());

                if (!appData) {
                    throw new Error(`App ${app.access_tag} not found`);
                }

                await this.validateAppData(appData, app)

                // console.log("UPDATE INTEGRATION HERE ====>>>>>", app);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...app,
                    component: IntegrationComponents.APP,
                    action: RequestAction.CREATE,
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`App ${app.access_tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateApp(access_tag: string, data: Partial<IIntegrationApp>): Promise<void> {
        try {

            const { _id } = this.fetchApp(access_tag);

            //await UpdateIntegrationAppSchema.validateAsync(data); // Change to update;

            if(data.access_tag && data.access_tag !== access_tag) {
                throw new Error(`access_tag mismatch between ${access_tag} and ${data.access_tag}`)
            }

            if (!this.fetchApp(access_tag)) {
                throw new Error(`access_tag ${access_tag} not found`); // TODO: also check on the backend
            }

            /*if (data.access_tag && this.fetchApp(data.access_tag)) {
                throw new Error(`access_tag ${access_tag} is in use`); // TODO: also check on the backend
            }*/

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                access_tag,
                component: IntegrationComponents.APP,
                action: RequestAction.UPDATE
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchApps(): Array<IIntegrationApp> {
        return this.integration.apps
    }

    fetchApp(tag: string, throwErrorIfExists: boolean = false): IIntegrationApp {
        const app = this.integration.apps.find((data: IIntegrationApp) => data.access_tag === tag);

        if (!app && throwErrorIfExists) throw new Error(`App ${tag} not found`);
        return app;
    }




    async createFunction(data: Partial<IIntegrationFunction>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchFunction(data.tag)) {


                await CreateIntegrationFunctionSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.FUNCTION
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Function ${data.tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateFunction(tag: string, data: Partial<IIntegrationFunction>): Promise<void> {
        try {

            const { _id } = this.fetchFunction(tag);

            await UpdateIntegrationFunctionSchema.validateAsync(data); // Change to update;

            if (data.tag && this.fetchFunction(data.tag)) {
                throw new Error(`tag ${tag} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.FUNCTION
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchFunctions(): Array<IIntegrationFunction> {
        return this.integration.functions
    }

    fetchFunction(tag: string): IIntegrationFunction {
        const func = this.integration.functions.find((data: IIntegrationFunction) => data.tag === tag);

        if (!func) throw new Error(`Function ${tag} not found`);
        return func;
    }


    async createCache(data: Partial<IIntegrationCache>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchCache(data.tag)) {


                await CreateIntegrationCacheSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.CACHE
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Cache ${data.tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateCache(tag: string, data: Partial<IIntegrationCache>): Promise<void> {
        try {

            const { _id } = this.fetchCache(tag);

            await UpdateIntegrationCacheSchema.validateAsync(data); // Change to update;

            if (data.tag && this.fetchCache(data.tag)) {
                throw new Error(`tag ${tag} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.CACHE
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchCache(tag: string): IIntegrationCache {
        const cache = this.integration.caches.find((data: IIntegrationCache) => data.tag === tag);
        if (!cache) throw new Error(`Function ${tag} not found`);
        return cache;
    }

    fetchCaches(): Array<IIntegrationCache> {
        return this.integration.caches;
    }

    async createNotification(data: Partial<IIntegrationNotification>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchNotification(data.tag)) {


                await CreateIntegrationNotificationSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.NOTIFICATION
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Notification ${data.tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateNotification(tag: string, data: Partial<IIntegrationNotification>): Promise<void> {
        try {

            const { _id } = this.fetchNotification(tag);

            await UpdateIntegrationNotificationSchema.validateAsync(data); // Change to update;

            if (data.tag && this.fetchNotification(data.tag)) {
                throw new Error(`tag ${tag} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.NOTIFICATION
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchNotification(tag: string): IIntegrationNotification {
        const notification = this.integration.notifications.find((data: IIntegrationFunction) => data.tag === tag);

        if (!notification) throw new Error(`Function ${tag} not found`);
        return notification;
    }

    fetchNotifications(): Array<IIntegrationNotification> {
        return this.integration.notifications;
    }

    private validateFeatureSequence(array: Array<IFeatureSequence>): void {
        // Validate uniqueness of sequence_tag
        const uniqueTags = new Set<string>();
        for (const item of array) {
            if (uniqueTags.has(item.sequence_tag)) {
                throw new Error(`Duplicate sequence_tag found: ${item.sequence_tag}`);
            }
            uniqueTags.add(item.sequence_tag);
        }

        // Validate levels are in order starting from 0
        /*let expectedLevel = 0;
        for (const item of array) {
            if (item.level !== expectedLevel) {
                throw new Error(`Invalid level found: expected ${expectedLevel}, found ${item.level}`);
            }
            expectedLevel++;
        }*/
    }

    private validateUniqueEventTags(data: Partial<IIntegrationFeature>): void { // TODO: this might not be necessary o
        const eventTagsSet = new Set<string>(); // TODO: this might have to be moved to line 658

        data.sequence.forEach(sequence => {
            sequence.events.forEach(data => {
                const { event } = data;

                if (eventTagsSet.has(event)) {
                    throw new Error(`Duplicate event_tag found: ${event}`);
                }

                eventTagsSet.add(event);
            });
        });
    };

    private async validateFeatureData(data: Partial<IIntegrationFeature>): Promise<void> {
        const { sequence } = data;

        this.validateUniqueEventTags(data); // TODO: this might be unnecessary

        this.validateFeatureSequence(sequence);

        const promises = sequence.map((obj, sequence_index) => {
            const { events, parents } = obj;
            if (parents && parents.length) {
                this.validateSequenceParents(parents, sequence_index, sequence);
            }
            events.map((event, event_index) => {
                return this.validateEvent(data, sequence_index, event, event_index)
            })
        })

        Promise.all(promises);
    }

    validateSequenceParents(parents: Array<string>, sequence_index: number, sequence: Array<IFeatureSequence>) {
        const map: Map<string, number> = new Map();
        for (let i = 0; i < sequence_index; i++) {
            map.set(sequence[i].sequence_tag, i)
        }

        for (let i = 0; i < parents.length; i++) {
            if (map.get(parents[i]) === undefined) {
                throw new Error(`Invalid parent ${parents[i]} in sequence ${sequence[sequence_index].sequence_tag}, parents have to be declared before their children`);
            }
        }
    }

    validateSequenceInputParents(parent: string, sequence_index: number, sequence: Array<IFeatureSequence>) {
        let found = false;
        const parents = sequence[sequence_index].parents;

        if (!parents || parents.length === 0) throw new Error(`Parents array cannot be empty or null when there is a $Sequence value in sequence ${sequence[sequence_index].sequence_tag}`);

        for (let i = 0; i < sequence_index; i++) {
            if (sequence[i].sequence_tag === parent) found = true
        }

        if (!found) throw new Error(`Parents array needs to contain parent sequence ${parent} in ${sequence[sequence_index].sequence_tag}`)
    }

    private async validateEvent(data: Partial<IIntegrationFeature>, sequence_index: number, event: IFeatureEvent, event_index: number): Promise<void> {

        const app = this.fetchApp(event.app, true)

        const { access_tag } = app;

        // validate action_tag
        const { actions } = await this.fetchThirdPartyAppByAccessTag(access_tag);

        if (event.type === FeatureEventTypes.ACTION) {
            const action = this.fetchThirdPartyAppActionByTag(actions, event.event);


            await this.validateActionDataInput(data, action, event.input, event_index, sequence_index);
            // validate input
        }
    }

    async validateActionDataInput(data: Partial<IIntegrationFeature>, action: IAppAction, event_input: IActionRequest, event_index: number, sequence_index: number): Promise<void> {

        const { params, query, headers, body } = event_input;

        const { params: actionParams, query: actionQuery, headers: actionHeaders, body: actionBody } = action;
        const indexes = {
            parent_key: '',
            level: 0,
            key: '',
            index: 0
        }

        await this.validateActionInputData({ obj: params, sample: actionParams, event_index, sequence_index, feature: data, type: Categories.PARAMS, indexes });
        await this.validateActionInputData({ obj: query, sample: actionQuery, event_index, sequence_index, feature: data, type: Categories.QUERY, indexes });
        await this.validateActionInputData({ obj: headers, sample: actionHeaders, event_index, sequence_index, feature: data, type: Categories.HEADER, indexes });
        await this.validateActionInputData({ obj: body, sample: actionBody, event_index, sequence_index, feature: data, type: Categories.BODY, indexes });

    }

    async validateActionInputData(
        data: IActionDataParserInput,
    ): Promise<void> {



        const { obj, ...base_data } = data;

        const sequence = data.feature.sequence[data.sequence_index];

        if (obj === undefined || obj === null) {
            throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[data.event_index].event} ${data.type} should not be ${obj}`)
        }

        if (Object.values(obj).length > 0 && data.sample.data.length === 0) {
            throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[data.event_index].event} ${data.type} should be an empty object`)
        }

        if (Object.values(obj).length === 0 && data.sample.data.length === 0) {
            return;
        }


        if (Object.values(obj).length === 0 && data.sample.data.length > 0) {
            throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[data.event_index].event} ${data.type} should not be an empty object`)
        }


        let index = 0;
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                // Check if the object has keys "function" and "values"
                if ('function' in obj[key] && 'values' in obj[key]) {
                    // Special handling for objects with keys "function" and "values"
                    await this.parseActionEventInput({ key, value: obj[key], ...base_data });
                } else {
                    // Normal recursive call for nested objects
                    await this.validateActionInputData(
                        { ...base_data, obj: obj[key], indexes: { key, index, parent_key: data.indexes.key, level: data.indexes.level++ } }
                    );
                }
            } else if (Array.isArray(obj[key])) {
                // If it's an array, iterate through each element
                Object.keys(obj[key]).forEach(async (elementKey: any) => {
                    const element = obj[key][elementKey];
                    if (typeof element === 'object') {
                        // Check if the object within array has keys "function" and "values"
                        if ('function' in element && 'values' in element) {
                            // Special handling for objects within array with keys "function" and "values"
                            await this.parseActionEventInput({ key: elementKey, value: element, ...base_data });
                        } else {
                            // Normal recursive call for nested objects within arrays
                            await this.validateActionInputData(
                                {
                                    ...base_data,
                                    obj: element,
                                    indexes: { key: elementKey, index, parent_key: data.indexes.key, level: data.indexes.level++ }
                                }
                            );
                        }
                    } else {
                        await this.parseActionEventInput({
                            key: elementKey,
                            value: element,
                            ...base_data,
                        }
                        );
                    }
                });
            } else {
                await this.parseActionEventInput(
                    {
                        key,
                        value: obj[key],
                        ...base_data
                    }
                );
            }
            index++;
        }
    }


    async parseActionEventInput(data: IParseActionEventInput): Promise<void> {


        const datapoint = this.validateActionKeyPlacement(data);
        let stages, input;

        if (typeof data.value === "object") {

            // TOPICAL PARSER

            const { function: func, values } = data.value;

            this.fetchFunction(func);

            for (let i = 0; i < values.length; i++) {
                stages = this.extractStages(values[i]);
                input = data.feature.input as unknown as Record<string, unknown>;

                this.parseInputString({ datapoint, value: values[i], input, stages }, { feature: data.feature, sequence_index: data.sequence_index, event_index: data.event_index, type: data.type });
            }

        } else if (typeof data.value === "string") {
            stages = this.extractStages(data.value)
            input = data.feature.input as unknown as Record<string, unknown>;

            this.parseInputString({ datapoint, value: data.value, input, stages }, { feature: data.feature, sequence_index: data.sequence_index, event_index: data.event_index, type: data.type });
        }
    }

    async parseInputString(payload: IParseInputStringInput, meta: IParseInputStringMetaData): Promise<void> {
        const { datapoint, value, input, stages } = payload;
        const sequence = meta.feature.sequence[meta.sequence_index];
        if (value.startsWith('$Input{')) {

            let current_input = input as unknown as Record<string, unknown>;
            for (let i = 0; i < stages.length; i++) {
                let stage: string | number = stages[i];
                const matches = stage.match(/^\[(\d+)\]$/);
                if (matches && matches.length === 2) {
                    const number = parseInt(matches[1], 10)

                    if (!isNaN(number)) {
                        stage = number;
                    } else {
                        throw new Error(`Invalid array value ${matches[1]}, should be an integer value`)
                    }
                }

                if (!current_input[stage]) throw new Error(`Input key ${stage} in ${value} does not exist`)
                current_input = current_input[stage] as unknown as Record<string, unknown>;

            }

            if (deepEqual(current_input, input)) {
                throw new Error(`Error 490101: something unexpected happened`);
            }


            this.compareInputWithExpectedInput(datapoint, current_input as unknown as IParsedSample, value)

        } else if (value.startsWith('$Auth{')) {


            // TODO: make sure that all auths have the same responses
            // TODO: make sure apps have only one auth, for now 
            const { app: access_tag } = meta.feature.sequence[meta.sequence_index].events[meta.event_index];
            const { actions, auths } = await this.fetchThirdPartyAppByAccessTag(access_tag);

            const auth_tag = stages[0];
            let auth: IAppAuth;

            for (let i = 0; i < auths.length; i++) {

                if (auths[i].tag === auth_tag) {
                    auth = auths[i]
                }
            }

            if (!auth) {
                throw new Error(`Auth in ${value} not found in app ${access_tag}`);
            }

            /*const { envs } = this.fetchApp(access_tag, false);

            for(let i=0; i< envs.length; i++) {
                if (envs[i].auth.auth_tag ) {
                    throw new Error(`Auth ${auth_tag} not in use in integration environment ${envs[i].integration_env_slug}, please be uniform in environment auth definition`)
                }
            }*/

            const action = actions.find((item) => {
                return item.tag === auth.action_tag;
            });

            if (!action) {
                throw new Error(`Could not find auth action ${auth.action_tag}`)
            }

            const response = action.responses.find((item) => item.success === true)

            if (response) {
                let parent_index = 0;
                let increment = false;
                let level = 0;
                let parent_key = "";
                let i = 1;

                while (i < stages.length) {
                    let stage: string | number = stages[i]
                    const matches = stage.match(/^\[(\d+)\]$/);
                    if (matches && matches.length === 2) {
                        const number = parseInt(matches[1], 10)

                        if (!isNaN(number)) {
                            stage = number;
                            parent_index = number; // TODO: check whether this handles the array issue
                            i++; // move to next stage instantly
                            increment = true;
                        } else {
                            throw new Error(`Invalid array value ${matches[1]}, should be an integer value`)
                        }
                    }

                    const found = response.body.data.find((item) => {
                        if (!increment) {
                            return item.parent_key === parent_key && item.key === stage && level === item.level;
                        } else {
                            return item.parent_key === parent_key && parent_index === stage && stages[i] === item.key && level === item.level;
                        }
                    })

                    if (!found) {
                        throw new Error(`Cannot find key: ${stage} in  ${value}`);
                    }

                    level++
                    parent_key = String(stages[i]);


                    if (i === stages.length - 1) {
                        this.compareInputWithExpectedInput(datapoint, found as unknown as IParsedSample, value);
                    }

                    i++
                }
            } else {
                throw new Error(`There is no successful response sample for Action ${auth.action_tag} in app ${access_tag}`)
            }
        } else if (value.startsWith('$Sequence{')) {
            //let current_input = input as unknown as Record<string, unknown>;
            //const { feature, sequence_index, event_index} = meta;
            let parent_key = "";
            let level = 0;
            let i = 0;
            while (i < stages.length) {
                let stage: string | number = stages[i];
                let sequence: IFeatureSequence;
                let event: IFeatureEvent;
                let response: IAppActionResponseInfo;

                // let current_data;

                if (i === 0) {
                    // find sequence by tag, see if it exists and its before current sequence

                    this.validateSequenceInputParents(stage, meta.sequence_index, meta.feature.sequence);

                    sequence = this.fetchPriorSequence(meta, stage);
                }

                if (i === 1 && sequence) {
                    event = this.fetchSequenceEvent(sequence, stage);

                    if (!event) {
                        throw new Error(`event ${stage} not found in sequence ${sequence.sequence_tag}`);
                    }

                    let { type, app: access_tag, event: event_tag } = event

                    if (type === FeatureEventTypes.ACTION) {
                        const { actions } = await this.fetchThirdPartyAppByAccessTag(access_tag)

                        const { responses } = this.fetchThirdPartyAppActionByTag(actions, event_tag);

                        response = responses.find((item) => item.success === true);
                        // fetch success result

                        if (!response) {
                            throw new Error(`event ${stage} does not have a success response`);
                        }
                    }

                    //TODO: handle other types
                }

                if (i > 1 && response) {
                    let parent_index = 0;
                    let increment = false;
                    const matches = stage.match(/^\[(\d+)\]$/);
                    if (matches && matches.length === 2) {
                        const number = parseInt(matches[1], 10)

                        if (!isNaN(number)) {
                            stage = number;
                            parent_index = number; // TODO: check whether this handles the array issue
                            i++; // move to next stage instantly
                            increment = true;
                        } else {
                            throw new Error(`Invalid array value ${matches[1]}, should be an integer value`)
                        }
                    }

                    const found = response.body.data.find((item) => {
                        if (!increment) {
                            return item.parent_key === parent_key && item.key === stage && level === item.level;
                        } else {
                            return item.parent_key === parent_key && parent_index === stage && stages[i] === item.key && level === item.level;
                        }
                    })


                    if (!found) {
                        throw new Error(`Cannot find key: ${stage} in  ${value}`);
                    }

                    level++
                    parent_key = String(stages[i]);

                    if (i === stages.length - 1) {
                        this.compareInputWithExpectedInput(datapoint, found as unknown as IParsedSample, value);
                    }
                }

                i++
            }
        } else if (value === '$Default') {

            if (!datapoint.defaultValue) {
                throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[meta.event_index].event} ${meta.type}, the key {${datapoint.key}: ${value}} does not have a default`);
            }

        } else if (value.startsWith('$Variable{')) { // $Variable{APP_NAME}$

            const stages = this.extractStages(value)

            if (stages.length < 2) {
                throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[meta.event_index].event} ${meta.type}, has invalid varibale definition ${value}, you have to define what variable is to be used`)
            }

            if (stages.length > 2) {
                throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[meta.event_index].event} ${meta.type}, has invalid varibale definition ${value}, only two keys is required`)
            }

            const app = this.fetchApp(stages[0]);

            if (!app) {
                throw new Error(`App ${stages[0]} not found in sequence ${sequence.sequence_tag} event ${sequence.events[meta.event_index].event} ${meta.type}, has invalid varibale definition ${value}. `)
            }

            if (!app.envs[0]) {
                throw new Error(`App ${stages[0]} has not environments defined`);
            }

            const { variables } = app.envs[0];

            if (!variables.find((item) => item.key === stages[1])) {
                throw new Error(`Variable ${stages[1]} does not exist in app ${stages[0]} in value ${value} in sequence ${sequence.sequence_tag} event ${sequence.events[meta.event_index].event} ${meta.type}`)
            }

        } else if (value.startsWith('$Constant{')) {
            const stages = this.extractStages(value);


            if (stages.length !== 2) {
                throw new Error(`When using constants you need to specify the constant in the format $Constant{app_tag}{key} instead of ${value}`)
            }

            const app_tag = stages[0]
            const key = stages[1]

            const app = await this.fetchThirdPartyAppByAccessTag(app_tag);

            if (!app) {
                throw new Error(`App ${app_tag} not found in constant ${value}`)
            }

            const { constants } = app;

            const exists = constants.find((item) => item.key === key);

            if (!exists) {
                throw new Error(`Constant with key ${key} in ${value}, does not exist on app ${app}`)
            }

        } else {
            throw new Error(`sequence ${sequence.sequence_tag} event ${sequence.events[meta.event_index].event} ${meta.type} has invalid : {${datapoint.key}: ${value}}`)
        }
    }


    compareInputWithExpectedInput(datapoint: IParsedSample, found_input: IParsedSample, value: string) {
        if (datapoint.maxLength != 0 && (!found_input.maxLength || found_input.maxLength > datapoint.maxLength)) {
            throw new Error(`maxlength of ${value} cannot be greater than ${datapoint.maxLength}`);
        }

        if (datapoint.minLength != 0 && (!found_input.minLength || found_input.minLength < datapoint.minLength)) {
            throw new Error(`minlength of ${value} cannot be less than ${datapoint.minLength}`);
        }

        if (datapoint.type !== found_input.type) {
            throw new Error(`${value} is required to be ${datapoint.type} not ${found_input.type}`)
        }
    }

    extractStages(input: string): Array<string> {
        return extractStages(input)
    }

    fetchSequenceEvent(sequence: IFeatureSequence, event: string): IFeatureEvent {
        return sequence.events.find((item) => item.event === event);
    }

    fetchPriorSequence(meta: IParseInputStringMetaData, stage: string): IFeatureSequence {
        let found;
        for (let i = 0; i < meta.sequence_index; i++) {
            if (meta.feature.sequence[i].sequence_tag === stage) {
                found = meta.feature.sequence[i];
            }
        }

        if (!found) {
            const sequence = meta.feature.sequence[meta.sequence_index].sequence_tag;
            throw `sequence ${stage} not found before ${sequence}, values can only inherit from sequences before them in the feature chain`;
        }

        return found;
    }

    validateActionKeyPlacement(data: IParseActionEventInput): IParsedSample {
        const actionData = data.sample.data;

        const { indexes } = data;

        const sequence = data.feature.sequence[data.sequence_index];

        const datapoint = actionData.find((item) => {
            return item.parent_key === indexes.parent_key && item.key === data.key && item.level === indexes.level && indexes.index === item.index
        });

        if (!datapoint) {
            console.log(indexes.parent_key +" "+ data.key+" "+indexes.level+" "+indexes.index)
            throw new Error(`Key ${data.key} not found for ${data.type} for sequence ${sequence.sequence_tag} event ${sequence.events[data.event_index].event}`)
        }

        return datapoint;

    }





    async fetchThirdPartyAppByAccessTag(access_tag: string): Promise<IApp> {
        try {

            const app = this.thirdPartyApps.find((item) => access_tag === item.access_tag)

            if (app) {
                return app.app;
            }

            const access = await this.appApi.fetchAccessByTag(access_tag, this.getUserAccess());

            if (!access) {
                throw new Error(`Access to app ${access_tag} not found`);
            }

            const appData = await this.appApi.fetchApp(access.app_id, this.getUserAccess());

            this.thirdPartyApps.push({ access_tag, app: appData });
            return appData;
        } catch (e) {
            throw e;
        }
    }

    fetchThirdPartyAppActionByTag(actions: Array<IAppAction>, action_tag: string): IAppAction {
        const action = actions.find((action) => action.tag === action_tag);

        if (!action) {
            throw new Error(`Action ${action_tag} not found`);
        }

        return action;

    }

    async createFeature(data: Partial<IIntegrationFeature>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchFeature(data.tag, false)) {
                await CreateIntegrationFeatureSchema.validateAsync(data);

                await this.validateFeatureData(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.FEATURE
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Feature ${data.tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateFeature(tag: string, data: Partial<IIntegrationFeature>): Promise<void> {
        try {

            const { _id } = this.fetchFeature(tag);

            await UpdateIntegrationFeatureSchema.validateAsync(data); // Change to update;

            if (data.tag && this.fetchFeature(data.tag)) {
                throw new Error(`tag ${tag} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.FEATURE
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchFeature(tag: string, throwErrorIfExists: boolean = true): IIntegrationFeature {
        const feature = this.integration.features.find((data: IIntegrationFeature) => data.tag === tag);

        if (!feature && throwErrorIfExists) throw new Error(`Feature ${tag} not found`);
        return feature;
    }

    fetchFeatures(): Array<IIntegrationFeature> {
        return this.integration.features;
    }
    async createDatabase(data: Partial<IIntegrationDatabase>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchDatabase(data.tag)) {


                await CreateIntegrationDatabaseSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.DATABASE
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Database ${data.tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateDatabase(tag: string, data: Partial<IIntegrationDatabase>): Promise<void> {
        try {

            const { _id } = this.fetchDatabase(tag);

            await UpdateIntegrationDatabaseSchema.validateAsync(data); // Change to update;

            if (data.tag && this.fetchDatabase(data.tag)) {
                throw new Error(`tag ${tag} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.DATABASE
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchDatabase(tag: string): IIntegrationDatabase {
        const database = this.integration.databases.find((data: IIntegrationFunction) => data.tag === tag);

        if (!database) throw new Error(`Function ${tag} not found`);
        return database;
    }

    fetchDatabases(): Array<IIntegrationDatabase> {
        return this.integration.databases;
    }

    async createJob(data: Partial<IIntegrationJobs>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchJob(data.tag)) {


                await CreateIntegrationJobSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.JOB
                },
                    this.getUserAccess()
                );
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`Job ${data.tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }

    async updateJob(tag: string, data: Partial<IIntegrationJobs>): Promise<void> {
        try {

            const { _id } = this.fetchJob(tag);

            await UpdateIntegrationJobSchema.validateAsync(data); // Change to update;

            if (data.tag && this.fetchJob(data.tag)) {
                throw new Error(`tag ${tag} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.JOB
            },
                this.getUserAccess()
            );
            await this.initializeIntegration(this.integration_id);

        } catch (e) {
            throw e;
        }
    }

    fetchJob(tag: string): IIntegrationJobs {
        const job = this.integration.jobs.find((data: IIntegrationJobs) => data.tag === tag);

        if (!job) throw new Error(`Job ${tag} not found`);
        return job;
    }

    fetchJobs(): Array<IIntegrationJobs> {
        return this.integration.jobs;
    }

    runJobs(): Promise<void> {
        throw new Error("Method not implemented.");
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