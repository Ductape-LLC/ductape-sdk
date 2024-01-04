import * as Joi from "joi";

const schema = Joi.object({
    app_id: Joi.string().required(),
    tag: Joi.string().required(),
});

export default schema;