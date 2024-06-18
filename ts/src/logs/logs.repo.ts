import { genericErrors, ILogData } from "./logs.types"
import { extractError } from "./utils/logs.utils.errors"

export interface ILogsRepo {
    extractError(e: genericErrors): string;
    log(payload: ILogData): Promise<any>;
}

export const LogsRepo: ILogsRepo = {
    extractError(e: genericErrors): string {
        return extractError(e);
    },

    async log(payload: ILogData): Promise<any> {

    }


}