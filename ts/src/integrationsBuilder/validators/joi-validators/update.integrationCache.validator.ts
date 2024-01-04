import * as Joi from "joi";

const schema = Joi.object({
    tag: Joi.string().optional(),
});

export default schema;