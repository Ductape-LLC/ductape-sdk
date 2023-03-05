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
const actions_repo_1 = require("./actions.repo");
class ActionsService {
    constructor() {
        this.actionsRepo = actions_repo_1.ActionsRepo;
    }
    parsePostmanCollectionv21(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.actionsRepo.parsePostmanCollectionV21(payload);
        });
    }
}
exports.default = ActionsService;
//# sourceMappingURL=actions.service.js.map