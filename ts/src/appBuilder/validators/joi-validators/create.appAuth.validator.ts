import * as Joi from 'joi';
import sampleSchema from './sample.validator';
import { HttpMethods, TokenPeriods } from '../../../types/enums';

const schema = Joi.object({
    _id: Joi.string().optional(),
    name: Joi.string().required(),
    tag: Joi.string().required(),
    setup_type: Joi.string().required(),
    expiry: Joi.number().required(),
    period: Joi.string().valid(...Object.values(TokenPeriods)).required(),
    resource: Joi.string().required(),
    method: Joi.string().valid(...Object.values(HttpMethods)).required(),
    description: Joi.string().required(),
    request: sampleSchema.required(),
    response: sampleSchema.required(),
    body: sampleSchema.required(),
});

export default schema;