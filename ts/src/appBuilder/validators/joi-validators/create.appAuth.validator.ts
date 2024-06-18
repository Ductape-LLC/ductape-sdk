import * as Joi from 'joi';
import sampleSchema, { requestSampleSchema, responseSampleSchema } from './sample.validator';
import { AuthTypes, HttpMethods, TokenPeriods } from '../../../types/enums';
import { urlPathPattern } from '../../../types/inputs.types';

const schema = Joi.object({
    _id: Joi.string().optional(),
    name: Joi.string().required(),
    tag: Joi.string().required(),
    setup_type: Joi.string().valid(...Object.values(AuthTypes)).required(),
    expiry: Joi.number().when('setup_type', {
        is: Joi.not(AuthTypes.TOKEN),
        then: Joi.number().required(),
        otherwise: Joi.number().optional(),
    }),
    period: Joi.string().valid(...Object.values(TokenPeriods)).when('setup_type', {
        is: Joi.not(AuthTypes.TOKEN),
        then: Joi.string().required(),
        otherwise: Joi.string().optional(),
    }),
    description: Joi.string().optional(),
    action_tag: Joi.string().when('setup_type', {
        is: Joi.not(AuthTypes.TOKEN),
        then: Joi.string().required(),
        otherwise: Joi.string().forbidden()
    }),
    tokens: sampleSchema.optional(), 
    // body: sampleSchema.required(),
});

export default schema;