import { ILogApiService, LogApiService } from "../api/services/logsApi.service";
import { ILoggerInit } from "../types/index.types";
import { ILogData } from "./logs.types";

export interface ILogsService {
    generateLogs(item: ILogData): void;
    fetchLogs(): Array<ILogData>;
    pushLogs(): void;
    setFeatureId(feature_id: string): void;
}

export default class LogsService {

    private eventLogs: Array<ILogData>;
    private user_id: string;
    private workspace_id: string;
    private private_key: string;
    private integration_id: string;
    private feature_id: string;
    private token: string | null;
    private app_id: string | null;
    private public_key: string | null;
    private logsApi: ILogApiService;

    constructor({ workspace_id, public_key, user_id, token, integration_id }: ILoggerInit) {
        this.workspace_id = workspace_id;
        this.public_key = public_key;
        this.user_id = user_id;
        this.token = token;
        this.integration_id = integration_id;
        this.eventLogs = [];

        this.logsApi = new LogApiService();
    }

    setFeatureId(feature_id: string) {
        this.feature_id = feature_id;
    }

    generateLogs(item: ILogData) {
        item.data = typeof item.data === 'object'? JSON.stringify(item.data): item.data;
        this.eventLogs.push({...item, feature_id: this.feature_id, timestamp: new Date()})
    }

    fetchLogs() {
        return this.eventLogs;
    }

    async pushLogs() {
        await this.logsApi.logData(this.eventLogs, {
            user_id: this.user_id,
            token: this.token,
            workspace_id: this.workspace_id,
            public_key: this.public_key,
        })

        this.eventLogs = [];
    }

}