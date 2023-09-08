import { ILogsRepo, LogsRepo } from "../logs/logs.repo";
import { IInputsRepo, InputsRepo } from "./inputs.repo";
import { ParsedInput, ParsedSample, ParsePayload } from "./inputs.types";
import ParseDataSchema from "./validators/inputs.validator.parse";

export interface IInputsService {
    parseData(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    parseXML(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    parseJson(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;  
    validateInput(input: Array<ParsedInput>, schema: Array<ParsedSample>): Promise<unknown>;  
}

export default class InputsService implements IInputsService{

    inputsRepo!: IInputsRepo;
    logsRepo!: ILogsRepo;

    constructor(){
        this.inputsRepo = InputsRepo;
        this.logsRepo = LogsRepo;
    }

    async parseData(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>> {
        try {
            
            return this.inputsRepo.parseData(payload);
        } catch(e) {
            console.log("PAYLOAD ERR", payload, e)
            throw new Error(this.logsRepo.extractError(e));
        }
    }
    async parseXML(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>{
        try {
            await ParseDataSchema.validateAsync(payload);
            return this.inputsRepo.parseXML(payload);
        } catch (e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }
    async parseJson(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>{
        try {
            await ParseDataSchema.validateAsync(payload);
            return this.inputsRepo.parseJson(payload);
        } catch (e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }

    async validateInput(input: Array<ParsedInput>, schema: Array<ParsedSample>): Promise<unknown> {
        try {
            return '';
        } catch(e) {
            throw new Error(this.logsRepo.extractError(e));
        }
    }

}