import { AppApiService, IAppApiService } from "./api/services/appApi.service";
import { IUserApiService, UserApiService } from "./api/services/userApi.service";
import { IWorkspaceApiService, WorkspaceApiService } from "./api/services/workspaceApi.service";
import AppBuilder, { IAppBuilderService } from "./appBuilder/services/appBuilder.service";
import IntegrationBuilder, { IIntegrationsBuilderService } from "./integrationsBuilder/services/integrationBuilder.service"
import { IApp, IBuilderSession } from "./types/appBuilder.types";
import { IDuctapeInit } from "./types/index.types";
import { red, green, blue } from 'chalk';
import { IIntegration } from "./types/integrationsBuilder.types";
import { PublicStates } from "./types/enums";
import { IIntegrationsApiService, IntegrationsApiService } from "./api/services/integrationsApi.service";

export interface IDuctape {
    getAppBuilder(): Promise<IAppBuilderService>;
    getIntegrationBuilder(): Promise<IIntegrationsBuilderService>;
    fetchWorkspaceApps(status: PublicStates): Promise<Array<IApp>>;
    fetchWorkspaceProjects(status: PublicStates): Promise<Array<IIntegration>>;
}
export default class Ductape implements IDuctape {

    private user_id: string;
    private workspace_id: string;
    private private_key: string;
    private public_key: string;
    private session: IBuilderSession;
    private token: string;
    private apps: Array<IApp>;
    private integrations: Array<IIntegration>;
    private userApi: IUserApiService;
    private appApi: IAppApiService;
    private integrationsApi: IIntegrationsApiService;
    private workspaceApi: IWorkspaceApiService;

    constructor({ workspace_id, private_key, user_id }: IDuctapeInit) {
        this.workspace_id = workspace_id;
        this.private_key = private_key;
        this.user_id = user_id;
        this.userApi = new UserApiService();
        this.appApi = new AppApiService();
        this.workspaceApi = new WorkspaceApiService();
        this.integrationsApi = new IntegrationsApiService();
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public setPublicKey(public_key: string): void {
        this.public_key = public_key;
    }

    public async getAppBuilder(): Promise<IAppBuilderService> {

        if(!this.token) await this.initUserAuth()
        return new AppBuilder({
            workspace_id: this.workspace_id,
            public_key: this.public_key,
            user_id: this.user_id,
            token: this.token
        })
    }

    public async getIntegrationBuilder(): Promise<IIntegrationsBuilderService> {
        if(!this.token) await this.initUserAuth()

        if(!this.public_key) throw new Error('No Public Key')
        return new IntegrationBuilder({
            workspace_id: this.workspace_id,
            public_key: this.public_key,
            user_id: this.user_id,
            token: this.token
        })
    }

    private async initUserAuth(): Promise<void> {
        
            this.token = null;
            this.public_key = null;
            this.session = null;

            await this.fetchSession();

            if (!this.session) {
                await this.refreshUserAccessToken()
                await this.createNewAppBuilderSession();
            }

            try {
                await this.validateWorkspace();
            } catch (e) {
                const error = e.response ? e.response.data.errors : e.toString();
                throw error;
            }
        
    }

    private async refreshUserAccessToken(): Promise<void> {
        try {
            const validUser = await this.userApi.fetchUserByPrivateKey({
                private_key: this.private_key,
                workspace_id: this.workspace_id,
                user_id: this.user_id,
            });
            this.token = validUser.auth_token;
            this.public_key = validUser.public_key;
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            throw error;
        }
    }

    private async fetchSession(): Promise<void> {
        try {

            if (!this.public_key && this.private_key) await this.refreshUserAccessToken()

            if(!this.public_key && !this.private_key) throw new Error("No user private/public keys")

            this.session = await this.appApi.fetchAppBuilderSession({
                public_key: this.public_key,
                user_id: this.user_id,
                workspace_id: this.workspace_id,
            });

            this.token = this.session.token;
            this.public_key = this.session.public_key;
        } catch (e) {
            console.log(e);
            console.log(green("No Existing session, should try to create a new one"))
        }
    }

    private async validateWorkspace(): Promise<void> {
        try {

            const workspace = await this.workspaceApi.fetchWorkspaceById({
                token: this.token,
                public_key: this.public_key,
                user_id: this.user_id,
                workspace_id: this.workspace_id
            })

            if (!workspace) throw new Error(`Workspace does not exist`);
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            throw error;
        }
    }

    private async createNewAppBuilderSession(): Promise<void> {
        try {
            this.session = await this.appApi.createAppBuilderSession({
                token: this.token,
                workspace_id: this.workspace_id,
                user_id: this.user_id,
                public_key: this.public_key,
            });
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            throw error;
        }
    }

    public async fetchWorkspaceApps(status: PublicStates): Promise<Array<IApp>> {
        try {
            if(!this.public_key || !this.token)
                throw new Error('User session not initiated');

            this.apps = await this.appApi.fetchWorkspaceApps(status, {
                token: this.token,
                workspace_id: this.workspace_id,
                user_id: this.user_id,
                public_key: this.public_key,
            })

            return this.apps;
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            throw error; 
        }
    }

    public async fetchWorkspaceProjects(status: PublicStates): Promise<Array<IIntegration>> {
        try {
            if(!this.public_key || !this.token)
                throw new Error('User session not initiated');

            this.integrations = await this.integrationsApi.fetchWorkspaceIntegrations(status, {
                token: this.token,
                workspace_id: this.workspace_id,
                user_id: this.user_id,
                public_key: this.public_key,
            })

            return this.integrations;
        } catch (e) {
            const error = e.response ? e.response.data.errors : e.toString();
            throw error; 
        }        
    }
}