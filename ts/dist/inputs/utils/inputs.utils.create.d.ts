import { ParsedInput, ParsedSample, ParsePayload } from "../inputs.types";
export declare const parseData: (payload: ParsePayload) => Array<ParsedInput | ParsedSample>;
export declare const parseXML: (payload: ParsePayload) => Array<ParsedInput | ParsedSample>;
export declare const parseJSON: (payload: ParsePayload) => Array<ParsedInput | ParsedSample>;
export declare const parseObject: (payload: ParsePayload) => Array<ParsedInput | ParsedSample>;
export declare const validateInput: (ParsedInput: object, expectedData: object) => void;
