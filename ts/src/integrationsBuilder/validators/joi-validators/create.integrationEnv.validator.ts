import * as Joi from "joi";

const schema = Joi.object({
    slug: Joi.string().required(),
});

export default schema;