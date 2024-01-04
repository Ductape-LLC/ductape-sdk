import Joi = require("joi");
import { DataFormats, StatusCodes } from "../../../types/enums";
import { sampleSchema, SuccessValuesSchema } from "./create.appActionResponse.validator";
import SampleValidationSchema from "../joi-validators/sample.validator";

export const responseSchema = Joi.object({
  name: Joi.string().optional(),
  tag: Joi.string().optional(),
  body: SampleValidationSchema.optional(),
  response_format: Joi.string().valid(...Object.values(DataFormats)).optional(),
  status_code: Joi.string().valid(...Object.values(StatusCodes)).optional(),
  success: Joi.boolean().optional(),
  envs: Joi.array().items(Joi.string().optional()),
  sample: sampleSchema.optional(),
  success_values: SuccessValuesSchema, // successMarkersSchema
  is_status_code_success: Joi.boolean().optional()
});

export default responseSchema;