"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCodes = exports.extractParams = exports.isValidHttpUrl = exports.cleanFields = exports.Parameterize = exports.resourcify = exports.uniqueCheck = exports.tagifyIgnoreCase = exports.tagify = exports.capitalize = exports.thousandSeparator = exports.numFormatter = exports.fetchInitials = void 0;
const fetchInitials = (firstname, lastname) => {
    if (firstname && lastname) {
        return `${firstname.charAt(0)} ${lastname.charAt(0)}`;
    }
    else if (firstname) {
        return `${firstname.charAt(0)}`;
    }
};
exports.fetchInitials = fetchInitials;
const numFormatter = (num, digits = 2) => {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'B' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
        .slice()
        .reverse()
        .find((item) => {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};
exports.numFormatter = numFormatter;
const thousandSeparator = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
exports.thousandSeparator = thousandSeparator;
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
exports.capitalize = capitalize;
const tagify = (str) => {
    return str.replace(/[^A-Z0-9]/gi, '_').toUpperCase();
};
exports.tagify = tagify;
const tagifyIgnoreCase = (str) => {
    return str.replace(/[^A-Z0-9]/gi, '_');
};
exports.tagifyIgnoreCase = tagifyIgnoreCase;
const uniqueCheck = (arr, data) => {
    const found = arr.some((el) => el._id === data._id);
    return !found;
};
exports.uniqueCheck = uniqueCheck;
const resourcify = (str) => {
    if (!str.startsWith('/'))
        str = `/${str}`;
    return str.replace(/[^A-Z0-9:]/gi, '/');
};
exports.resourcify = resourcify;
const Parameterize = (URL, datapoint, replacement) => {
    return URL.replace(datapoint, replacement);
};
exports.Parameterize = Parameterize;
const cleanFields = (array) => {
    const arr = [];
    for (let i = 0; i < array.length; i++) {
        const obj = array[i];
        const isEmpty = Object.values(obj).every((x) => x === null || x === '');
        if (!isEmpty)
            arr.push(obj);
    }
    return arr;
};
exports.cleanFields = cleanFields;
const isValidHttpUrl = (string) => {
    let url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
};
exports.isValidHttpUrl = isValidHttpUrl;
const extractParams = (str) => {
    const arr = [];
    let found = false;
    let foundStr = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '/') {
            if (foundStr) {
                arr.push(foundStr);
            }
            foundStr = '';
            found = false;
        }
        if (str[i] === ':') {
            found = true;
        }
        if (found && str[i] !== ':')
            foundStr = foundStr + str[i];
        if (found && i === str.length - 1)
            arr.push(foundStr);
    }
    const fields = [];
    for (let i = 0; i < arr.length; i++) {
        //alert(arr+" "+arr[i]);
        fields.push({
            key: arr[i],
            sampleValue: '',
            //origin: "",
            description: '',
            required: true,
            maxLength: 1,
            minLength: 1,
            decorator: '',
            decoratorPosition: '',
            type: 'string',
            defaultType: 'input',
            defaultValue: '',
        });
    }
    return fields;
};
exports.extractParams = extractParams;
exports.statusCodes = [
    { name: 'Common Responses', code: '' },
    { name: 'CONTINUE', code: 100 },
    { name: 'OK', code: 200 },
    { name: 'CREATED', code: 201 },
    { name: 'ACCEPTED', code: 202 },
    { name: 'MULTIPLECHOICES', code: 300 },
    { name: 'MOVED_PERMANENTLY', code: 301 },
    { name: 'FOUND', code: 302 },
    { name: 'NOT_MODIFIED', code: 304 },
    { name: 'BAD_REQUEST', code: 400 },
    { name: 'UNAUTHORIZED', code: 401 },
    { name: 'FORBIDDEN', code: 403 },
    { name: 'NOT_FOUND', code: 404 },
    { name: 'INTERNAL_SERVER_ERROR', code: 500 },
    { name: 'NOT_IMPLEMENTED', code: 501 },
    { name: 'BAD_GATEWAY', code: 502 },
    { name: 'SERVICE_UNAVAILABLE', code: 503 },
    { name: 'GATEWAY_TIMEOUT', code: 504 },
    { name: '', code: '' },
    { name: 'Informational Responses', code: '' },
    { name: 'SWITCHING', code: 101 },
    { name: 'PROCESSING', code: 102 },
    { name: 'EARLY_HINTS', code: 103 },
    { name: '', code: '' },
    { name: 'Successful Responses', code: '' },
    { name: 'NON_AUTHORIZED', code: 203 },
    { name: 'NO_CONTENT', code: 204 },
    { name: 'RESET_CONTENT', code: 205 },
    { name: 'PARTIAL_CONTENT', code: 206 },
    { name: 'MULTI_STATUS', code: 207 },
    { name: 'ALREADY_REPORTED', code: 208 },
    { name: 'IM_USED', code: 226 },
    { name: '', code: '' },
    { name: 'Redirection Responses', code: '' },
    { name: 'SEE_OTHER', code: 303 },
    { name: '', code: '' },
    { name: '', code: '' },
    { name: 'USE_PROXY', code: 305 },
    { name: 'UNUSED', code: 306 },
    { name: 'TEMPORARY_REDIRECT', code: 307 },
    { name: 'PERMANENT_REDIRECT', code: 308 },
    { name: '', code: '' },
    { name: 'Client Error Responses', code: '' },
    { name: 'PAYMENT_REQUIRED', code: 402 },
    { name: 'NOT_ALLOWED', code: 405 },
    { name: 'NOT_ACCEPTABLE', code: 406 },
    { name: 'PROXY_AUTH_REQUIRED', code: 407 },
    { name: 'REQUEST_TIMEOUT', code: 408 },
    { name: 'CONFLICT', code: 409 },
    { name: 'GONE', code: 410 },
    { name: 'LENGTH_REQUIRED', code: 411 },
    { name: 'PRECONDITION_FAILED', code: 412 },
    { name: 'PAYLOAD_TOO_LARGE', code: 413 },
    { name: 'URI_TOO_LONG', code: 414 },
    { name: 'UNSUPPORTED_MEDIA_TYPE', code: 415 },
    { name: 'RANGE_NOT_SATISFIABLE', code: 416 },
    { name: 'EXPECTATION_FAILED', code: 417 },
    { name: 'TEAPOT', code: 418 },
    { name: 'MISDIRECTED_REQUEST', code: 421 },
    { name: 'UNPROCESSABLE_ENTITY', code: 422 },
    { name: 'LOCKED', code: 423 },
    { name: 'TOO_EARLY', code: 425 },
    { name: 'FAILED_DEPENDENCY', code: 424 },
    { name: 'UPGRADE_REQUIRED', code: 426 },
    { name: 'PRECONDITION_REQUIRED', code: 428 },
    { name: 'TOO_MANY_REQUESTS', code: 429 },
    { name: 'HEADER_TOO_LARGE', code: 431 },
    { name: 'LEGAL_EXCEPTION', code: 451 },
    { name: '', code: '' },
    { name: 'Internal Server Error Responses', code: '' },
    { name: 'HTTP_VERSION_NOT_SUPPORTED', code: 505 },
    { name: 'VARIANT_ALSO_NEGOTIATES', code: 506 },
    { name: 'INSUFFICIENT_STORAGE', code: 507 },
    { name: 'LOOP_DETECTED', code: 508 },
    { name: 'NOT_EXTENDED', code: 510 },
    { name: 'NETWORK_AUTH_REQUIRED', code: 511 },
];
//# sourceMappingURL=constant.js.map