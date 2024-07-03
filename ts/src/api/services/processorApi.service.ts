import { integrationsClient } from "../../clients/integrations.client";
import { DataFormats } from "../../types/enums";
import { IProcessingOutput, IProcessorResult } from "../../types/processor.types";
import { IRequestExtension } from "../../types/requests.types";
import { PROCESSOR_SAVE_RESULT } from "../urls";
import { generateAxiosConfig } from "../utils/auth.utils";

export interface IProcessorApiService {
    saveResult(data: IProcessorResult, payload: IRequestExtension): Promise<void>
}

export class ProcessorApiService  implements IProcessorApiService {
    async saveResult(data: IProcessorResult, payload: IRequestExtension): Promise<void> {
        try {
            const {token, ...userAuthData} = payload;
            await integrationsClient().post(PROCESSOR_SAVE_RESULT, {...userAuthData, data}, generateAxiosConfig(token, DataFormats.JSON));
        } catch (e) {
            throw e;
        }
    }
    
}