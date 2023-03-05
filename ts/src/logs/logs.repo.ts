import { genericErrors, logDataPayload } from "./logs.types"
import { extractError } from "./utils/logs.utils.errors"

export interface ILogsRepo {
    extractError(e: genericErrors): string;
    log(payload: logDataPayload): Promise<any>;
}

export const LogsRepo: ILogsRepo = {
    extractError(e: genericErrors): string {
        return extractError(e);
    },

    async log(payload: logDataPayload): Promise<any> {

    }


}