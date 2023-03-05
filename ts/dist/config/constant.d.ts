export declare const fetchInitials: (firstname: string, lastname: string) => string;
export declare const numFormatter: (num: number, digits?: number) => string;
export declare const thousandSeparator: (num: number) => string;
export declare const capitalize: (str: string) => string;
export declare const tagify: (str: string) => string;
export declare const tagifyIgnoreCase: (str: string) => string;
export declare const uniqueCheck: (arr: Array<any>, data: any) => boolean;
export declare const resourcify: (str: string) => string;
export declare const Parameterize: (URL: string, datapoint: string, replacement: string) => string;
export declare const cleanFields: (array: Array<any>) => any[];
export declare const isValidHttpUrl: (string: string) => boolean;
export declare const extractParams: (str: string) => {
    key: string;
    sampleValue: string;
    description: string;
    required: boolean;
    maxLength: number;
    minLength: number;
    decorator: string;
    decoratorPosition: string;
    type: string;
    defaultType: string;
    defaultValue: string;
}[];
export declare const statusCodes: ({
    name: string;
    code: string;
} | {
    name: string;
    code: number;
})[];
