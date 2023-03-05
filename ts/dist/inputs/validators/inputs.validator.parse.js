"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const inputs_types_1 = require("../inputs.types");
const schema = joi.object({
    data: joi.alternatives().conditional('type', {
        is: inputs_types_1.DataTypes.XML,
        then: joi.string().required,
        otherwise: joi.object().required()
    }),
    parent_key: joi.string().optional(),
    level: joi.number().optional(),
    parent_index: joi.number().optional(),
    type: joi.string().valid(...Object.keys(inputs_types_1.DataTypes)).optional(),
    expected: joi.string().valid(...Object.keys(inputs_types_1.ExpectedValues)).optional(),
});
exports.default = schema;
//# sourceMappingURL=inputs.validator.parse.js.map