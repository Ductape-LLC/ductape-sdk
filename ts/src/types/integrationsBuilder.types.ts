export interface ICreateIntegrationsBuilder {
    name: string;
    description: string;
    unique?: boolean
}

export interface IIntegration {
    _id?: string;
    name: string;
    description: string;
    apps: Array<IIntegrationApp>;
    envs: Array<IIntegrationEnv>;
    functions: Array<IIntegrationFunction>;
    caches: Array<IIntegrationCache>;
    notifications: Array<IIntegrationNotification>;
    features: Array<IIntegrationFeature>;
    databases: Array<IIntegrationDatabase>;
    jobs: Array<IIntegrationJobs>

}

export interface IIntegrationEnv {
    _id?: string;
    slug: string;
}

export interface IIntegrationApp {
    _id?: string;
    tag: string;
}

export interface IIntegrationFunction {
    _id?: string;
    tag: string;
}

export interface IIntegrationCache {
    _id?: string;
    tag: string;
}

export interface IIntegrationNotification {
    _id?: string;
    tag: string;
}


export interface IIntegrationFeature {
    _id?: string;
    tag: string;
}

export interface IIntegrationDatabase {
    _id?: string;
    tag: string;
}

export interface IIntegrationJobs {
    _id?: string;
    tag: string;
}

export interface ICreateIntegrationsPayload {}

export interface ICreateIntegrationEnvPayload {}

export interface ICreateIntegrationFunctionPayload{}

export interface ICreateIntegrationCachePayload {}

export interface ICreateIntegrationNotificationPayload {}

export interface ICreateIntegrationDatabasePayload {}

