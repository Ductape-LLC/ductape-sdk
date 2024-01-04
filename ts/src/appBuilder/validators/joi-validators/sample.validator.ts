import * as Joi from "joi";
import { InputsTypes } from "../../../types/enums";

const schema = Joi.object({
    type: Joi.string().valid(...Object.values(InputsTypes)).required(),
    sample: Joi.alternatives(Joi.object(), Joi.string()).required(),
})

export default schema