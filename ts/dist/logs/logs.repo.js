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
exports.LogsRepo = void 0;
const logs_utils_errors_1 = require("./utils/logs.utils.errors");
exports.LogsRepo = {
    extractError(e) {
        return (0, logs_utils_errors_1.extractError)(e);
    },
    log(payload) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
//# sourceMappingURL=logs.repo.js.map