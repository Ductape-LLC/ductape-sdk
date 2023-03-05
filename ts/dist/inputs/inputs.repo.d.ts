import { ParsedInput, ParsedSample, ParsePayload } from "./inputs.types";
export interface IInputsRepo {
    parseData(payload: ParsePayload): Array<ParsedInput | ParsedSample>;
    parseXML(payload: ParsePayload): Array<ParsedInput | ParsedSample>;
    parseJson(payload: ParsePayload): Array<ParsedInput | ParsedSample>;
}
export declare const InputsRepo: IInputsRepo;
