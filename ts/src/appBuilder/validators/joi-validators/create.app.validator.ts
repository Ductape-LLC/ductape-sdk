import * as Joi from "joi";

const schema = Joi.object({
    app_name: Joi.string().required(),
    description: Joi.string().required(),
    unique: Joi.boolean(),
});

export default schema;