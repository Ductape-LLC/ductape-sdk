import { ILogsRepo, LogsRepo } from "../logs/logs.repo";
import { IInputsRepo, InputsRepo } from "./inputs.repo";
import { IParsedInput, IParsedSample, IParsedPayload } from "../types/inputs.types";
import ParseDataSchema from "./validators/inputs.validator.parse";
import { IApp, IAppVariables } from "../types/appBuilder.types";
import { KeyValuePair } from "../imports/imports.types";
import { DataTypes } from "../types/enums";
import { IFeatureInput } from "../types/integrationsBuilder.types";

export interface IInputsService {
    parseData(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>>;
    parseXML(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>>;
    parseJson(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>>;
    validateInput(input: Array<IParsedInput>, schema: Array<IParsedSample>): Promise<unknown>;
    compareIndexes(original: Array<IParsedSample>, update: Array<IParsedSample>): Array<String>;
    validateUUID(find: KeyValuePair): void;
    validateNumberString(data: IAppVariables, find: KeyValuePair ): void;
    validateBoolean(find: KeyValuePair): void;
    validateLength(data: IAppVariables, find: KeyValuePair): void;
    validateFeatureInputData(input: KeyValuePair, feature_value: IFeatureInput): void;
}

export default class InputsService implements IInputsService {

    inputsRepo!: IInputsRepo;
    logsRepo!: ILogsRepo;

    constructor() {
        this.inputsRepo = InputsRepo;
        this.logsRepo = LogsRepo;
    }

    async parseData(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>> {
        try {

            return this.inputsRepo.parseData(payload);
        } catch (e) {
            console.log("PAYLOAD ERR", payload, e)
            throw new Error(this.logsRepo.extractError(e));
        }
    }
    async parseXML(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>> {
        try {
            await ParseDataSchema.validateAsync(payload);
            return this.inputsRepo.parseXML(payload);
        } catch (e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }
    async parseJson(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>> {
        try {
            await ParseDataSchema.validateAsync(payload);
            return this.inputsRepo.parseJson(payload);
        } catch (e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }

    async validateInput(input: Array<IParsedInput>, schema: Array<IParsedSample>): Promise<unknown> {
        try {
            return '';
        } catch (e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }

    compareIndexes(original: Array<IParsedSample>, update: Array<IParsedSample>): Array<String> {
        try {
            const originalMap: Map<string, IParsedSample> = new Map(
                original.map((sample) => [this.generateKey(sample), sample])
            );

            // Find missing keys
            const missingKeys: string[] = update
                .map((updateSample) => this.generateKey(updateSample))
                .filter((key) => !originalMap.has(key));

            return missingKeys;
        } catch (e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }

    private generateKey(sample: IParsedSample): string {
        const { parent_key, level, key, index } = sample;
        return `${parent_key}_${level}_${key}_${index}`;
    }

    private areSamplesEqual(sample1: IParsedSample, sample2: IParsedSample): boolean {
        // Implement your equality check logic here
        // For example, compare other fields
        // return sample1.someField === sample2.someField;
        return true;
    }

    validateUUID(find: KeyValuePair): void {
        const uuidRegex: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if(!uuidRegex.test(String(find.value))) {
            throw new Error(`${find.key} value should be a UUID`);
        }
    }

    validateString(find: KeyValuePair): void {
        if (typeof find.value !== 'string') {
            throw new Error(`key: ${find.key} is expected to be a string`);
        }
    }

    validateDouble(find: KeyValuePair): void {
        const MIN_DOUBLE = -Number.MAX_VALUE;
        const MAX_DOUBLE = Number.MAX_VALUE;
    
        if (typeof find.value !== 'number' ||
            Number.isNaN(find.value) ||
            find.value < MIN_DOUBLE ||
            find.value > MAX_DOUBLE) {
            throw new Error(`key: ${find.key} is expected to be a double`);
        }
    }

    validateFloat(find: KeyValuePair): void {
        if (typeof find.value !== 'number' || Number.isNaN(find.value) || !Number.isFinite(find.value) || find.value % 1 === 0) {
            throw new Error(`key: ${find.key} is expected to be a float`);
        }
    }

    validateNumberString(data: IAppVariables, find: KeyValuePair ): void {
        this.validateLength(data, find);

        const numberRegex: RegExp = /^[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?$/;

        // Test if the input string matches the regular expression
        if(!numberRegex.test(String(find.value))) {
            throw new Error(`${find.key} value should be a numberstring`);
        }
    }

    validateLength(data: IAppVariables, find: KeyValuePair): void {
        if(data.maxlength != 0 && String(find.value).length > data.maxlength) {
            throw new Error(`${find.key} value should be maximum length of ${data.maxlength}`);
        }

        if(data.minlength != 0 && String(find.value).length < data.minlength) {
            throw new Error(`${find.key} value should be minimum length of ${data.minlength}`);
        }
    }

    validateBoolean(find: KeyValuePair): void {
        if(typeof(find.value) !== DataTypes.BOOLEAN) {
            throw new Error(`key: ${find.key} is expected to be a boolean`);
        }
    }

    validateInteger(find: KeyValuePair): void {
        if(!(typeof find.value === 'number') && Number.isInteger(find.value)) {
            throw new Error(`key: ${find.key} is expected to be an integer`);
        }
    }

    validateArray(find: KeyValuePair): void {
        if (!Array.isArray(find.value)) {
            throw new Error(`key: ${find.key} is expected to be an array`);
        }
    }
    
    validateObject(find: KeyValuePair): void {
        if (typeof find.value !== 'object' || Array.isArray(find.value) || find.value === null) {
            throw new Error(`key: ${find.key} is expected to be an object`);
        }
    }

    validateFeatureInputData(input: KeyValuePair, feature_value: IFeatureInput): void {

        this.validateLength(feature_value as unknown as IAppVariables, input);
        switch(feature_value.type) {
            case DataTypes.BOOLEAN:
                this.validateBoolean(input);
                return;
            case DataTypes.NUMBER_STRING:
                this.validateNumberString(feature_value as unknown as IAppVariables, input);
                return
            case DataTypes.UUID:
                this.validateUUID(input);
                return
            case DataTypes.INTEGER:
                this.validateInteger(input);
                return
            case DataTypes.STRING:
                this.validateString(input);
                return
            case DataTypes.DOUBLE:
                this.validateDouble(input);
                return
            case DataTypes.FLOAT:
                this.validateFloat(input);
                return
            case DataTypes.ARRAY:
                this.validateArray(input);
                return
            case DataTypes.OBJECT:
                this.validateObject(input);
                return   
        }
    }

}

    // STRING = "string",
    // NUMBER_STRING = "numberstring",
    // INTEGER = "number",
    // FLOAT = "float",
    // DOUBLE = "double",
    // UUID = "uuid",
    // ARRAY = "array",
    // OBJECT = "object",
    // BOOLEAN = "boolean"