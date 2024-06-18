import * as Joi from "joi";
import { IAppConstants } from "../../../types/appBuilder.types";
import { DataTypes } from "../../../types/enums";

const schema = Joi.object<IAppConstants>({
    key: Joi.string().required(),
    value: Joi.string().required(),
    type: Joi.string().valid(...Object.values(DataTypes)).required(),
    description: Joi.string().required()
});

export default schema;