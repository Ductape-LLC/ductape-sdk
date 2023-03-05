import { ParsedInput, ParsedSample, ParsePayload } from "./inputs.types";
import { parseData, parseJSON, parseXML } from "./utils/inputs.utils.create";

export interface IInputsRepo {
    parseData(payload: ParsePayload): Array<ParsedInput | ParsedSample>;
    parseXML(payload: ParsePayload): Array<ParsedInput | ParsedSample>;
    parseJson(payload: ParsePayload): Array<ParsedInput | ParsedSample>;
}

export const InputsRepo: IInputsRepo = {
    parseData(payload: ParsePayload): Array<ParsedInput | ParsedSample>{
        return parseData(payload);
    },
    parseXML(payload: ParsePayload): Array<ParsedInput | ParsedSample>{
        return parseXML(payload);
    },
    parseJson(payload: ParsePayload): Array<ParsedInput | ParsedSample>{
        return parseJSON(payload);
    }
}