import * as Joi from 'joi';
import { DataTypes, DecoratorPostions, DefaultTypes, InputsTypes, StatusCodes, SuccessMarkerType } from '../../../types/enums';
import { DataFormats } from '../../../types/enums';
import SampleValidationSchema from "../joi-validators/sample.validator";
import { IAppActionResponseInfo } from '../../../types/appBuilder.types';

export const sampleSchema = Joi.object({
  type: Joi.string().valid(...Object.values(InputsTypes)).required(),
  sample: Joi.alternatives(Joi.string(), Joi.object()).required(),
  data: Joi.array().optional(),
  _id: Joi.string().optional(),
});

export const querySampleSchema = Joi.object({
  type: Joi.string().valid(...Object.values(InputsTypes)).optional(),
  sample: Joi.alternatives(Joi.string(), Joi.object()).optional(),
  data: Joi.array().optional(),
  _id: Joi.string().optional(),
});


export const SuccessValuesSchema = Joi.object({
  type: Joi.string().valid(...Object.values(SuccessMarkerType)).required(),
  body: sampleSchema.required()
});


export const responseSchema = Joi.object<IAppActionResponseInfo>({
  _id: Joi.string().optional(),
  name: Joi.string().required(),
  tag: Joi.string().regex(/^[a-z]+(?:_[a-z]+)*$/)
  .required()
  .messages({
      'string.pattern.base': 'Tag must consist of lowercase letters separated by underscores',
      'any.required': 'Tag is required'
  }),
  body: SampleValidationSchema.required(),
  response_format: Joi.string().valid(...Object.values(DataFormats)).required(),
  status_code: Joi.string().valid(...Object.values(StatusCodes)).required(),
  success: Joi.boolean().required(),
  envs: Joi.array().items(Joi.string().optional()),
  success_values: SuccessValuesSchema, // successMarkersSchema
  is_status_code_success: Joi.boolean().optional(),
  success_markers: Joi.array().optional(),
  created: Joi.string().optional(),
});

export default responseSchema;