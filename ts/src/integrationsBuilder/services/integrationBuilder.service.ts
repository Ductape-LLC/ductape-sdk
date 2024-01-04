import { AppApiService, IAppApiService } from "../../api/services/appApi.service";
import { IIntegrationsApiService, IntegrationsApiService } from "../../api/services/integrationsApi.service";
import { IUserApiService, UserApiService } from "../../api/services/userApi.service";
import InputsService, { IInputsService } from "../../inputs/inputs.service";
import { IBuilderSession } from "../../types/appBuilder.types";
import { IntegrationComponents } from "../../types/enums";
import { IBuilderInit } from "../../types/index.types";
import { ICreateIntegrationsBuilder, IIntegration, IIntegrationApp, IIntegrationCache, IIntegrationDatabase, IIntegrationEnv, IIntegrationFeature, IIntegrationFunction, IIntegrationJobs, IIntegrationNotification } from "../../types/integrationsBuilder.types";
import { IRequestExtension } from "../../types/requests.types";
import { CreateIntegrationBuilderSchema, CreateIntegrationCacheSchema, CreateIntegrationDatabaseSchema, CreateIntegrationEnvSchema, CreateIntegrationFeatureSchema, CreateIntegrationFunctionSchema, CreateIntegrationJobSchema, CreateIntegrationNotificationSchema, UpdateIntegrationAppSchema, UpdateIntegrationCacheSchema, UpdateIntegrationDatabaseSchema, UpdateIntegrationEnvSchema, UpdateIntegrationFeatureSchema, UpdateIntegrationFunctionSchema, UpdateIntegrationJobSchema, UpdateIntegrationNotificationSchema } from "../validators";

export interface IIntegrationsBuilderService {

    // INTEGRATIONS
    createIntegration(data: ICreateIntegrationsBuilder): Promise<void>;
    updateIntegration(data: Partial<IIntegration>): Promise<void>;
    initializeIntegration(integration_id: string): Promise<void>;


    createEnv(data: Partial<IIntegrationEnv>, throwErrorIfExists: boolean): Promise<void>;
    updateEnv(tag: string, data: Partial<IIntegrationEnv>): Promise<void>;
    fetchEnv(tag: string): IIntegrationEnv;
    fetchEnvs(): Array<IIntegrationEnv>;

    // FUNCTIONS
    createFunction(data: Partial<IIntegrationFunction>, throwErrorIfExists: boolean): Promise<void>;
    updateFunction(tag: string, data: Partial<IIntegrationFunction>): Promise<void>;
    fetchFunction(tag: string): IIntegrationFunction;
    fetchFunctions(): Array<IIntegrationFunction>;

    // CACHE
    createCache(data: Partial<IIntegrationCache>, throwErrorIfExists: boolean): Promise<void>;
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
    addApp(app_id: string, access_token: string): Promise<void>; // expect env mapping data and credentials setup here


    // FEATURES
    createFeature(data: Partial<IIntegrationFeature>, throwErrorIfExists: boolean): Promise<void>;
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
}

export default class IntegrationsBuilderService implements IIntegrationsBuilderService {
    private user_id: string;
    private workspace_id: string;
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
    private inputsService: IInputsService;

    constructor({ workspace_id, public_key, user_id, token }: IBuilderInit) {
        this.workspace_id = workspace_id;
        this.public_key = public_key;
        this.user_id = user_id;
        this.token = token;
        this.userApi = new UserApiService();
        this.integrationApi = new IntegrationsApiService();
        this.appApi = new AppApiService();
        this.inputsService = new InputsService();
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
        console.log('INTEGRATION-API ======>>>>>>>>', this.integrationApi)
        return this.integrationApi.createIntegration({ ...data }, this.getUserAccess())
    }

    async checkIfIntegrationExists(name: string) {
        try {
            console.log("CHECK_EXISTS =====>>>>>", name);
            return await this.integrationApi.checkIntegrationNameExists(name, this.getUserAccess());
        } catch (e) {
            return false;
        }
    }

    fetchIntegration(): IIntegration {
        return this.integration;
    }

    async createEnv(data: IIntegrationEnv, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchEnv(data.slug)) {


                await CreateIntegrationEnvSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.ENV
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

            const { _id } = this.fetchEnv(slug);

            await UpdateIntegrationEnvSchema.validateAsync(data); // Change to update;

            if (data.slug && this.fetchEnv(data.slug)) {
                throw new Error(`slug ${slug} is in use`); // TODO: also check on the backend
            }

            await this.integrationApi.updateIntegration(this.integration_id, {
                _id,
                ...data,
                component: IntegrationComponents.ENV
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

    fetchEnv(slug: string): IIntegrationEnv {
        const env = this.integration.envs.find((data: IIntegrationEnv) => data.slug === slug);
        if (!env) throw new Error(`Env ${slug} not found`);
        return env;
    }

    async addApp(app_id: string, tag: string, throwErrorIfExists: boolean = false): Promise<void> {
        try {
    
            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchApp(tag) && !this.fetchApp(app_id)) {
    
    
                /*await CreateIntegrationAppSchema.validateAsync(data);
                await this.integrationApi.updateIntegration(this.integration_id, {
                    ...data,
                    component: IntegrationComponents.FUNCTION
                },
                    this.getUserAccess()
                );*/
                await this.initializeIntegration(this.integration_id);
            } else {
                if (throwErrorIfExists) throw new Error(`App ${tag} already exists`)
            }
        } catch (e) {
            throw e;
        }
    }
    
    async updateApp(tag: string, data: Partial<IIntegrationApp>): Promise<void> {
        try {
    
            const { _id } = this.fetchApp(tag);
    
            await UpdateIntegrationAppSchema.validateAsync(data); // Change to update;
    
            if (data.tag && this.fetchApp(data.tag)) {
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
    
    fetchApps(): Array<IIntegrationApp> {
        return this.integration.functions
    }
    
    fetchApp(tag: string): IIntegrationApp {
        const func = this.integration.functions.find((data: IIntegrationApp) => data.tag === tag);
    
        if (!func) throw new Error(`App ${tag} not found`);
        return func;
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
        const cache = this.integration.caches.find((data: IIntegrationFunction) => data.tag === tag);

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

    async createFeature(data: Partial<IIntegrationFeature>, throwErrorIfExists: boolean = false): Promise<void> {
        try {

            // TODO: figure out a way to check if this has run before, halt if it has
            if (!this.fetchFeature(data.tag)) {


                await CreateIntegrationFeatureSchema.validateAsync(data);
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

    fetchFeature(tag: string): IIntegrationFeature {
        const feature = this.integration.features.find((data: IIntegrationFunction) => data.tag === tag);

        if (!feature) throw new Error(`Feature ${tag} not found`);
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