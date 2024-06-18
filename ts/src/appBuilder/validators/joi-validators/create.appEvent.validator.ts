import * as Joi from "joi";
import { AppEventSetupTypes, HttpMethods } from "../../../types/enums";
import sampleSchema, { requestSampleSchema, responseSampleSchema } from "./sample.validator";
import { IAppEvent } from "../../../types/appBuilder.types";
import { urlPathPattern } from "../../../types/inputs.types";

const schema = Joi.object<IAppEvent>({
    _id: Joi.string(),
    // app_id: Joi.string().required(),
    // user_id: Joi.string().required(),
    name: Joi.string().required(),
    tag: Joi.string().required(),
    setup_type: Joi.string().valid(...Object.values(AppEventSetupTypes)).required(),
    description: Joi.string().required(),
    resource: Joi.string().regex(urlPathPattern).required(),
    method: Joi.string().valid(...Object.values(HttpMethods)).required(),
    // private_key: Joi.string().required(),
    // created: Joi.date().required(),
    request: requestSampleSchema.required(),
    response: responseSampleSchema.required(),
    body: sampleSchema.required(),    
  });
  
  export default schema;