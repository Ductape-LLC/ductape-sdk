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
const logs_repo_1 = require("../logs/logs.repo");
const inputs_repo_1 = require("./inputs.repo");
const inputs_validator_parse_1 = require("./validators/inputs.validator.parse");
class InputsService {
    constructor() {
        this.inputsRepo = inputs_repo_1.InputsRepo;
        this.logsRepo = logs_repo_1.LogsRepo;
    }
    parseData(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.inputsRepo.parseData(payload);
            }
            catch (e) {
                throw new Error(this.logsRepo.extractError(e));
            }
        });
    }
    parseXML(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield inputs_validator_parse_1.default.validateAsync(payload);
                return this.inputsRepo.parseXML(payload);
            }
            catch (e) {
                throw new Error(this.logsRepo.extractError(e));
            }
        });
    }
    parseJson(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield inputs_validator_parse_1.default.validateAsync(payload);
                return this.inputsRepo.parseJson(payload);
            }
            catch (e) {
                throw new Error(this.logsRepo.extractError(e));
            }
        });
    }
    validateInput(input, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return '';
            }
            catch (e) {
                throw new Error(this.logsRepo.extractError(e));
            }
        });
    }
}
exports.default = InputsService;
//# sourceMappingURL=inputs.service.js.map