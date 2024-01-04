import * as joi from 'joi';
import {  ExpectedValues, IParsedPayload } from '../../types/inputs.types';
import { InputsTypes } from '../../types/enums';

const schema = joi.object<IParsedPayload>({
    data: joi.alternatives().conditional('type', { 
        is: InputsTypes.XML, 
        then: joi.string().required, 
        otherwise: joi.object().required()
    }),
    parent_key: joi.string().optional(),
    level: joi.number().optional(),
    parent_index: joi.number().optional(),
    type: joi.string().valid(...Object.keys(InputsTypes)).optional(),
    expected: joi.string().valid(...Object.keys(ExpectedValues)).optional(),
});
export default schema;