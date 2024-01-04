import * as Joi from "joi";
import { IAppActionBody } from "../../../types/appBuilder.types";
import { InputsTypes } from "../../../types/enums";

const schema = Joi.object<IAppActionBody> ({
    action_id: Joi.string().min(24).max(24).required(),
    sample: Joi.object().required(),
    type: Joi.string().valid(...Object.values(InputsTypes)),
})

export default schema;