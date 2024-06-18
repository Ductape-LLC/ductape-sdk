import mongoose from "mongoose";
import { tagify } from "../../appBuilder/utils/string.utils";
import { IAppFolders, IAppAction, ISample, IAppActionResponseInfo } from "../../types/appBuilder.types";
import { InputsTypes, DataFormats, HttpMethods, StatusCodes, Categories } from "../../types/enums";
import { PostmanFoldersV21, IFoldersAndActions, PostmanBodyV21, KeyValuePair, PostmanResponseV21, PostmanRequestV21 } from "../imports.types";
import { cleanRawJSONData, generateActionTags, keyValuePairsToObject } from "../utils/imports.utils";
import { IAppApiService } from "../../api/services/appApi.service";
import { IAppBuilderService } from "../../appBuilder/services/appBuilder.service";

export interface IPostmanV21Repo {
    fetchParsedItems(items: Array<PostmanFoldersV21>, appService: IAppBuilderService, parent_id?: mongoose.Types.ObjectId | null, level?: number): Promise<IFoldersAndActions>;
    fetchParsedActions(folder_id: mongoose.Types.ObjectId, appService: IAppBuilderService, folder_level: number, items: PostmanFoldersV21): Promise<Omit<IAppAction, 'tag'>>;
    fetchParsedBody(body: PostmanRequestV21, request_type: DataFormats, appService: IAppBuilderService): Promise<ISample>;
    fetchParsedHeaders(headers: Array<KeyValuePair>, appService: IAppBuilderService): Promise<ISample>;
    fetchParsedQuery(query: Array<KeyValuePair>, appService: IAppBuilderService): Promise<ISample>;
    fetchParsedParams(url: string, appService: IAppBuilderService): Promise<ISample>
    fetchParsedResponses(responses: PostmanResponseV21[], appService: IAppBuilderService): Promise<IAppActionResponseInfo[]>;
}

