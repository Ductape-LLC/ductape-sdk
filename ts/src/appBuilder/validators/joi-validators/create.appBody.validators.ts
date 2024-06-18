import * as Joi from "joi";
import { IAppActionBody } from "../../../types/appBuilder.types";
import { InputsTypes } from "../../../types/enums";

const schema = Joi.object<IAppActionBody> ({
    action_id: Joi.string().min(24).max(24).optional(),
    sample: Joi.alternatives(Joi.object(), Joi.string(), Joi.array()).required(),
    type: Joi.string().valid(...Object.values(InputsTypes)),
})

export default schema;