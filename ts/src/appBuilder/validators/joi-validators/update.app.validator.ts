import * as Joi from "joi";
import { IApp } from "../../../types/appBuilder.types";

const schema  = Joi.object<IApp>({
    app_name: Joi.string().required(),
    require_whitelist: Joi.boolean(),
    active: Joi.boolean(),
    __v: Joi.number(),
    status: Joi.string().valid('public', 'private', 'draft'),
    description: Joi.string(),
  });

export default schema;

