import { InputsTypes, Categories, DefaultTypes, DataTypes, DecoratorPostions } from "./enums";


export const urlPathPattern = /^(\/[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+|\{[a-zA-Z0-9_]+\})*$/;
export const baseUrlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(:[0-9]+)?(\/[a-zA-Z0-9\-._~%!$&'()*+,;=:@]+)*\/?$/;
export const slugPattern = /^[a-z]+$/;
export const tagPattern = /^[A-Z](_[A-Z]+)*$/;
export type PathParams = { [key: string]: string };

export interface IParsedInput {
    key: string;
    value?: unknown;
    length?: number;
    type?: string;
    parent_key?: string;
    parent_index?: number;
    index?: number;
    level?: number;
    validated?: Boolean;
}

export interface IParsedSample extends IParsedIndexes{
    sampleValue?: string | number | object;
    description?: string;
    required: boolean;
    maxLength: number;
    minLength: number;
    decorator?: string;
    decoratorPosition?: DecoratorPostions;
    type: DataTypes;
    parent_index?: number;
    defaultValue?: string | number | string | boolean;
    defaultType?: DefaultTypes;
}

export interface IParsedPayload {
    data: object | string; 
    category?: Categories;
    parent_key?: string; 
    level?: number; 
    index?: number;
    parent_index?: number;
    type?: InputsTypes;
    expected?: ExpectedValues;
}

export interface IParsedIndexes {
    parent_key?: string; 
    level?: number; 
    key?: string;
    index?: number;
}

export enum ExpectedValues {
    PARSEINPUT = "input",
    PARSESAMPLE = "sample"
}

export interface IResponseSuccessMarkers extends IParsedIndexes {}