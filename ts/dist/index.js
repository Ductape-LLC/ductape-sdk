"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputsService = exports.FeaturesService = exports.ActionsService = void 0;
const actions_service_1 = require("./actions/actions.service");
exports.ActionsService = actions_service_1.default;
const actions_types_1 = require("./actions/actions.types");
const features_service_1 = require("./features/features.service");
exports.FeaturesService = features_service_1.default;
const inputs_service_1 = require("./inputs/inputs.service");
exports.InputsService = inputs_service_1.default;
const logs_service_1 = require("./logs/logs.service");
class Index {
    constructor() {
        this.actionsService = new actions_service_1.default();
        this.featuresService = new features_service_1.default();
        this.inputsService = new inputs_service_1.default();
        this.logsService = new logs_service_1.default();
    }
    triggerFeature(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { env_slug, feature_id, integration_key, input } = payload;
                const { env_id, integration_id, inputs } = yield this.integrationsService.fetchEnvIntegrationIdAndInputs({ feature_id, env_slug }); // TODO 1
                yield this.integrationsService.validateIntegrationKey({ integration_id, integration_key }); // TODO 2
                const data = yield this.inputsService.parseData(input);
                yield this.inputsService.validateInput(data, inputs); // TODO 3
                return yield this.featuresService.processEvents({ env_id, feature_id, integration_id, data }); // TODO 4
            }
            catch (e) {
                // throw new Error(this.logsService.logData())
            }
        });
    }
    triggerAction(payload) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    parseData(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inputsService.parseData(payload);
        });
    }
    importPostmanCollection(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type } = payload;
            if (type === actions_types_1.CollectionJSONTypes.v21) {
                yield this.actionsService.parsePostmanCollectionv21(payload);
            }
        });
    }
}
exports.default = Index;
//# sourceMappingURL=index.js.map