import { ILogsRepo, LogsRepo } from "../logs/logs.repo";
import { IInputsRepo, InputsRepo } from "./inputs.repo";
import { IParsedInput, IParsedSample, IParsedPayload } from "../types/inputs.types";
import ParseDataSchema from "./validators/inputs.validator.parse";

export interface IInputsService {
    parseData(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>>;
    parseXML(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>>;
    parseJson(payload: IParsedPayload): Promise<Array<IParsedInput | IParsedSample>>;
    validateInput(input: Array<IParsedInput>, schema: Array<IParsedSample>): Promise<unknown>;
    compareIndexes(original: Array<IParsedSample>, update: Array<IParsedSample>): Array<String>
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

}