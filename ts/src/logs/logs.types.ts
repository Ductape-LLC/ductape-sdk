export interface genericErrors {
    code?: number,
    _original: unknown,
    details: [{ message: string }]
}

export interface ILogData {
    name: string;
    process_id: string;
    integration_id: string;
    app_id?: string;
    action?: string;
    feature_id?: string;
    message?: string;
    env: string;
    type: LogEventTypes;
    data: object | string;
    status: LogEventStatus;
    start?: number;
    end?: number;
    timestamp?: Date;
}

export enum LogEventTypes {
    FEATURE = "feature"
}

export enum LogEventStatus {
    SUCCESS = "success",
    FAIL = "fail",
    WAITING = "waiting",
    PROCESSING = "processing"
}
