import * as Joi from "joi";
import { IAppAction } from "../../../types/appBuilder.types";
import { HttpMethods, DataFormats } from "../../../types/enums";
import { baseUrlPattern, tagPattern, urlPathPattern } from "../../../types/inputs.types";

const schema = Joi.object<IAppAction>({
  description: Joi.string().required(),
  resource: Joi.string().regex(urlPathPattern).required(),
  name: Joi.string().required(),
  method: Joi.string().valid(...Object.values(HttpMethods)).required(),
  tag: Joi.string().required(),
  request_type: Joi.string().valid(...Object.values(DataFormats)).required(),
  base_url: Joi.string().regex(baseUrlPattern).optional(),
});

export default schema;