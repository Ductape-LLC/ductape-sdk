import * as Joi from "joi";

const schema = Joi.object({
    app_id: Joi.string().optional(),
    tag: Joi.string().optional(),
});

export default schema;