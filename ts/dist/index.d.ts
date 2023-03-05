import ActionsService, { IActionsService } from "./actions/actions.service";
import { IActionTriggerInput, ImportPostmanCollectionPayload } from "./actions/actions.types";
import FeaturesService, { IFeaturesService } from "./features/features.service";
import { IFeatureTriggerInput } from "./features/features.types";
import InputsService, { IInputsService } from "./inputs/inputs.service";
import { ParsedInput, ParsePayload } from "./inputs/inputs.types";
import { IIntegrationsService } from "./integrations/integrations.service";
import { ILogsService } from "./logs/logs.service";
export default class Index {
    actionsService: IActionsService;
    featuresService: IFeaturesService;
    inputsService: IInputsService;
    integrationsService: IIntegrationsService;
    logsService: ILogsService;
    constructor();
    triggerFeature(payload: IFeatureTriggerInput): Promise<unknown>;
    triggerAction(payload: IActionTriggerInput): Promise<void>;
    parseData(payload: ParsePayload): Promise<(ParsedInput | import("./inputs/inputs.types").ParsedSample)[]>;
    importPostmanCollection(payload: ImportPostmanCollectionPayload): Promise<void>;
}
export { ActionsService, FeaturesService, IFeaturesService, IActionsService, IFeatureTriggerInput, IActionTriggerInput, InputsService, IInputsService };
