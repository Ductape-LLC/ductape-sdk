"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = exports.Modes = exports.Formats = exports.EntityTypes = exports.ResponseFormats = exports.CollectionJSONTypes = exports.ReturnTypes = void 0;
var ReturnTypes;
(function (ReturnTypes) {
    ReturnTypes["ALL"] = "all";
    ReturnTypes["SINGLE"] = "single";
})(ReturnTypes = exports.ReturnTypes || (exports.ReturnTypes = {}));
var CollectionJSONTypes;
(function (CollectionJSONTypes) {
    CollectionJSONTypes["v2"] = "v2";
    CollectionJSONTypes["v21"] = "v2.1";
})(CollectionJSONTypes = exports.CollectionJSONTypes || (exports.CollectionJSONTypes = {}));
var ResponseFormats;
(function (ResponseFormats) {
    ResponseFormats["JSON"] = "application/json";
    ResponseFormats["URLENCODED"] = "application/x-www-form-urlencoded";
    ResponseFormats["FORMDATA"] = "multipart/form-data";
    ResponseFormats["SOAP"] = "SOAP";
})(ResponseFormats = exports.ResponseFormats || (exports.ResponseFormats = {}));
var EntityTypes;
(function (EntityTypes) {
    EntityTypes["ACTION"] = "action";
    EntityTypes["FOLDER"] = "folder";
    EntityTypes["APP"] = "app";
})(EntityTypes = exports.EntityTypes || (exports.EntityTypes = {}));
var Formats;
(function (Formats) {
    Formats["JSON"] = "json";
})(Formats = exports.Formats || (exports.Formats = {}));
var Modes;
(function (Modes) {
    Modes["RAW"] = "raw";
})(Modes = exports.Modes || (exports.Modes = {}));
var Categories;
(function (Categories) {
    Categories["BODY"] = "body";
    Categories["RESPONSE"] = "response";
    Categories["HEADERS"] = "header";
    Categories["QUERY"] = "query";
    Categories["PARAMS"] = "params";
})(Categories = exports.Categories || (exports.Categories = {}));
//# sourceMappingURL=actions.types.js.map