import * as Joi from "joi";
import { IAppVariables } from "../../../types/appBuilder.types";

const schema = Joi.object<IAppVariables>({
    _id: Joi.string().optional(),
    key: Joi.string().optional(),
    type: Joi.string().optional(),
    required: Joi.boolean().optional(),
    description: Joi.string().optional(),
    minlength: Joi.number().integer().min(0).optional(),
    maxlength: Joi.number().integer().min(Joi.ref('minlength')).optional()
});

export default schema;