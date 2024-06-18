import * as Joi from 'joi';
import { KeyValuePair, PostmanBodyV21, PostmanCollectionV21, PostmanFoldersV21, PostmanOptionsV21, PostmanRequestV21, PostmanResponseV21, PostmanURLV21 } from '../../imports.types';

// Placeholder schema
let PostmanFoldersV21Schema: Joi.Schema;
export const KeyValuePairSchema = Joi.object<KeyValuePair>({
    key: Joi.string().required(),
    value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    description: Joi.string(),
    type: Joi.string()
});

const PostmanURLV21Schema = Joi.object<PostmanURLV21>({
    raw: Joi.string().required(),
    host: Joi.array().items(Joi.string()).required(),
    path: Joi.array().items(Joi.string()).required(),
    query: Joi.array().items(KeyValuePairSchema),
    variable: Joi.array().items(KeyValuePairSchema)
});

const PostmanOptionsV21Schema = Joi.object<PostmanOptionsV21>({
    raw: Joi.object({
        language: Joi.string().required()
    }).required()
});

const PostmanBodyV21Schema = Joi.object<PostmanBodyV21>({
    mode: Joi.string().required(),
    raw: Joi.string().required(),
    options: PostmanOptionsV21Schema.required(),
    url: PostmanURLV21Schema.required(),
    description: Joi.string().required()
});

const PostmanResponseV21Schema = Joi.object<PostmanResponseV21>({
    name: Joi.string().required(),
    originalRequest: Joi.object().required(), // Assuming no validation for original request
    status: Joi.string().required(),
    code: Joi.number().required(),
    _postman_previewlanguage: Joi.string().required(),
    header: Joi.array().items(KeyValuePairSchema).required(),
    cookie: Joi.array().items(KeyValuePairSchema).required(),
    body: Joi.string().required()
});

const PostmanRequestV21Schema = Joi.object<PostmanRequestV21>({
    method: Joi.string().required(),
    header: Joi.array().items(KeyValuePairSchema).required(),
    body: PostmanBodyV21Schema.required(),
    url: PostmanURLV21Schema.required()
});

PostmanFoldersV21Schema = Joi.object<PostmanFoldersV21>({
    name: Joi.string(),
    item: Joi.array().items(PostmanFoldersV21Schema),
    request: PostmanRequestV21Schema,
    response: Joi.array().items(PostmanResponseV21Schema),
    description: Joi.string()
});

const PostmanCollectionV21Schema = Joi.object<PostmanCollectionV21>({
    info: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    }),
    item: Joi.array().items(PostmanFoldersV21Schema).required()
});


export default PostmanCollectionV21Schema;