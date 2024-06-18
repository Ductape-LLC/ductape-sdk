import * as Joi from "joi";
import { AppEventSetupTypes, HttpMethods, TokenPeriods } from "../../../types/enums";
import sampleSchema, { requestSampleSchema, responseSampleSchema } from "./sample.validator";
import { IAppAuth, IAppEvent } from "../../../types/appBuilder.types";

const schema = Joi.object<IAppAuth>({
    _id: Joi.string().optional(),
    name: Joi.string().optional(),
    tag: Joi.string().optional(),
    setup_type: Joi.string().optional(),
    expiry: Joi.number().optional(),
    period: Joi.string().valid(...Object.values(TokenPeriods)).optional(),
    description: Joi.string().optional(),
    tokens: responseSampleSchema.optional(),
    action_tag: Joi.string().optional()
    // body: sampleSchema.required(),
});
  
  export default schema;