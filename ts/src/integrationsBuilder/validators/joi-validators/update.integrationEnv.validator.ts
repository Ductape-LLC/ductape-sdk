import * as Joi from "joi";

const schema = Joi.object({
    slug: Joi.string().optional(),
});

export default schema;