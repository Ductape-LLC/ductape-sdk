import * as Joi from "joi";
import { HttpMethods, InputsTypes, StatusCodes } from "../../../types/enums";

const schema = Joi.object({
    type: Joi.string().valid(...Object.values(InputsTypes)).required(),
    sample: Joi.alternatives(Joi.object(), Joi.string(), Joi.array()).required(),
    status_code: Joi.string().valid(...Object.values(StatusCodes)).optional(),
    data: Joi.array().optional(),
    _id: Joi.string().optional(),
})

export const responseSampleSchema = Joi.object({
    type: Joi.string().valid(...Object.values(InputsTypes)).required(),
    _id: Joi.string().optional(),
    sample: Joi.alternatives(Joi.object(), Joi.string(), Joi.array()).required(),
    status_code: Joi.string().valid(...Object.values(StatusCodes)).optional(),
    data: Joi.array(),
})

export const requestSampleSchema = Joi.object({
    type: Joi.string().valid(...Object.values(InputsTypes)).required(),
    sample: Joi.alternatives(Joi.object(), Joi.string(), Joi.array()).required(),
    method: Joi.string().valid(...Object.values(HttpMethods)).required(),
})

export default schema