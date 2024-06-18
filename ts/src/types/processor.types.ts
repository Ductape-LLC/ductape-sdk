import { IActionRequest, IDependencyMatrix, IFeatureEvent, IFeatureSequence } from "./integrationsBuilder.types";

export interface IProcessorInput { 
    integration_id: string; 
    env: string;
    input: Record<string, unknown>; 
    feature_tag: string;
}

export interface IProcessorSequenceLevels {
    level1: Array<IFeatureSequence>;
    level2: Array<IFeatureSequence>;
    level3: Array<IFeatureSequence>;
    level4: Array<IFeatureSequence>;
    level5: Array<IFeatureSequence>;
}

export interface IProcessingOutput {
    success: Array<IProcessingSuccess>;
    failure: Array<IProcessingFailure>;
    waiting: Array<IProcessingWaiting>;
    skipped: Array<IProcessingFailure>;
}

export interface IProcessingSuccess {
    event: IFeatureEvent
    output?: Record<string, unknown>;
}

export interface IProcessingFailure  extends IProcessingSuccess{
    allow_fail: boolean,
    retries_left?: number;
    retry_at: number;
    error_code: number;
    reason: string;
    payload: IActionRequest;  
}

export interface IProcessingWaiting extends IProcessingSuccess {
    dependants: Array<IDependencyMatrix>
}