import { tagify } from "../../appBuilder/utils/string.utils";
import { IAppAction, IAppActionResponseInfo } from "../../types/appBuilder.types";
import { KeyValuePair } from "../imports.types";

export const cleanRawJSONData = (data: string) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(`ERROR: ${e.toString()} `)
        console.log(e);
        console.log(data);
    }
}

export const keyValuePairsToObject = (keyValuePairs: Array<KeyValuePair>): { [key: string]: string | number } => {
    const obj: { [key: string]: string | number } = {};
    console.log("Pairs ===>>>>", keyValuePairs)

    for (const pair of keyValuePairs) {
        obj[pair.key] = pair.value;
    }

    return obj;
}

export const generateActionTags = (objects: Array<IAppAction>| Array<IAppActionResponseInfo>) => {
    const tagMap = new Map();

    const taggedObjects = objects.map(obj => {
        const { name, ...rest } = obj; // Destructure name property and rest of the object

        // If the name is not in the map, initialize its count to 1
        if (!tagMap.has(name)) {
            tagMap.set(name, 1);
            return { ...obj, tag: tagify(name), ...rest }; // Tag for the first occurrence
        } else {
            const count = tagMap.get(name) + 1;
            tagMap.set(name, count);
            return { ...obj, tag: tagify(name) + '_' + count, ...rest }; // Tag for subsequent occurrences
        }
    });

    return taggedObjects;
}

export const  isSuccessCode = (number: number) => {
    // Convert the number to a string
    const numberString = number.toString();

    // Check if the first character is '2'
    return numberString.charAt(0) === '2';
}