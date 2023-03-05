import { Categories } from "../actions/actions.types";

export interface ParsedInput {
    key: string;
    value: unknown;
    length: number;
    type: string;
    parent_key?: string;
    parent_index: number;
    index: number;
    level: number;
}

export interface ParsedSample {
    key: string;
    sampleValue: string;
    description: string;
    required: boolean;
    maxLength: number;
    minLength: number;
    decorator: string;
    decoratorPosition: string;
    type: string;
    parent_key?: string;
    parent_index: number;
    index: number;
    defaultType: string;
    defaultValue: string;
}

export interface ParsePayload {
    data: object | string; 
    category?: Categories;
    parent_key?: string; 
    level?: number; 
    parent_index?: number;
    type?: DataTypes;
    expected?: ExpectedValues;
}

export enum ExpectedValues {
    PARSEINPUT = "input",
    PARSESAMPLE = "sample"
}

export enum DataTypes {
    JSON = "json",
    XML = "xml"
}

export interface ParsedIndexes {
    parent_key: string; 
    level: number; 
    key: string;
}