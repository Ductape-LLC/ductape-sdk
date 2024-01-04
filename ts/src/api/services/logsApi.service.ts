import { logsClient } from "../../clients/logs.client";
import { logDataPayload } from "../../types/logs.types";

export interface ILogApiService {
    logData(payload: logDataPayload): Promise<void>
}

export class LogApiService implements ILogApiService {

    constructor () {}

    async logData(payload: logDataPayload) {
        try {
            await logsClient('',"application/json").post('', payload);
        } catch(e){
            throw e;
        }
    }

}