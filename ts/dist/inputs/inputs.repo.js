"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputsRepo = void 0;
const inputs_utils_create_1 = require("./utils/inputs.utils.create");
exports.InputsRepo = {
    parseData(payload) {
        return (0, inputs_utils_create_1.parseData)(payload);
    },
    parseXML(payload) {
        return (0, inputs_utils_create_1.parseXML)(payload);
    },
    parseJson(payload) {
        return (0, inputs_utils_create_1.parseJSON)(payload);
    }
};
//# sourceMappingURL=inputs.repo.js.map