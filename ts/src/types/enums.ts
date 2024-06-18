export enum PublicStates {
    ALL="all",
    DRAFT="draft",
    PRIVATE="private",
    PUBLIC="public"   
}


export enum HttpMethods {
    POST="POST",
    GET="GET",
    PUT="PUT",
    PATCH="PATCH",
    DELETE="DELETE"
}

export enum AppComponents {
    APP = "app",
    ACTION = "action",
    EVENT = "event",
    AUTH = "auth",
    ENV = "env",
    CONSTANT = "constants",
    VARIABLE = "variables",
    VALIDATION = "validation",

    ACTION_BULK = "action_bulk",

    ACTION_RESPONSE = "action_response",
}

export enum RequestAction {
    UPDATE = "update",
    CREATE = "create",
    DELETE = "delete"
}

export enum IntegrationComponents {
    ENV = "env",
    APP = "app",
    DATABASE = "database",
    FUNCTION = "function",
    CACHE = "cache",
    NOTIFICATION = "notification",
    FEATURE = "feature",
    JOB = "job"
}

export enum AppEventSetupTypes {
    REGISTERED = "registered",
    CALLBACK = "callback"
}


export enum AuthTypes {
    TOKEN = "token_access", // input a token you already have
    CREDENTIALS = "credential_access", // you have credentials to fetch token
    // FETCH_TOKEN = "fetch_token_access", // you will fetch access token
    // FETCH_CREDENTIALS = "fetch_credential_access" // you will fetch credentials to fetch token
}

export enum DataTypes {
    STRING = "string",
    NUMBER_STRING = "numberstring",
    INTEGER = "number",
    FLOAT = "float",
    DOUBLE = "double",
    UUID = "uuid",
    ARRAY = "array",
    OBJECT = "object",
    BOOLEAN = "boolean",

    // TODO: handle the array types below
    /*STRING_ARRAY = "string_array",
    INTEGER_ARRAY = "integer_array",
    FLOAT_ARRAY = "float_array",
    DOUBLE_ARRAY = "double_array",
    UUID_ARRAY = "uuid_array",
    BOOLEAN_ARRAY = "boolean_array",*/
}

export enum AppCategories {
    BODY = "body",
    HEADER = "headers",
    PARAMS = "params",
    QUERY = "query",
}

export enum Categories {
    RESPONSE = "response",
    BODY = "body",
    HEADER = "header",
    PARAMS = "params",
    QUERY = "query",
    INPUT = "input",
    SETUP = "auth",
    ACTION = "action",
    WEBHOOK = "event"
}

export enum DefaultTypes {
    LOOKUP = "lookup",
    SET = "set",
    INPUT = "input"
}

export enum DecoratorPostions {
    APPEND = "append",
    PREPEND = "prepend",
    UNSET = ""
}

export enum InputsTypes {
    JSON = "json",
    XML = "xml",
    HTML = "html"
}

export enum SuccessMarkerType {
    VALUE = "value", // We should expect the keys to equal a value
    KEY = "key", // we should expect the keys to exist
}

export enum StatusCodes {
    CONTINUE="100",
    SWITCHING="101",
    PROCESSING="102",
    EARLY_HINTS="103",

    OK="200",
    CREATED="201",
    ACCEPTED="202",
    NON_AUTHORIZED="203",
    NO_CONTENT="204",
    RESET_CONTENT="205",
    PARTIAL_CONTENT="206",
    MULTI_STATUS="207",
    ALREADY_REPORTED="208",
    IM_USED="226",

    MULTIPLECHOICES="300",
    MOVED_PERMANENTLY="301",
    FOUND="302",
    SEE_OTHER="303",
    NOT_MODIFIED="304",
    USE_PROXY="305",
    UNUSED="306",
    TEMPORARY_REDIRECT="307",
    PERMANENT_REDIRECT="308",

    BAD_REQUEST="400",
    UNAUTHORIZED="401",
    PAYMENT_REQUIRED="402",
    FORBIDDEN="403",
    NOT_FOUND="404",
    NOT_ALLOWED="405",
    NOT_ACCEPTABLE="406",
    PROXY_AUTH_REQUIRED="407",
    REQUEST_TIMEOUT="408",
    CONFLICT="409",
    GONE="410",
    LENGTH_REQUIRED="411",
    PRECONDITION_FAILED="412",
    PAYLOAD_TOO_LARGE="413",
    URI_TOO_LONG="414",
    UNSUPPORTED_MEDIA_TYPE="415",
    RANGE_NOT_SATISFIABLE="416",
    EXPECTATION_FAILED="417",
    TEAPOT="418",
    MISDIRECTED_REQUEST="421",
    UNPROCESSABLE_ENTITY="422",
    LOCKED="423",
    TOO_EARLY="425",
    FAILED_DEPENDENCY="424",
    UPGRADE_REQUIRED="426",
    PRECONDITION_REQUIRED="428",
    TOO_MANY_REQUESTS="429",
    HEADER_TOO_LARGE="431",
    LEGAL_EXCEPTION="451",

    INTERNAL_SERVER_ERROR="500",
    NOT_IMPLEMENTED="501",
    BAD_GATEWAY="502",
    SERVICE_UNAVAILABLE="503",
    GATEWAY_TIMEOUT="504",
    HTTP_VERSION_NOT_SUPPORTED="505",
    VARIANT_ALSO_NEGOTIATES="506",
    INSUFFICIENT_STORAGE="507",
    LOOP_DETECTED="508",
    NOT_EXTENDED="510",
    NETWORK_AUTH_REQUIRED="511"
}


export enum DataFormats {
    JSON="application/json",
    URLENCODED="application/x-www-form-urlencoded",
    FORMDATA="multipart/form-data",
    SOAP="SOAP",
    HTML="html"
}

export enum TokenPeriods {
    HOURS = "hours",
    MINUTES = "mins",
    SECONDS = "secs",
    DAYS = "days",
    WEEKS = "weeks",
    MONTHS = "months",
    YEARS = "years"
}

export enum Languages {
    JAVASCRIPT = "js",
}