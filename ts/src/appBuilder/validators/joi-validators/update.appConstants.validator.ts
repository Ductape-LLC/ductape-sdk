import * as Joi from "joi";
import { IAppConstants } from "../../../types/appBuilder.types";

const schema = Joi.object<IAppConstants>({
    _id: Joi.string().optional(),
    key: Joi.string().optional(),
    value: Joi.string().optional(),
    type: Joi.string().optional(),
    description: Joi.string().optional()
});

export default schema;