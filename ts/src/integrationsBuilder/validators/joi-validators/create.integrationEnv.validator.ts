import * as Joi from "joi";

const schema = Joi.object({
    env_name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(200).required(),
    slug: Joi.string().min(3).max(3).required(), 
});

export default schema;