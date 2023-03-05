import { DataTypes, ExpectedValues, ParsedInput, ParsedIndexes, ParsedSample, ParsePayload } from "../inputs.types";
import {toJson} from "xml2json";

const parsedIndexes: Array<ParsedIndexes> = [];

const saveParsedIndexes = (payload: ParsedIndexes) => {
    parsedIndexes.push(payload)
}

const fetchParsedIndexes = (payload: ParsedIndexes) => {

    const {parent_key, level, key} = payload;
    for (let i = 0; i <parsedIndexes.length; i++) {
      if (
        parsedIndexes[i].parent_key === parent_key &&
        parsedIndexes[i].level === level &&
        parsedIndexes[i].key === key
      ) {
        return i;
      }
    }

    return false
};

export const parseData = (payload: ParsePayload): Array<ParsedInput | ParsedSample> => {

    const {type} = payload;

    if(!type) throw "enter data type"
    else if(type === DataTypes.JSON) return  parseJSON(payload);
    else if(type === DataTypes.XML) return parseXML(payload);
}


export const parseXML = (payload: ParsePayload):  Array<ParsedInput | ParsedSample> => {
    const {data, parent_key, level, parent_index, expected, category} = payload;

    var json = toJson(String(data), { arrayNotation: false });

    console.log(json)
    return parseJSON({data: JSON.parse(json), parent_key, level, parent_index, expected,category});
}

export const parseJSON = (payload: ParsePayload): Array<ParsedInput | ParsedSample> => {
    let {data, parent_key, level, parent_index, expected, category} = payload;

    if(!parent_key) parent_key = '';
    if(!level) level = 0;
    if(!parent_index) parent_index = 0;
    if(!expected) expected = ExpectedValues.PARSEINPUT

    const arr = [];

    if(Array.isArray(data) && data.length>0){
        for(let i=0; i < data.length; i++) {
            if(typeof data[i] !== 'string' && typeof data[i] !== 'number' && data[i] != (undefined || null || NaN)){
                const parsed = parseObject({data: data[i],parent_key, level, parent_index: i, expected, category})
                arr.push(...parsed);
            }
        }

        return arr;
    }else {

        console.log("L2 CATEGORY", category)
        return parseObject({ data, parent_key, level, parent_index, expected, category});
    }
    
};

export const parseObject = (payload: ParsePayload): Array<ParsedInput | ParsedSample> => {

    const {data, parent_key, level, parent_index, expected, category} = payload;
    console.log("L3 CATEGORY", category)
    const keys = Object.keys(data);
    const fields = [];

    for(let i=0; i<keys.length; i++){

        // @ts-ignore
        const value = data[keys[i]];

        let type = typeof value;

        let length;
        if(type !== 'object') length = String(value).length
        else if(Array.isArray(value)){ 
            length = Array.length;
            // @ts-ignore
            type = 'array'
        } else length = Object.keys(value).length;

        if(expected === ExpectedValues.PARSEINPUT){
            fields.push({
                key: keys[i],
                value,
                length,
                type,
                parent_key,
                category,
                index: i,
                parent_index,
                level
            })
        }else if(!fetchParsedIndexes({parent_key, level, key: keys[i]})){
            const sampleValue = typeof value === 'object'? JSON.stringify(value):value;
            fields.push({
                key: keys[i],
                sampleValue,
                category,
                //origin: "",
                description: '',
                required: true,
                maxLength: 0,
                minLength: 0,
                decorator: '',
                decoratorPosition: '',
                type,
                defaultType: 'input',
                defaultValue: '',
                index: i,
                parent_key,
                parent_index,
                level
            })  
            
            saveParsedIndexes({parent_key, level, key: keys[i]});
        }

        // @ts-ignore
        if(type === 'object' || type === 'array') 
            fields.push(...parseJSON({data: value,parent_key: keys[i], level: level+1, parent_index, expected,category}))

    }

    return fields;
}

export const validateInput = (ParsedInput: object, expectedData: object) => {

    // console.log()

}