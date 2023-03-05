import { genericErrors, logDataPayload } from "./logs.types";
export interface ILogsRepo {
    extractError(e: genericErrors): string;
    log(payload: logDataPayload): Promise<any>;
}
export declare const LogsRepo: ILogsRepo;
