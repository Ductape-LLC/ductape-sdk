import IntegrationsBuilderService, { IIntegrationsBuilderService } from "../../integrationsBuilder/services/integrationBuilder.service";
import { IBuilderInit } from "../../types/index.types";
import { IProcessingFailure, IProcessingOutput, IProcessingWaiting, IProcessorInput, IProcessorSequenceLevels } from "../../types/processor.types";
import { calculateExpiry, decrypt, encrypt, extractNumberFromArrayString, generateObjectId, parameterizeResource } from "../utils/processor.utils";
import { FeatureEventTypes, IActionRequest, IActionSamples, IDependencyMatrix, IFeatureEvent, IFeatureInput, IFeatureOutput, IFeatureSequence, IIntegrationAppEnvs, IIntegrationEnv, IIntegrationFeature, IParseActionEventInput, IRetryMeta } from "../../types/integrationsBuilder.types";
import LogsService, { ILogsService } from "../../logs/logs.service";
import { ILogData, LogEventStatus, LogEventTypes } from "../../logs/logs.types";
import InputsService, { IInputsService } from "../../inputs/inputs.service";
import { IApp, IAppEnv, IAppRetryPolicy } from "../../types/appBuilder.types";
import { IParsedIndexes, IParsedSample } from "../../types/inputs.types";
import { DataFormats, DecoratorPostions, HttpMethods } from "../../types/enums";
import httpClient from "../../clients/http.client";
import { AxiosHeaders } from "axios";

export interface IProcessorService {
    processFeature(data: IProcessorInput): Promise<any>;
}

export default class ProcessorService implements IProcessorService {

    private user_id: string;
    private workspace_id: string;
    private public_key: string;
    private token: string;
    private integrationBuilderService: IIntegrationsBuilderService;
    private logService: ILogsService;
    private inputService: IInputsService;
    private processingOutput: IProcessingOutput;
    private inputData: Record<string, unknown>;
    private processEnv: IIntegrationEnv;
    private sequenceLevels: IProcessorSequenceLevels;
    private feature: IIntegrationFeature;
    private level1Events: Array<IFeatureEvent>;
    private level2Events: Array<IFeatureEvent>;
    private level3Events: Array<IFeatureEvent>;
    private level4Events: Array<IFeatureEvent>;
    private level5Events: Array<IFeatureEvent>;
    private integrationId: string;
    private apps: Array<{ access_tag: string, app: IApp }>
    private baseLogs: {
        integration_id: any;
        env: any;
        type: LogEventTypes;
        process_id: string;
        data: any;
    }

    constructor({ workspace_id, public_key, user_id, token }: IBuilderInit) {
        this.workspace_id = workspace_id;
        this.public_key = public_key;
        this.user_id = user_id;
        this.token = token;
        this.integrationBuilderService = new IntegrationsBuilderService({ workspace_id, public_key, user_id, token });
        this.inputService = new InputsService();
        this.processingOutput = { success: [], failure: [], waiting: [], skipped: [] }
        this.apps = [];
    }

    async processFeature(data: IProcessorInput) {
        const { integration_id, env, input, feature_tag } = data;

        this.logService = new LogsService({
            integration_id,
            workspace_id: this.workspace_id,
            public_key: this.public_key,
            user_id: this.user_id,
            token: this.token,
        });

        this.integrationId = integration_id;
        this.inputData = input;

        const process_id = generateObjectId();
        this.baseLogs = { integration_id, env, type: LogEventTypes.FEATURE, process_id, data: input }
        try {

            await this.intializeIntegration();

            this.feature = this.fetchFeature(feature_tag);

            console.log("FEATURE!!!!", this.feature)

            this.logService.setFeatureId(this.feature._id)

            this.logService.generateLogs({ ...this.baseLogs, name: "Process Started", data, status: LogEventStatus.PROCESSING });


            this.processEnv = this.fetchEnv(env);

            const { input: featureInput, sequence, output } = this.feature;

            // validate feature input and log failure
            this.validateJSONFeatureInput(input, featureInput as unknown as Record<string, IFeatureInput>);

            // split processes

            this.sequenceLevels = this.splitSequenceIntoLevels(sequence);

            await this.processSequenceLevels();

            return { process_id }

            //return this.generateOutput(output as unknown as Record<string, IFeatureOutput>);
        } catch (e) {
            console.log("JODIE!!!!!", e);
            this.logService.pushLogs()
            return { process_id }
        }
    }

