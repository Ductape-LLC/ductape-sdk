import { logsClient } from "../../clients/logs.client";
import { logDataPayload } from "../logs.types";

export const logData = async(payload: logDataPayload) => {

    return await logsClient('',"application/json").post('', payload);

}