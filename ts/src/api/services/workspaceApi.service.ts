import { workspaceClient } from "../../clients/workspace.client";
import { DataFormats } from "../../types/enums";
import { IRequestExtension } from "../../types/requests.types";
import { IWorkspace } from "../../types/workspaces.types";
import { WORKSPACE_FETCH_URL, WORKSPACE_GET_URL } from "../urls";
import { Parameterize } from "../utils/strings.utils";

export interface IWorkspaceApiService {
    fetchWorkspaceById(auth: IRequestExtension): Promise<IWorkspace>
}


export class WorkspaceApiService implements IWorkspaceApiService {
    constructor() { }

    async fetchWorkspaceById(auth: IRequestExtension): Promise<IWorkspace> {
        try {

            const URL = Parameterize(WORKSPACE_GET_URL, ':workspace_id', auth.workspace_id)
            const res = await workspaceClient(auth.token, DataFormats.JSON).get(`${URL}?public_key=${auth.public_key}&user_id=${auth.user_id}`);

            return res.data.data;

        } catch (e) {
            throw e;
        }
    }

}