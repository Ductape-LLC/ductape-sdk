import { logsClient } from "../../clients/logs.client";
import { ILogData } from "../../logs/logs.types";
import { generateAxiosConfig } from "../utils/auth.utils";
import { IRequestExtension } from "../../types/requests.types";
import { LOGS_CREATE_URL } from "../urls";
import { DataFormats } from "../../types/enums";

export interface ILogApiService {
    logData(data: Array<ILogData>, payload: IRequestExtension): Promise<void>
}

export class LogApiService implements ILogApiService {

    constructor () {}

    async logData(data: Array<ILogData>, payload: IRequestExtension) {
        try {
            const {token, ...userAuthData} = payload;
            await logsClient('',"application/json").post(LOGS_CREATE_URL, {...userAuthData, data}, generateAxiosConfig(token, DataFormats.JSON));
        } catch(e){
            throw e;
        }
    }

}