import * as Joi from "joi";
import { Data } from "../../../types/appBuilder.types";
import { Categories, DataTypes, DecoratorPostions, DefaultTypes } from "../../../types/enums";


const sampleSchema = Joi.object<Data>({
    key: Joi.string().required(),
    level: Joi.number().required(),
    sampleValue: Joi.string(),
    description: Joi.string(),
    required: Joi.boolean(),
    maxLength: Joi.number(),
    minLength: Joi.number(),
    decorator: Joi.string(),
    decoratorPosition: Joi.string().optional().valid(...Object.values(DecoratorPostions)),
    type: Joi.string().optional().valid(...Object.values(DataTypes)),
    parent_key: Joi.string().required(),
    parent_index: Joi.number().required(),
    index: Joi.number().required(),
    defaultType: Joi.string().optional().valid(...Object.values(DefaultTypes)),
    defaultValue: Joi.string(),
});

const schema = Joi.object({
    type: Joi.string().valid(...Object.values(Categories)).required(),
    body: Joi.array().items(sampleSchema)
})


export default schema;