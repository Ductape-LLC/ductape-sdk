import * as Joi from "joi";
import { IAppEnv } from "../../../types/appBuilder.types";
import { DataFormats } from "../../../types/enums";
import { slugPattern } from "../../../types/inputs.types";

const schema = Joi.object<IAppEnv>({
    env_name: Joi.string().optional(),
    slug: Joi.string().regex(slugPattern).min(3).max(3).optional(),
    description: Joi.string().optional(),
    whitelist: Joi.boolean(),
    active: Joi.boolean().optional(),
    __v: Joi.number(),
    base_url: Joi.string(),
    request_type: Joi.string().valid(...Object.values(DataFormats)).optional(),
  });

export default schema;