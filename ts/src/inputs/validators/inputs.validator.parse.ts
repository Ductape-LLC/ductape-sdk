import * as joi from 'joi';
import { DataTypes, ExpectedValues, ParsePayload } from '../inputs.types';

const schema = joi.object<ParsePayload>({
    data: joi.alternatives().conditional('type', { 
        is: DataTypes.XML, 
        then: joi.string().required, 
        otherwise: joi.object().required()
    }),
    parent_key: joi.string().optional(),
    level: joi.number().optional(),
    parent_index: joi.number().optional(),
    type: joi.string().valid(...Object.keys(DataTypes)).optional(),
    expected: joi.string().valid(...Object.keys(ExpectedValues)).optional(),
});
export default schema;