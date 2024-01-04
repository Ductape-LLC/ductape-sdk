import * as Joi from "joi";

const schema = Joi.object({
    tag: Joi.string().required(),
});

export default schema;