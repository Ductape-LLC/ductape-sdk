import { KeyValuePair } from "../imports/imports.types";
import { IAppEnv, ISample } from "./appBuilder.types";
import { Categories, DataTypes, HttpMethods, Languages, TokenPeriods } from "./enums";
import { IParsedIndexes, IParsedInput, IParsedSample } from "./inputs.types";

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
  jobs: Array<IIntegrationJobs>;
  private_key: string;

}

export interface IIntegrationEnv {
  _id?: string;
  env_name: string;
  description: string;
  slug: string;
  envs: Array<IIntegrationAppEnvs>;
  auth: IIntegrationAppAuth;
}

export interface IIntegrationAppEnvs {
  app_env_slug: string; // to be validated that it exists
  integration_env_slug: string; // to be validated that exists
  variables?: Array<KeyValuePair>; // each key to be validated
  auth: IIntegrationAppAuth;
}

export interface IIntegrationAppAuth {
  auth_tag: string; // to be validated
  data: IActionRequest;
  values?: string; // TODO: extend later to handle other Auth types
  expiry?: number;
}

export interface IIntegrationApp {
  _id?: string;
  access_tag: string;
  envs: Array<IIntegrationAppEnvs>; // validate
}

export interface IIntegrationFunction {
  _id?: string;
  tag: string;
  language: Languages;
  function: string;
  input: Array<IParsedSample>;
  output: ISampleOutput;
}

export interface ISampleOutput {
  type: DataTypes,
  output_keys?: Array<IParsedInput>,
}

export interface IIntegrationCache {
  _id?: string;
  tag: string; // cache tag
  sequence_tag: string;
  event_tag: string;
  expiry: number;
  period: TokenPeriods;
}

export interface IIntegrationNotification {
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

export interface ICreateIntegrationsPayload { }

export interface ICreateIntegrationEnvPayload { }

export interface ICreateIntegrationFunctionPayload { }

export interface ICreateIntegrationCachePayload { }

export interface ICreateIntegrationNotificationPayload { }

export interface ICreateIntegrationDatabasePayload { }

export interface IAccess {
  public_key?: string;
  user_id?: string;
  token?: string;
  workspace_id: string;
  integration_id?: string;
  app_id: string;
  access_tag: string;
  access: boolean;
}

export interface ICondition {

  type: ConditionTypes;
  decision_type: DecisionTypes;
  decider: Deciders;
  value: string
}


export interface IRetryMeta {
  request_base_url: string;
  resource: string;
  method: HttpMethods;
  env: IAppEnv;
  payloads: any;
  app_id: string;
}

export interface IFeatureEvent {
  condition?: ICondition;
  auth?: string;
  app?: string;
  type: FeatureEventTypes;
  event: string;
  input: IActionRequest //| IJobRequest | IEventRequest | INotificationRequest | IDBActionRequest;
  retries: number;
  allow_fail: boolean;

  sequence_level?: number;
  sequence_tag?: string;
  env?: IIntegrationEnv;
}

export interface IBaseActionDataParserInput {
  sample: ISample;
  event_index: number;
  sequence_index: number;
  feature: Partial<IIntegrationFeature>;
  type: Categories;
  indexes: IParsedIndexes;
}
export interface IActionDataParserInput extends IBaseActionDataParserInput {
  obj: any;
}

export interface IParseActionEventInput extends IBaseActionDataParserInput{
  key: string;
  value: any;
}

export interface IParseInputStringInput {
  datapoint: IParsedSample;
  value: string;
  input: Record<string, unknown>;
  stages: Array<string>;
}

export interface IParseInputStringMetaData {

  feature: Partial<IIntegrationFeature>;
  sequence_index: number;
  event_index: number;
  type: Categories;
}
export interface IActionRequest {
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}

export interface IActionSamples {
  query?: Array<IParsedSample>;
  params?: Array<IParsedSample>;
  body?: Array<IParsedSample>;
  headers?: Array<IParsedSample>;
}

export interface IJobRequest {
  body?: Record<string, unknown>;
}

export enum ConditionTypes {
  DO_WHILE = "do_while",
  IF = "if",
}

export enum Deciders {
  VALUE = "value",
  LENGTH = "length",
}

export enum DecisionTypes {
  LESS_THAN = "less-than",
  GREATER_THAN = "greater-than",
  EQUALS = "equals",
  LESS_THAN_OR_EQUALS = "less-than-or-equals",
  GREATER_THAN_OR_EQUALS = "greater-than-or-equals"
}

export enum FeatureEventTypes {
  ACTION = "action",
  FEATURE = "feature",
  NOTIFICATION = "notification",
  DB_ACTION = "database_action",
  EVENT = "event",
  JOB = "job",
}

export enum InputDataSources {
  INPUT = "input",
  EVENT = "event",
  AUTH = "auth",
}

export interface IFeatureSequence {
  parents?: Array<string>;
  level?: number;
  sequence_tag: string;
  events: Array<IFeatureEvent>;
}

export interface IIntegrationFeature {
  _id: string;
  input_type: string;
  store_event_results: boolean;
  tag: string;
  input: string | Record<string, IFeatureInput>;
  sequence: IFeatureSequence[];
  output: string | Record<string, IFeatureInput>;
}

export interface IFeatureInput {
  type: DataTypes,
  minlength?: number;
  maxlength?: number;
}

export interface IFeatureOutput extends IFeatureInput {

}

export interface IDependencyMatrix {
  event_tag: string;
  sequence_tag: string;
}