import { IParsedInput, IParsedSample, IParsedPayload } from "../types/inputs.types";
import { parseData, parseJSON, parseXML } from "./utils/inputs.utils.create";

export interface IInputsRepo {
    parseData(payload: IParsedPayload): Array<IParsedInput | IParsedSample>;
    parseXML(payload: IParsedPayload): Array<IParsedInput | IParsedSample>;
    parseJson(payload: IParsedPayload): Array<IParsedInput | IParsedSample>;
}

export const InputsRepo: IInputsRepo = {
    parseData(payload: IParsedPayload): Array<IParsedInput | IParsedSample>{
        return parseData(payload);
    },
    parseXML(payload: IParsedPayload): Array<IParsedInput | IParsedSample>{
        return parseXML(payload);
    },
    parseJson(payload: IParsedPayload): Array<IParsedInput | IParsedSample>{
        return parseJSON(payload);
    }
}