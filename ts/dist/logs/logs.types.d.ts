export interface genericErrors {
    code?: number;
    _original: unknown;
    details: [{
        message: string;
    }];
}
export interface logDataPayload {
    app_id?: string;
    action_id?: string;
    feature_id?: string;
    data: object;
    status: status;
}
declare enum status {
    SUCCESS = "success",
    FAIL = "fail"
}
export {};
