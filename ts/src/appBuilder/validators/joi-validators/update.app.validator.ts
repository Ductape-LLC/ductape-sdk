import * as Joi from "joi";
import { IApp } from "../../../types/appBuilder.types";


const lagSchema = Joi.number().integer().min(0).required();
const policyItemSchema = Joi.object({
  available: Joi.boolean().required(),
  lag: lagSchema.when('available', {
      is: false,
      then: Joi.valid(0),
      otherwise: lagSchema.min(1)
  })
});

const policySchema = Joi.object({
  500: policyItemSchema.required(),
  503: policyItemSchema.required(),
  400: policyItemSchema.required(),
  401: policyItemSchema.required(),
  403: policyItemSchema.required(),
  404: policyItemSchema.required()
}).required();

const schema = Joi.object<IApp>({
  app_name: Joi.string(),
  require_whitelist: Joi.boolean(),
  active: Joi.boolean(),
  __v: Joi.number(),
  status: Joi.string().valid('public', 'private', 'draft'),
  description: Joi.string(),
  retries: Joi.object({
    max: Joi.number().integer().positive().required(),
    policy: policySchema.required()
  }).optional()
});

export default schema;