export const PostmanV21Repo: IPostmanV21Repo = {

    async fetchParsedItems(items: Array<PostmanFoldersV21>, appService: IAppBuilderService, parent_id: mongoose.Types.ObjectId | null = null, level: number = 0): Promise<IFoldersAndActions> {
        const assingedItems: IFoldersAndActions = {
            actions: [],
            folders: []
        }

        for(let i=0; i<=items.length; i++) {

            const item = items[i];

            if (item && item.name && item.item) {
                const _id = new mongoose.Types.ObjectId();
                const assignedFolder: IAppFolders = {
                    _id,
                    name: item.name,
                    description: item.description,
                    parent_id,
                    level
                };

                assingedItems.folders.push(assignedFolder);

                if (item.item && item.item.length > 0) {
                    console.log("level", level);
                    const children = await this.fetchParsedItems(item.item, appService, _id, level + 1);
                    assingedItems.actions.push(...children.actions);
                    assingedItems.folders.push(...children.folders);
                }
            } else if   (item) {
                console.log('actions ===>>>>', item.name);
                const assignedActions = await this.fetchParsedActions(parent_id, appService, level, item);
                console.log("assignedActions ===>>>", assignedActions)
                assingedItems.actions.push(assignedActions);
            }
        }

        return assingedItems;
    },

    async fetchParsedActions(folder_id: mongoose.Types.ObjectId, appService: IAppBuilderService, folder_level: number, items: PostmanFoldersV21): Promise<Omit<IAppAction, 'tag'>> {
        if (items) {

            const { request, response, name, description } = items;

            console.log("Actions", name, folder_id);
            let request_type;

            if (request.body && request.body.mode) {

                console.log("BODY ===>>>", request.body)
                if (request.body.mode === "raw") {
                    const raw = request.body.options.raw.language as unknown as InputsTypes;
                    if (raw === InputsTypes.JSON) {
                        request_type = DataFormats.JSON;
                    }
                }

                if (request.body.mode === "formdata") {
                    request_type = DataFormats.FORMDATA;
                }

                if (request.body.mode === "urlencoded") {
                    request_type = DataFormats.URLENCODED;
                }
            } else {
                request_type = DataFormats.JSON;
            }

            // const action_tag = `${tagify(name)}_${Math.floor(Math.random() * 100)}`

            // console.log("REQUEST BODY", request.body)
            let resource = ""

            if (request.url && request.url.path) {
                console.log("REQ ==>>>", request.url)
                resource = request.url.path.join("/");
            }
            // console.log("RESOURCE ===>>>", resource)

            const action: Omit<IAppAction, 'tag'> = {
                name,
                description,
                resource,
                method: request.method as unknown as HttpMethods,
                // tag: action_tag,
                request_type,
                folder_id,
                folder_level,
                body: request.body? await this.fetchParsedBody(request, request_type, appService): {},
                headers: await this.fetchParsedHeaders(request.header, appService),
                responses: await this.fetchParsedResponses(response, appService),
                query: request.url && request.url.query && request.url.query.length? await this.fetchParsedQuery(request.url.query, appService): {},
                params: await this.fetchParsedParams(resource, appService)
            }

            return action;
        }
    },

    async fetchParsedBody(body: PostmanRequestV21, request_type: DataFormats, appService: IAppBuilderService): Promise<ISample> {
        let data: ISample;
        if (request_type === DataFormats.JSON) {
            data = {
                type: InputsTypes.JSON,
                sample: body.body.raw? cleanRawJSONData(body.body.raw): {},
            }
        } else if (request_type === DataFormats.FORMDATA) {
            data = {
                type: InputsTypes.JSON,
                sample: body.formdata? body.formdata: [],
            }
        } else if (request_type === DataFormats.URLENCODED) {
            data = {
                type: InputsTypes.JSON,
                sample: body.urlencoded? body.urlencoded: [],
            }
        }

        console.log("BODY DATA ===>>>", data, body.body, request_type);
        return appService.parseRequestData(Categories.BODY, data)
    },

    async fetchParsedHeaders(headers: Array<KeyValuePair>, appService: IAppBuilderService): Promise<ISample> {
        const data = {
            type: InputsTypes.JSON,
            sample: keyValuePairsToObject(headers),
        }

        return appService.parseRequestData(Categories.HEADER, data)
    },


    async fetchParsedQuery(query: Array<KeyValuePair>, appService: IAppBuilderService): Promise<ISample> {
        const data = {
            type: InputsTypes.JSON,
            sample: keyValuePairsToObject(query),
        }

        return appService.parseRequestData(Categories.QUERY, data)
    },

    async fetchParsedParams(url: string, appService: IAppBuilderService): Promise<ISample> {
        const { params } = await appService.extractResourceData(url);

        return {
            type: InputsTypes.JSON,
            ...params,
        } as unknown as ISample;
    },

    async fetchParsedResponses(responses: PostmanResponseV21[], appService: IAppBuilderService): Promise<IAppActionResponseInfo[]> {
        const parsedResponses: IAppActionResponseInfo[] = [];

        for (const response of responses) {
            let response_format: DataFormats | undefined;
            let success = false;
            let is_status_code_success = false;
            let body: ISample = {
                type: response._postman_previewlanguage as unknown as InputsTypes,
                status_code: String(response.code) as unknown as StatusCodes,
                sample: response.body,
            };

            if (response._postman_previewlanguage === "json") {
                response_format = DataFormats.JSON;
                body.sample = cleanRawJSONData(response.body);
            } else if (response._postman_previewlanguage === "formdata") {
                // TODO: handle formadata responses
                response_format = DataFormats.FORMDATA;
            } else if (response._postman_previewlanguage === "urlencoded") {
                // TODO: handle urlencoded responses
                response_format = DataFormats.URLENCODED;
            } if (response._postman_previewlanguage === "html") {
                response_format = DataFormats.HTML;
            }

            if (response.status === "OK") {
                success = true;
                is_status_code_success = true;
            }

            parsedResponses.push({
                name: response.name,
                // tag: `${tagify(response.name)}_${Math.floor(Math.random() * 100)}`,
                response_format,
                status_code: String(response.code) as unknown as StatusCodes,
                is_status_code_success,
                success,
                body,
            });
        }

        const response_data = generateActionTags(parsedResponses) as unknown as IAppActionResponseInfo[]; // 

        const data: IAppActionResponseInfo[] = await Promise.all(response_data.map(async (data) => {
            return await appService.parseResponsePayload(data);
        }));

        // overwrite default tag

        

        return data;
    }
}