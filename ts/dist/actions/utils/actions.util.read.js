"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractActionDataV21 = exports.parsePostmanResponsesV21 = exports.parsePostmanKeyValuePairsV21 = exports.parsePostmanURLV21 = exports.parsePostmanActionV2 = exports.parsePostmanFoldersV21 = exports.parsePostmanCollectionV21 = void 0;
const actions_types_1 = require("../actions.types");
const apps_service_1 = require("../../services/apps.service");
const actions_service_1 = require("../../services/actions.service");
const constant_1 = require("../../config/constant");
const inputs_utils_create_1 = require("../../inputs/utils/inputs.utils.create");
const inputs_types_1 = require("../../inputs/inputs.types");
const chalk_1 = require("chalk");
// let showLogs = false;
const parsePostmanCollectionV21 = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { collectionJSON: payload, user_id, public_key, token, workspace_id } = data;
        // showLogs = logs;
        let app_id = data.app_id;
        const { item: items, info } = payload;
        //console.log(payload)
        const arr = [];
        // //console.log(data)
        /*if(showLogs)*/ //console.log(`${g(`PARSING AND UPLOADING POSTMAN COLLECTION V2.1 TO DUCTAPE ACTIONS`)}`)
        if (info && !app_id) {
            const { name: app_name, description } = info;
            // create app
            //console.log(`${g(`UPDATE:`)} ${`app_id not supplied, new app ${app_name} being created`}`)
            const app_data = { token, user_id, app_name, public_key, workspace_id, description, returned: actions_types_1.ReturnTypes.SINGLE };
            //console.log(`${y(`INFO:`)} New App Data`, app_data);
            const res = yield (0, apps_service_1.createApp)(app_data);
            const app = res.data.data;
            //console.log(`${g(`UPDATE:`)} ${`New app ${app_name} created, app_id: ${y(app._id)}`}`)
            app_id = app._id;
        }
        for (let i = 0; i < items.length; i++) {
            const { name, item, request, response, description } = items[i];
            if (name && item) {
                const folder_data = {
                    name,
                    item,
                    user_id,
                    public_key,
                    app_id,
                    description,
                    type: actions_types_1.EntityTypes.FOLDER,
                    level: 0,
                    token
                };
                //console.log(`${g(`UPDATE:`)} ${`opening ${name} folder`}`, folder_data);
                yield (0, exports.parsePostmanFoldersV21)(folder_data);
            }
            else {
                const action_data = {
                    name,
                    request,
                    response,
                    description,
                    app_id,
                    type: actions_types_1.EntityTypes.ACTION,
                    folder_id: "",
                    token,
                    public_key,
                    user_id
                };
                //console.log(`${g(`UPDATE:`)} ${`parsing ${name} action`}`, action_data);
                yield (0, exports.parsePostmanActionV2)(action_data);
            }
        }
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
    }
});
exports.parsePostmanCollectionV21 = parsePostmanCollectionV21;
const parsePostmanFoldersV21 = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = [];
        const { item: items, user_id, public_key, app_id, description, name, parent_folder_id, level, token } = payload;
        const create_payload = { name, app_id, public_key, description, user_id, parent_folder_id, level, token };
        //console.log(`${g(`UPDATE:`)} ${`creating_folder ${name} folder`}`, create_payload);
        const res = yield (0, actions_service_1.createFolder)(create_payload);
        const folder_data = res.data.data;
        //console.log(`${y(`INFO:`)} New Folder Data`, folder_data);
        const folder_id = folder_data._id;
        for (let i = 0; i < items.length; i++) {
            const { name, item, request, response, description } = items[i];
            if (name && item) {
                const folder_data = {
                    name,
                    item,
                    user_id,
                    public_key,
                    app_id,
                    description,
                    type: actions_types_1.EntityTypes.FOLDER,
                    parent_folder_id: folder_id,
                    level: (level + 1),
                    token
                };
                //console.log(`${g(`UPDATE:`)} ${`opening ${name} folder`}`, folder_data);
                yield (0, exports.parsePostmanFoldersV21)(folder_data);
            }
            else {
                const action_data = {
                    name,
                    request,
                    response,
                    description,
                    app_id,
                    type: actions_types_1.EntityTypes.ACTION,
                    folder_id,
                    user_id,
                    public_key,
                    token
                };
                //console.log(`${g(`UPDATE:`)} ${`parsing ${name} action`}`, action_data);
                yield (0, exports.parsePostmanActionV2)(action_data);
            }
        }
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
    }
});
exports.parsePostmanFoldersV21 = parsePostmanFoldersV21;
const parsePostmanActionV2 = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, request, response, description, app_id, folder_id, public_key, user_id, token } = payload;
        //console.log(`${g(`UPDATE:`)} ${`extracting request data from ${name} action`}`, request);
        const { resource, httpVerb, type } = (0, exports.extractActionDataV21)(request);
        //console.log(`${g(`UPDATE:`)} ${`extracted request data from ${name} action`}`, { resource, httpVerb, type });
        const action_data = {
            folder_id,
            app_id,
            name,
            resource,
            httpVerb,
            type,
            description,
            tag: `${(0, constant_1.tagify)(name)}_${Math.floor(Math.random() * 1000)}`,
            public_key,
            user_id,
            token
        };
        console.log(`${(0, chalk_1.green)(`UPDATE:`)} ${`creating ${name} action`}`);
        const res = yield (0, actions_service_1.createActions)(action_data);
        console.log(`${(0, chalk_1.yellow)(`INFO:`)} New Action Data`, res.data.data);
        const action_id = res.data.data._id;
        const { body, header, url } = request;
        //console.log(`${g(`UPDATE:`)} ${`parsing headers for ${name} action`}`, header)
        yield (0, exports.parsePostmanKeyValuePairsV21)(header, { entity_id: action_id, user_id, token, public_key, category: actions_types_1.Categories.HEADERS });
        //console.log(`${g(`UPDATE:`)} ${`parsing url variables for ${name} action`}`, url)
        yield (0, exports.parsePostmanURLV21)(url, { entity_id: action_id, user_id, token, public_key });
        if (body) {
            const { options, raw: rawData, mode } = body;
            const { raw } = options;
            const { language } = raw;
            if (mode === actions_types_1.Modes.RAW && language === actions_types_1.Formats.JSON && rawData) {
                const data = cleanRawJSONData(rawData);
                //console.log(`${g(`UPDATE:`)} ${`parsing body variables for ${name} action`}`, body)
                yield parsePostmanBodyJSONV21(data, { entity_id: action_id, user_id, token, public_key, category: actions_types_1.Categories.BODY });
            }
        }
        yield (0, exports.parsePostmanResponsesV21)(response, { entity_id: action_id, user_id, token, public_key, category: actions_types_1.Categories.RESPONSE });
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
    }
});
exports.parsePostmanActionV2 = parsePostmanActionV2;
const parsePostmanURLV21 = (data, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { variable, query } = data;
        if (query) {
            //console.log(`${g(`UPDATE:`)} ${`parsing query`}`, query)
            yield (0, exports.parsePostmanKeyValuePairsV21)(query, Object.assign(Object.assign({}, payload), { category: actions_types_1.Categories.QUERY }));
        }
        if (variable) {
            //console.log(`${g(`UPDATE:`)} ${`parsing params`}`, variable)
            yield (0, exports.parsePostmanKeyValuePairsV21)(variable, Object.assign(Object.assign({}, payload), { category: actions_types_1.Categories.PARAMS }));
        }
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
    }
});
exports.parsePostmanURLV21 = parsePostmanURLV21;
const parsePostmanKeyValuePairsV21 = (data, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const arr = [];
        const { entity_id, user_id, public_key, token, category } = payload;
        console.log(`${(0, chalk_1.green)(`UPDATE:`)} ${`parsing array of ${category}`}`);
        for (let i = 0; i < data.length; i++) {
            const { key, value, description } = data[i];
            let type = typeof value;
            // @ts-ignore
            if (type == 'object' && Array.isArray(value))
                type = 'array';
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
                });
            }
        }
        console.log(`${(0, chalk_1.green)(`UPDATE:`)} ${`parsed array of ${category}`}`);
        try {
            yield (0, actions_service_1.updateEntityData)({ entity_id, user_id, public_key, data: arr, sample: JSON.stringify(data), token, category });
        }
        catch (e) {
            console.log(`${(0, chalk_1.red)(`ERROR CREATING DATA:`)} ${e.toString()} `);
            console.log(e);
        }
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
    }
});
exports.parsePostmanKeyValuePairsV21 = parsePostmanKeyValuePairsV21;
const parsePostmanBodyJSONV21 = (data, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entity_id, user_id, public_key, token, category } = payload;
        console.log("JSON CATEGORY!!", category);
        const parse_body = {
            data,
            parent_key: '',
            level: 0,
            parent_index: 0,
            type: inputs_types_1.DataTypes.JSON,
            expected: inputs_types_1.ExpectedValues.PARSESAMPLE,
            category
        };
        //console.log(`${g(`UPDATE:`)} ${`parsing JSON object to ductape datapoints`}`, parse_body);
        const arr = (0, inputs_utils_create_1.parseJSON)(parse_body);
        console.log(`${(0, chalk_1.green)(`UPDATE:`)} ${`parsed JSON object to ductape datapoints`}`, arr);
        try {
            yield (0, actions_service_1.updateEntityData)({ entity_id, user_id, public_key, data: arr, sample: JSON.stringify(data), token, category });
        }
        catch (e) {
            console.log(`${(0, chalk_1.red)(`ERROR CREATING DATA:`)} ${e.toString()} `);
            console.log(e);
        }
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
    }
});
const parsePostmanResponsesV21 = (payload, data) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(`${g(`UPDATE:`)} ${`parsing postman v2.1 responses`}`, payload);
    for (let i = 0; i < payload.length; i++) {
        const { entity_id, user_id, public_key, token, category } = data;
        const { name, status, code, _postman_previewlanguage, body } = payload[i];
        let response_format = _postman_previewlanguage;
        if (_postman_previewlanguage === actions_types_1.Formats.JSON)
            response_format = actions_types_1.ResponseFormats.JSON;
        const response_payload = {
            public_key,
            entity_id,
            category,
            user_id,
            token,
            response_format,
            description: status,
            name: `${(0, constant_1.tagify)(name)}`,
            tag: `${(0, constant_1.tagify)(name)}_${Math.floor(Math.random() * 1000)}`,
            success: false,
            status_code: String(code),
            returned: actions_types_1.ReturnTypes.SINGLE
        };
        try {
            console.log(`${(0, chalk_1.green)(`UPDATE:`)} ${`creating response`}`, response_payload);
            const res = yield (0, actions_service_1.createResponse)(response_payload);
            console.log(`${(0, chalk_1.green)(`UPDATE:`)} ${`response created for entitiy ${entity_id}`}`, res.data.data);
            const { _id } = res.data.data;
            if (response_format === actions_types_1.ResponseFormats.JSON) {
                const data = cleanRawJSONData(body);
                //console.log(`${g(`UPDATE:`)} ${`response body parsing`}`, data);
                yield parsePostmanBodyJSONV21(data, { entity_id: _id, user_id, token, public_key, category: actions_types_1.Categories.RESPONSE });
            }
        }
        catch (e) {
            console.log(`${(0, chalk_1.red)(`ERROR CREATING RESPONSE:`)} ${e.toString()} `);
            console.log(e);
        }
    }
});
exports.parsePostmanResponsesV21 = parsePostmanResponsesV21;
const extractActionDataV21 = (request) => {
    const { method: httpVerb, url } = request;
    let resource = '';
    if (url.path)
        resource = resourcifyPostmanURLArray(url.path);
    return { httpVerb, resource, type: httpVerb };
};
exports.extractActionDataV21 = extractActionDataV21;
const resourcifyPostmanURLArray = (url) => {
    let str = "/";
    url.map((data, index) => {
        str = `${str}${data}`;
        if (index !== url.length - 1)
            str = `${str}/`;
    });
    return str;
};
const cleanRawJSONData = (data) => {
    try {
        return JSON.parse(data);
    }
    catch (e) {
        console.log(`${(0, chalk_1.red)(`ERROR:`)} ${e.toString()} `);
        console.log(e);
        console.log(data);
    }
};
//# sourceMappingURL=actions.util.read.js.map