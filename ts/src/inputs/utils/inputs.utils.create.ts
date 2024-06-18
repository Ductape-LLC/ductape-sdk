import { ISample } from '../../types/appBuilder.types';
import { InputsTypes } from '../../types/enums';
import {
  ExpectedValues,
  IParsedInput,
  IParsedIndexes,
  IParsedSample,
  IParsedPayload
} from '../../types/inputs.types';

const saveParsedIndexes = (
  parsedIndexes: Array<IParsedIndexes>,
  payload: IParsedIndexes
) => {
  parsedIndexes.push(payload);
};

const fetchParsedIndexes = (
  parsedIndexes: Array<IParsedIndexes>,
  payload: IParsedIndexes
) => {
  const { parent_key, level, key } = payload;
  for (let i = 0; i < parsedIndexes.length; i++) {
    if (
      parsedIndexes[i].parent_key === parent_key &&
      parsedIndexes[i].level === level &&
      parsedIndexes[i].key === key
    ) {
      return i;
    }
  }

  return false;
};

export const parseData = (
  payload: IParsedPayload
): Array<IParsedInput | IParsedSample> => {
  const { type } = payload;

  if (!type && typeof payload !== 'object') throw 'enter data type';
  else if (type === InputsTypes.JSON || typeof payload === 'object')
    return parseJSON(payload);
  else if (type === InputsTypes.XML) return parseXML(payload);
};

export const parseXML = (
  payload: IParsedPayload
): Array<IParsedInput | IParsedSample> => {
  const { data, parent_key, level, parent_index, expected, category } = payload;

  var json = '{}';

  console.log(json);
  return parseJSON({
    data: JSON.parse(json),
    parent_key,
    level,
    parent_index,
    expected,
    category
  });
};

export const parseJSON = (
  payload: IParsedPayload
): Array<IParsedInput | IParsedSample> => {
  let { data, parent_key, level, parent_index, expected, category } = payload;

  if (!parent_key) parent_key = '';
  if (!level) level = 0;
  if (!parent_index) parent_index = 0;
  if (!expected) expected = ExpectedValues.PARSEINPUT;

  const arr = [];

  if (Array.isArray(data) && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (
        typeof data[i] !== 'string' &&
        typeof data[i] !== 'number' &&
        data[i] != (undefined || null || NaN)
      ) {
        const parsed = parseObject({
          data: data[i],
          parent_key,
          level,
          parent_index: i,
          expected,
          category
        });
        arr.push(...parsed);
      }
    }

    return arr;
  } else {
    // console.log('L2 CATEGORY', category);
    return parseObject({
      data,
      parent_key,
      level,
      parent_index,
      expected,
      category
    });
  }
};

export const parseObject = (
  payload: IParsedPayload
): Array<IParsedInput | IParsedSample> => {
  const { data, parent_key, level, parent_index, expected, category, index } = payload;
  // console.log('L3 CATEGORY', category, data);
  const parsedIndexes: Array<IParsedIndexes> = [];
  const fields = [];
  if (data) {
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++) {
      // @ts-ignore
      const value = data[keys[i]];

      let type = typeof value;

      let length;
      if (type !== 'object') length = String(value).length;
      else if (Array.isArray(value)) {
        length = Array.length;
        // @ts-ignore
        type = 'array';
      } else if (value) length = Object.keys(value).length;

      if (expected === ExpectedValues.PARSEINPUT) {
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
        });
      } else if (
        !fetchParsedIndexes(parsedIndexes, { parent_key, level, key: keys[i], index })
      ) {
        const sampleValue =
          typeof value === 'object' ? JSON.stringify(value) : value;
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
        });

        saveParsedIndexes(parsedIndexes, { parent_key, level, key: keys[i], index });
      }

      // @ts-ignore
      if (type === 'object' || type === 'array')
        fields.push(
          ...parseJSON({
            data: value,
            parent_key: keys[i],
            level: level + 1,
            parent_index,
            expected,
            category
          })
        );
    }
  }
  return fields;
};

export const validateInputSchema = (input: Array<IParsedInput>, sample: ISample) => {
  const { data } = sample;

  input.map((value) => {

    const {
      type,
      parent_index,
      key,
      level,
      index,
      parent_key
    } = value;
    if (!data.find((sampleValue) => 
      sampleValue.key === key && sampleValue.level === level && 
      sampleValue.parent_key === parent_key && sampleValue.parent_index === parent_index)) {
        throw new Error(`Invalid input, key: ${key}, level: ${level}, index: ${index}, parent_index: ${parent_index}`)
    }
  })

  data.map((value) => {
    const {
      minLength,
      maxLength,
      decorator,
      decoratorPosition,
      type,
      parent_index,
      defaultValue,
      defaultType,
      required,
      key,
      level,
      index,
      parent_key
    } = value;

    const find = input.find((value) =>
      value.key === key &&
      value.index === index &&
      value.level === level &&
      value.parent_index === parent_index &&
      value.parent_key === parent_key);

    const flag = `key: ${key}, level: ${level}, index: ${index}, parent_index: ${parent_index}`;
    if (!find && required) {
      throw new Error(`${flag} is required!`)
    }

    /* if (find) {
      input.validated = true;
    } */

  })
};

export const validateInputValues = (input: Array<IParsedInput>, sample: ISample) => {}