import * as Joi from "joi";
import { IAppAction } from "../../../types/appBuilder.types";
import { HttpMethods, DataFormats } from "../../../types/enums";
import { baseUrlPattern, tagPattern, urlPathPattern } from "../../../types/inputs.types";
import { responseSchema, sampleSchema } from "./create.appActionResponse.validator";

const schema = Joi.object<IAppAction>({
  description: Joi.string().optional(),
  resource: Joi.string().regex(urlPathPattern).optional(),
  name: Joi.string().optional(),
  method: Joi.string().valid(...Object.values(HttpMethods)).optional(),
  // tag: Joi.string(),
  request_type: Joi.string().valid(...Object.values(DataFormats)).optional(),
  base_url: Joi.string().regex(baseUrlPattern).optional(),
  body: sampleSchema.optional(),
  headers: sampleSchema.optional(),
  responses: Joi.array().items(responseSchema).optional(),
});

export default schema;