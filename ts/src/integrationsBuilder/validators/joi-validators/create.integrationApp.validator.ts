import * as Joi from "joi";
import { IIntegrationApp } from "../../../types/integrationsBuilder.types";

const variableSchema = Joi.object({
    key: Joi.string().required(),
    value: Joi.string().required()
});

const authSchema = Joi.object({
    auth_tag: Joi.string().required(),
    data: Joi.object().required(),
    values: Joi.array().items(variableSchema).optional()
});

// Define schema for envs
const envSchema = Joi.object({
    app_env_slug: Joi.string().required(),
    integration_env_slug: Joi.string().required(),
    variables: Joi.array().items(variableSchema),
    auth: authSchema,
});


const schema = Joi.object<IIntegrationApp>({
    _id: Joi.string().optional(),
    access_tag: Joi.string().required(),
    envs: Joi.array().items(envSchema),
});


export default schema;