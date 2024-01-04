/* import { Categories, EntityTypes, Formats, ImportPostmanCollectionPayload, KeyValuePair, Modes, PostmanCollectionV21, PostmanFoldersV21, PostmanRequestV21, PostmanResponseV21, PostmanURLV21, ResponseFormats, ReturnTypes } from "../../types/actions.types";
import { createApp } from "../../requests/apps.requests";
import { createActions, createFolder, createResponse, updateActionData, updateEntityData } from "../../requests/actions.requests";
import { tagify } from "../../config/constant";
import { parseJSON } from "../../inputs/utils/inputs.utils.create";
import { DataTypes, ExpectedValues } from "../../inputs/inputs.types";
import { green as g, yellow as y, dim as d, red as r, blue as b } from 'chalk';

// let showLogs = false;
export const parsePostmanCollectionV21 = async (data: ImportPostmanCollectionPayload): Promise<void> => {

    try {

        const { collectionJSON: payload, user_id, public_key, token, workspace_id } = data;
        // showLogs = logs;

        let app_id = data.app_id;

        const { item: items, info } = payload;

        //console.log(payload)

        const arr = [];

        // //console.log(data)

        // if(showLogs) //console.log(`${g(`PARSING AND UPLOADING POSTMAN COLLECTION V2.1 TO DUCTAPE ACTIONS`)}`)

        if (info && !app_id) {
            const { name: app_name, description } = info
            // create app

            console.log(`${g(`UPDATE:`)} ${`app_id not supplied, new app ${app_name} being created`}`)

            const app_data = { token, user_id, app_name, public_key, workspace_id, description, returned: ReturnTypes.SINGLE }

            //console.log(`${y(`INFO:`)} New App Data`, app_data);
            const res = await createApp(app_data);

            const app = res.data.data;

            console.log(`${g(`UPDATE:`)} ${`New app ${app_name} created, app_id: ${y(app._id)}`}`)

            app_id = app._id;

        }
        for (let i = 0; i < items.length; i++) {

            const { name, item, request, response, description } = items[i]
            if (name && item) {
                const folder_data = {
                    name,
                    item,
                    user_id,
                    public_key,
                    app_id,
                    description,
                    type: EntityTypes.FOLDER,
                    level: 0,
                    token
                }
                //console.log(`${g(`UPDATE:`)} ${`opening ${name} folder`}`, folder_data);
                await parsePostmanFoldersV21(folder_data)
            } else {
                const action_data = {
                    name,
                    request,
                    response,
                    description,
                    app_id,
                    type: EntityTypes.ACTION,
                    folder_id: "",
                    token,
                    public_key,
                    user_id
                }
                //console.log(`${g(`UPDATE:`)} ${`parsing ${name} action`}`, action_data);
                await parsePostmanActionV2(action_data);
            }

        }
    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e)

    }
}

export const parsePostmanFoldersV21 = async (payload: {
    name: string;
    item: Array<PostmanFoldersV21>;
    user_id: string;
    public_key: string;
    app_id?: string;
    description: string;
    type: EntityTypes,
    parent_folder_id?: string;
    level: number;
    token: string;
}): Promise<void> => {

    try {
        const arr: any = []

        const {
            item: items,
            user_id,
            public_key,
            app_id,
            description,
            name,
            parent_folder_id,
            level,
            token
        } = payload;

        const create_payload = { name, app_id, public_key, description, user_id, parent_folder_id, level, token }

        //console.log(`${g(`UPDATE:`)} ${`creating_folder ${name} folder`}`, create_payload);
        const res = await createFolder(create_payload);

        const folder_data = res.data.data
        //console.log(`${y(`INFO:`)} New Folder Data`, folder_data);

        const folder_id = folder_data._id

        for (let i = 0; i < items.length; i++) {
            const { name, item, request, response, description } = items[i]
            if (name && item) {
                const folder_data = {
                    name,
                    item,
                    user_id,
                    public_key,
                    app_id,
                    description,
                    type: EntityTypes.FOLDER,
                    parent_folder_id: folder_id,
                    level: (level + 1),
                    token
                }
                //console.log(`${g(`UPDATE:`)} ${`opening ${name} folder`}`, folder_data);
                await parsePostmanFoldersV21(folder_data);
            } else {
                const action_data = {
                    name,
                    request,
                    response,
                    description,
                    app_id,
                    type: EntityTypes.ACTION,
                    folder_id,
                    user_id,
                    public_key,
                    token
                }
                //console.log(`${g(`UPDATE:`)} ${`parsing ${name} action`}`, action_data);
                await parsePostmanActionV2(
                    action_data
                );
            }
        }


    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e);
    }
}


export const parsePostmanActionV2 = async (payload: {
    name: string;
    request: PostmanRequestV21;
    response: Array<PostmanResponseV21>;
    description: string;
    app_id?: string;
    type: EntityTypes;
    folder_id: string;
    public_key: string;
    user_id: string;
    token: string;
}): Promise<void> => {
    try {

        const {
            name,
            request,
            response,
            description,
            app_id,
            folder_id,
            public_key,
            user_id,
            token
        } = payload;

        //console.log(`${g(`UPDATE:`)} ${`extracting request data from ${name} action`}`, request);
        const { resource, httpVerb, type } = extractActionDataV21(request);

        //console.log(`${g(`UPDATE:`)} ${`extracted request data from ${name} action`}`, { resource, httpVerb, type });

        const action_data = {
            folder_id,
            app_id,
            name,
            resource,
            httpVerb,
            type,
            description,
            tag: `${tagify(name)}_${Math.floor(Math.random() * 1000)}`,
            public_key,
            user_id,
            token
        }

        console.log(`${g(`UPDATE:`)} ${`creating ${name} action`}`);
        const res = await createActions(action_data);

        console.log(`${y(`INFO:`)} New Action Data`, res.data.data);
        const action_id = res.data.data._id;


        const { body, header, url } = request;

        //console.log(`${g(`UPDATE:`)} ${`parsing headers for ${name} action`}`, header)
        await parsePostmanKeyValuePairsV21(header, { entity_id: action_id, user_id, token, public_key, category: Categories.HEADERS })


        //console.log(`${g(`UPDATE:`)} ${`parsing url variables for ${name} action`}`, url)
        await parsePostmanURLV21(url, { entity_id: action_id, user_id, token, public_key })

        if (body) {
            const { options, raw: rawData, mode } = body;
            const { raw } = options;
            const { language } = raw;

            if (mode === Modes.RAW && language === Formats.JSON && rawData) {
                const data = cleanRawJSONData(rawData);
                //console.log(`${g(`UPDATE:`)} ${`parsing body variables for ${name} action`}`, body)
                await parsePostmanBodyJSONV21(data, { entity_id: action_id, user_id, token, public_key, category: Categories.BODY });
            }
        }

        await parsePostmanResponsesV21(response, { entity_id: action_id, user_id, token, public_key, category: Categories.RESPONSE })
    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e)
    }
}

export const parsePostmanURLV21 = async (data: PostmanURLV21, payload: { entity_id: string; user_id: string; public_key: string; token: string }) => {

    try {
        const { variable, query } = data;

        if (query) {
            //console.log(`${g(`UPDATE:`)} ${`parsing query`}`, query)
            await parsePostmanKeyValuePairsV21(query, { ...payload, category: Categories.QUERY });
        }
        if (variable) {
            //console.log(`${g(`UPDATE:`)} ${`parsing params`}`, variable)
            await parsePostmanKeyValuePairsV21(variable, { ...payload, category: Categories.PARAMS });
        }
    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e);
    }
}

export const parsePostmanKeyValuePairsV21 = async (data: Array<KeyValuePair>, payload: { entity_id: string; user_id: string; public_key: string; token: string, category: Categories }) => {

    try {
        const arr: any = [];

        const { entity_id, user_id, public_key, token, category } = payload;
        console.log(`${g(`UPDATE:`)} ${`parsing array of ${category}`}`)

        for (let i = 0; i < data.length; i++) {

            const { key, value, description } = data[i];

            let type = typeof value;

            // @ts-ignore
            if (type == 'object' && Array.isArray(value)) type = 'array'

            if (key) {
                arr.push({
                    key: key,
                    category,
                    sampleValue: value,
                    description: description || '',
                    required: true,
                    maxLength: 0,
                    minLength: 0,
                    decorator: '',
                    decoratorPosition: '',
                    type,
                    defaultType: 'input',
                    defaultValue: '',
                    index: i,
                    parent_key: '',
                    parent_index: 0,
                    level: 0
                })
            }
        }
        console.log(`${g(`UPDATE:`)} ${`parsed array of ${category}`}`)
        try {
            await updateEntityData({ entity_id, user_id, public_key, data: arr, sample: JSON.stringify(data), token, category })
        } catch (e) {
            console.log(`${r(`ERROR CREATING DATA:`)} ${e.toString()} `)
            console.log(e)

        }
    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e);
    }
}

const parsePostmanBodyJSONV21 = async (data: object, payload: { entity_id: string; user_id: string; public_key: string; token: string, category: Categories }) => {

    try {

        const { entity_id, user_id, public_key, token, category } = payload;

        console.log("JSON CATEGORY!!", category)
        const parse_body = {
            data,
            parent_key: '',
            level: 0,
            parent_index: 0,
            type: DataTypes.JSON,
            expected: ExpectedValues.PARSESAMPLE,
            category
        }
        //console.log(`${g(`UPDATE:`)} ${`parsing JSON object to ductape datapoints`}`, parse_body);
        const arr = parseJSON(parse_body);
        console.log(`${g(`UPDATE:`)} ${`parsed JSON object to ductape datapoints`}`, arr);
        try {
            await updateEntityData({ entity_id, user_id, public_key, data: arr, sample: JSON.stringify(data), token, category })
        } catch (e) {
            console.log(`${r(`ERROR CREATING DATA:`)} ${e.toString()} `)
            console.log(e)
        }
    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e);

    }
}

export const parsePostmanResponsesV21 = async (payload: Array<PostmanResponseV21>, data: { entity_id: string; user_id: string; public_key: string; token: string, category: Categories }) => {
    //console.log(`${g(`UPDATE:`)} ${`parsing postman v2.1 responses`}`, payload);
    for (let i = 0; i < payload.length; i++) {

        const { entity_id, user_id, public_key, token, category } = data;
        const { name, status, code, _postman_previewlanguage, body } = payload[i];

        let response_format = _postman_previewlanguage;

        if (_postman_previewlanguage === Formats.JSON) response_format = ResponseFormats.JSON;
        const response_payload = {
            public_key,
            entity_id,
            category,
            user_id,
            token,
            response_format,
            description: status,
            name: `${tagify(name)}`,
            tag: `${tagify(name)}_${Math.floor(Math.random() * 1000)}`,
            success: false,
            status_code: code? String(code): null,
            returned: ReturnTypes.SINGLE
        }
        try {
            console.log(`${g(`UPDATE:`)} ${`creating response`}`, response_payload);
            const res = await createResponse(response_payload);
            console.log(`${g(`UPDATE:`)} ${`response created for entitiy ${entity_id}`}`, res.data.data);
            const { _id } = res.data.data

            if (response_format === ResponseFormats.JSON) {
                const data = cleanRawJSONData(body);
                //console.log(`${g(`UPDATE:`)} ${`response body parsing`}`, data);
                await parsePostmanBodyJSONV21(data, { entity_id: _id, user_id, token, public_key, category: Categories.RESPONSE });
            }
        } catch (e) {
            console.log(`${r(`ERROR CREATING RESPONSE:`)} ${e.toString()} `)
            console.log(e);
        }

    }
}

export const extractActionDataV21 = (request: PostmanRequestV21) => {

    const { method: httpVerb, url } = request;
    let resource = ''
    if (url.path) resource = resourcifyPostmanURLArray(url.path);

    return { httpVerb, resource, type: httpVerb }
}

const resourcifyPostmanURLArray = (url: Array<string>) => {
    let str = "/";

    url.map((data, index) => {
        str = `${str}${data}`;

        if (index !== url.length - 1) str = `${str}/`
    });
    return str;
}

const cleanRawJSONData = (data: string) => {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.log(`${r(`ERROR:`)} ${e.toString()} `)
        console.log(e);
        console.log(data);
    }
}*/