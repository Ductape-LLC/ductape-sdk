import * as Joi from "joi";
import { IAppVariables } from "../../../types/appBuilder.types";
import { DataTypes } from "../../../types/enums";

const schema = Joi.object<IAppVariables>({
    key: Joi.string().required(),
    type: Joi.string().valid(...Object.values(DataTypes)).required(),
    required: Joi.boolean().required(),
    description: Joi.string().required(),
    minlength: Joi.number().integer().min(0).optional(),
    maxlength: Joi.number().integer().min(Joi.ref('minlength')).optional()
});

export default schema;