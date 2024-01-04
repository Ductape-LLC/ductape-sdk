import * as Joi from "joi";
import { AppEventSetupTypes, HttpMethods } from "../../../types/enums";
import sampleSchema from "./sample.validator";

const schema = Joi.object({
    _id: Joi.string(),
    app_id: Joi.string().required(),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    tag: Joi.string().required(),
    setup_type: Joi.string().valid(...Object.values(AppEventSetupTypes)).required(),
    description: Joi.string().required(),
    resource: Joi.string().required(),
    method: Joi.string().valid(...Object.values(HttpMethods)).required(),
    private_key: Joi.string().required(),
    created: Joi.date().required(),
    sample: sampleSchema.required(),
  });
  
  export default schema;