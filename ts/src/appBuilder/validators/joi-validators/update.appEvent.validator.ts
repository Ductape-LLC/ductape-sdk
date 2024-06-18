import * as Joi from "joi";
import { AppEventSetupTypes, HttpMethods } from "../../../types/enums";
import sampleSchema, { requestSampleSchema, responseSampleSchema } from "./sample.validator";
import { IAppEvent } from "../../../types/appBuilder.types";

const schema = Joi.object<IAppEvent>({
    _id: Joi.string(),
    // app_id: Joi.string().optional(),
    // user_id: Joi.string().optional(),
    name: Joi.string().optional(),
    tag: Joi.string().optional(),
    setup_type: Joi.string().valid(...Object.values(AppEventSetupTypes)).optional(),
    description: Joi.string().optional(),
    resource: Joi.string().optional(),
    method: Joi.string().valid(...Object.values(HttpMethods)).optional(),
    // private_key: Joi.string().optional(),
    // created: Joi.date().optional(),
    request: requestSampleSchema.optional(),
    response: responseSampleSchema.optional(),
    body: sampleSchema.optional(),    
  });
  
  export default schema;