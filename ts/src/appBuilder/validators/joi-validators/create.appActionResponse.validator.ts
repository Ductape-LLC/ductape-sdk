import * as Joi from 'joi';
import { DataTypes, DecoratorPostions, DefaultTypes, InputsTypes, StatusCodes, SuccessMarkerType } from '../../../types/enums';
import { DataFormats } from '../../../types/enums';
import SampleValidationSchema from "../joi-validators/sample.validator";
import { IAppActionResponseInfo } from '../../../types/appBuilder.types';

export const sampleSchema = Joi.object({
  type: Joi.string().valid(...Object.values(InputsTypes)).required(),
  sample: Joi.alternatives(Joi.string(), Joi.object()).required(),
});


export const SuccessValuesSchema = Joi.object({
  type: Joi.string().valid(...Object.values(SuccessMarkerType)).required(),
  body: sampleSchema.required()
});


export const responseSchema = Joi.object<IAppActionResponseInfo>({
  name: Joi.string().required(),
  tag: Joi.string().required(),
  body: SampleValidationSchema.required(),
  response_format: Joi.string().valid(...Object.values(DataFormats)).required(),
  status_code: Joi.string().valid(...Object.values(StatusCodes)).required(),
  success: Joi.boolean().required(),
  envs: Joi.array().items(Joi.string().optional()),
  success_values: SuccessValuesSchema, // successMarkersSchema
  is_status_code_success: Joi.boolean().optional()
});

export default responseSchema;