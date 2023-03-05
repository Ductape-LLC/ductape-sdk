import { ILogsRepo } from "../logs/logs.repo";
import { IInputsRepo } from "./inputs.repo";
import { ParsedInput, ParsedSample, ParsePayload } from "./inputs.types";
export interface IInputsService {
    parseData(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    parseXML(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    parseJson(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    validateInput(input: Array<ParsedInput>, schema: Array<ParsedSample>): Promise<unknown>;
}
export default class InputsService implements IInputsService {
    inputsRepo: IInputsRepo;
    logsRepo: ILogsRepo;
    constructor();
    parseData(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    parseXML(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    parseJson(payload: ParsePayload): Promise<Array<ParsedInput | ParsedSample>>;
    validateInput(input: Array<ParsedInput>, schema: Array<ParsedSample>): Promise<unknown>;
}