    async intializeIntegration(): Promise<void> {
        try {
            this.logService.generateLogs({ ...this.baseLogs, name: "Integration Initialization", data: { integration_id: this.integrationId }, status: LogEventStatus.PROCESSING } as unknown as ILogData);


            await this.integrationBuilderService.initializeIntegration(this.integrationId); // validate integration_exists

            this.logService.generateLogs({ ...this.baseLogs, name: "Integration Initialization", data: { integration_id: this.integrationId }, status: LogEventStatus.SUCCESS } as unknown as ILogData);

        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Integration Initialization", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
            throw e;
        }
    }

    fetchFeature(tag: string) {
        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Feature Fetch", data: { tag }, status: LogEventStatus.PROCESSING } as unknown as ILogData);

            const feature = this.integrationBuilderService.fetchFeature(tag); // validate feature exists

            this.logService.generateLogs({ ...this.baseLogs, name: "Feature Fetch", data: { tag }, status: LogEventStatus.SUCCESS } as unknown as ILogData);

            return feature;
        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Feature Fetch", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
            throw e;
        }
    }

    fetchEnv(env: string) {
        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Environment Fetch", data: { env }, status: LogEventStatus.PROCESSING } as unknown as ILogData)


            const integration_env = this.integrationBuilderService.fetchEnv(env, true); // validate env exists

            this.logService.generateLogs({ ...this.baseLogs, name: "Environment Fetch", data: { env }, status: LogEventStatus.SUCCESS } as unknown as ILogData)

            return integration_env

        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Environment Fetch", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
            throw e;
        }
    }

    validateJSONFeatureInput(input: Record<string, unknown>, feature_input: Record<string, IFeatureInput>) {

        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Input Validation", data: { input, feature_input }, status: LogEventStatus.PROCESSING } as unknown as ILogData)
            const input_keys = Object.keys(input);
            const feature_keys = Object.keys(feature_input);

            // validate input to flag keys that are not expected
            for (let i = 0; i < input_keys.length; i++) {
                const key = input_keys[i];

                const value = feature_input[key];

                if (!value) {
                    throw new Error(`{ ${key} : ${value}}, is not expected in the input  `)
                }

                const validation_keys = ['type', 'minlength', 'maxlength']

                // handle nested objects
                if (typeof value === 'object' && !Array.isArray(value) && !((Object.keys(value).every(value => validation_keys.includes(value))))) { // TODO: handle arrays

                    this.validateJSONFeatureInput(input[key] as unknown as Record<string, unknown>, value as unknown as Record<string, IFeatureInput>)

                }

                // TODO: validate arrays later on

                if (typeof value === 'object' && Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        this.validateJSONFeatureInput(input[key] as unknown as Record<string, unknown>, value[i] as unknown as Record<string, IFeatureInput>);
                    }
                }


            }

            // validate input to flag missing keys
            for (let i = 0; i < feature_keys.length; i++) {
                const key = feature_keys[i];
                const value = input[key] as unknown as string | number;

                if (!value) {
                    throw new Error(`{ ${key} : ${value}}, is expected in the input  `)
                }

                const feature_value = feature_input[key];

                this.inputService.validateFeatureInputData({ key, value }, feature_value);
            }

            this.logService.generateLogs({ ...this.baseLogs, name: "Input Validation", data: { input, feature_input }, status: LogEventStatus.SUCCESS } as unknown as ILogData)
        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Input Validation", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
            throw e;
        }
    }

    splitSequenceIntoLevels(data: Array<IFeatureSequence>): IProcessorSequenceLevels {

        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Split Sequence", data: {}, status: LogEventStatus.PROCESSING } as unknown as ILogData)


            // add the levels, for output references
            for (let i = 0; i < data.length; i++) {
                data[i].level = i; // TODO: DOUBLE CHECK THAT 
            }

            const level1: Array<IFeatureSequence> = [];
            const level2: Array<IFeatureSequence> = [];
            const level3: Array<IFeatureSequence> = [];
            const level4: Array<IFeatureSequence> = [];

            const found_tags: Array<string> = []

            // extract level1
            for (let i = 0; i < data.length; i++) {
                const sequence = data[i];
                if (!sequence.parents || sequence.parents.length === 0) {
                    level1.push(sequence);
                    found_tags.push(sequence.sequence_tag);
                    data.splice(i, 1); // remove the data from the array if it is in level 1
                    i--; // Adjust index after removing an element
                }
            }

            // Extract level2
            for (let i = 0; i < data.length; i++) {
                const sequence = data[i];
                if (sequence.parents.every(parent => found_tags.includes(parent))) {
                    level2.push(sequence);
                    found_tags.push(sequence.sequence_tag);
                    data.splice(i, 1); // Remove the data from the array if it is in level 2
                    i--; // Adjust index after removing an element
                }
            }

            // Extract level3
            for (let i = 0; i < data.length; i++) {
                const sequence = data[i];
                if (sequence.parents.every(parent => found_tags.includes(parent))) {
                    level3.push(sequence);
                    found_tags.push(sequence.sequence_tag);
                    data.splice(i, 1); // Remove the data from the array if it is in level 3
                    i--; // Adjust index after removing an element
                }
            }

            // Extract level4
            for (let i = 0; i < data.length; i++) {
                const sequence = data[i];
                if (sequence.parents.every(parent => found_tags.includes(parent))) {
                    level4.push(sequence);
                    found_tags.push(sequence.sequence_tag);
                    data.splice(i, 1); // Remove the data from the array if it is in level 3
                    i--; // Adjust index after removing an element
                }
            }


            const levels = { level1, level2, level3, level4, level5: data }; // TODO: future optimization: this should be getting cached

            this.logService.generateLogs({ ...this.baseLogs, name: "Split Sequence", data: levels, status: LogEventStatus.SUCCESS } as unknown as ILogData);

            return levels;

        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Split Sequence", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
            throw e;
        }

    }

    async processSequenceLevels() {

        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Process Levels", data: { levels: this.sequenceLevels }, status: LogEventStatus.PROCESSING } as unknown as ILogData)
            const { level1, level2, level3, level4, level5 } = this.sequenceLevels;

            this.level1Events = this.fetchLevelEvents(level1);
            this.level2Events = this.fetchLevelEvents(level2);
            this.level3Events = this.fetchLevelEvents(level3);
            this.level4Events = this.fetchLevelEvents(level4);
            this.level5Events = this.fetchLevelEvents(level5);

            let level2Complete, level3Complete, level4Complete, level5Complete;

            const level1Complete = await this.processLevelEvents(this.level1Events);

            if (level1Complete) {
                level2Complete = await this.processLevelEvents(this.level2Events);
            }
            if (level2Complete) level3Complete = await this.processLevelEvents(this.level3Events);

            if (level3Complete) level4Complete = await this.processLevelEvents(this.level4Events);

            if (level4Complete) level5Complete = await this.processLevelEvents(this.level5Events);

            if (level5Complete) {
                console.log("JAMAICA", level1Complete, level2Complete, level3Complete, level4Complete, level5Complete);
                this.logService.pushLogs();
                //this.saveResults()
            }

        } catch (e) {
            console.log(e);
            this.logService.generateLogs({ ...this.baseLogs, name: "Process Levels", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
            throw e;
        }
    }

    async processLevelEvents(events: Array<IFeatureEvent>) {
        const promises = events.map((event: IFeatureEvent) => {
            const dependants = this.fetchActionRequestDependents(event.input);
            if (this.checkDependentsSuccess(dependants)) { // TODO: comparison to see if all depending events are in success || dependants is empty
                return this.processEvent(event)
            } else {
                this.addToWaitingOutput(event, dependants)
            }
        })

        return Promise.all(promises)
    }


    async processFailedEvents() {
        const { failure } = this.processingOutput;

        const promises = failure.map((failed: IProcessingFailure) => {
            if (failed.retries_left > 0 && new Date().getTime() > failed.retry_at) {
                this.logService.generateLogs({ ...this.baseLogs, name: "Reprocessing Failed Events", data: { ...failed }, status: LogEventStatus.SUCCESS, message: "Retry initiated" } as unknown as ILogData)
                return this.processEvent(failed.event); // process events should also take care of this.processingOutput 
            }

            if (failed.retries_left === 0 && !failed.allow_fail) {
                this.logService.generateLogs({ ...this.baseLogs, name: "Reprocessing Failed Events", data: { ...failed }, status: LogEventStatus.FAIL, message: "Ran out of retries" } as unknown as ILogData)
                throw new Error(`Event ${failed.event.event} failed in sequence ${failed.event.sequence_tag}, ran out of retries and the feature cannot run without it succeeding`);
            }
        })

        Promise.all(promises);
    }

    async processWaitingEvents() {

        const { waiting } = this.processingOutput;

        const promises = waiting.map((waiting: IProcessingWaiting) => {

            const { dependants } = waiting;
            if (this.checkDependentsSuccess(dependants)) { // TODO: comparison to see if all depending events are in success || dependants is empty
                this.logService.generateLogs({ ...this.baseLogs, name: "Reprocessing Waiting Events", data: { ...waiting }, status: LogEventStatus.PROCESSING, message: "Waiting Event Initiated" } as unknown as ILogData)
                return this.processEvent(waiting.event);
            } else {
                this.logService.generateLogs({ ...this.baseLogs, name: "Reprocessing Waiting Events", data: { ...waiting }, status: LogEventStatus.WAITING, message: "Waiting Event Initiated" } as unknown as ILogData)
            }
        })

        return Promise.all(promises);

    }

    checkDependentsSuccess(dependants: Array<IDependencyMatrix>): boolean {
        let pass = true;

        for (let i = 0; i < dependants.length; i++) {
            if (!this.processingOutput.success.find((item) => item.event.sequence_tag === dependants[i].sequence_tag && item.event.event === dependants[i].event_tag)) {
                pass = false;
            }
        }

        return pass;
    }

    fetchActionRequestDependents(input: IActionRequest) {

        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Request Dependents", data: input, status: LogEventStatus.PROCESSING } as unknown as ILogData)

            const dependents = []
            if (input.query) {
                dependents.push(...this.fetchDependents(input.query))
            }

            if (input.body) {
                dependents.push(...this.fetchDependents(input.body))
            }

            if (input.headers) {
                dependents.push(...this.fetchDependents(input.headers))
            }

            if (input.params) {
                dependents.push(...this.fetchDependents(input.params))
            }

            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Request Dependents", data: dependents, status: LogEventStatus.SUCCESS } as unknown as ILogData)

            return dependents;
        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Request Dependents", data: e, status: LogEventStatus.FAIL } as unknown as ILogData)
        }
    }

    fetchDependents(obj: Record<string, unknown>): Partial<Array<IDependencyMatrix>> {

        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Dependents", data: obj, status: LogEventStatus.PROCESSING } as unknown as ILogData);

            const dependants = [];

            for (const key in obj) {
                const value = obj[key];
                if (typeof value === 'object') {

                    if ('function' in value && 'values' in value) {
                        const { function: func, values } = value as any;

                        for (let i = 0; i < values.length; i++) {

                            if (values[i].startsWith('$Sequence')) {
                                const stages = this.integrationBuilderService.extractStages(values[i]);

                                dependants.push({ sequence_tag: stages[0], event_tag: stages[1] })
                            }
                        }
                    } else {
                        dependants.push(... this.fetchDependents(value as unknown as Record<string, unknown>))
                    }

                } else if (typeof value === 'string') {
                    if (value.startsWith('$Sequence')) {
                        const stages = this.integrationBuilderService.extractStages(value);

                        dependants.push({ sequence_tag: stages[0], event_tag: stages[1] })
                    }
                }
            }

            return dependants;
        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Dependents", data: e, status: LogEventStatus.FAIL } as unknown as ILogData);
            throw e;
        }


    }

    async constructJSONDataPayloads(object: IActionRequest, samples: IActionSamples, event: IFeatureEvent) {

        try {
            this.logService.generateLogs({ ...this.baseLogs, name: "Constructing JSON Payloads", data: { object, samples }, status: LogEventStatus.PROCESSING } as unknown as ILogData);

            const payload = {};

            const { body: actionBody, query: actionQuery, headers: actionHeaders, params: actionParams } = object;

            if (actionBody) {

                Object.assign(payload, { body: await this.generatePayload(actionBody, event, samples.body) });
            }

            if (actionQuery) {
                Object.assign(payload, { query: await this.generatePayload(actionQuery, event, samples.query) });
            }

            if (actionHeaders) {
                Object.assign(payload, { headers: await this.generatePayload(actionHeaders, event, samples.headers) });

            }

            if (actionParams) {
                Object.assign(payload, { params: await this.generatePayload(actionParams, event, samples.params) });
            }

            this.logService.generateLogs({ ...this.baseLogs, name: "Constructing JSON Payloads", data: payload, status: LogEventStatus.SUCCESS } as unknown as ILogData);

            return payload;

        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Constructing JSON Payloads", data: e, status: LogEventStatus.FAIL } as unknown as ILogData);
            throw e;
        }

    }

    async generatePayload(obj: Record<string, unknown>, event: IFeatureEvent, sample: IParsedSample[] = [], index: IParsedIndexes = {}) {

        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Generating Payload", data: { obj, event, sample }, status: LogEventStatus.PROCESSING } as unknown as ILogData);
            const payload = {};

            const keys = Object.keys(obj)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = obj[key]
                if (typeof value === 'object') {

                    // check if function or object
                    if ('function' in value && 'values' in value) {
                        // Object.assign(payload, { [key]: await this.generateFunctionResult(value.function, value.values, sample) });
                    } else {

                        const new_level = index.level ? index.level + 1 : 1
                        index = { parent_key: key, level: new_level }
                        // TODO: how to pass sample into this
                        Object.assign(payload, { [key]: this.generatePayload(value as unknown as Record<string, unknown>, event, sample) })
                    }

                } else if (typeof value === 'string') {

                    const stages = this.integrationBuilderService.extractStages(value);
                    if (value.startsWith('$Auth{')) {
                        Object.assign(payload, { [key]: await this.generateAuthValue(stages, event.app, sample) })
                    } else if (value.startsWith('$Sequence{')) {
                        Object.assign(payload, { [key]: await this.generateSequenceValue(stages) })
                    } else if (value.startsWith('$Input{')) {
                        Object.assign(payload, { [key]: await this.generateInputValue(this.inputData, stages) })
                    } else if (value === '$Default') {

                        Object.assign(payload, { [key]: await this.generateDefaultValue(sample, { ...index, key }) })
                    } else if (value.startsWith('$Variable{')) {

                        Object.assign(payload, { [key]: await this.generateVariableValue(stages) })

                    } else if (value.startsWith('$Constant{')) {
                        Object.assign(payload, { [key]: await this.generateConstantValue(stages) });
                    }

                }
            }

            this.logService.generateLogs({ ...this.baseLogs, name: "Generating Payload", data: { payload }, status: LogEventStatus.SUCCESS } as unknown as ILogData);

            return payload;

        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Generating Payload", data: e, status: LogEventStatus.FAIL } as unknown as ILogData);
            throw e;
        }

    }

    async generateInputValue(input: Record<string, unknown>, stages: Array<string>): Promise<any> {

        try {
            if (stages.length === 1) {
                return input[stages[0]];
            }

            if (typeof input[stages[0]] !== 'object') {
                throw new Error(`Nested input ${input[stages[0]]} should be an object or array`)
            }

            stages.shift();
            return this.generateInputValue(input[stages[0]] as unknown as Record<string, unknown>, stages);
        } catch (e) {
            throw e;
        }
    }

    async generateSequenceValue(stages: Array<string>) {

        try {
            // find out put in success array using event and success tags
            const result = this.processingOutput.success.find((item) => item.event.event === stages[1] && item.event.sequence_tag === stages[0])

            const cleanedStages = stages.slice(2); // remove event and sequence tags

            return this.fetchOutputValueAfterStrippingLocators(cleanedStages, result.output);

        } catch (e) {
            throw e;
        }

    }

    fetchOutputValueAfterStrippingLocators(stages: Array<string>, output: Record<string, unknown>): any {

        try {
            let next;

            if (stages.length === 0) {
                return output
            }

            const arrayIndex = extractNumberFromArrayString(stages[0])
            if (arrayIndex === null) { // is not an array
                next = output[stages[0]];
            } else {
                next = output[arrayIndex];
            }

            if (!next) {
                // throw error for when next value is not found
            }


            if (stages.length === 1) {
                return next;
            }



            if (typeof next === 'object' && stages.length) {
                stages.shift()
                return this.fetchOutputValueAfterStrippingLocators(stages, next as unknown as Record<string, unknown>);
            }
        } catch (e) {
            throw e;
        }
    }

    async generateDefaultValue(sample: IParsedSample[], index: IParsedIndexes) {

        try {

            const value = sample.find((item) => item.key === index.key && item.level === index.level && item.parent_key === index.parent_key)

            if (!value || !value.defaultValue) {
                throw new Error(`Cannot find default value of ${index}`)
            }

            return value.defaultValue;

        } catch (e) {
            throw e;
        }

    }

    async generateVariableValue(stages: Array<string>) {

        try {
            const app = this.integrationBuilderService.fetchApp(stages[0]);

            const env = app.envs.find((items) => items.integration_env_slug === this.processEnv.slug);

            if (!env) {
                throw new Error(`App ${stages[0]} variables needs to have a definition for env: ${this.processEnv.slug}`);
            }

            const { variables } = env;

            const found = variables.find((item) => item.key === stages[1]);

            if (!found) {
                throw new Error(`Variable ${stages[1]} not found declared for app ${stages[0]} in ${this.processEnv.slug}`)
            }

            return found.value;
        } catch (e) {
            throw e;
        }
    }

    async generateConstantValue(stages: Array<string>) {
        try {
            const app = await this.fetchThirdPartyApp(stages[0]);

            const found = app.constants.find((data, index) => data.key === stages[1]);

            if (!found) {
                throw new Error(`Constant ${stages[1]} not found declared for app ${stages[0]} in`)
            }

            return found.value;
        } catch (e) {
            throw e;
        }
    }

    decorateValue(value: string, sample: IParsedSample) {
        if (sample.decorator) {
            if (sample.decoratorPosition && sample.decoratorPosition == DecoratorPostions.APPEND) {
                return `${value} ${sample.decorator}`
            }

            if (sample.decoratorPosition && sample.decoratorPosition == DecoratorPostions.PREPEND) {
                return `${sample.decorator} ${value}`
            }
        }

        return value;
    }



    async generateAuthValue(stages: Array<string>, app: string, sample: IParsedSample[]) {

        try {
            let auth_data = await this.fetchAuthData(app);
            // take the app tag in index 0..

            if (!auth_data) {
                throw new Error(`Cannot fetch auth data of app ${app}`)
            }
            stages.shift()
            const auth = this.fetchOutputValueAfterStrippingLocators(stages, auth_data);

            return this.decorateValue(auth, sample[0]);
        } catch (e) {
            throw e;
        }
    }

    async fetchAuthData(app_tag: string) {
        try {

            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Auth Data", data: { app_tag, env: this.processEnv.slug }, status: LogEventStatus.PROCESSING } as unknown as ILogData);
            const app = this.integrationBuilderService.fetchApp(app_tag);

            if (!app) {
                throw new Error(`App ${app_tag} not found in $Auth value`)
            }

            const env = app.envs.find((item) => item.integration_env_slug === this.processEnv.slug)

            if (!env) {
                throw new Error(`App ${app_tag} in auth needs to have a definition for env: ${this.processEnv.slug}`);
            }

            if (!env.auth) {
                throw new Error(`App ${app_tag} in auth needs to have a definition for auth in env: ${this.processEnv.slug}`);
            }

            let values = env.auth.values
            if (!values) {
                // no auth values
                values = await this.getAndStoreAuth(env, app_tag)

            }

            if (!env.auth.expiry || (env.auth.expiry && Date.now() > new Date(env.auth.expiry).getTime())) {
                // refresh
                values = await this.getAndStoreAuth(env, app_tag)
            }

            const decrypted = decrypt(values, this.public_key)

            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Auth Data", data: { auth: decrypted }, status: LogEventStatus.SUCCESS } as unknown as ILogData);

            return JSON.parse(decrypted) as unknown as Record<string, unknown>;

        } catch (e) {
            this.logService.generateLogs({ ...this.baseLogs, name: "Fetching Auth Data", data: e, status: LogEventStatus.FAIL } as unknown as ILogData);
            throw e;
        }

    }


    async processEvent(event: IFeatureEvent) {
        try {
            if (event.type === FeatureEventTypes.ACTION) {
                return this.processAction(event);
            }

            if (event.type === FeatureEventTypes.DB_ACTION) {
                return this.processDBAction(event);
            }

            if (event.type === FeatureEventTypes.FEATURE) {

                // this.processFeature({})
                // this.processFeature TODO: do some processing to get this to reuse this.processFeature from abov
            }

            if (event.type === FeatureEventTypes.NOTIFICATION) {
                return this.processNotification(event)
            }

            if (event.type === FeatureEventTypes.JOB) {
                return this.processJob(event);
            }

            if (event.type === FeatureEventTypes.EVENT) {
                return this.processWebhook(event);
            }
        } catch (e) {
            throw e;
        }

    }

    async processFailedAndWaiting() {

    }

    generateOutput(output: Record<string, IFeatureInput>) {

    }


    fetchLevelEvents(level: Array<IFeatureSequence>) {

        const events = [];
        for (let i = 0; i < level.length; i++) {
            events.push(...this.appendSequenceDataToLevelEvents(level[i]))
        }

        return events;
    }

    appendSequenceDataToLevelEvents(sequence: IFeatureSequence) {

        const { events, level, sequence_tag } = sequence;

        for (let i = 0; i < events.length; i++) {
            events[i].sequence_level = level
            events[i].sequence_tag = sequence_tag;
            events[i].env = this.processEnv;
        }

        return events;
    }

    async getAndStoreAuth(appEnv: IIntegrationAppEnvs, access_tag: string): Promise<string> {
        try {
            //  const payload = JSON.parse(decrypt(env.auth.data, this.integrationBuilderService.fetchIntegration().private_key));

            const payload = appEnv.auth.data;


            let app = await this.fetchThirdPartyApp(access_tag);

            const auth = app.auths.find((item) => item.tag === appEnv.auth.auth_tag);

            if (!auth) {
                // throw an error
                throw new Error(`Cannot find auth ${appEnv.auth.auth_tag} on environment ${appEnv.integration_env_slug}`)
            }

            const { action_tag, expiry, period } = auth

            const action = app.actions.find((item) => item.tag === action_tag);

            const { envs: appEnvs } = app;

            const env = appEnvs.find((item) => item.slug === appEnv.app_env_slug) // fetch the actuall app Environment variable

            const { request_type, method, base_url, resource: url } = action;

            let request_base_url = base_url;

            if (env.base_url) {
                request_base_url = env.base_url;
            }

            const results = await this.sendActionRequest(request_base_url, url, payload, method, env);

            const values = encrypt(JSON.stringify(results), this.public_key);

            const integrationApp = this.integrationBuilderService.fetchApp(access_tag);

            for (let i = 0; i < integrationApp.envs.length; i++) {
                if (integrationApp.envs[i].app_env_slug === env.slug) {
                    integrationApp.envs[i].auth.values = values; // write new values
                    integrationApp.envs[i].auth.expiry = calculateExpiry(expiry, period); // write new expiry
                }
            }

            await this.integrationBuilderService.updateApp(access_tag, integrationApp); // stores auth values


            return values;
        } catch (e) {
            throw e;
        }
    }

    async fetchThirdPartyApp(access_tag: string): Promise<IApp> {
        try {
            let details = this.apps.find((item) => item.access_tag === access_tag)

            if (!details) {
                const app = await this.integrationBuilderService.fetchThirdPartyAppByAccessTag(access_tag);

                details = { access_tag, app };
                this.apps.push(details);
            }

            return details.app;
        } catch (e) {
            throw e;
        }
    }

    async processAction(event: IFeatureEvent) {
        try {

            const { event: action_tag, app: access_tag } = event;


            let app = await this.fetchThirdPartyApp(access_tag);

            const { actions, envs: appEnvs, retries } = app;

            const integrationApp = this.integrationBuilderService.fetchApp(access_tag);

            const { envs: integrationEnvs } = integrationApp;

            const { app_env_slug } = integrationEnvs.find((item) => item.integration_env_slug === this.processEnv.slug);

            const env = appEnvs.find((item) => item.slug === app_env_slug) // fetch the actuall app Environment variable

            const action = actions.find((item) => item.tag === action_tag);

            if (!action) {
                throw new Error(`Action ${action_tag} not found in ${access_tag}`)
            }

            const { query, headers, body, params, request_type, method, base_url, resource } = action;

            let request_base_url = base_url;

            if (env.base_url) {
                request_base_url = env.base_url;
            }

            const samples = {
                query: query.data,
                headers: headers.data,
                body: body.data,
                params: params.data
            }


            let payloads;

            if (request_type === DataFormats.JSON) {
                payloads = await this.constructJSONDataPayloads(event.input, samples, event); // fix this o
            }

            await this.processRequest({ request_base_url, resource, method, env, payloads }, event, retries);

        } catch (e) {
            throw e;
        }


    }

    async processRequest(payload: IRetryMeta, event: IFeatureEvent, retries: IAppRetryPolicy) {
        const { request_base_url, resource, payloads, method, env } = payload
        try {
            const results = await this.sendActionRequest(request_base_url, resource, payloads, method, env);
            await this.addToSuccessOutput(event, results);
            return true;
        } catch (e) {
            try {
                this.addToFailureOutput(e, event, retries, { request_base_url, resource, method, env, payloads });
            } catch (err) {
                console.log("Juliana!!!!", err);
                throw err;
            }
        }
    }

    async addToSuccessOutput(event: IFeatureEvent, output: any) {
        this.processingOutput.success.push({ event, output });

        await this.processWaitingEvents();
    }

    addToWaitingOutput(event: IFeatureEvent, dependants: Array<IDependencyMatrix>) {
        const exists = this.processingOutput.waiting.findIndex((item) => {
            return item.event.event === event.event && item.event.sequence_tag === event.sequence_tag;
        });

        const skipped = this.processingOutput.skipped.findIndex((item) => {
            return item.event.event === event.event && item.event.sequence_tag === event.sequence_tag;
        })

        if (!exists && !skipped) {
            this.processingOutput.waiting.push({ event, dependants });
        }

        // addToSkippedOutput()
    }

    addToFailureOutput(e: any, event: IFeatureEvent, policy: IAppRetryPolicy, payload: IRetryMeta) {

        try {

            const exists = this.processingOutput.failure.findIndex((item) => {
                return item.event.event === event.event && item.event.sequence_tag === event.sequence_tag;
            });

            const error_code = e.response.status;

            const { allow_fail, retries } = event;
            const { retry_at, max } = this.generateRetryMetrices(String(error_code), policy)

            let retries_left = retries || max;
            if (exists > -1) {
                retries_left = this.processingOutput.failure[exists].retries_left - 1;
                this.processingOutput.failure.splice(exists, 1);
            }

            const output = {
                allow_fail,
                retry_at,
                retries_left,
                payload: payload.payloads,
                error_code: e.response.status,
                reason: JSON.stringify(e.response.data),
                event,
            }

            if (allow_fail === true && retries === 0) {
                this.processingOutput.skipped.push(output);
            } else {
                this.processingOutput.failure.push(output)
            }

            if (retries_left > 0) {
                setTimeout(() => {
                    this.logService.generateLogs({ ...this.baseLogs, name: "Retrying Action", data: output, status: LogEventStatus.PROCESSING } as unknown as ILogData)
                    this.processRequest(payload, event, policy)
                }, retry_at);
            }

            if (allow_fail === false && retries_left === 0) {
                console.log("JULIANA BAKER!!!")
                //this.logService.generateLogs({ ...this.baseLogs, name: "RUN OUT OF RETRIES", data: output, status: LogEventStatus.FAIL } as unknown as ILogData)
                throw new Error("Run out of retries")

                //console.log("",this.processingOutput);
                //this.logService.pushLogs();
            }


        } catch (e) {
            console.log("SAMMY ROSCOE")

            throw e;

        }

    }

    generateRetryMetrices(error_code: string, retries: IAppRetryPolicy) {
        let allow_fail = true;
        let retry_at = 5000;
        let max = retries.max;

        switch (error_code) {

            case "500":
                allow_fail = retries.policy[500].available;
                retry_at = retries.policy[500].lag;
                break;
            case "502":
                allow_fail = retries.policy[502].available;
                retry_at = retries.policy[502].lag;
                break;
            case "503":
                allow_fail = retries.policy[503].available;
                retry_at = retries.policy[503].lag;
                break;
            case "504":
                allow_fail = retries.policy[504].available;
                retry_at = retries.policy[504].lag;
                break;
            case "400":
                allow_fail = retries.policy[400].available;
                retry_at = retries.policy[400].lag;
                break;
            case "401":
                allow_fail = retries.policy[401].available;
                retry_at = retries.policy[401].lag;
                break;
            case "403":
                allow_fail = retries.policy[403].available;
                retry_at = retries.policy[403].lag;
                break;
            case "404":
                allow_fail = retries.policy[404].available;
                retry_at = retries.policy[404].lag;
                break;
            default:
                allow_fail = true;
                retry_at = 0;
                max = 0
                break;
        }

        return { allow_fail, max, retry_at }
    }

    async sendActionRequest(base_url: string, resource: string, payload: IActionRequest, method: HttpMethods, env: IAppEnv) {

        const { headers, query, body, params } = payload


        if (params) {
            const paramsKeys = Object.keys(params);

            for (let i = 0; i < paramsKeys.length; i++) {
                resource = parameterizeResource(resource, paramsKeys[i], params[paramsKeys[i]] as unknown as string)
            }
        }

        const authHeaders = headers as AxiosHeaders;

        const request = {
            url: resource,
            method,
            data: body,
            params: query,
            headers: authHeaders
        }

        const response = await httpClient(base_url).request(request);

        return response.data;
    }

    async processWebhook(event: IFeatureEvent) {

    }

    async processJob(job: IFeatureEvent) {

    }

    async processNotification(notification: IFeatureEvent) {

    }

    async processDBAction(db_action: IFeatureEvent) {

    }
}