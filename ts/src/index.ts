import ActionsService, { IActionsService } from './actions/actions.service';
import {
  Categories,
  CollectionJSONTypes,
  IActionTriggerInput,
  ImportPostmanCollectionPayload
} from './actions/actions.types';
import FeaturesService, { IFeaturesService } from './features/features.service';
import { IFeatureTriggerInput } from './features/features.types';
import InputsService, { IInputsService } from './inputs/inputs.service';
import {
  DataTypes,
  ExpectedValues,
  ParsedInput,
  ParsePayload
} from './inputs/inputs.types';
import { parseData } from './inputs/utils/inputs.utils.create';
import { IIntegrationsService } from './integrations/integrations.service';
import LogsService, { ILogsService } from './logs/logs.service';
// import {data, token} from "./json";

export default class Index {
  actionsService!: IActionsService;
  featuresService!: IFeaturesService;
  inputsService!: IInputsService;
  integrationsService!: IIntegrationsService;
  logsService!: ILogsService;

  constructor() {
    this.actionsService = new ActionsService();
    this.featuresService = new FeaturesService();
    this.inputsService = new InputsService();
    this.logsService = new LogsService();
  }

  async triggerFeature(payload: IFeatureTriggerInput) {
    try {
      const { env_slug, feature_id, integration_key, input } = payload;

      const { env_id, integration_id, inputs } =
        await this.integrationsService.fetchEnvIntegrationIdAndInputs({
          feature_id,
          env_slug
        }); // TODO 1

      await this.integrationsService.validateIntegrationKey({
        integration_id,
        integration_key
      }); // TODO 2

      const data = (await this.inputsService.parseData(
        input
      )) as unknown as Array<ParsedInput>;

      await this.inputsService.validateInput(data, inputs); // TODO 3

      return await this.featuresService.processEvents({
        env_id,
        feature_id,
        integration_id,
        data
      }); // TODO 4
    } catch (e) {
      // throw new Error(this.logsService.logData())
    }
  }

  async triggerAction(payload: IActionTriggerInput) {}

  async parseData(payload: ParsePayload) {
    return this.inputsService.parseData(payload);
  }

  async importPostmanCollection(payload: ImportPostmanCollectionPayload) {
    const { type } = payload;

    if (type === CollectionJSONTypes.v21) {
      await this.actionsService.parsePostmanCollectionv21(payload);
    }
  }
}

export {
  ActionsService,
  FeaturesService,
  IFeaturesService,
  IActionsService,
  IFeatureTriggerInput,
  IActionTriggerInput,
  InputsService,
  IInputsService
};

const service = new Index();

const data = {
  name: 'Izukchukwu Emmanuel',
  dob: '09-08-2021',
  residence: {
    city: {
      uk: 'london',
      us: 'new york',
      ng: [{ lagos: 'obalende' }, { abuja: 'wuse 2' }, { ibadan: 'bodija' }]
    }
  }
};

// const data = {
//   user_id: '62cc17ec5a62fd899d256de0',
//   public_key: 'da41198023edc30476b29d661b5623bc6842c652',
//   base_url: 'https://sandbox-api.testapp.co',
//   test: 'https://sandbox-api.testapp.co',
//   expiry: 20,
//   period: 'hours',
//   method: 'POST',
//   description: 'custom setup for sandbox environment'
// };

const type = DataTypes.JSON;
const category = Categories.RESPONSE;
const expected = ExpectedValues.PARSESAMPLE;

const func = async () => {
  const d = await service.parseData({ data, type, category, expected });
  // console.log('len:', d.length, d);
};

const runFuncs = async () => {
  await func(); // Wait for the first func call to complete
  // await func();
  setTimeout(() => func(), 5000); // Wait for the second func call to complete
};

runFuncs();
