import mongoose from "mongoose";
import AppBuilderService, { IAppBuilderService } from "../appBuilder/services/appBuilder.service";
import { IBuilderInit } from "../types/index.types";
import { IApp, IAppAction, IAppActionResponseInfo, IAppFolders, ICreateApp, ISample } from "../types/appBuilder.types";
import { IFoldersAndActions, KeyValuePair, PostmanBodyV21, PostmanCollectionV21, PostmanFoldersV21, PostmanResponseV21 } from "./imports.types";
import { AppComponents, Categories, DataFormats, HttpMethods, InputsTypes, RequestAction, StatusCodes } from "../types/enums";
import { tagify } from "../appBuilder/utils/string.utils";
import { cleanRawJSONData, generateActionTags, keyValuePairsToObject } from "./utils/imports.utils";
import { AppApiService, IAppApiService } from "../api/services/appApi.service";
import {WorkspaceApiService, IWorkspaceApiService} from "../api/services/workspaceApi.service";;
import { IPostmanV21Repo, PostmanV21Repo } from "./repos/postmanV21.repo";
import { IRequestExtension } from "../types/requests.types";
import { IWorkspace } from "../types/workspaces.types";

export interface IImportService {
    importPostmanV21(data: PostmanCollectionV21, updateIfExists?: boolean, app_id?: string): Promise<void>
}

export default class ImportService implements IImportService {

    private workspace_id;
    private public_key;
    private user_id;
    private token;
    private appService: IAppBuilderService;
    private appApi: IAppApiService;
    private workspaceApi: IWorkspaceApiService;
    private postmanV21Repo: IPostmanV21Repo;

    constructor({ workspace_id, public_key, user_id, token }: IBuilderInit) {
        this.workspace_id = workspace_id;
        this.public_key = public_key;
        this.user_id = user_id;
        this.token = token;

        this.postmanV21Repo = PostmanV21Repo;

        this.appService = new AppBuilderService({ workspace_id, public_key, user_id, token });
    
        this.workspaceApi = new WorkspaceApiService();
        this.appApi = new AppApiService()
    }

    async importPostmanV21(data: PostmanCollectionV21, updateIfExists: boolean = false, app_id: string = null): Promise<void> {
        try {
            const { info, item } = data;

            let exists
            if(!app_id) {
                exists = await this.appService.checkIfAppExists(info.name);
            } else {
                await this.appService.initializeApp(app_id)
                exists = this.appService.fetchApp();
            }
            let collection: IApp = {} as unknown as IApp;

            collection._id = (new mongoose.Types.ObjectId()).toString();
            if (exists && !updateIfExists) {
                throw new Error(`App ${exists.app_name} exists, if you want to  update if, set updateIfExists to true`);
            }

            const workspace: IWorkspace = await this.workspaceApi.fetchWorkspaceById(this.getUserAccess())

            if(!workspace) {
                throw new Error(`Workspace: ${this.workspace_id} not found`);
            }

            if (exists) {
                collection._id = exists._id;
            }

            const { folders, actions } = await this.postmanV21Repo.fetchParsedItems(data.item, this.appService)

            collection.folders = folders;


            // collection.actions = actions;

            if (!exists) {

                collection.tag = `${tagify(workspace.name)}:${tagify(info.name)}`;
                collection.app_name = info.name;
                collection.description = info.description;

                await this.appApi.createApp(collection as unknown as ICreateApp, {
                    workspace_id: this.workspace_id, user_id: this.user_id, public_key: this.public_key,
                    token: this.token
                });
            }

            await this.splitAndWriteBulkInChunks(collection._id, generateActionTags(actions), AppComponents.ACTION )




        } catch (e) {
            throw e
        }
    }

    private async splitAndWriteBulkInChunks(app_id: string, data: Array<any>, action: AppComponents ) {


        const apiCalls = data.map((chunk) => {
            return this.appApi.updateApp(app_id, {component: action, action: RequestAction.UPDATE, ...chunk} as unknown as Record<string, unknown>, this.getUserAccess())
        })

        
        try {

            await Promise.all(apiCalls);

        } catch (e) {
            console.error('Error:', e);
        }
    }

    private getUserAccess(): IRequestExtension {
        return {
            user_id: this.user_id,
            workspace_id: this.workspace_id,
            token: this.token,
            public_key: this.public_key,
        }
    }

}