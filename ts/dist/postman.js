"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "info": {
        "_postman_id": "958d3bc4-84c0-4bbe-ab50-46db859ef80c",
        "name": "XCEL AS A SERVICE",
        "description": "XCel as a service provides you the method and functions for integrating your application or service to the XCel payments ecosystem.",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        "_exporter_id": "778610"
    },
    "item": [
        {
            "name": "Getting Started",
            "item": [
                {
                    "name": "Issuer Registration",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"company_name\": \"PayLater2 Services INC\",\n    \"description\": \"Buy now, pay later\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n    \"access\": [{\n        \"name\": \"Fikayo Sanni\",\n        \"email\": \"goran@gmail.com\",\n        \"password\": \"password\",\n        \"acesss_level\": \"ALL\" \n    }]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/issuer/register",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "issuer",
                                "register"
                            ]
                        },
                        "description": "As a third party partner, you are expected to create an Issuer account with us. This is the first step of the integration process"
                    },
                    "response": [
                        {
                            "name": "Registering as an Issuer",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"company_name\": \"XCel INC\",\n    \"description\": \"Make Payments anywhere you go\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n    \"access\": [{\n        \"name\": \"Shalom King\",\n        \"email\": \"admin@xcelapp.com\",\n        \"password\": \"password\",\n        \"acesss_level\": \"ALL\" \n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/issuer/register",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "issuer",
                                        "register"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "612"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"264-Ar0eXsERbtlvWGjCEinQssKpo78\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 16 Apr 2022 12:38:39 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"created\": \"2022-04-16T12:38:38.200Z\",\n        \"permissions\": {\n            \"international_transfers\": false,\n            \"local_intra_transfers\": false,\n            \"local_inter_transfers\": false,\n            \"local_bill_payments\": false,\n            \"local_airtime_data\": false,\n            \"local_loan_services\": false,\n            \"pos_transactions\": false,\n            \"account_creation\": true,\n            \"pots\": false,\n            \"custom_fees\": false\n        },\n        \"is_active\": false,\n        \"private_key\": \"23950690-bd82-11ec-acf1-f17be5d93d67\",\n        \"master_issuer\": false,\n        \"_id\": \"625ab8cefc6039363a321e3e\",\n        \"company_name\": \"XCel INC\",\n        \"description\": \"Make Payments anywhere you go\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n        \"__v\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Issuer Login",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"email\":\"admin@xcelapp.com\",\n    \"password\":\"password\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/issuer/login",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "issuer",
                                "login"
                            ]
                        },
                        "description": "Login as an issuer. This allows you to get the needed credentials and keys to operate your issuer functions"
                    },
                    "response": [
                        {
                            "name": "Logging In as an Issuer",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"email\":\"admin@xcelapp.com\",\n    \"password\":\"password\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/issuer/login",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "issuer",
                                        "login"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1747"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"6d3-U0BAAzFdWtg/90fJvbaoaFvFZzk\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 16 Apr 2022 13:01:19 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVhYjhjZWZjNjAzOTM2M2EzMjFlM2UiLCJjcmVhdGVkIjoiMjAyMi0wNC0xNlQxMjozODozOC4yMDBaIiwicGVybWlzc2lvbnMiOnsiaW50ZXJuYXRpb25hbF90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRyYV90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRlcl90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9iaWxsX3BheW1lbnRzIjpmYWxzZSwibG9jYWxfYWlydGltZV9kYXRhIjpmYWxzZSwibG9jYWxfbG9hbl9zZXJ2aWNlcyI6ZmFsc2UsInBvc190cmFuc2FjdGlvbnMiOmZhbHNlLCJhY2NvdW50X2NyZWF0aW9uIjp0cnVlLCJwb3RzIjpmYWxzZSwiY3VzdG9tX2ZlZXMiOmZhbHNlfSwiaXNfYWN0aXZlIjpmYWxzZSwibWFzdGVyX2lzc3VlciI6ZmFsc2UsImNvbXBhbnlfbmFtZSI6IlhDZWwgSU5DIiwiZGVzY3JpcHRpb24iOiJNYWtlIFBheW1lbnRzIGFueXdoZXJlIHlvdSBnbyIsImxvZ28iOiJodHRwczovL2FkbWluLnhjZWxhcHAuY29tL2Fzc2V0cy9pbWFnZXMvbWFpbmxvZ28ucG5nIiwiX192IjowLCJwdWJsaWNfa2V5IjoiNDA5MDZmZmNiMTllNzZjNTMzMDVjZjUyOWMzMDIzN2IyMDBiYTcxYyIsImlhdCI6MTY1MDExNDA3OSwiZXhwIjoxNjUwMjAwNDc5fQ.-OW7kN4nsEqFfbLG-_9ntkG9kwNCGcteixfkwXJ_dHw\",\n        \"_id\": \"625ab8cffc6039363a321e3f\",\n        \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n        \"name\": \"Shalom King\",\n        \"email\": \"admin@xcelapp.com\",\n        \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n        \"__v\": 0,\n        \"issuer\": {\n            \"_id\": \"625ab8cefc6039363a321e3e\",\n            \"created\": \"2022-04-16T12:38:38.200Z\",\n            \"permissions\": {\n                \"international_transfers\": false,\n                \"local_intra_transfers\": false,\n                \"local_inter_transfers\": false,\n                \"local_bill_payments\": false,\n                \"local_airtime_data\": false,\n                \"local_loan_services\": false,\n                \"pos_transactions\": false,\n                \"account_creation\": true,\n                \"pots\": false,\n                \"custom_fees\": false\n            },\n            \"is_active\": false,\n            \"master_issuer\": false,\n            \"company_name\": \"XCel INC\",\n            \"description\": \"Make Payments anywhere you go\",\n            \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n            \"__v\": 0,\n            \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\"\n        }\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Create an App",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            },
                            {
                                "key": "",
                                "value": " ",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_name\": \"XCel App\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n    \"colors\": {\n        \"primary\": \"#000000\",\n        \"secondary\": \"#000000\",\n        \"accent\": \"#000000\",\n        \"background\": \"#ffffff\"\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/app/create",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "app",
                                "create"
                            ]
                        },
                        "description": "Whenever you create an app, you create the ability to access app functions"
                    },
                    "response": [
                        {
                            "name": "Creating an App",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVhYjhjZWZjNjAzOTM2M2EzMjFlM2UiLCJjcmVhdGVkIjoiMjAyMi0wNC0xNlQxMjozODozOC4yMDBaIiwicGVybWlzc2lvbnMiOnsiaW50ZXJuYXRpb25hbF90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRyYV90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRlcl90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9iaWxsX3BheW1lbnRzIjpmYWxzZSwibG9jYWxfYWlydGltZV9kYXRhIjpmYWxzZSwibG9jYWxfbG9hbl9zZXJ2aWNlcyI6ZmFsc2UsInBvc190cmFuc2FjdGlvbnMiOmZhbHNlLCJhY2NvdW50X2NyZWF0aW9uIjp0cnVlLCJwb3RzIjpmYWxzZSwiY3VzdG9tX2ZlZXMiOmZhbHNlfSwiaXNfYWN0aXZlIjpmYWxzZSwibWFzdGVyX2lzc3VlciI6ZmFsc2UsImNvbXBhbnlfbmFtZSI6IlhDZWwgSU5DIiwiZGVzY3JpcHRpb24iOiJNYWtlIFBheW1lbnRzIGFueXdoZXJlIHlvdSBnbyIsImxvZ28iOiJodHRwczovL2FkbWluLnhjZWxhcHAuY29tL2Fzc2V0cy9pbWFnZXMvbWFpbmxvZ28ucG5nIiwiX192IjowLCJwdWJsaWNfa2V5IjoiNDA5MDZmZmNiMTllNzZjNTMzMDVjZjUyOWMzMDIzN2IyMDBiYTcxYyIsImlhdCI6MTY1MDExNDA3OSwiZXhwIjoxNjUwMjAwNDc5fQ.-OW7kN4nsEqFfbLG-_9ntkG9kwNCGcteixfkwXJ_dHw",
                                        "type": "text"
                                    },
                                    {
                                        "key": "",
                                        "value": " ",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_name\": \"XCel App\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n    \"colors\": {\n        \"primary\": \"#000000\",\n        \"secondary\": \"#000000\",\n        \"accent\": \"#000000\",\n        \"background\": \"#ffffff\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/app/create",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "app",
                                        "create"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "357"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"165-IPKttEpIt9Aw/915XxQ4CyIPSwE\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 16 Apr 2022 19:51:35 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"colors\": {\n            \"primary\": \"#000000\",\n            \"secondary\": \"#000000\",\n            \"accent\": \"#000000\",\n            \"background\": \"#ffffff\"\n        },\n        \"private_key\": \"9f0cb9d0-bdbe-11ec-a7d4-310f29962748\",\n        \"active\": false,\n        \"_id\": \"625b1e47da0112472f2af519\",\n        \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n        \"app_name\": \"XCel App\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n        \"__v\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Generate App Keys",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"app_id\":\"625b1e47da0112472f2af519\",\n    \"issuer_id\":\"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/app/keys",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "app",
                                "keys"
                            ]
                        },
                        "description": "These keys are used to perform app functions and should not be stored on frontend clients"
                    },
                    "response": [
                        {
                            "name": "Get your App Keys",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"app_id\":\"625b1e47da0112472f2af519\",\n    \"issuer_id\":\"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/app/keys",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "app",
                                        "keys"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "656"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"290-CQKBsJj5oT31s7u6Flr559m/J90\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 16 Apr 2022 21:04:53 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xvcnMiOnsicHJpbWFyeSI6IiMwMDAwMDAiLCJzZWNvbmRhcnkiOiIjMDAwMDAwIiwiYWNjZW50IjoiIzAwMDAwMCIsImJhY2tncm91bmQiOiIjZmZmZmZmIn0sInByaXZhdGVfa2V5IjoiOWYwY2I5ZDAtYmRiZS0xMWVjLWE3ZDQtMzEwZjI5OTYyNzQ4IiwiYWN0aXZlIjpmYWxzZSwiX2lkIjoiNjI1YjFlNDdkYTAxMTI0NzJmMmFmNTE5IiwiaXNzdWVyX2lkIjoiNjI1YWI4Y2VmYzYwMzkzNjNhMzIxZTNlIiwiYXBwX25hbWUiOiJYQ2VsIEFwcCIsImxvZ28iOiJodHRwczovL2FkbWluLnhjZWxhcHAuY29tL2Fzc2V0cy9pbWFnZXMvbG9nby5wbmciLCJfX3YiOjAsImlhdCI6MTY1MDE0MzA5M30.MoYHlN3ap6s5pqjoDrB3TifgbnWrA3AvTMVb4lK0_kA\",\n        \"token_type\": \"Bearer\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "WhiteList App IP Addresses",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"ip_addresses\": [{\n        \"app_id\": \"625b1e47da0112472f2af519\",\n        \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n        \"ip_address\": \"00.000.00.02\"\n    }]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/whitelist/ip",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "whitelist",
                                "ip"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "WhiteList App IP Addresses",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"ip_addresses\": [{\n        \"app_id\": \"625b1e47da0112472f2af519\",\n        \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n        \"ip_address\": \"00.000.00.02\"\n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/whitelist/ip",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "whitelist",
                                        "ip"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "180"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"b4-ovnXdd+cr83wReYxFrR244OCsZY\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sun, 17 Apr 2022 09:30:16 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"625bde271a960c5856ed7dfb\",\n            \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n            \"app_id\": \"625b1e47da0112472f2af519\",\n            \"ip_address\": \"00.000.00.02\",\n            \"__v\": 0\n        }\n    ]\n}"
                        },
                        {
                            "name": "Duplicate Address",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"ip_addresses\": [{\n        \"app_id\": \"625b1e47da0112472f2af519\",\n        \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n        \"ip_address\": \"00.000.00.02\"\n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/whitelist/ip",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "whitelist",
                                        "ip"
                                    ]
                                }
                            },
                            "status": "Internal Server Error",
                            "code": 500,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "67"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"43-t63/785TpViPEMFoN0PZZu/Y1NM\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sun, 17 Apr 2022 09:35:37 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": false,\n    \"meta\": {},\n    \"errors\": \"duplicate ip address rejected\"\n}"
                        }
                    ]
                },
                {
                    "name": "Remove IP Address",
                    "request": {
                        "method": "DELETE",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"ip_address\": \"00.000.00.02\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v2/accounts/whitelist/ip",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v2",
                                "accounts",
                                "whitelist",
                                "ip"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Remove IP Address",
                            "originalRequest": {
                                "method": "DELETE",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"ip_address\": \"00.000.00.02\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/whitelist/ip",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "whitelist",
                                        "ip"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "53"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"35-Jm0exuk2JfY9UY3L2p68ckc0uwE\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sun, 17 Apr 2022 09:43:52 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": \"IP Address Removed\"\n}"
                        }
                    ]
                },
                {
                    "name": "Setup App Push Notifications",
                    "request": {
                        "method": "PUT",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notifications\": {\n        \"type\": \"firebase\",\n        \"credentials\": {\n            \"type\": \"service_account\",\n            \"project_id\": \"xcelapp-4d11f\",\n            \"private_key_id\": \"6abf074321c11e0bdab2e5e14b18add85afca002\",\n            \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCm6Ue0lyBEkV4s\\ngehv9w9lqDZiOoeNovF9kXnMcc4dm3VVNjPNHcvZ5Y+7flzqkTwJwFS2i4sOb5RN\\nKwaeQVjrm1gyobZLGLxMXKZhSy7vVbwWGmUF20KWrsy1OaiPTjBTWjNkQBUswa55\\n6oVEF/nG5j/h+KfgHIKnaMHr7dLBwyBSu3H8UkCMoPDwOx3jHzUcYqBJHGnND2he\\nX0f5CAfejz9J736btn6NEwSPf9zBT1bdDfQ1bO93Z9YeJKkcmrhBGf4/+svQy/0s\\nQjG+84VsNDClphbmQjubrGkYhtSSRfrgNF22aN2tRCz/uFmI2ljTWSdvYb57MtM6\\n99CXb2dZAgMBAAECggEADc5sFP8PNzzDCnFwdZp9Fo6UeQmYXtnkmdtntMaRIxfR\\n28uQ+12EmDCJ9BteujRrP+890p+2T+pg3QU7FeoX3d1KrV19A7c3FCXxyUh7yGZS\\nGY3zX0mkt2wcGL19OOVhz/M9HwTB+6LFuOXyQhCto4s2K43y7PHOyOQ8bjSM42QL\\nPdfexKS96yWqPY5qZet1rNiZv4jQQM6KHQiOJ/eRH/U9TYJA8N/VQ6DkhWdsYhMQ\\nwx7G02pUbO0HkNQlmegoUjs8KYKzORRPecIqmJtRu1q11tiKgrKPYN3mv4vBqpED\\nPas1Hvafrepr+vnOm+vgD7bvDmE+0wQyYc5EX+7mFQKBgQDg34ItiNL3x1RBwnux\\naambZ9WSqQpZxiEkiS9Lm2C7PznSJgKnaeR0uDYGwplCX7HYVmdtVyDkrOsViGKr\\nfnXVONpFniWxoRZuzJ5zAxx30Qa7DcQB7qhFbDlYNLd6z24u1ssqyWlpYZTSATUh\\nPLVNf/CKJVg8jABNqKgpfMxEUwKBgQC+A91jZ9snuCTPI4Q1EK0zsAEl/IIWX3wt\\nF1D8e5tAvpQgjib/wPdix33UFnpgUd5XFdrOWyY5Mykws22IyJwRn6tTWWXO+CYc\\ng4vtcuIifpYZGlgr9DKuAd2GyVdAJownVdhTjKBQte8EmmiCyDnS0X8OeEFE6K3y\\nI4pwFDOwIwKBgB8PQA/CAkGvCng6wJL0oTSR1vH23zMfJpzBRgMPZwD17qqUDXHK\\nMn/cobm1Ty3Xwdy7snVrv2NWbvH+cIJ3aRcWTy+mdFZghZSwNoJ0P45dFKzpbdVG\\nfX95P0JrpZwU4ocdq9oxD5o6nC+Vcx0wIWqe7T5nghR60d/oF7IDRsN5AoGAHNHR\\nPkZ+QuP3EUO9xZ6l5nUHd49425PX7a7fpavJvGQra1SkLZ5C50SCnSxbm0hPhL3X\\n1fyVK4/K64wLTPfAVBv3jEi+3Ele3mxFSNpn2fuBIIWSYfhDx4iY5Nyc0yoFj+HB\\nUcq+df9iJTyWJV/hBUypDLTIkX8JAvTJBn7J6CkCgYB7x67WSLqueWip+DABlgJW\\nmj2oxpP93EbIbblQhm3Fsp0/VE05vRYdImbHFF3hW5Cx0ip0RQ80Aw5jBRVcRhmV\\nE3TaqH4hHp14y4uMVFnuBzmFwtXb21fTvn5KTHNoKMJHse5MqpHPVnMxW0J+mcQY\\nK5h+itsmB0zHqI9i/KC/4w==\\n-----END PRIVATE KEY-----\\n\",\n            \"client_email\": \"firebase-adminsdk-5emnc@xcelapp-4d11f.iam.gserviceaccount.com\",\n            \"client_id\": \"100138383176542862067\",\n            \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n            \"token_uri\": \"https://oauth2.googleapis.com/token\",\n            \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n            \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5emnc%40xcelapp-4d11f.iam.gserviceaccount.com\"\n        },\n        \"databaseUrl\": \"https://xcelapp-4d11f.firebaseio.com\"\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/app/update",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "app",
                                "update"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Setup App Push Notifications",
                            "originalRequest": {
                                "method": "PUT",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notifications\": {\n        \"type\": \"firebase\",\n        \"credentials\": {\n            \"type\": \"service_account\",\n            \"project_id\": \"xcelapp-4d11f\",\n            \"private_key_id\": \"6abf074321c11e0bdab2e5e14b18add85afca002\",\n            \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCm6Ue0lyBEkV4s\\ngehv9w9lqDZiOoeNovF9kXnMcc4dm3VVNjPNHcvZ5Y+7flzqkTwJwFS2i4sOb5RN\\nKwaeQVjrm1gyobZLGLxMXKZhSy7vVbwWGmUF20KWrsy1OaiPTjBTWjNkQBUswa55\\n6oVEF/nG5j/h+KfgHIKnaMHr7dLBwyBSu3H8UkCMoPDwOx3jHzUcYqBJHGnND2he\\nX0f5CAfejz9J736btn6NEwSPf9zBT1bdDfQ1bO93Z9YeJKkcmrhBGf4/+svQy/0s\\nQjG+84VsNDClphbmQjubrGkYhtSSRfrgNF22aN2tRCz/uFmI2ljTWSdvYb57MtM6\\n99CXb2dZAgMBAAECggEADc5sFP8PNzzDCnFwdZp9Fo6UeQmYXtnkmdtntMaRIxfR\\n28uQ+12EmDCJ9BteujRrP+890p+2T+pg3QU7FeoX3d1KrV19A7c3FCXxyUh7yGZS\\nGY3zX0mkt2wcGL19OOVhz/M9HwTB+6LFuOXyQhCto4s2K43y7PHOyOQ8bjSM42QL\\nPdfexKS96yWqPY5qZet1rNiZv4jQQM6KHQiOJ/eRH/U9TYJA8N/VQ6DkhWdsYhMQ\\nwx7G02pUbO0HkNQlmegoUjs8KYKzORRPecIqmJtRu1q11tiKgrKPYN3mv4vBqpED\\nPas1Hvafrepr+vnOm+vgD7bvDmE+0wQyYc5EX+7mFQKBgQDg34ItiNL3x1RBwnux\\naambZ9WSqQpZxiEkiS9Lm2C7PznSJgKnaeR0uDYGwplCX7HYVmdtVyDkrOsViGKr\\nfnXVONpFniWxoRZuzJ5zAxx30Qa7DcQB7qhFbDlYNLd6z24u1ssqyWlpYZTSATUh\\nPLVNf/CKJVg8jABNqKgpfMxEUwKBgQC+A91jZ9snuCTPI4Q1EK0zsAEl/IIWX3wt\\nF1D8e5tAvpQgjib/wPdix33UFnpgUd5XFdrOWyY5Mykws22IyJwRn6tTWWXO+CYc\\ng4vtcuIifpYZGlgr9DKuAd2GyVdAJownVdhTjKBQte8EmmiCyDnS0X8OeEFE6K3y\\nI4pwFDOwIwKBgB8PQA/CAkGvCng6wJL0oTSR1vH23zMfJpzBRgMPZwD17qqUDXHK\\nMn/cobm1Ty3Xwdy7snVrv2NWbvH+cIJ3aRcWTy+mdFZghZSwNoJ0P45dFKzpbdVG\\nfX95P0JrpZwU4ocdq9oxD5o6nC+Vcx0wIWqe7T5nghR60d/oF7IDRsN5AoGAHNHR\\nPkZ+QuP3EUO9xZ6l5nUHd49425PX7a7fpavJvGQra1SkLZ5C50SCnSxbm0hPhL3X\\n1fyVK4/K64wLTPfAVBv3jEi+3Ele3mxFSNpn2fuBIIWSYfhDx4iY5Nyc0yoFj+HB\\nUcq+df9iJTyWJV/hBUypDLTIkX8JAvTJBn7J6CkCgYB7x67WSLqueWip+DABlgJW\\nmj2oxpP93EbIbblQhm3Fsp0/VE05vRYdImbHFF3hW5Cx0ip0RQ80Aw5jBRVcRhmV\\nE3TaqH4hHp14y4uMVFnuBzmFwtXb21fTvn5KTHNoKMJHse5MqpHPVnMxW0J+mcQY\\nK5h+itsmB0zHqI9i/KC/4w==\\n-----END PRIVATE KEY-----\\n\",\n            \"client_email\": \"firebase-adminsdk-5emnc@xcelapp-4d11f.iam.gserviceaccount.com\",\n            \"client_id\": \"100138383176542862067\",\n            \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n            \"token_uri\": \"https://oauth2.googleapis.com/token\",\n            \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n            \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5emnc%40xcelapp-4d11f.iam.gserviceaccount.com\"\n        },\n        \"databaseUrl\": \"https://xcelapp-4d11f.firebaseio.com\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/app/update",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "app",
                                        "update"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "2667"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"a6b-qHFLKUxFGUQZIe7JAbjifPfK65c\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sun, 17 Apr 2022 10:35:32 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"active\": false,\n        \"notifications\": {\n            \"type\": \"firebase\",\n            \"credentials\": {\n                \"type\": \"service_account\",\n                \"project_id\": \"xcelapp-4d11f\",\n                \"private_key_id\": \"6abf074321c11e0bdab2e5e14b18add85afca002\",\n                \"private_key\": \"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCm6Ue0lyBEkV4s\\ngehv9w9lqDZiOoeNovF9kXnMcc4dm3VVNjPNHcvZ5Y+7flzqkTwJwFS2i4sOb5RN\\nKwaeQVjrm1gyobZLGLxMXKZhSy7vVbwWGmUF20KWrsy1OaiPTjBTWjNkQBUswa55\\n6oVEF/nG5j/h+KfgHIKnaMHr7dLBwyBSu3H8UkCMoPDwOx3jHzUcYqBJHGnND2he\\nX0f5CAfejz9J736btn6NEwSPf9zBT1bdDfQ1bO93Z9YeJKkcmrhBGf4/+svQy/0s\\nQjG+84VsNDClphbmQjubrGkYhtSSRfrgNF22aN2tRCz/uFmI2ljTWSdvYb57MtM6\\n99CXb2dZAgMBAAECggEADc5sFP8PNzzDCnFwdZp9Fo6UeQmYXtnkmdtntMaRIxfR\\n28uQ+12EmDCJ9BteujRrP+890p+2T+pg3QU7FeoX3d1KrV19A7c3FCXxyUh7yGZS\\nGY3zX0mkt2wcGL19OOVhz/M9HwTB+6LFuOXyQhCto4s2K43y7PHOyOQ8bjSM42QL\\nPdfexKS96yWqPY5qZet1rNiZv4jQQM6KHQiOJ/eRH/U9TYJA8N/VQ6DkhWdsYhMQ\\nwx7G02pUbO0HkNQlmegoUjs8KYKzORRPecIqmJtRu1q11tiKgrKPYN3mv4vBqpED\\nPas1Hvafrepr+vnOm+vgD7bvDmE+0wQyYc5EX+7mFQKBgQDg34ItiNL3x1RBwnux\\naambZ9WSqQpZxiEkiS9Lm2C7PznSJgKnaeR0uDYGwplCX7HYVmdtVyDkrOsViGKr\\nfnXVONpFniWxoRZuzJ5zAxx30Qa7DcQB7qhFbDlYNLd6z24u1ssqyWlpYZTSATUh\\nPLVNf/CKJVg8jABNqKgpfMxEUwKBgQC+A91jZ9snuCTPI4Q1EK0zsAEl/IIWX3wt\\nF1D8e5tAvpQgjib/wPdix33UFnpgUd5XFdrOWyY5Mykws22IyJwRn6tTWWXO+CYc\\ng4vtcuIifpYZGlgr9DKuAd2GyVdAJownVdhTjKBQte8EmmiCyDnS0X8OeEFE6K3y\\nI4pwFDOwIwKBgB8PQA/CAkGvCng6wJL0oTSR1vH23zMfJpzBRgMPZwD17qqUDXHK\\nMn/cobm1Ty3Xwdy7snVrv2NWbvH+cIJ3aRcWTy+mdFZghZSwNoJ0P45dFKzpbdVG\\nfX95P0JrpZwU4ocdq9oxD5o6nC+Vcx0wIWqe7T5nghR60d/oF7IDRsN5AoGAHNHR\\nPkZ+QuP3EUO9xZ6l5nUHd49425PX7a7fpavJvGQra1SkLZ5C50SCnSxbm0hPhL3X\\n1fyVK4/K64wLTPfAVBv3jEi+3Ele3mxFSNpn2fuBIIWSYfhDx4iY5Nyc0yoFj+HB\\nUcq+df9iJTyWJV/hBUypDLTIkX8JAvTJBn7J6CkCgYB7x67WSLqueWip+DABlgJW\\nmj2oxpP93EbIbblQhm3Fsp0/VE05vRYdImbHFF3hW5Cx0ip0RQ80Aw5jBRVcRhmV\\nE3TaqH4hHp14y4uMVFnuBzmFwtXb21fTvn5KTHNoKMJHse5MqpHPVnMxW0J+mcQY\\nK5h+itsmB0zHqI9i/KC/4w==\\n-----END PRIVATE KEY-----\\n\",\n                \"client_email\": \"firebase-adminsdk-5emnc@xcelapp-4d11f.iam.gserviceaccount.com\",\n                \"client_id\": \"100138383176542862067\",\n                \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\n                \"token_uri\": \"https://oauth2.googleapis.com/token\",\n                \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\n                \"client_x509_cert_url\": \"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5emnc%40xcelapp-4d11f.iam.gserviceaccount.com\"\n            },\n            \"databaseUrl\": \"https://xcelapp-4d11f.firebaseio.com\"\n        },\n        \"_id\": \"625b1e47da0112472f2af519\",\n        \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n        \"app_name\": \"XCel App\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n        \"__v\": 0,\n        \"public_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Setup Operation Countries",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"countries\": [{\n        \"iso_code_2\":\"NG\",\n        \"currencies\": [{\n            \"currency_code\":\"NGN\"\n        },{\n            \"currency_code\":\"USD\"\n        },{\n            \"currency_code\": \"GHS\"\n        },{\n            \"currency_code\": \"GBP\"\n        }]\n    },{\n        \"iso_code_2\":\"GB\",\n        \"currencies\": [{\n            \"currency_code\":\"NGN\"\n        },{\n            \"currency_code\":\"USD\"\n        },{\n            \"currency_code\": \"GHS\"\n        },{\n            \"currency_code\": \"GBP\"\n        },{\n            \"currency_code\": \"EUR\"\n        }]\n    }]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/issuer/ops/countries",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "issuer",
                                "ops",
                                "countries"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Setup Operation Countries",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"countries\": [{\n        \"iso_code_2\":\"NG\",\n        \"currencies\": [{\n            \"currency_code\":\"NGN\"\n        },{\n            \"currency_code\":\"USD\"\n        },{\n            \"currency_code\": \"GHS\"\n        },{\n            \"currency_code\": \"GBP\"\n        }]\n    },{\n        \"iso_code_2\":\"GB\",\n        \"currencies\": [{\n            \"currency_code\":\"NGN\"\n        },{\n            \"currency_code\":\"USD\"\n        },{\n            \"currency_code\": \"GHS\"\n        },{\n            \"currency_code\": \"GBP\"\n        },{\n            \"currency_code\": \"EUR\"\n        }]\n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/issuer/ops/countries",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "issuer",
                                        "ops",
                                        "countries"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1460"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5b4-gMmXmKLxH9fBpk2MifTZ4YRvVeM\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 20 Apr 2022 09:25:37 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"countries_added\": [\n            {\n                \"active\": false,\n                \"_id\": \"625fd187876ccdbd574f00d5\",\n                \"iso_code_2\": \"NG\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd188876ccdbd574f00d6\",\n                \"iso_code_2\": \"GB\",\n                \"__v\": 0\n            }\n        ],\n        \"currencies_added\": [\n            {\n                \"active\": false,\n                \"_id\": \"625fd189876ccdbd574f00d7\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"NGN\",\n                \"iso_code_2\": \"NG\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd18a876ccdbd574f00d8\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"USD\",\n                \"iso_code_2\": \"NG\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd18b876ccdbd574f00d9\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"GHS\",\n                \"iso_code_2\": \"NG\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd18c876ccdbd574f00da\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"GBP\",\n                \"iso_code_2\": \"NG\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd18d876ccdbd574f00db\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"NGN\",\n                \"iso_code_2\": \"GB\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd18e876ccdbd574f00dc\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"USD\",\n                \"iso_code_2\": \"GB\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd18f876ccdbd574f00dd\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"GHS\",\n                \"iso_code_2\": \"GB\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd190876ccdbd574f00de\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"GBP\",\n                \"iso_code_2\": \"GB\",\n                \"__v\": 0\n            },\n            {\n                \"active\": false,\n                \"_id\": \"625fd191876ccdbd574f00df\",\n                \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n                \"currency_code\": \"EUR\",\n                \"iso_code_2\": \"GB\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch App",
                    "protocolProfileBehavior": {
                        "disableBodyPruning": true
                    },
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/app/:app_id?issuer_id={{issuer_id}}&public_key={{issuer_public_key}}",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "app",
                                ":app_id"
                            ],
                            "query": [
                                {
                                    "key": "issuer_id",
                                    "value": "{{issuer_id}}"
                                },
                                {
                                    "key": "public_key",
                                    "value": "{{issuer_public_key}}"
                                }
                            ],
                            "variable": [
                                {
                                    "key": "app_id",
                                    "value": "{{app_id}}"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch App",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts/app/:app_id?issuer_id=638894f57bc2ade0d0593876&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        "app",
                                        ":app_id"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "638894f57bc2ade0d0593876"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                        }
                                    ],
                                    "variable": [
                                        {
                                            "key": "app_id",
                                            "value": "638895857bc2ade0d059387e"
                                        }
                                    ]
                                }
                            },
                            "status": "Unauthorized",
                            "code": 401,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "51"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"33-71QXndtApUI36hG5cs5OoatMDkU\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 07 Dec 2022 06:30:01 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": false,\n    \"meta\": {},\n    \"errors\": \"Invalid Token\"\n}"
                        }
                    ]
                }
            ],
            "description": "First we setup your developer (issuer) account, app, generate app keys and also whitelist your IP address to allow secure seamless connection between your app's API and the Xcel API"
        },
        {
            "name": "ACCOUNTS",
            "item": [
                {
                    "name": "Create Issuer Customer",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"country_of_residence\": \"NG\",\n    \"user_info\": {\n        \"user_type\": \"ADMIN\",\n        \"company\": {\n            \"name\": \"XCel INC Limited\",\n            \"registration_no\": \"0101010101\",\n            \"company_type\": \"FinTech\",\n            \"incorporation_locality\": \"GB\",\n            \"email\": \"valentine.obi@xcelapp.com\",\n            \"phone\": \"08102478821\",\n            \"volume_expected\": \"1000\",\n            \"value_expected\": \"GBP 10000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"XCel ADMIN\",\n        \"identifier\": \"admin@xcelapp.com\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"preferences\": {\n        \"secure_login\": true\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/customer",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "customer"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Issuer Customer",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"user_info\": {\n        \"user_type\": \"ADMIN\",\n        \"company\": {\n            \"name\": \"XCel INC Limited\",\n            \"registration_no\": \"0101010101\",\n            \"company_type\": \"FinTech\",\n            \"incorporation_locality\": \"GB\",\n            \"email\": \"valentine.obi@xcelapp.com\",\n            \"phone\": \"08102478821\",\n            \"volume_expected\": \"1000\",\n            \"value_expected\": \"GBP 10000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"XCel ADMIN\",\n        \"identifier\": \"admin@xcelapp.com\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"preferences\": {\n        \"secure_login\": true\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/customer",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "customer"
                                    ]
                                }
                            },
                            "status": "Multiple Choices",
                            "code": 300,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1737"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"6c9-vTRfNqMLDOkM6IiAGZSw3bXN4nA\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 25 Apr 2022 12:15:02 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"customer\": {\n            \"updated\": \"2022-04-25T12:15:00.783Z\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"user_info\": {\n                \"user_type\": \"ADMIN\",\n                \"company\": {\n                    \"_id\": \"626690c438a9031dbfc57180\",\n                    \"name\": \"XCel INC Limited\",\n                    \"registration_no\": \"0101010101\",\n                    \"company_type\": \"FinTech\",\n                    \"incorporation_locality\": \"GB\",\n                    \"email\": \"valentine.obi@xcelapp.com\",\n                    \"phone\": \"08102478821\",\n                    \"volume_expected\": \"1000\",\n                    \"value_expected\": \"GBP 10000000\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"_id\": \"626690c438a9031dbfc57181\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                },\n                \"mailing_address\": {\n                    \"_id\": \"626690c438a9031dbfc57182\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                }\n            },\n            \"_id\": \"626690c438a9031dbfc5717f\",\n            \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n            \"app_id\": \"625b1e47da0112472f2af519\",\n            \"preferences\": {\n                \"require_authorizers\": false,\n                \"secure_login\": true,\n                \"allowExtraAccess\": false,\n                \"disabled\": false,\n                \"version_locked\": false,\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"_id\": \"626690c438a9031dbfc57183\"\n            },\n            \"__v\": 0,\n            \"user_key\": \"ff395644251d1d033d5bc13a4a99070e000f5d99\"\n        },\n        \"access\": [\n            {\n                \"active\": false,\n                \"_id\": \"626690c538a9031dbfc57184\",\n                \"name\": \"XCel ADMIN\",\n                \"identifier\": \"admin@xcelapp.com\",\n                \"pin\": \"a8d0b6f0939cfd883251f62b265f971ef8a5ab97eee32b91460f08b965601d93\",\n                \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n                \"access_level\": \"ALL\",\n                \"security_credential\": \"1425262717819\",\n                \"user_id\": \"626690c438a9031dbfc5717f\",\n                \"__v\": 0\n            }\n        ],\n        \"authorizers\": []\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Merchant Customer",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"app_id\": \"6336881a5e6f1d0012fa45ec\",\n    \"app_key\": \"c9737d512d07fac92d27f86806df0c0c518e4768ab54f13f65aab3a7721336d3\",\n    \"country_of_residence\": \"NG\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"user_info\": {\n        \"user_type\": \"MERCHANT\",\n        \"company\": {\n            \"name\": \"XCel Merchant Limited\",\n            \"registration_no\": \"0101010102\",\n            \"company_type\": \"FinTech\",\n            \"transaction_type\": \"UTILITY BILLS\",\n            \"incorporation_locality\": \"GB\",\n            \"phone\": \"08102478821\",\n            \"email\": \"valentine.obi@xcelapp.com\",\n            \"kyc_done\": false,\n            \"volume_expected\": \"1000\",\n            \"value_expected\": \"GBP 10000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"XCel Merchant ADMIN\",\n        \"identifier\": \"joromid@gmail.com\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"authorizers\": [{\n        \"email_address\": \"fikayo@gmail.com\",\n        \"notification\": {\n            \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n            \"type\": \"firebase\"\n        }\n    }],\n    \"directors\": [{\n        \"first_name\": \"Oluwafikayo\",\n        \"last_name\": \"Sanni\",\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"email_address\": \"sanni.oluwafikayo@gmail.com\",\n        \"phone\": \"08102478821\",\n        \"kyc_done\": false,\n        \"proof_of_address\": \"https://sandbox-bucket.xcelapp.com/address.jpg\",\n        \"proof_of_id\": \"https://sandbox-bucket.xcelapp.com/id.jpg\"\n    }]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/customer",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "customer"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Merchant Customer",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"app_id\": \"6336881a5e6f1d0012fa45ec\",\n    \"app_key\": \"c9737d512d07fac92d27f86806df0c0c518e4768ab54f13f65aab3a7721336d3\",\n    \"country_of_residence\": \"NG\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"user_info\": {\n        \"user_type\": \"MERCHANT\",\n        \"company\": {\n            \"name\": \"XCel Merchant Limited\",\n            \"registration_no\": \"0101010102\",\n            \"company_type\": \"FinTech\",\n            \"transaction_type\": \"UTILITY BILLS\",\n            \"incorporation_locality\": \"GB\",\n            \"phone\": \"08102478821\",\n            \"email\": \"valentine.obi@xcelapp.com\",\n            \"kyc_done\": false,\n            \"volume_expected\": \"1000\",\n            \"value_expected\": \"GBP 10000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"XCel Merchant ADMIN\",\n        \"identifier\": \"joromid@gmail.com\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"authorizers\": [{\n        \"email_address\": \"fikayo@gmail.com\",\n        \"notification\": {\n            \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n            \"type\": \"firebase\"\n        }\n    }],\n    \"directors\": [{\n        \"first_name\": \"Oluwafikayo\",\n        \"last_name\": \"Sanni\",\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"email_address\": \"sanni.oluwafikayo@gmail.com\",\n        \"phone\": \"08102478821\",\n        \"kyc_done\": false,\n        \"proof_of_address\": \"https://sandbox-bucket.xcelapp.com/address.jpg\",\n        \"proof_of_id\": \"https://sandbox-bucket.xcelapp.com/id.jpg\"\n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts/customer",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        "customer"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "2600"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"a28-qmJRzyEJn9itNoJHnuNNyYLXR8k\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 06:34:21 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"customer\": {\n            \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n            \"app_id\": \"6336881a5e6f1d0012fa45ec\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"country_of_residence\": \"NG\",\n            \"user_info\": {\n                \"user_type\": \"MERCHANT\",\n                \"company\": {\n                    \"name\": \"XCel Merchant Limited\",\n                    \"registration_no\": \"0101010102\",\n                    \"company_type\": \"FinTech\",\n                    \"transaction_type\": \"UTILITY BILLS\",\n                    \"incorporation_locality\": \"GB\",\n                    \"email\": \"valentine.obi@xcelapp.com\",\n                    \"phone\": \"08102478821\",\n                    \"kyc_done\": false,\n                    \"volume_expected\": \"1000\",\n                    \"value_expected\": \"GBP 10000000\",\n                    \"_id\": \"63996e6a18348a1c8f2a560d\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"63996e6a18348a1c8f2a560e\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"63996e6a18348a1c8f2a560f\"\n                }\n            },\n            \"_id\": \"63996e6a18348a1c8f2a560c\",\n            \"updated\": \"2022-12-14T06:34:18.154Z\",\n            \"private_key\": \"55f210a0-7b79-11ed-ada0-e58a83a23499\",\n            \"__v\": 0,\n            \"user_key\": \"775865c6e6709d30d52ab692a96e5c8232990d84be308e8312e7ff8470d5c81b\"\n        },\n        \"access\": [\n            {\n                \"name\": \"XCel Merchant ADMIN\",\n                \"user_id\": \"63996e6a18348a1c8f2a560c\",\n                \"identifier\": \"joromid@gmail.com\",\n                \"pin\": \"a8d0b6f0939cfd883251f62b265f971ef8a5ab97eee32b91460f08b965601d93\",\n                \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n                \"access_level\": \"ALL\",\n                \"security_credential\": \"1425262717819\",\n                \"active\": false,\n                \"_id\": \"63996e6a18348a1c8f2a5611\",\n                \"__v\": 0\n            }\n        ],\n        \"authorizers\": [\n            {\n                \"user_id\": \"63996e6a18348a1c8f2a560c\",\n                \"email_address\": \"fikayo@gmail.com\",\n                \"notification\": {\n                    \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n                    \"type\": \"firebase\"\n                },\n                \"_id\": \"63996e6c18348a1c8f2a5614\",\n                \"uuid\": \"577c5a20-7b79-11ed-ada0-e58a83a23499\",\n                \"__v\": 0\n            }\n        ],\n        \"directors\": [\n            {\n                \"user_id\": \"63996e6a18348a1c8f2a560c\",\n                \"first_name\": \"Oluwafikayo\",\n                \"last_name\": \"Sanni\",\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"63996e6d18348a1c8f2a5618\"\n                },\n                \"email_address\": \"sanni.oluwafikayo@gmail.com\",\n                \"phone\": \"08102478821\",\n                \"kyc_done\": false,\n                \"proof_of_address\": \"https://sandbox-bucket.xcelapp.com/address.jpg\",\n                \"proof_of_id\": \"https://sandbox-bucket.xcelapp.com/id.jpg\",\n                \"_id\": \"63996e6d18348a1c8f2a5617\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "MTO Customer",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"country_of_residence\": \"NG\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"user_info\": {\n        \"user_type\": \"MTO\",\n        \"company\": {\n            \"name\": \"XCel Merchant Limited\",\n            \"registration_no\": \"0101010102\",\n            \"company_type\": \"FinTech\",\n            \"incorporation_locality\": \"GB\",\n            \"phone\": \"08102478821\",\n            \"email\": \"valentine.obi@xcelapp.com\",\n            \"volume_expected\": \"1000\",\n            \"value_expected\": \"GBP 10000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"XCel Merchant ADMIN\",\n        \"identifier\": \"fikayo@gmail.com\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"authorizers\": [{\n        \"email_address\": \"fikayo@gmail.com\",\n        \"notification\": {\n            \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n            \"type\": \"firebase\"\n        }\n    }]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/customer",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "customer"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "MTO Customer",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"user_info\": {\n        \"user_type\": \"MERCHANT\",\n        \"company\": {\n            \"name\": \"XCel Merchant Limited\",\n            \"registration_no\": \"0101010102\",\n            \"company_type\": \"FinTech\",\n            \"incorporation_locality\": \"GB\",\n            \"phone\": \"08102478821\",\n            \"email\": \"valentine.obi@xcelapp.com\",\n            \"volume_expected\": \"1000\",\n            \"value_expected\": \"GBP 10000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"XCel Merchant ADMIN\",\n        \"identifier\": \"fikayo@gmail.com\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"authorizers\": [{\n        \"email_address\": \"fikayo@gmail.com\",\n        \"notification\": {\n            \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n            \"type\": \"firebase\"\n        }\n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/customer",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "customer"
                                    ]
                                }
                            },
                            "status": "Multiple Choices",
                            "code": 300,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1914"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"77a-x3a+hCvioKCR+mBb7zW3SBfJHxE\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 25 Apr 2022 12:16:46 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"customer\": {\n            \"updated\": \"2022-04-25T12:16:43.554Z\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"user_info\": {\n                \"user_type\": \"MTO\",\n                \"company\": {\n                    \"_id\": \"6266912b38a9031dbfc57186\",\n                    \"name\": \"XCel Merchant Limited\",\n                    \"registration_no\": \"0101010102\",\n                    \"company_type\": \"FinTech\",\n                    \"incorporation_locality\": \"GB\",\n                    \"phone\": \"08102478821\",\n                    \"email\": \"valentine.obi@xcelapp.com\",\n                    \"volume_expected\": \"1000\",\n                    \"value_expected\": \"GBP 10000000\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"_id\": \"6266912b38a9031dbfc57187\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                },\n                \"mailing_address\": {\n                    \"_id\": \"6266912b38a9031dbfc57188\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                }\n            },\n            \"_id\": \"6266912b38a9031dbfc57185\",\n            \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n            \"app_id\": \"625b1e47da0112472f2af519\",\n            \"__v\": 0,\n            \"user_key\": \"e6580005023ab15973fa6900d86738da17a35b20\"\n        },\n        \"access\": [\n            {\n                \"active\": false,\n                \"_id\": \"6266912c38a9031dbfc57189\",\n                \"name\": \"XCel Merchant ADMIN\",\n                \"identifier\": \"fikayo@gmail.com\",\n                \"pin\": \"a8d0b6f0939cfd883251f62b265f971ef8a5ab97eee32b91460f08b965601d93\",\n                \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n                \"access_level\": \"ALL\",\n                \"security_credential\": \"1425262717819\",\n                \"user_id\": \"6266912b38a9031dbfc57185\",\n                \"__v\": 0\n            }\n        ],\n        \"authorizers\": [\n            {\n                \"notification\": {\n                    \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n                    \"type\": \"firebase\"\n                },\n                \"uuid\": \"933886a0-c491-11ec-a9ba-3914369bd382\",\n                \"_id\": \"6266912e38a9031dbfc5718a\",\n                \"email_address\": \"fikayo@gmail.com\",\n                \"user_id\": \"6266912b38a9031dbfc57185\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Individual Customer",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"country_of_residence\": \"NG\",\n    \"user_info\": {\n        \"user_type\": \"INDIVIDUAL\",\n        \"person\": {\n            \"first_name\": \"Oluwafikayo\",\n            \"last_name\": \"Sanni\",\n            \"middle_name\": \"Tomiisin\",\n            \"marital_status\": false,\n            \"employment_status\": false,\n            \"dateOfBirth\": \"1995-09-07\",\n            \"phone\": \"08102478821\",\n            \"email\": \"fikayo@gmail.com\",\n            \"gender\": \"male\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"\",\n        \"identifier\": \"2348102478821\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"preferences\": {\n        \"secure_login\": true\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/customer",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "customer"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Individual Customer",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"user_info\": {\n        \"user_type\": \"INDIVIDUAL\",\n        \"person\": {\n            \"first_name\": \"Oluwafikayo\",\n            \"last_name\": \"Sanni\",\n            \"middle_name\": \"Tomiisin\",\n            \"marital_status\": false,\n            \"employment_status\": false,\n            \"dateOfBirth\": \"1995-09-07\",\n            \"phone\": \"08102478821\",\n            \"email\": \"fikayo@gmail.com\",\n            \"gender\": \"male\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"\",\n        \"identifier\": \"2348102478821\",\n        \"pin\": \"0011\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\",\n        \"security_credential\": \"1425262717819\"\n    }],\n    \"preferences\": {\n        \"secure_login\": true\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/customer",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "customer"
                                    ]
                                }
                            },
                            "status": "Multiple Choices",
                            "code": 300,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1713"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"6b1-5OnD3HfUj/c+0UrsoAtiX2GLukk\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 25 Apr 2022 12:17:14 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"customer\": {\n            \"updated\": \"2022-04-25T12:17:12.822Z\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"user_info\": {\n                \"user_type\": \"INDIVIDUAL\",\n                \"person\": {\n                    \"_id\": \"6266914838a9031dbfc5718c\",\n                    \"first_name\": \"Oluwafikayo\",\n                    \"last_name\": \"Sanni\",\n                    \"middle_name\": \"Tomiisin\",\n                    \"marital_status\": false,\n                    \"employment_status\": false,\n                    \"dateOfBirth\": \"1995-09-07\",\n                    \"phone\": \"08102478821\",\n                    \"email\": \"fikayo@gmail.com\",\n                    \"gender\": \"male\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"_id\": \"6266914838a9031dbfc5718d\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                },\n                \"mailing_address\": {\n                    \"_id\": \"6266914838a9031dbfc5718e\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                }\n            },\n            \"_id\": \"6266914838a9031dbfc5718b\",\n            \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n            \"app_id\": \"625b1e47da0112472f2af519\",\n            \"preferences\": {\n                \"require_authorizers\": false,\n                \"secure_login\": true,\n                \"allowExtraAccess\": false,\n                \"disabled\": false,\n                \"version_locked\": false,\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"_id\": \"6266914838a9031dbfc5718f\"\n            },\n            \"__v\": 0,\n            \"user_key\": \"1367ad8d6003442f59251a1f4a31aad29d2e2274\"\n        },\n        \"access\": [\n            {\n                \"active\": false,\n                \"_id\": \"6266914938a9031dbfc57190\",\n                \"name\": \"\",\n                \"identifier\": \"2348102478821\",\n                \"pin\": \"a8d0b6f0939cfd883251f62b265f971ef8a5ab97eee32b91460f08b965601d93\",\n                \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n                \"access_level\": \"ALL\",\n                \"security_credential\": \"1425262717819\",\n                \"user_id\": \"6266914838a9031dbfc5718b\",\n                \"__v\": 0\n            }\n        ],\n        \"authorizers\": []\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Create an Account",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"user_id\": \"6396bbeead79b2b831abf2b4\",\n    \"user_key\": \"2d31c68da4d5c4342c4d92230e25aaa599451b86d8e0411f85ca03d78a7e3c72\",\n    \"identifier\": \"2338102478831\",\n    \"type\": \"savings\",\n    \"currency_code\": \"GHS\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create an Account",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_id\": \"6266914838a9031dbfc5718b\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"user_key\": \"1367ad8d6003442f59251a1f4a31aad29d2e2274\",\n    \"identifier\": \"448102478891\",\n    \"type\": \"savings\",\n    \"currency_code\": \"GBP\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts"
                                    ]
                                }
                            },
                            "status": "Multiple Choices",
                            "code": 300,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "380"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"17c-G0pgtlfoeIP8kV9fspMkODIFsQ0\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Tue, 26 Apr 2022 16:22:45 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"created_at\": \"2022-04-26T16:22:44.948Z\",\n        \"international\": false,\n        \"banned\": false,\n        \"_id\": \"62681c54db76f62bdc1a73ce\",\n        \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n        \"country\": \"GB\",\n        \"user_id\": \"6266914838a9031dbfc5718b\",\n        \"identifier\": \"448102478891\",\n        \"currency\": \"GBP\",\n        \"account_type\": \"savings\",\n        \"__v\": 0,\n        \"user_key\": \"252774a8f3737970c1181188cc46b74198ef46da\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "User Login",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"app_key\": \"329a997159681809357cb3bb01b52f41b9a0bf95f7d13410d610c1bb21e319f1\",\n    \"public_key\": \"fb281e109fc13503fca6bb7b7ce8c6529c971ec3a25e96c2a22046f122e9be6a\",\n    \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n    \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n    \"access\": {\n        \"identifier\": \"9051766121\",\n        \"password\": \"1111111\",\n        \"secure_token\": \"9B12ECC0-4E53-4745-A5AA-9A05F835F477\",\n        \"token_expiry\": \"24h\"\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/user/login",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "user",
                                "login"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "User Login",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\",\n    \"access\": {\n        \"identifier\": \"2348102478821\",\n        \"password\": \"password\",\n        \"secure_token\": \"1425262717819\",\n        \"token_expiry\": \"24h\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/user/login",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "user",
                                        "login"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "2396"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"95c-Kum3XpAl/8PLLm6zsZAjSZ4Mc6k\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Thu, 28 Apr 2022 19:13:50 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmUiOmZhbHNlLCJfaWQiOiI2MjY2OTE0OTM4YTkwMzFkYmZjNTcxOTAiLCJuYW1lIjoiIiwiaWRlbnRpZmllciI6IjIzNDgxMDI0Nzg4MjEiLCJwaW4iOiJhOGQwYjZmMDkzOWNmZDg4MzI1MWY2MmIyNjVmOTcxZWY4YTVhYjk3ZWVlMzJiOTE0NjBmMDhiOTY1NjAxZDkzIiwicGFzc3dvcmQiOiI1ZTg4NDg5OGRhMjgwNDcxNTFkMGU1NmY4ZGM2MjkyNzczNjAzZDBkNmFhYmJkZDYyYTExZWY3MjFkMTU0MmQ4IiwiYWNjZXNzX2xldmVsIjoiQUxMIiwic2VjdXJpdHlfY3JlZGVudGlhbCI6IjE0MjUyNjI3MTc4MTkiLCJ1c2VyX2lkIjoiNjI2NjkxNDgzOGE5MDMxZGJmYzU3MThiIiwiX192IjowLCJpYXQiOjE2NTExNzMyMzAsImV4cCI6MTY1MTI1OTYzMH0.5TiDmwDkgeQN_ii-QdVI-AE2oV6XrPm5RuGlC3w0YNE\",\n        \"user\": {\n            \"updated\": \"2022-04-25T12:17:12.822Z\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"user_info\": {\n                \"user_type\": \"INDIVIDUAL\",\n                \"person\": {\n                    \"_id\": \"6266914838a9031dbfc5718c\",\n                    \"first_name\": \"Oluwafikayo\",\n                    \"last_name\": \"Sanni\",\n                    \"middle_name\": \"Tomiisin\",\n                    \"marital_status\": false,\n                    \"employment_status\": false,\n                    \"dateOfBirth\": \"1995-09-07\",\n                    \"phone\": \"08102478821\",\n                    \"email\": \"fikayo@gmail.com\",\n                    \"gender\": \"male\"\n                }\n            },\n            \"accounts_config\": {\n                \"railsbank_customer_id\": \"6266ca5f-1e1c-45e0-9fb9-f4861033a674\"\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"_id\": \"6266914838a9031dbfc5718d\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                },\n                \"mailing_address\": {\n                    \"_id\": \"6266914838a9031dbfc5718e\",\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                }\n            },\n            \"_id\": \"6266914838a9031dbfc5718b\",\n            \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n            \"app_id\": \"625b1e47da0112472f2af519\",\n            \"preferences\": {\n                \"require_authorizers\": false,\n                \"secure_login\": true,\n                \"allowExtraAccess\": false,\n                \"disabled\": false,\n                \"version_locked\": false,\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"_id\": \"6266914838a9031dbfc5718f\"\n            },\n            \"__v\": 0,\n            \"country_of_residence\": \"GB\",\n            \"user_key\": \"1367ad8d6003442f59251a1f4a31aad29d2e2274\"\n        },\n        \"access\": {\n            \"active\": false,\n            \"_id\": \"6266914938a9031dbfc57190\",\n            \"name\": \"\",\n            \"identifier\": \"2348102478821\",\n            \"pin\": \"a8d0b6f0939cfd883251f62b265f971ef8a5ab97eee32b91460f08b965601d93\",\n            \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n            \"access_level\": \"ALL\",\n            \"security_credential\": \"1425262717819\",\n            \"user_id\": \"6266914838a9031dbfc5718b\",\n            \"__v\": 0\n        }\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "User Login With Token",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"app_key\": \"329a997159681809357cb3bb01b52f41b9a0bf95f7d13410d610c1bb21e319f1\",\n    \"public_key\": \"fb281e109fc13503fca6bb7b7ce8c6529c971ec3a25e96c2a22046f122e9be6a\",\n    \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n    \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n    \"access\": {\n        \"identifier\": \"9051766121\",\n        \"OTP\": \"111111\"\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/user/login/withToken",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "user",
                                "login",
                                "withToken"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "User Login With Token",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"app_key\": \"329a997159681809357cb3bb01b52f41b9a0bf95f7d13410d610c1bb21e319f1\",\n    \"public_key\": \"fb281e109fc13503fca6bb7b7ce8c6529c971ec3a25e96c2a22046f122e9be6a\",\n    \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n    \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n    \"access\": {\n        \"identifier\": \"9051766121\",\n        \"OTP\": \"111111\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts/user/login/withToken",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        "user",
                                        "login",
                                        "withToken"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "3043"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"be3-X7a1V7lKfWqCprzXkOZb7WSFw0w\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Thu, 02 Feb 2023 06:01:40 GMT"
                                },
                                {
                                    "key": "Via",
                                    "value": "1.1 google"
                                },
                                {
                                    "key": "Alt-Svc",
                                    "value": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2EwMmEyNGU2YzdiYjM3ZDAyZTU2YjciLCJuYW1lIjoiZ2JvbGFoYW4ga3V0aSIsInVzZXJfaWQiOiI2M2EwMmEyNGU2YzdiYjM3ZDAyZTU2YjEiLCJpZGVudGlmaWVyIjoiOTA1MTc2NjEyMSIsInBpbiI6IjBmZmUxYWJkMWEwODIxNTM1M2MyMzNkNmUwMDk2MTNlOTVlZWM0MjUzODMyYTc2MWFmMjhmZjM3YWM1YTE1MGMiLCJwYXNzd29yZCI6IjI1NThhMzRkNGQyMDk2NGNhMWQyNzJhYjI2Y2NjZTk1MTFkODgwNTc5NTkzY2Q0YzllMDFhYjkxZWQwMGYzMjUiLCJhY2Nlc3NfbGV2ZWwiOiJBTEwiLCJzZWN1cml0eV9jcmVkZW50aWFsIjoiOUIxMkVDQzAtNEU1My00NzQ1LUE1QUEtOUEwNUY4MzVGNDc3IiwiYWN0aXZlIjpmYWxzZSwiX192IjowLCJpYXQiOjE2NzUzMTc3MDAsImV4cCI6MTY3NTMxODAwMH0.s0_p66-t1h4qxSTdCMUfmZRY5WCbyBa5sN9EXBamJZM\",\n        \"user\": {\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"user_info\": {\n                \"user_type\": \"INDIVIDUAL\",\n                \"person\": {\n                    \"first_name\": \"gbolahan\",\n                    \"middle_name\": \"\",\n                    \"last_name\": \"kuti\",\n                    \"marital_status\": false,\n                    \"employment_status\": false,\n                    \"dateOfBirth\": \"1998-01-01\",\n                    \"email\": \"gbolahan@gmail.com\",\n                    \"gender\": \"Male\",\n                    \"phone\": \"+2349051766121\",\n                    \"_id\": \"63a02a24e6c7bb37d02e56b2\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"gowon\",\n                    \"line2\": \"\",\n                    \"city\": \"lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"lagos\",\n                    \"post_code\": \"1002\",\n                    \"_id\": \"63a02a24e6c7bb37d02e56b3\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"gowon\",\n                    \"line2\": \"\",\n                    \"city\": \"lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"lagos\",\n                    \"post_code\": \"1002\",\n                    \"_id\": \"63a02a24e6c7bb37d02e56b4\"\n                }\n            },\n            \"_id\": \"63a02a24e6c7bb37d02e56b1\",\n            \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n            \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n            \"country_of_residence\": \"\",\n            \"preferences\": {\n                \"require_authorizers\": false,\n                \"secure_login\": true,\n                \"allowExtraAccess\": false,\n                \"disabled\": false,\n                \"version_locked\": false,\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"_id\": \"63a02a24e6c7bb37d02e56b5\"\n            },\n            \"updated\": \"2022-12-19T09:08:52.500Z\",\n            \"private_key\": \"c1f3b540-7f7c-11ed-b355-dbc479732561\",\n            \"__v\": 0,\n            \"user_key\": \"4452a4b6c1857b5033563938d2864f36bde6c2e014e0f861289718fc9ba9cffa\"\n        },\n        \"issuer\": {\n            \"permissions\": {\n                \"international_transfers\": false,\n                \"local_intra_transfers\": false,\n                \"local_inter_transfers\": false,\n                \"local_bill_payments\": false,\n                \"local_airtime_data\": false,\n                \"local_loan_services\": false,\n                \"pos_transactions\": false,\n                \"account_creation\": true,\n                \"pots\": false,\n                \"custom_fees\": false,\n                \"custom_limits\": false\n            },\n            \"_id\": \"63928ad67bc2ade0d0593a22\",\n            \"company_name\": \"XCel Payment Incorporated\",\n            \"description\": \"Make Payments anywhere you go\",\n            \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n            \"is_active\": false,\n            \"master_issuer\": false,\n            \"created\": \"2022-12-09T01:09:42.204Z\",\n            \"private_key\": \"294f2fc0-775e-11ed-9fbb-2fabc45b29e3\",\n            \"__v\": 0,\n            \"bank_route_code\": \"0001\"\n        },\n        \"access\": {\n            \"_id\": \"63a02a24e6c7bb37d02e56b7\",\n            \"name\": \"gbolahan kuti\",\n            \"user_id\": \"63a02a24e6c7bb37d02e56b1\",\n            \"identifier\": \"9051766121\",\n            \"pin\": \"0ffe1abd1a08215353c233d6e009613e95eec4253832a761af28ff37ac5a150c\",\n            \"password\": \"2558a34d4d20964ca1d272ab26ccce9511d880579593cd4c9e01ab91ed00f325\",\n            \"access_level\": \"ALL\",\n            \"security_credential\": \"9B12ECC0-4E53-4745-A5AA-9A05F835F477\",\n            \"active\": false,\n            \"__v\": 0\n        }\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Create Issuer Admin Accounts",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_id\": \"63c79eb1ad88116ecd54d4dd\",\n    \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n    \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n    \"user_key\": \"9171fccd61932c5042bf29c0ce2669dccaeadd2c\",\n    \"public_key\": \"fb281e109fc13503fca6bb7b7ce8c6529c971ec3a25e96c2a22046f122e9be6a\",\n    \"app_key\": \"fb281e109fc13503fca6bb7b7ce8c6529c971ec3a25e96c2a22046f122e9be6a\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/issuer/accounts/:type",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "issuer",
                                "accounts",
                                ":type"
                            ],
                            "variable": [
                                {
                                    "key": "type",
                                    "value": "debit_settlement",
                                    "description": "fees, debit_settlement, credit_settlement"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Issuer Admin Accounts",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVhYjhjZWZjNjAzOTM2M2EzMjFlM2UiLCJjcmVhdGVkIjoiMjAyMi0wNC0xNlQxMjozODozOC4yMDBaIiwicGVybWlzc2lvbnMiOnsiaW50ZXJuYXRpb25hbF90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRyYV90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRlcl90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9iaWxsX3BheW1lbnRzIjpmYWxzZSwibG9jYWxfYWlydGltZV9kYXRhIjpmYWxzZSwibG9jYWxfbG9hbl9zZXJ2aWNlcyI6ZmFsc2UsInBvc190cmFuc2FjdGlvbnMiOmZhbHNlLCJhY2NvdW50X2NyZWF0aW9uIjp0cnVlLCJwb3RzIjpmYWxzZSwiY3VzdG9tX2ZlZXMiOmZhbHNlfSwiaXNfYWN0aXZlIjpmYWxzZSwibWFzdGVyX2lzc3VlciI6ZmFsc2UsImNvbXBhbnlfbmFtZSI6IlhDZWwgSU5DIiwiZGVzY3JpcHRpb24iOiJNYWtlIFBheW1lbnRzIGFueXdoZXJlIHlvdSBnbyIsImxvZ28iOiJodHRwczovL2FkbWluLnhjZWxhcHAuY29tL2Fzc2V0cy9pbWFnZXMvbWFpbmxvZ28ucG5nIiwiX192IjowLCJwdWJsaWNfa2V5IjoiNDA5MDZmZmNiMTllNzZjNTMzMDVjZjUyOWMzMDIzN2IyMDBiYTcxYyIsImlhdCI6MTY1MTI0OTEwNn0.tKv-LYYpKlzHu4F0ronoVK4jRwmQWMKHjmLPfDf7Qlg",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_id\": \"626690c438a9031dbfc5717f\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"app_id\": \"625b1e47da0112472f2af519\",\n    \"user_key\": \"ff395644251d1d033d5bc13a4a99070e000f5d99\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"app_key\": \"9b4ff6eb96f08deb822a9a4d2e6bbc63225f1833\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/issuer/accounts/:type",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "issuer",
                                        "accounts",
                                        ":type"
                                    ],
                                    "variable": [
                                        {
                                            "key": "type",
                                            "value": "settlement",
                                            "description": "set as \"settlement\" or \"fees\""
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "3053"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"bed-01KkjEYMRZ9N1FXzhnVG9CDeG5Y\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 30 Apr 2022 11:34:01 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"created_at\": \"2022-04-30T11:33:31.443Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1e8b988e5f3efea2285e\",\n            \"account_id\": \"2340040000001248\",\n            \"country\": \"NG\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"234999999654170\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"NGN\",\n            \"__v\": 0,\n            \"user_key\": \"d4b8c81df66a483cf7f38a83a4f678f90f9cad85\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:34.808Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1e8e988e5f3efea22864\",\n            \"account_id\": \"0010040000001249\",\n            \"country\": \"NG\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"1999999671086\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"USD\",\n            \"__v\": 0,\n            \"user_key\": \"a5dfb87e34c08dd407f0e038a64e3d1e0efef590\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:38.576Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1e92988e5f3efea2286a\",\n            \"account_id\": \"2330040000001250\",\n            \"country\": \"NG\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"233999999806180\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"GHS\",\n            \"__v\": 0,\n            \"user_key\": \"9b869d0f94116f52de951ac6c25a7c2db979d1f1\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:41.898Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1e95988e5f3efea22870\",\n            \"account_id\": \"0440040000001251\",\n            \"country\": \"NG\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"44999999417741\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"GBP\",\n            \"__v\": 0,\n            \"user_key\": \"197beb3dee3a4478dee8b79dc0f0cb385b695a3d\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:46.016Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1e9a988e5f3efea22876\",\n            \"account_id\": \"2340040000001252\",\n            \"country\": \"GB\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"234999999849991\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"NGN\",\n            \"__v\": 0,\n            \"user_key\": \"372cf528ad0c42292bad5843d7ccf89c303afc0f\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:49.776Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1e9d988e5f3efea2287c\",\n            \"account_id\": \"0010040000001253\",\n            \"country\": \"GB\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"1999999593989\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"USD\",\n            \"__v\": 0,\n            \"user_key\": \"775eb52f38807960f12d6f1dd362c01d2ab4706e\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:53.211Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1ea1988e5f3efea22882\",\n            \"account_id\": \"2330040000001254\",\n            \"country\": \"GB\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"233999999628099\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"GHS\",\n            \"__v\": 0,\n            \"user_key\": \"0e08d65005d66728dbda099498e427156f289375\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:33:57.819Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1ea5988e5f3efea22888\",\n            \"account_id\": \"626d1ea5-4ff4-4ab3-ba87-ba8f314e1cfa\",\n            \"country\": \"GB\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"44999999467715\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"GBP\",\n            \"__v\": 0,\n            \"user_key\": \"ea68053bc6bdcdcb5ceee0786e24ccc94bd5b169\"\n        },\n        {\n            \"created_at\": \"2022-04-30T11:34:01.451Z\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"626d1ea9988e5f3efea2288e\",\n            \"account_id\": \"0330040000001255\",\n            \"country\": \"GB\",\n            \"user_id\": \"626690c438a9031dbfc5717f\",\n            \"identifier\": \"33999999723843\",\n            \"account_type\": \"settlement\",\n            \"currency\": \"EUR\",\n            \"__v\": 0,\n            \"user_key\": \"d7be8c9062041df010ef110245261edaceedd5a3\"\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch User Accounts",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/user/:user_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "user",
                                ":user_id"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": "6266914838a9031dbfc5718b"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch User Accounts",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmUiOmZhbHNlLCJfaWQiOiI2MjY2OTE0OTM4YTkwMzFkYmZjNTcxOTAiLCJuYW1lIjoiIiwiaWRlbnRpZmllciI6IjIzNDgxMDI0Nzg4MjEiLCJwaW4iOiJhOGQwYjZmMDkzOWNmZDg4MzI1MWY2MmIyNjVmOTcxZWY4YTVhYjk3ZWVlMzJiOTE0NjBmMDhiOTY1NjAxZDkzIiwicGFzc3dvcmQiOiI1ZTg4NDg5OGRhMjgwNDcxNTFkMGU1NmY4ZGM2MjkyNzczNjAzZDBkNmFhYmJkZDYyYTExZWY3MjFkMTU0MmQ4IiwiYWNjZXNzX2xldmVsIjoiQUxMIiwic2VjdXJpdHlfY3JlZGVudGlhbCI6IjE0MjUyNjI3MTc4MTkiLCJ1c2VyX2lkIjoiNjI2NjkxNDgzOGE5MDMxZGJmYzU3MThiIiwiX192IjowLCJpYXQiOjE2NTExNzMyMzAsImV4cCI6MTY1MTI1OTYzMH0.5TiDmwDkgeQN_ii-QdVI-AE2oV6XrPm5RuGlC3w0YNE",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/user/6266914838a9031dbfc5718b",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        "user",
                                        "6266914838a9031dbfc5718b"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "2638"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"a4e-uMUm6ZazarClMcLvAvZbm6jUP50\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Thu, 28 Apr 2022 20:45:26 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"account\": {\n                \"created_at\": \"2022-04-26T16:22:44.948Z\",\n                \"international\": false,\n                \"banned\": false,\n                \"_id\": \"62681c54db76f62bdc1a73ce\",\n                \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n                \"country\": \"GB\",\n                \"user_id\": \"6266914838a9031dbfc5718b\",\n                \"identifier\": \"448102478891\",\n                \"currency\": \"GBP\",\n                \"account_type\": \"savings\",\n                \"__v\": 0,\n                \"account_key\": \"252774a8f3737970c1181188cc46b74198ef46da\"\n            },\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyMi0wNC0yNlQxNjoyMjo0NC45NDhaIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsIl9pZCI6IjYyNjgxYzU0ZGI3NmY2MmJkYzFhNzNjZSIsImFjY291bnRfaWQiOiI2MjY4MWM1NC00YWQxLTRmNDgtODJlNi1hMzA4MDRkMzYxMjYiLCJjb3VudHJ5IjoiR0IiLCJ1c2VyX2lkIjoiNjI2NjkxNDgzOGE5MDMxZGJmYzU3MThiIiwiaWRlbnRpZmllciI6IjQ0ODEwMjQ3ODg5MSIsImN1cnJlbmN5IjoiR0JQIiwiYWNjb3VudF90eXBlIjoic2F2aW5ncyIsIl9fdiI6MCwiaWF0IjoxNjUxMTc4NzI0LCJleHAiOjE2NTEyNjE1MjR9.Bsklui7jrIaHbVGnJcC0jAIHvp3zAztPzaHtrDDOwKg\"\n        },\n        {\n            \"account\": {\n                \"created_at\": \"2022-04-26T16:24:43.237Z\",\n                \"international\": false,\n                \"banned\": false,\n                \"_id\": \"62681ccbdb76f62bdc1a73e8\",\n                \"account_id\": \"2340040000001170\",\n                \"country\": \"GB\",\n                \"user_id\": \"6266914838a9031dbfc5718b\",\n                \"identifier\": \"2348107478821\",\n                \"currency\": \"NGN\",\n                \"account_type\": \"savings\",\n                \"__v\": 0,\n                \"account_key\": \"a683bbe71cf7648ba1475507339549c9c0202fc6\"\n            },\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyMi0wNC0yNlQxNjoyNDo0My4yMzdaIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsIl9pZCI6IjYyNjgxY2NiZGI3NmY2MmJkYzFhNzNlOCIsImFjY291bnRfaWQiOiIyMzQwMDQwMDAwMDAxMTcwIiwiY291bnRyeSI6IkdCIiwidXNlcl9pZCI6IjYyNjY5MTQ4MzhhOTAzMWRiZmM1NzE4YiIsImlkZW50aWZpZXIiOiIyMzQ4MTA3NDc4ODIxIiwiY3VycmVuY3kiOiJOR04iLCJhY2NvdW50X3R5cGUiOiJzYXZpbmdzIiwiX192IjowLCJpYXQiOjE2NTExNzg3MjUsImV4cCI6MTY1MTI2MTUyNX0.ATJYnTkh3InkKPi3U40V3X3lqtW-jkzYfbwyqx2fUFk\"\n        },\n        {\n            \"account\": {\n                \"created_at\": \"2022-04-26T16:27:10.960Z\",\n                \"international\": false,\n                \"banned\": false,\n                \"_id\": \"62681d5ee55b842c111c8811\",\n                \"account_id\": \"0010040000001171\",\n                \"country\": \"GB\",\n                \"user_id\": \"6266914838a9031dbfc5718b\",\n                \"identifier\": \"18107478821\",\n                \"currency\": \"USD\",\n                \"account_type\": \"savings\",\n                \"__v\": 0,\n                \"account_key\": \"9e9781fb7fab5caa0caa5c2a494ad645d0aa3400\"\n            },\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkX2F0IjoiMjAyMi0wNC0yNlQxNjoyNzoxMC45NjBaIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsIl9pZCI6IjYyNjgxZDVlZTU1Yjg0MmMxMTFjODgxMSIsImFjY291bnRfaWQiOiIwMDEwMDQwMDAwMDAxMTcxIiwiY291bnRyeSI6IkdCIiwidXNlcl9pZCI6IjYyNjY5MTQ4MzhhOTAzMWRiZmM1NzE4YiIsImlkZW50aWZpZXIiOiIxODEwNzQ3ODgyMSIsImN1cnJlbmN5IjoiVVNEIiwiYWNjb3VudF90eXBlIjoic2F2aW5ncyIsIl9fdiI6MCwiaWF0IjoxNjUxMTc4NzI2LCJleHAiOjE2NTEyNjE1MjZ9.x9EHn-mTOco7RO7F5_T0yGBjwDafiw_wFc6Lpq1LROg\"\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Account Balance",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/:user_id/balance/:country_code/:account_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                ":user_id",
                                "balance",
                                ":country_code",
                                ":account_id"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": "626690c438a9031dbfc5717f"
                                },
                                {
                                    "key": "country_code",
                                    "value": "GB"
                                },
                                {
                                    "key": "account_id",
                                    "value": "2330040000001254"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Account Balance",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3RpdmUiOmZhbHNlLCJfaWQiOiI2MjY2OTBjNTM4YTkwMzFkYmZjNTcxODQiLCJuYW1lIjoiWENlbCBBRE1JTiIsImlkZW50aWZpZXIiOiJhZG1pbkB4Y2VsYXBwLmNvbSIsInBpbiI6ImE4ZDBiNmYwOTM5Y2ZkODgzMjUxZjYyYjI2NWY5NzFlZjhhNWFiOTdlZWUzMmI5MTQ2MGYwOGI5NjU2MDFkOTMiLCJwYXNzd29yZCI6IjVlODg0ODk4ZGEyODA0NzE1MWQwZTU2ZjhkYzYyOTI3NzM2MDNkMGQ2YWFiYmRkNjJhMTFlZjcyMWQxNTQyZDgiLCJhY2Nlc3NfbGV2ZWwiOiJBTEwiLCJzZWN1cml0eV9jcmVkZW50aWFsIjoiMTQyNTI2MjcxNzgxOSIsInVzZXJfaWQiOiI2MjY2OTBjNDM4YTkwMzFkYmZjNTcxN2YiLCJfX3YiOjAsImlhdCI6MTY1MTU2Nzk1OCwiZXhwIjoxNjUxNjU0MzU4fQ.mq0vugCLMLp6BQUq_0VAjDxAUT-VDWJ-irRc7VpFrEE",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v2/accounts/:user_id/balance/:country_code/:account_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "accounts",
                                        ":user_id",
                                        "balance",
                                        ":country_code",
                                        ":account_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "626690c438a9031dbfc5717f"
                                        },
                                        {
                                            "key": "country_code",
                                            "value": "GB"
                                        },
                                        {
                                            "key": "account_id",
                                            "value": "2330040000001254"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "88"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"58-01ut5OU3KeCeF+Fgxp8SzVNIFe0\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Tue, 03 May 2022 09:45:25 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"currentBalance\": 0,\n        \"ledgerBalance\": 0,\n        \"currency\": \"GHS\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Setup Data",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{app_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/setup-data",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "setup-data"
                            ]
                        },
                        "description": "Data For Fetching Varoius Defaults Data For Setting things up"
                    },
                    "response": [
                        {
                            "name": "Fetch Setup Data",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{app_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts/setup-data",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        "setup-data"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "6380"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"18ec-R0oMsrVlCtBFqFLkbX/lKRmI68A\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 19 Dec 2022 13:11:24 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"transaction_types\": [\n            {\n                \"_id\": \"60888814277f5f0018d5ec36\",\n                \"type\": \"payment processing\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"6088887a277f5f0018d5ec37\",\n                \"type\": \"salary processing\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60888896277f5f0018d5ec38\",\n                \"type\": \"church funding\",\n                \"__v\": 0\n            }\n        ],\n        \"business_types\": [\n            {\n                \"_id\": \"60888a21277f5f0018d5ec39\",\n                \"type\": \"Financial Institution\",\n                \"__v\": 0\n            }\n        ],\n        \"countries\": [\n            {\n                \"_id\": \"6088280d4b1d2500185a6d07\",\n                \"name\": \"Nigeria\",\n                \"alpha2Code\": \"NG\",\n                \"alpha3Code\": \"NGA\",\n                \"callingCode\": \"234\",\n                \"capital\": \"Abuja\",\n                \"latitude\": \"10.0\",\n                \"longitude\": \"8.0\",\n                \"currencyCode\": \"NGN\",\n                \"currencyName\": \"Nigerian naira\",\n                \"currencySymbol\": \"₦\",\n                \"flag\": \"https://restcountries.eu/data/nga.svg\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"6088519a277f5f0018d5ec23\",\n                \"name\": \"United Kingdom\",\n                \"alpha2Code\": \"GB\",\n                \"alpha3Code\": \"GBR\",\n                \"callingCode\": \"044\",\n                \"capital\": \"London\",\n                \"latitude\": \"54.0\",\n                \"longitude\": \"-2.0\",\n                \"currencyCode\": \"GBP\",\n                \"currencyName\": \"British pound\",\n                \"currencySymbol\": \"£\",\n                \"flag\": \"https://restcountries.eu/data/gbr.svg\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608851d5277f5f0018d5ec24\",\n                \"name\": \"United States of America\",\n                \"alpha2Code\": \"US\",\n                \"alpha3Code\": \"USA\",\n                \"callingCode\": \"001\",\n                \"capital\": \"Washington, D.C.\",\n                \"latitude\": \"38.0\",\n                \"longitude\": \"-97.0\",\n                \"currencyCode\": \"USD\",\n                \"currencyName\": \"United States dollar\",\n                \"currencySymbol\": \"$\",\n                \"flag\": \"https://restcountries.eu/data/usa.svg\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608851ed277f5f0018d5ec25\",\n                \"name\": \"Ghana\",\n                \"alpha2Code\": \"GH\",\n                \"alpha3Code\": \"GHA\",\n                \"callingCode\": \"233\",\n                \"capital\": \"Accra\",\n                \"latitude\": \"8.0\",\n                \"longitude\": \"-2.0\",\n                \"currencyCode\": \"GHS\",\n                \"currencyName\": \"Ghanaian cedi\",\n                \"currencySymbol\": \"₵\",\n                \"flag\": \"https://restcountries.eu/data/gha.svg\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885220277f5f0018d5ec26\",\n                \"flag\": \"https://restcountries.eu/data/zaf.svg\",\n                \"name\": \"South Africa\",\n                \"alpha2Code\": \"ZA\",\n                \"alpha3Code\": \"ZAF\",\n                \"callingCode\": \"027\",\n                \"capital\": \"Pretoria\",\n                \"latitude\": \"-29.0\",\n                \"longitude\": \"24.0\",\n                \"currencyCode\": \"ZAR\",\n                \"currencyName\": \"South African rand\",\n                \"currencySymbol\": \"R\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885258277f5f0018d5ec27\",\n                \"flag\": \"https://restcountries.eu/data/sen.svg\",\n                \"name\": \"Senegal\",\n                \"alpha2Code\": \"SN\",\n                \"alpha3Code\": \"SEN\",\n                \"callingCode\": \"221\",\n                \"capital\": \"Dakar\",\n                \"latitude\": \"14.0\",\n                \"longitude\": \"-14.0\",\n                \"currencyCode\": \"XOF\",\n                \"currencyName\": \"West African CFA franc\",\n                \"currencySymbol\": \"CFA\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885281277f5f0018d5ec28\",\n                \"flag\": \"https://restcountries.eu/data/cmr.svg\",\n                \"name\": \"Cameroon\",\n                \"alpha2Code\": \"CM\",\n                \"alpha3Code\": \"CMR\",\n                \"callingCode\": \"237\",\n                \"capital\": \"Yaoundé\",\n                \"latitude\": \"6.0\",\n                \"longitude\": \"12.0\",\n                \"currencyCode\": \"XAF\",\n                \"currencyName\": \"Central African CFA franc\",\n                \"currencySymbol\": \"XAF\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608852a3277f5f0018d5ec29\",\n                \"flag\": \"https://restcountries.eu/data/civ.svg\",\n                \"name\": \"Côte d'Ivoire\",\n                \"alpha2Code\": \"CI\",\n                \"alpha3Code\": \"CIV\",\n                \"callingCode\": \"225\",\n                \"capital\": \"Yamoussoukro\",\n                \"latitude\": \"8.0\",\n                \"longitude\": \"-5.0\",\n                \"currencyCode\": \"XOF\",\n                \"currencyName\": \"West African CFA franc\",\n                \"currencySymbol\": \"CFA\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608852b7277f5f0018d5ec2a\",\n                \"flag\": \"https://restcountries.eu/data/cod.svg\",\n                \"name\": \"Democratic Republic of Congo\",\n                \"alpha2Code\": \"CD\",\n                \"alpha3Code\": \"COD\",\n                \"callingCode\": \"243\",\n                \"capital\": \"Kinshasa\",\n                \"latitude\": \"0.0\",\n                \"longitude\": \"25.0\",\n                \"currencyCode\": \"CDF\",\n                \"currencyName\": \"Congolese franc\",\n                \"currencySymbol\": \"Fr\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608852c7277f5f0018d5ec2b\",\n                \"flag\": \"https://restcountries.eu/data/eth.svg\",\n                \"name\": \"Ethiopia\",\n                \"alpha2Code\": \"ET\",\n                \"alpha3Code\": \"ETH\",\n                \"callingCode\": \"251\",\n                \"capital\": \"Addis Ababa\",\n                \"latitude\": \"8.0\",\n                \"longitude\": \"38.0\",\n                \"currencyCode\": \"ETB\",\n                \"currencyName\": \"Ethiopian birr\",\n                \"currencySymbol\": \"Br\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608852df277f5f0018d5ec2c\",\n                \"flag\": \"https://restcountries.eu/data/ken.svg\",\n                \"name\": \"Kenya\",\n                \"alpha2Code\": \"KE\",\n                \"alpha3Code\": \"KEN\",\n                \"callingCode\": \"254\",\n                \"capital\": \"Nairobi\",\n                \"latitude\": \"1.0\",\n                \"longitude\": \"38.0\",\n                \"currencyCode\": \"KES\",\n                \"currencyName\": \"Kenyan shilling\",\n                \"currencySymbol\": \"Sh\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608852f2277f5f0018d5ec2d\",\n                \"flag\": \"https://restcountries.eu/data/zmb.svg\",\n                \"name\": \"Zambia\",\n                \"alpha2Code\": \"ZM\",\n                \"alpha3Code\": \"ZMB\",\n                \"callingCode\": \"260\",\n                \"capital\": \"Lusaka\",\n                \"latitude\": \"-15.0\",\n                \"longitude\": \"30.0\",\n                \"currencyCode\": \"ZMW\",\n                \"currencyName\": \"Zambian kwacha\",\n                \"currencySymbol\": \"ZK\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885361277f5f0018d5ec2e\",\n                \"flag\": \"https://restcountries.eu/data/fra.svg\",\n                \"name\": \"France\",\n                \"alpha2Code\": \"FR\",\n                \"alpha3Code\": \"FRA\",\n                \"callingCode\": \"33\",\n                \"capital\": \"Paris\",\n                \"latitude\": \"46.0\",\n                \"longitude\": \"2.0\",\n                \"currencyCode\": \"EUR\",\n                \"currencyName\": \"Euro\",\n                \"currencySymbol\": \"€\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885375277f5f0018d5ec2f\",\n                \"flag\": \"https://restcountries.eu/data/deu.svg\",\n                \"name\": \"Germany\",\n                \"alpha2Code\": \"DE\",\n                \"alpha3Code\": \"DEU\",\n                \"callingCode\": \"49\",\n                \"capital\": \"Berlin\",\n                \"latitude\": \"51.0\",\n                \"longitude\": \"9.0\",\n                \"currencyCode\": \"EUR\",\n                \"currencyName\": \"Euro\",\n                \"currencySymbol\": \"€\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885384277f5f0018d5ec30\",\n                \"flag\": \"https://restcountries.eu/data/esp.svg\",\n                \"name\": \"Spain\",\n                \"alpha2Code\": \"ES\",\n                \"alpha3Code\": \"ESP\",\n                \"callingCode\": \"34\",\n                \"capital\": \"Madrid\",\n                \"latitude\": \"40.0\",\n                \"longitude\": \"-4.0\",\n                \"currencyCode\": \"EUR\",\n                \"currencyName\": \"Euro\",\n                \"currencySymbol\": \"€\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60885395277f5f0018d5ec31\",\n                \"flag\": \"https://restcountries.eu/data/chn.svg\",\n                \"name\": \"China\",\n                \"alpha2Code\": \"CN\",\n                \"alpha3Code\": \"CHN\",\n                \"callingCode\": \"86\",\n                \"capital\": \"Beijing\",\n                \"latitude\": \"35.0\",\n                \"longitude\": \"105.0\",\n                \"currencyCode\": \"CNY\",\n                \"currencyName\": \"Chinese yuan\",\n                \"currencySymbol\": \"¥\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608853c5277f5f0018d5ec32\",\n                \"flag\": \"https://restcountries.eu/data/ind.svg\",\n                \"name\": \"India\",\n                \"alpha2Code\": \"IN\",\n                \"alpha3Code\": \"IND\",\n                \"callingCode\": \"91\",\n                \"capital\": \"New Delhi\",\n                \"latitude\": \"20.0\",\n                \"longitude\": \"77.0\",\n                \"currencyCode\": \"INR\",\n                \"currencyName\": \"Indian rupee\",\n                \"currencySymbol\": \"₹\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"608853d7277f5f0018d5ec33\",\n                \"flag\": \"https://restcountries.eu/data/are.svg\",\n                \"name\": \"United Arab Emirates\",\n                \"alpha2Code\": \"AE\",\n                \"alpha3Code\": \"ARE\",\n                \"callingCode\": \"971\",\n                \"capital\": \"Abu Dhabi\",\n                \"latitude\": \"24.0\",\n                \"longitude\": \"54.0\",\n                \"currencyCode\": \"AED\",\n                \"currencyName\": \"United Arab Emirates dirham\",\n                \"currencySymbol\": \"د.إ\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"6088542a277f5f0018d5ec34\",\n                \"flag\": \"https://restcountries.eu/data/lbr.svg\",\n                \"name\": \"Liberia\",\n                \"alpha2Code\": \"LR\",\n                \"alpha3Code\": \"LBR\",\n                \"callingCode\": \"231\",\n                \"capital\": \"Monrovia\",\n                \"latitude\": \"6.5\",\n                \"longitude\": \"-9.5\",\n                \"currencyCode\": \"LRD\",\n                \"currencyName\": \"Liberian dollar\",\n                \"currencySymbol\": \"$\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"625fcad63c37dcbdc56f3dc9\",\n                \"flag\": \"https://restcountries.eu/data/cog.svg\",\n                \"name\": \"Congo Brazaville\",\n                \"alpha2Code\": \"CG\",\n                \"alpha3Code\": \"COG\",\n                \"callingCode\": \"242\",\n                \"capital\": \"Brazaville\",\n                \"latitude\": \"6.5\",\n                \"longitude\": \"-9.5\",\n                \"currencyCode\": \"XAF\",\n                \"currencyName\": \"XAF\",\n                \"currencySymbol\": \"F\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Create Branch",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n    \"name\": \"California Branch\",\n    \"branch_code\": \"0075\",\n    \"address\": {\n        \"line1\": \"26 Oluwole Oladejo Street\",\n        \"line2\": \"Ojodu Berger\",\n        \"city\": \"Lagos\",\n        \"country\": \"Nigeria\",\n        \"state\": \"Lagos\",\n        \"post_code\": \"100216\"\n    }\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/branch",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "branch"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Branch",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n    \"name\": \"California Branch\",\n    \"branch_code\": \"0075\",\n    \"address\": {\n        \"line1\": \"26 Oluwole Oladejo Street\",\n        \"line2\": \"Ojodu Berger\",\n        \"city\": \"Lagos\",\n        \"country\": \"Nigeria\",\n        \"state\": \"Lagos\",\n        \"post_code\": \"100216\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts/branch",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        "branch"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "376"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"178-z0v5IpF6BCKlUW4mTaAH4aabJr0\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 07:56:22 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"user_id\": \"6396cfaeae5fd92994bab11e\",\n        \"name\": \"California Branch\",\n        \"branch_code\": \"0075\",\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\",\n            \"_id\": \"63998198e688ccd6b9d78da0\"\n        },\n        \"_id\": \"63998198e688ccd6b9d78d9f\",\n        \"created_at\": \"2022-12-14T07:56:08.190Z\",\n        \"__v\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Branches",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/accounts/:user_id/branches",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                ":user_id",
                                "branches"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": "6396cfaeae5fd92994bab11e"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Branches",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts/:user_id/branches",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        ":user_id",
                                        "branches"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "6396cfaeae5fd92994bab11e"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "378"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"17a-a5xz7/rkpvBiTVaLhaFrHddnCiM\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 07:58:07 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"63998198e688ccd6b9d78d9f\",\n            \"user_id\": \"6396cfaeae5fd92994bab11e\",\n            \"name\": \"California Branch\",\n            \"branch_code\": \"0075\",\n            \"address\": {\n                \"line1\": \"26 Oluwole Oladejo Street\",\n                \"line2\": \"Ojodu Berger\",\n                \"city\": \"Lagos\",\n                \"country\": \"Nigeria\",\n                \"state\": \"Lagos\",\n                \"post_code\": \"100216\",\n                \"_id\": \"63998198e688ccd6b9d78da0\"\n            },\n            \"created_at\": \"2022-12-14T07:56:08.190Z\",\n            \"__v\": 0\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch A Country's Banks",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{base_url}}/v1/accounts//banks/:country_code",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "accounts",
                                "",
                                "banks",
                                ":country_code"
                            ],
                            "variable": [
                                {
                                    "key": "country_code",
                                    "value": "NG"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Country's Banks",
                            "originalRequest": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/accounts//banks/:country_code",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "accounts",
                                        "",
                                        "banks",
                                        ":country_code"
                                    ],
                                    "variable": [
                                        {
                                            "key": "country_code",
                                            "value": "NG"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "6105"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"17d9-8wbfUgGa9eLuTugWRa+bIHqObWA\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 18 Jan 2023 06:44:40 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"5d3828f8eef5015d48275497\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"kyLE8CuoB\",\n            \"bank_name\": \"XCel\",\n            \"bank_code\": \"0001\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"country_code\": \"234\",\n            \"org_no\": \"000004\",\n            \"__v\": 0,\n            \"type\": \"internal\"\n        },\n        {\n            \"_id\": \"5d3828f8eef5015d48275498\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"kyLE8CuoB\",\n            \"bank_name\": \"United Bank of Africa\",\n            \"bank_code\": \"033\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"country_code\": \"234\",\n            \"org_no\": \"000004\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1dbc51871600042f81b2\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"pJT8ysDsnW\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"044\",\n            \"bank_name\": \"ACCESS BANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000014\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1dd351871600042f81b3\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"YQJFuCMZI_\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"755\",\n            \"bank_name\": \"ABMFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1dec51871600042f81b4\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"wA-B4khIjt\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"735\",\n            \"bank_name\": \"PARALLEX MF\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090004\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1ecf51871600042f81b5\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"ZPuFqmghNX\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"301\",\n            \"bank_name\": \"PARALLEX MFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090004\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a220a51871600042f81b6\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"3FWdLuS9NR\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"082\",\n            \"bank_name\": \"KEYSTONE\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000002\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a223951871600042f81b7\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"MKq58s3wsV\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"733\",\n            \"bank_name\": \"CMFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090130\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a225051871600042f81b8\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"5pywmyoxHy\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"050\",\n            \"bank_name\": \"ECOBANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000010\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a228751871600042f81b9\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"kLmSlOUQbT\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"214\",\n            \"bank_name\": \"FCMB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000003\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a22a651871600042f81ba\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"vJGDJw3APa\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"070\",\n            \"bank_name\": \"FIDELITY\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000007\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a232951871600042f81bb\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"us2R-VLMVN\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"011\",\n            \"bank_name\": \"FIRST BANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000016\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a234851871600042f81bc\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"0TBJoKloeX\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"058\",\n            \"bank_name\": \"GTBANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000013\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a236e51871600042f81bd\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"4T9LNjgYUW\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"039\",\n            \"bank_name\": \"STANBIC IBTC\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000012\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a238751871600042f81be\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"XJ2lOOUXfQ\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"084\",\n            \"bank_name\": \"ENTERPRISE\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000019\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23a051871600042f81bf\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"GICJyXGY5m\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"232\",\n            \"bank_name\": \"Sterling\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000001\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23b951871600042f81c0\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"0pUnBuvXjP\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"076\",\n            \"bank_name\": \"POLARIS BANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000008\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23d151871600042f81c1\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"xEkn9Rrn-Vu\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"032\",\n            \"bank_name\": \"Union Bank\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000018\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23e951871600042f81c2\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"y1ECduy7NRn\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"215\",\n            \"bank_name\": \"Unity\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000011\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a241151871600042f81c3\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"pKuVh-RD-hE\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"035\",\n            \"bank_name\": \"Wema\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000017\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a242851871600042f81c4\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"WqMdbD1BZ5q\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"057\",\n            \"bank_name\": \"Zenith\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000015\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a243a51871600042f81c5\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"7B5TSkGkGPX\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"063\",\n            \"bank_name\": \"DIAMOND\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000005\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a245151871600042f81c6\",\n            \"created\": \"2020-07-08T09:27:01.760Z\",\n            \"id\": \"iOgStm8BgE4\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"030\",\n            \"bank_name\": \"HERITAGE\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000020\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a246c51871600042f81c7\",\n            \"created\": \"2020-07-08T09:27:01.760Z\",\n            \"id\": \"CiifdAsDo3G\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"700\",\n            \"bank_name\": \"ACCION MFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090134\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Validate Account",
                    "protocolProfileBehavior": {
                        "disableBodyPruning": true
                    },
                    "request": {
                        "auth": {
                            "type": "bearer",
                            "bearer": [
                                {
                                    "key": "token",
                                    "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I4MDQ2Njc2ZjA2NTZhODc1NjA4ZWUiLCJuYW1lIjoiZ2JvbGFoYW4gamtkaiIsInVzZXJfaWQiOiI2M2I4MDQ2Njc2ZjA2NTZhODc1NjA4ZTgiLCJpZGVudGlmaWVyIjoiMjM0OTA4MTc2NjEyMyIsInBpbiI6IjBmZmUxYWJkMWEwODIxNTM1M2MyMzNkNmUwMDk2MTNlOTVlZWM0MjUzODMyYTc2MWFmMjhmZjM3YWM1YTE1MGMiLCJwYXNzd29yZCI6IjI1NThhMzRkNGQyMDk2NGNhMWQyNzJhYjI2Y2NjZTk1MTFkODgwNTc5NTkzY2Q0YzllMDFhYjkxZWQwMGYzMjUiLCJhY2Nlc3NfbGV2ZWwiOiJBTEwiLCJzZWN1cml0eV9jcmVkZW50aWFsIjoiOEQzNUQ4NUQtMjE1OS00MkZGLUJFMzQtMkYwNTY4NzBERTU3IiwiYWN0aXZlIjpmYWxzZSwiX192IjowLCJpYXQiOjE2NzQwMzU5NTksImV4cCI6MTY3NDEyMjM1OX0.xv9E0idAzWF233MeY16KsbMy1hITvq5sR7ViFF8940A",
                                    "type": "string"
                                }
                            ]
                        },
                        "method": "GET",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "http://localhost:3333/xas/v1/accounts/:user_id/validate/account/:country_code/:account_no/:bank_code/:type",
                            "protocol": "http",
                            "host": [
                                "localhost"
                            ],
                            "port": "3333",
                            "path": [
                                "xas",
                                "v1",
                                "accounts",
                                ":user_id",
                                "validate",
                                "account",
                                ":country_code",
                                ":account_no",
                                ":bank_code",
                                ":type"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": "63b8046676f0656a875608e8",
                                    "type": "string"
                                },
                                {
                                    "key": "country_code",
                                    "value": "NG",
                                    "type": "string"
                                },
                                {
                                    "key": "account_no",
                                    "value": "688999999974615",
                                    "type": "string"
                                },
                                {
                                    "key": "bank_code",
                                    "value": "0001"
                                },
                                {
                                    "key": "type",
                                    "value": "internal",
                                    "type": "string"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Internal Validation",
                            "originalRequest": {
                                "method": "GET",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "http://localhost:3333/xas/v1/accounts/:user_id/validate/account/:country_code/:account_no/:bank_code/:type",
                                    "protocol": "http",
                                    "host": [
                                        "localhost"
                                    ],
                                    "port": "3333",
                                    "path": [
                                        "xas",
                                        "v1",
                                        "accounts",
                                        ":user_id",
                                        "validate",
                                        "account",
                                        ":country_code",
                                        ":account_no",
                                        ":bank_code",
                                        ":type"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "63b8046676f0656a875608e8",
                                            "type": "string"
                                        },
                                        {
                                            "key": "country_code",
                                            "value": "NG",
                                            "type": "string"
                                        },
                                        {
                                            "key": "account_no",
                                            "value": "688999999974615",
                                            "type": "string"
                                        },
                                        {
                                            "key": "bank_code",
                                            "value": "0001"
                                        },
                                        {
                                            "key": "type",
                                            "value": "internal",
                                            "type": "string"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "124"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"7c-+eXbJvDSRizZgh+UPcW1FW3lNUo\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 18 Jan 2023 10:34:22 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"name\": \"XCel INC Limited\",\n        \"accounts\": [\n            {\n                \"account_id\": \"6880040000220864\",\n                \"currency\": \"TVD\"\n            }\n        ]\n    }\n}"
                        },
                        {
                            "name": "External Validation",
                            "originalRequest": {
                                "method": "GET",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "http://localhost:3333/xas/v1/accounts/:user_id/validate/account/:country_code/:account_no/:bank_code/:type",
                                    "protocol": "http",
                                    "host": [
                                        "localhost"
                                    ],
                                    "port": "3333",
                                    "path": [
                                        "xas",
                                        "v1",
                                        "accounts",
                                        ":user_id",
                                        "validate",
                                        "account",
                                        ":country_code",
                                        ":account_no",
                                        ":bank_code",
                                        ":type"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "63b8046676f0656a875608e8",
                                            "type": "string"
                                        },
                                        {
                                            "key": "country_code",
                                            "value": "NG",
                                            "type": "string"
                                        },
                                        {
                                            "key": "account_no",
                                            "value": "2088037329",
                                            "type": "string"
                                        },
                                        {
                                            "key": "bank_code",
                                            "value": "033"
                                        },
                                        {
                                            "key": "type",
                                            "value": "external",
                                            "type": "string"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "132"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"84-6Jm1XlOlak0cBkLB/JysXsT0YVU\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 18 Jan 2023 10:31:57 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"name\": \"TOMIISIN OLUWAFIKAYO SANNI,\",\n        \"accounts\": [\n            {\n                \"account_id\": \"0332088037329\",\n                \"currency\": \"NGN\"\n            }\n        ]\n    }\n}"
                        }
                    ]
                }
            ]
        },
        {
            "name": "PAYMENTS",
            "item": [
                {
                    "name": "Third Party Credit",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "",
                                "value": "",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_key\": \"a62bbc8c1f1eac052c5b53a325fa2389e5a4f321b968de52174881fea4852a34\",\n    \"user_id\": \"6396bbeead79b2b831abf2b4\",\n    \"to_currency\": \"NGN\",\n    \"from_amount\": \"0.01\",\n    \"to_amount\": \"0.01\",\n    \"description\":\"Credit User from Stripe\",\n    \"type\": \"credit\",\n    \"channel\": \"Stripe\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/third-party-credit",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "third-party-credit"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Third Party Credit",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "",
                                        "value": "",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"to_currency\": \"TVD\",\n    \"to_country\": \"NG\",\n    \"from_amount\": \"0.22\",\n    \"to_amount\": \"0.22\",\n    \"description\":\"Credit User from Stripe\",\n    \"type\": \"credit\",\n    \"channel\": \"Stripe\",\n    \"public_key\": \"aaf95af2a81d4f64a2ef04bc1b502fb3118d845cba96686b2aa8365e7af094d1\",\n    \"issuer_id\": \"63928ad67bc2ade0d0593a22\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/transaction/third-party-credit",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "transaction",
                                        "third-party-credit"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "90"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5a-MTj57hLMqt9Ui+bPdf+mDC1zFSQ\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 06 Feb 2023 11:25:22 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"transaction_id\": \"5e7d27c9-5eca-4ea7-8c3f-be7f15fcff08\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Admin Credits",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"channel\": \"XCel\",\n    \"to_country\":\"NG\",\n    \"to_acct\": \"2348102378821\",\n    \"from_currency\": \"NG\",\n    \"to_currency\": \"NG\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"wallet\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/admin",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "admin"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Admin Credits",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"channel\": \"XCel\",\n    \"to_country\":\"NG\",\n    \"to_acct\": \"2348102378821\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"wallet\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/transaction/admin",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "transaction",
                                        "admin"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "90"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5a-Dt9qqI6jXpmPsDjkTdJFWJ7JjJg\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 15 Jun 2022 11:20:19 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"transaction_id\": \"abff3b62-c1bf-469f-99ef-57367a126c0d\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Admin Debit",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"channel\": \"XCel\",\n    \"to_country\":\"NG\",\n    \"from_acct\": \"2348102378821\",\n    \"from_currency\": \"NG\",\n    \"to_currency\": \"NG\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"wallet\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/admin",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "admin"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Admin Credits",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"channel\": \"XCel\",\n    \"to_country\":\"NG\",\n    \"to_acct\": \"2348102378821\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"wallet\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/transaction/admin",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "transaction",
                                        "admin"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "90"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5a-Dt9qqI6jXpmPsDjkTdJFWJ7JjJg\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 15 Jun 2022 11:20:19 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"transaction_id\": \"abff3b62-c1bf-469f-99ef-57367a126c0d\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Wallet Transfers",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"channel\": \"XCel\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"from_acct\": \"2348102478821\",\n    \"to_acct\": \"2349001766123\",\n    \"from_currency\": \"TVD\",\n    \"to_currency\": \"TVD\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\": \"0001\",\n    \"account_name\": \"Gbolahan Kuti\",\n    \"pin\": \"1111\",\n    \"description\": \"Wallet Transfer\",\n    \"from_amount\": \"2.03\",\n    \"to_amount\": \"2.03\",\n    \"override_flag\": \"95207997CCDB488A942E\",\n    \"type\": \"wallet\",\n    \"bank_type\": \"internal\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/payment",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "payment"
                            ]
                        },
                        "description": "The following fields are required\n\n*   channel: app/service initializing the transaction\n*   from_country: country sending account is hosted\n*   to_country: country receiving account is hosted\n*   from_acct: sending account\n*   to_acct: receiving account\n*   OTP: one time pin\n*   dl_code: otp_sid of dynamic link\n*   account_name: receiving account name\n*   pin: wallet/account pin of sending account\n*   description: transaction narration to be inputted by user\n*   from_amount: amount to be debitted from sender\n*   to_amount: amount to be creditted to receiver\n*   type: set as wallet in all small letters\n*   fees:\n    *   transaction: transaction fees,\n    *   stamp: stamp duty\n    *   vat: value added tax"
                    },
                    "response": [
                        {
                            "name": "Wallet Transfers",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"channel\": \"XCel\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"from_acct\": \"2348102478821\",\n    \"to_acct\": \"2349001766123\",\n    \"from_currency\": \"TVD\",\n    \"to_currency\": \"TVD\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\": \"0001\",\n    \"account_name\": \"Gbolahan Kuti\",\n    \"pin\": \"1111\",\n    \"description\": \"Wallet Transfer\",\n    \"from_amount\": \"2.03\",\n    \"to_amount\": \"2.03\",\n    \"override_flag\": \"95207997CCDB488A942E\",\n    \"type\": \"wallet\",\n    \"bank_type\": \"internal\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/transaction/payment",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "transaction",
                                        "payment"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "90"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5a-RE9RdZiFY4xEucziqq2izGK0uFg\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 08 Feb 2023 08:14:31 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"transaction_id\": \"142b8b76-c548-4cb6-8043-b2605f54f22e\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Bank Transfer",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"channel\": \"XCel\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"from_acct\": \"2348102478821\",\n    \"to_acct\": \"2088037329\",\n    \"from_currency\": \"TVD\",\n    \"to_currency\": \"NGN\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\": \"033\",\n    \"account_name\": \"Shalom Owolabi\",\n    \"pin\": \"1111\",\n    \"description\": \"Bank Transfer\",\n    \"from_amount\": \"0.1\",\n    \"to_amount\": \"0.1\",\n    \"override_flag\": \"95207997CCDB488A942E\",\n    \"type\": \"bank\",\n    \"bank_type\": \"external\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/payment",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "payment"
                            ]
                        },
                        "description": "The following fields are required\n\n*   channel: app/service initializing the transaction\n*   from_country: country sending account is hosted\n*   to_country: country receiving account is hosted\n*   from_acct: sending account\n*   to_acct: receiving account\n*   OTP: one time pin\n*   dl_code: otp_sid of dynamic link\n*   to_provider_code: bank code, route number or sort code of receiving bank\n*   account_name: receiving account name\n*   pin: wallet/account pin of sending account\n*   description: transaction narration to be inputted by user\n*   from_amount: amount to be debitted from sender\n*   to_amount: amount to be creditted to receiver\n*   type: set as bank all small letters\n*   fees:\n    *   transaction: transaction fees,\n    *   stamp: stamp duty\n    *   vat: value added tax"
                    },
                    "response": [
                        {
                            "name": "Failed Transaction",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{auth_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"channel\": \"XCel\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"from_acct\": \"2348105478821\",\n    \"to_acct\": \"0154642124\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\": \"033\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\": \"0.1\",\n    \"to_amount\": \"0.1\",\n    \"type\": \"bank\",\n    \"fees\": {\n        \"transaction\": \"0.01\",\n        \"stamp\": \"0.01\",\n        \"vat\": \"0.01\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/transaction/payment",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "transaction",
                                        "payment"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "94"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5e-my8jGXkbzdr/RcY+OFaOWFxLnK8\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Tue, 12 Apr 2022 13:55:22 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"message\": {\n            \"en\": \"Transaction Failed\"\n        },\n        \"code\": \"01\",\n        \"data\": {}\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "VTU Payment",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{auth_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"channel\": \"XCel\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"from_acct\": \"2348102578821\",\n    \"to_acct\": \"08166096306\",\n    \"from_currency\": \"NGN\",\n    \"to_currency\": \"NGN\",\n    \"OTP\":\"1122233\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"MTN\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"override_flag\": \"95207997CCDB488A942E\",\n    \"type\": \"topup\",\n    \"fees\": {\n        \"transaction\":\"0.01\",\n        \"stamp\":\"0.01\",\n        \"vat\": \"0.01\"\n    }\n\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/payment",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "payment"
                            ]
                        },
                        "description": "The following fields are required\n\n*   channel: app/service initializing the transaction\n*   from_country: country sending account is hosted\n*   to_country: country receiving phone is hosted\n*   from_acct: sending account\n*   to_acct: receiving phone number\n*   OTP: one time pin\n*   dl_code: otp_sid of dynamic link\n*   to_provider_code: topup network provider_id\n*   account_name: receiving provider name/ product name\n*   pin: wallet/account pin of sending account\n*   description: transaction narration to be inputted by user\n*   from_amount: amount to be debitted from sender\n*   to_amount: amount to be creditted to receiver\n*   type: set as bank all small letters\n*   fees:\n    *   transaction: transaction fees,\n    *   stamp: stamp duty\n    *   vat: value added tax"
                    },
                    "response": [
                        {
                            "name": "Failed Transaction",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{auth_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"channel\": \"XCel\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"from_acct\": \"2348105478821\",\n    \"to_acct\": \"08166096306\",\n    \"OTP\":\"1122233\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"MTN\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"topup\",\n    \"fees\": {\n        \"transaction\":\"0.01\",\n        \"stamp\":\"0.01\",\n        \"vat\": \"0.01\"\n    }\n\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/transaction/payment",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "transaction",
                                        "payment"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "94"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5e-my8jGXkbzdr/RcY+OFaOWFxLnK8\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Tue, 12 Apr 2022 14:24:09 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"message\": {\n            \"en\": \"Transaction Failed\"\n        },\n        \"code\": \"01\",\n        \"data\": {}\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Bill Payment",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{auth_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"channel\": \"XCel\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"from_acct\": \"2348105478821\",\n    \"to_acct\": \"112233445566777\",\n    \"from_currency\": \"NGN\",\n    \"to_currency\": \"NGN\",\n    \"OTP\":\"1122233\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"DSTV\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"cable\",\n    \"fees\": {\n        \"transaction\":\"0.01\",\n        \"stamp\":\"0.01\",\n        \"vat\": \"0.01\"\n    }\n\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/payment",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "payment"
                            ]
                        },
                        "description": "The following fields are required\n\n*   channel: app/service initializing the transaction\n*   from_country: country sending account is hosted\n*   to_country: country receiving phone is hosted\n*   from_acct: sending account\n*   to_acct: receiving phone number\n*   OTP: one time pin\n*   dl_code: otp_sid of dynamic link\n*   to_provider_code: biller provider_id\n*   account_name: receiving provider name/ product name\n*   pin: wallet/account pin of sending account\n*   description: transaction narration to be inputted by user\n*   from_amount: amount to be debitted from sender\n*   to_amount: amount to be creditted to receiver\n*   type: set as water, cable or electricity all small letters\n*   fees:\n    *   transaction: transaction fees,\n    *   stamp: stamp duty\n    *   vat: value added tax"
                    },
                    "response": [
                        {
                            "name": "Failed Transaction",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{auth_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"channel\": \"XCel\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"from_acct\": \"2348105478821\",\n    \"to_acct\": \"112233445566777\",\n    \"OTP\":\"1122233\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"DSTV\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"pin\": \"4499\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"cable\",\n    \"fees\": {\n        \"transaction\":\"0.01\",\n        \"stamp\":\"0.01\",\n        \"vat\": \"0.01\"\n    }\n\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/transaction/payment",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "transaction",
                                        "payment"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "94"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"5e-my8jGXkbzdr/RcY+OFaOWFxLnK8\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Tue, 12 Apr 2022 14:24:38 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"message\": {\n            \"en\": \"Transaction Failed\"\n        },\n        \"code\": \"01\",\n        \"data\": {}\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Bulk Payments",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{auth_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"otp\": \"\",\n    \"pin\": \"4499\",\n    \"from_acct\": \"2348105478821\",\n    \"from_country\": \"NG\",\n    \"channel\": \"XCel\",\n    \"transactions\": [\n        {\n            \"to_country\": \"NG\",\n            \"to_acct\": \"2348166096306\",\n            \"dl_code\": \"idjspwowdjjdjddj\",\n            \"to_provider_code\": \"\",\n            \"account_name\": \"Sanni Oluwafikayo\",\n            \"description\": \"\",\n            \"from_amount\": \"0.1\",\n            \"to_amount\": \"0.1\",\n            \"type\": \"wallet\",\n            \"fees\": {\n                \"transaction\": \"0.01\",\n                \"stamp\": \"0.01\",\n                \"vat\": \"0.01\"\n            }\n        },\n        {\n            \"to_country\": \"NG\",\n            \"to_acct\": \"2348102478821\",\n            \"dl_code\": \"idjspwowdjjdjddj\",\n            \"to_provider_code\": \"033\",\n            \"account_name\": \"Sanni Oluwafikayo\",\n            \"description\": \"\",\n            \"from_amount\": \"0.1\",\n            \"to_amount\": \"0.1\",\n            \"type\": \"bank\",\n            \"fees\": {\n                \"transaction\": \"0.01\",\n                \"stamp\": \"0.01\",\n                \"vat\": \"0.01\"\n            }\n        }\n    ]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/bulk",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "bulk"
                            ]
                        },
                        "description": "The following fields are required\n\n*   OTP: one time pin\n*   from_acct: sending account\n*   pin: wallet/account pin of sending account\n*   channel: app/service initializing the transaction\n*   from_country: country sending account is hosted\n*   transactions: array objects, each object contains the following\n    *   to_country: fill required data of transaction type\n    *   to_acct: fill required data of transaction type\n    *   dl_code: otp_sid of dynamic link\n    *   to_provider_code: fill required data of transaction type\n    *   account_name: fill required data of transaction type\n    *   description: transaction narration to be inputted by user\n    *   from_amount: amount to be debitted from sender\n    *   to_amount: amount to be creditted to receiver\n    *   type: fill required data of transaction type\n    *   fees:\n        *   transaction: transaction fees,\n        *   stamp: stamp duty\n        *   vat: value added tax"
                    },
                    "response": [
                        {
                            "name": "Bulk Payments",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{auth_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"otp\": \"\",\n    \"pin\": \"4499\",\n    \"from_acct\": \"2348105478821\",\n    \"from_country\": \"NG\",\n    \"channel\": \"XCel\",\n    \"transactions\": [\n        {\n            \"to_country\": \"NG\",\n            \"to_acct\": \"2348166096306\",\n            \"dl_code\": \"idjspwowdjjdjddj\",\n            \"to_provider_code\": \"\",\n            \"account_name\": \"Sanni Oluwafikayo\",\n            \"description\": \"\",\n            \"from_amount\": \"0.1\",\n            \"to_amount\": \"0.1\",\n            \"type\": \"wallet\",\n            \"fees\": {\n                \"transaction\": \"0.01\",\n                \"stamp\": \"0.01\",\n                \"vat\": \"0.01\"\n            }\n        },\n        {\n            \"to_country\": \"NG\",\n            \"to_acct\": \"2348102478821\",\n            \"dl_code\": \"idjspwowdjjdjddj\",\n            \"to_provider_code\": \"033\",\n            \"account_name\": \"Sanni Oluwafikayo\",\n            \"description\": \"\",\n            \"from_amount\": \"0.1\",\n            \"to_amount\": \"0.1\",\n            \"type\": \"bank\",\n            \"fees\": {\n                \"transaction\": \"0.01\",\n                \"stamp\": \"0.01\",\n                \"vat\": \"0.01\"\n            }\n        }\n    ]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v2/transaction/bulk",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v2",
                                        "transaction",
                                        "bulk"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1002"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"3ea-tx+OIz9hfUzxCDoAcm6oQO3jp2s\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Tue, 12 Apr 2022 13:17:24 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"failureCount\": 2,\n        \"successCount\": 0,\n        \"failed\": [\n            {\n                \"to_country\": \"NG\",\n                \"to_acct\": \"2348166096306\",\n                \"dl_code\": \"idjspwowdjjdjddj\",\n                \"to_provider_code\": \"\",\n                \"account_name\": \"Sanni Oluwafikayo\",\n                \"description\": \"\",\n                \"from_amount\": \"0.10\",\n                \"to_amount\": \"0.10\",\n                \"type\": \"wallet\",\n                \"fees\": {\n                    \"transaction\": \"0.01\",\n                    \"stamp\": \"0.01\",\n                    \"vat\": \"0.01\"\n                },\n                \"pin\": \"4499\",\n                \"otp\": \"\",\n                \"from_acct\": \"2348105478821\",\n                \"from_country\": \"NG\",\n                \"channel\": \"XCel\",\n                \"decoded\": {\n                    \"wallet_no\": \"2348105478821\",\n                    \"iat\": 1649768095,\n                    \"exp\": 1649793295\n                },\n                \"reason\": {\n                    \"en\": \"Transaction Failed\"\n                }\n            },\n            {\n                \"to_country\": \"NG\",\n                \"to_acct\": \"2348102478821\",\n                \"dl_code\": \"idjspwowdjjdjddj\",\n                \"to_provider_code\": \"033\",\n                \"account_name\": \"Sanni Oluwafikayo\",\n                \"description\": \"\",\n                \"from_amount\": \"0.10\",\n                \"to_amount\": \"0.10\",\n                \"type\": \"bank\",\n                \"fees\": {\n                    \"transaction\": \"0.01\",\n                    \"stamp\": \"0.01\",\n                    \"vat\": \"0.01\"\n                },\n                \"pin\": \"4499\",\n                \"otp\": \"\",\n                \"from_acct\": \"2348105478821\",\n                \"from_country\": \"NG\",\n                \"channel\": \"XCel\",\n                \"decoded\": {\n                    \"wallet_no\": \"2348105478821\",\n                    \"iat\": 1649768095,\n                    \"exp\": 1649793295\n                },\n                \"reason\": {\n                    \"en\": \"Transaction Failed\"\n                }\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Schedule Credit",
                    "request": {
                        "method": "POST",
                        "header": []
                    },
                    "response": []
                },
                {
                    "name": "Schedule Debit",
                    "request": {
                        "method": "POST",
                        "header": []
                    },
                    "response": []
                },
                {
                    "name": "Fetch User Transactions",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{base_url}}/v1/transaction/user/:user_id/:start/:end/:group_by",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "transaction",
                                "user",
                                ":user_id",
                                ":start",
                                ":end",
                                ":group_by"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": "63d52b811c8f8fc58dc6f7c7"
                                },
                                {
                                    "key": "start",
                                    "value": "all"
                                },
                                {
                                    "key": "end",
                                    "value": "all"
                                },
                                {
                                    "key": "group_by",
                                    "value": "date"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch User Transactions",
                            "originalRequest": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/transaction/user/:user_id/:start/:end/:group_by",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "transaction",
                                        "user",
                                        ":user_id",
                                        ":start",
                                        ":end",
                                        ":group_by"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "63d52b811c8f8fc58dc6f7c7"
                                        },
                                        {
                                            "key": "start",
                                            "value": "all"
                                        },
                                        {
                                            "key": "end",
                                            "value": "all"
                                        },
                                        {
                                            "key": "group_by",
                                            "value": "all"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "11351"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"2c57-pAjfsleZJFcnfXx0OgJj++Utoa0\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 06 Feb 2023 09:22:04 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"2023-02-05T23:00:00.000Z\",\n            \"transactions\": [\n                {\n                    \"_id\": \"63e0b0332ccb14a9a66fa214\",\n                    \"date\": \"2023-02-06T07:45:55.574Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675669551541\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675669551541\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63e0b1182ccb14a9a66fa237\",\n                    \"date\": \"2023-02-06T07:49:44.959Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675669781266\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675669781266\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63e0b11b2ccb14a9a66fa23d\",\n                    \"date\": \"2023-02-06T07:49:47.733Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675669781266\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675669781266\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63e0b681b8715448f0d6c82b\",\n                    \"date\": \"2023-02-06T08:12:49.296Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675671165609\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675671165609\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63e0b684b8715448f0d6c831\",\n                    \"date\": \"2023-02-06T08:12:52.545Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675671165609\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675671165609\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63e0b766efd73070caf83f41\",\n                    \"date\": \"2023-02-06T08:16:38.146Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"settlements\": {\n                        \"debit\": {\n                            \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                            \"created\": \"2023-01-28T14:04:51.588Z\",\n                            \"address\": {\n                                \"line1\": \"26\",\n                                \"line2\": \"OluwoleOladejoStreet\",\n                                \"city\": \"OjoduBerger\",\n                                \"country\": \"Nigeria\",\n                                \"state\": \"Lagos\",\n                                \"post_code\": \"100234\",\n                                \"_id\": \"63d52b811c8f8fc58dc6f7c9\"\n                            },\n                            \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n                            \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n                            \"first_name\": \"Oluwafikayo\",\n                            \"last_name\": \"Sanni\",\n                            \"account_id\": \"6880040000222119\",\n                            \"currency\": \"TVD\",\n                            \"wallet_no\": \"2348102478821\",\n                            \"scheme_code\": \"234004\",\n                            \"provider\": \"wallet-api\",\n                            \"email\": \"sanni.oluwafikayo@gmail.com\",\n                            \"country\": \"NG\",\n                            \"phone\": \"2348102478821\",\n                            \"trusted\": false,\n                            \"closed\": false,\n                            \"banned\": false,\n                            \"firebase_id\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n                            \"notification_type\": \"firebase\",\n                            \"notification_setup\": {},\n                            \"account_type\": \"INDIVIDUAL\",\n                            \"private_key\": \"baa80810-9f14-11ed-a369-5b65087aed8b\",\n                            \"public_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n                            \"disabled\": false,\n                            \"version_locked\": false\n                        },\n                        \"credit\": {\n                            \"created\": \"2023-01-18T08:38:07.490Z\",\n                            \"address\": {\n                                \"line1\": \"26 Oluwole Oladejo Street\",\n                                \"line2\": \"Ojodu Berger\",\n                                \"city\": \"Lagos\",\n                                \"country\": \"Nigeria\",\n                                \"state\": \"Lagos\",\n                                \"post_code\": \"100216\",\n                                \"_id\": \"638896347bc2ade0d0593889\"\n                            },\n                            \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n                            \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n                            \"first_name\": \"XCel INC Limited\",\n                            \"last_name\": \" \",\n                            \"customer_id\": \"63c7a7a4-8257-4e19-bf3f-bcf268a1f993\",\n                            \"account_id\": \"6880040000220864\",\n                            \"currency\": \"TVD\",\n                            \"wallet_no\": \"688999999974615\",\n                            \"scheme_code\": \"688004\",\n                            \"account_type\": \"ADMIN\",\n                            \"email\": \"valentineobi@xcelapp.com\",\n                            \"phone\": \"08102478821\",\n                            \"trusted\": false,\n                            \"closed\": false,\n                            \"country\": \"NG\",\n                            \"banned\": false,\n                            \"provider\": \"wallet-api\",\n                            \"disabled\": false,\n                            \"version_locked\": false\n                        }\n                    },\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675671394528\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675671394528\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63e0b768efd73070caf83f47\",\n                    \"date\": \"2023-02-06T08:16:40.901Z\",\n                    \"date_id\": \"2023-02-05T23:00:00.000Z\",\n                    \"merchant_id\": \"\",\n                    \"subsidiary_id\": \"\",\n                    \"sender_user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n                    \"receiver_user_id\": \"63d7a1437345f1074f85670e\",\n                    \"account_type\": \"INDIVIDUAL\",\n                    \"payer_id\": \"2348102478821\",\n                    \"ref_no\": \"234444555666\",\n                    \"channel_id\": \"XCel\",\n                    \"src_country_code\": \"NG\",\n                    \"des_country_code\": \"NG\",\n                    \"des_sort_route_no\": \"0001\",\n                    \"des_account\": \"234444555666\",\n                    \"src_account\": \"2348102478821\",\n                    \"src_scheme_code\": \"234004\",\n                    \"des_scheme_code\": \"234004\",\n                    \"currency_code\": \"TVD\",\n                    \"settlements\": {\n                        \"debit\": {\n                            \"created\": \"2023-02-06T06:45:40.122Z\",\n                            \"address\": {\n                                \"line1\": \"26 Oluwole Oladejo Street\",\n                                \"line2\": \"Ojodu Berger\",\n                                \"city\": \"Lagos\",\n                                \"country\": \"Nigeria\",\n                                \"state\": \"Lagos\",\n                                \"post_code\": \"100216\",\n                                \"_id\": \"638896347bc2ade0d0593889\"\n                            },\n                            \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n                            \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n                            \"first_name\": \"XCel INC Limited\",\n                            \"last_name\": \" \",\n                            \"customer_id\": \"63c7a7a4-8257-4e19-bf3f-bcf268a1f993\",\n                            \"account_id\": \"6880040000222998\",\n                            \"currency\": \"TVD\",\n                            \"wallet_no\": \"688999999969012\",\n                            \"scheme_code\": \"688004\",\n                            \"account_type\": \"ADMIN\",\n                            \"email\": \"valentineobi@xcelapp.com\",\n                            \"phone\": \"08102478821\",\n                            \"trusted\": false,\n                            \"closed\": false,\n                            \"country\": \"NG\",\n                            \"banned\": false,\n                            \"provider\": \"wallet-api\",\n                            \"disabled\": false,\n                            \"version_locked\": false\n                        },\n                        \"credit\": {\n                            \"user_id\": \"63d7a1437345f1074f85670e\",\n                            \"created\": \"2023-01-30T10:51:49.304Z\",\n                            \"address\": {\n                                \"line1\": \"26 Oluwole\",\n                                \"line2\": \"Oladejo\",\n                                \"city\": \"Ojodu\",\n                                \"country\": \"Nigeria\",\n                                \"state\": \"Lagos\",\n                                \"post_code\": \"234001\",\n                                \"_id\": \"63d7a1437345f1074f856710\"\n                            },\n                            \"issuer_id\": \"63928ad67bc2ade0d0593a22\",\n                            \"app_id\": \"63928fe57bc2ade0d0593a2b\",\n                            \"first_name\": \"Shalom\",\n                            \"last_name\": \"Owolabi\",\n                            \"account_id\": \"6880040000222290\",\n                            \"currency\": \"TVD\",\n                            \"wallet_no\": \"234444555666\",\n                            \"scheme_code\": \"234004\",\n                            \"provider\": \"wallet-api\",\n                            \"email\": \"shalom.shawn@yahoo.com\",\n                            \"country\": \"NG\",\n                            \"phone\": \"234444555666\",\n                            \"trusted\": false,\n                            \"closed\": false,\n                            \"banned\": false,\n                            \"firebase_id\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n                            \"notification_type\": \"firebase\",\n                            \"notification_setup\": {},\n                            \"account_type\": \"INDIVIDUAL\",\n                            \"private_key\": \"17e8ed00-a08c-11ed-a3b2-a7ae3e1f0631\",\n                            \"public_key\": \"8ac16956157cd5ffcf43fc5031d7a3ba68d66a7178d3516670e3cdd1b4a0faef\",\n                            \"disabled\": false,\n                            \"version_locked\": false\n                        }\n                    },\n                    \"trans_code\": \"transfer\",\n                    \"src_card_num\": \"6880040000222119\",\n                    \"des_card_num\": \"6880040000222290\",\n                    \"payment_code\": \"\",\n                    \"src_amount_paid\": 0.1,\n                    \"des_amount_paid\": 0.1,\n                    \"description\": \"Wallet Transfer\",\n                    \"des_first_name\": \"Shalom\",\n                    \"src_first_name\": \"Oluwafikayo\",\n                    \"des_last_name\": \"Owolabi\",\n                    \"src_last_name\": \"Sanni\",\n                    \"trans_type\": \"wallet\",\n                    \"name\": \"Shalom Owolabi\",\n                    \"exchange_rate\": \"1\",\n                    \"sent_status\": false,\n                    \"reference_no\": \"CUD1675671394528\",\n                    \"channel\": \"XCel\",\n                    \"account_no\": \"234444555666\",\n                    \"external_reference\": \"CUD1675671394528\",\n                    \"status\": \"success\",\n                    \"process_id\": \"\",\n                    \"pos_validated\": false,\n                    \"__v\": 0\n                }\n            ]\n        }\n    ]\n}"
                        }
                    ]
                }
            ]
        },
        {
            "name": "EXCHANGE RATES",
            "item": [
                {
                    "name": "Create Exchange",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkyOGFkNjdiYzJhZGUwZDA1OTNhMjIiLCJjb21wYW55X25hbWUiOiJYQ2VsIFBheW1lbnQgSW5jb3Jwb3JhdGVkIiwiZGVzY3JpcHRpb24iOiJNYWtlIFBheW1lbnRzIGFueXdoZXJlIHlvdSBnbyIsImxvZ28iOiJodHRwczovL2FkbWluLnhjZWxhcHAuY29tL2Fzc2V0cy9pbWFnZXMvbWFpbmxvZ28ucG5nIiwicGVybWlzc2lvbnMiOnsiaW50ZXJuYXRpb25hbF90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRyYV90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9pbnRlcl90cmFuc2ZlcnMiOmZhbHNlLCJsb2NhbF9iaWxsX3BheW1lbnRzIjpmYWxzZSwibG9jYWxfYWlydGltZV9kYXRhIjpmYWxzZSwibG9jYWxfbG9hbl9zZXJ2aWNlcyI6ZmFsc2UsInBvc190cmFuc2FjdGlvbnMiOmZhbHNlLCJhY2NvdW50X2NyZWF0aW9uIjp0cnVlLCJwb3RzIjpmYWxzZSwiY3VzdG9tX2ZlZXMiOmZhbHNlLCJjdXN0b21fbGltaXRzIjpmYWxzZX0sImlzX2FjdGl2ZSI6ZmFsc2UsIm1hc3Rlcl9pc3N1ZXIiOmZhbHNlLCJjcmVhdGVkIjoiMjAyMi0xMi0wOVQwMTowOTo0Mi4yMDRaIiwicHJpdmF0ZV9rZXkiOiIyOTRmMmZjMC03NzVlLTExZWQtOWZiYi0yZmFiYzQ1YjI5ZTMiLCJfX3YiOjAsImJhbmtfcm91dGVfY29kZSI6IjAwMDEiLCJpYXQiOjE2NzUwNzU4MjMsImV4cCI6MTY3NTE2MjIyM30._hddn4hYUJ3iqFhLFKrr95ByIuJQESvu-1wWJCsOCao",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\":\"63928ad67bc2ade0d0593a22\",\n    \"public_key\":\"fb281e109fc13503fca6bb7b7ce8c6529c971ec3a25e96c2a22046f122e9be6a\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"type\": \"transfer\",\n    \"from_currency\": \"LAK\",\n    \"to_currency\": \"TVD\",\n    \"from_value\": 1,\n    \"to_value\": 0.08333333333333333\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/exchange",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "exchange"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Exchange",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\":\"625ab8cefc6039363a321e3e\",\n    \"public_key\":\"c55eaeca894bb053a95c8e659d61480c114808b0dcd559ea0c7510dab6d50df0\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"type\": \"transfer\",\n    \"from_currency\": \"NGN\",\n    \"to_currency\": \"USD\",\n    \"from_value\": 1,\n    \"to_value\": 745\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/exchange",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "exchange"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "308"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"134-K5ADa9kN0o88aJGutxjWeWIrSQw\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 28 Jan 2023 17:40:10 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n        \"from_currency\": \"NGN\",\n        \"from_country\": \"NG\",\n        \"from_value\": 1,\n        \"to_currency\": \"USD\",\n        \"to_country\": \"NG\",\n        \"to_value\": 745,\n        \"rate\": 0.0013422818791946308,\n        \"type\": \"transfer\",\n        \"_id\": \"63d55dfae1e5d1f0fa409696\",\n        \"updated\": \"2023-01-28T17:40:10.712Z\",\n        \"__v\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Calculate Rate",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"to_currency\":\"USD\",\n    \"from_currency\":\"NGN\",\n    \"amount\": \"1000\",\n    \"type\": \"transfer\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/exchange/calculate",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "exchange",
                                "calculate"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Calculate Rate",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"to_currency\":\"USD\",\n    \"from_currency\":\"NGN\",\n    \"amount\": \"1000\",\n    \"type\": \"transfer\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/exchange/calculate",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "exchange",
                                        "calculate"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "82"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"52-SG6AkkcJtJB97RBjZaBYkA1LRoo\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 28 Jan 2023 17:53:33 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"rate\": 0.0013422818791946308,\n        \"to_amount\": \"1.34\"\n    }\n}"
                        }
                    ]
                }
            ]
        },
        {
            "name": "FEES",
            "item": [
                {
                    "name": "Create Fees",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{issuer_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"issuer_id\":\"625ab8cefc6039363a321e3e\",\n    \"public_key\":\"c55eaeca894bb053a95c8e659d61480c114808b0dcd559ea0c7510dab6d50df0\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"type\": \"wallet\",\n    \"from_currency\": \"NGN\",\n    \"to_currency\": \"NGN\",\n    \"default\": {\n        \"percentage\": 0.1,\n        \"flat\": 0.25,\n        \"minimum_cap\": 1,\n        \"maximum_cap\": 5\n    },\n    \"ranges\": [{\n        \"min\": 0.01,\n        \"max\": 200,\n        \"percentage\": 1,\n        \"flat\": 0.25,\n        \"maximum_cap\": 25,\n        \"minimum_cap\": 5\n    },{\n        \"min\": 200,\n        \"max\": 500,\n        \"percentage\": 0.5,\n        \"flat\": 0.50,\n        \"maximum_cap\": 35,\n        \"minimum_cap\": 15\n    }]\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/fees",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "fees"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Fees",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\":\"625ab8cefc6039363a321e3e\",\n    \"public_key\":\"c55eaeca894bb053a95c8e659d61480c114808b0dcd559ea0c7510dab6d50df0\",\n    \"from_country\": \"NG\",\n    \"to_country\": \"NG\",\n    \"type\": \"wallet\",\n    \"from_currency\": \"NGN\",\n    \"to_currency\": \"NGN\",\n    \"default\": {\n        \"percentage\": 0.1,\n        \"flat\": 0.25,\n        \"minimum_cap\": 1,\n        \"maximum_cap\": 5\n    },\n    \"ranges\": [{\n        \"min\": 0.01,\n        \"max\": 200,\n        \"percentage\": 1,\n        \"flat\": 0.25,\n        \"maximum_cap\": 25,\n        \"minimum_cap\": 5\n    },{\n        \"min\": 200,\n        \"max\": 500,\n        \"percentage\": 0.5,\n        \"flat\": 0.50,\n        \"maximum_cap\": 35,\n        \"minimum_cap\": 15\n    }]\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/fees",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "fees"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "617"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"269-K0XaPFbp1K/hcDzs9E4m/SlWXwI\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 28 Jan 2023 15:38:50 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"from_country\": \"NG\",\n        \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n        \"from_currency\": \"NGN\",\n        \"to_currency\": \"NGN\",\n        \"to_country\": \"NG\",\n        \"default\": {\n            \"percentage\": 0.1,\n            \"flat\": 0.25,\n            \"minimum_cap\": 1,\n            \"maximum_cap\": 5\n        },\n        \"type\": \"wallet\",\n        \"_id\": \"63d5418ad6482659acfb43dc\",\n        \"__v\": 0,\n        \"ranges\": [\n            {\n                \"fees_id\": \"63d5418ad6482659acfb43dc\",\n                \"min\": 0.01,\n                \"max\": 200,\n                \"percentage\": 1,\n                \"flat\": 0.25,\n                \"minimum_cap\": 5,\n                \"maximum_cap\": 25,\n                \"_id\": \"63d5418ad6482659acfb43de\",\n                \"__v\": 0\n            },\n            {\n                \"fees_id\": \"63d5418ad6482659acfb43dc\",\n                \"min\": 200,\n                \"max\": 500,\n                \"percentage\": 0.5,\n                \"flat\": 0.5,\n                \"minimum_cap\": 15,\n                \"maximum_cap\": 35,\n                \"_id\": \"63d5418ad6482659acfb43df\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Fee by ID",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{base_url}}/v1/fees/:fee_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "fees",
                                ":fee_id"
                            ],
                            "variable": [
                                {
                                    "key": "fee_id",
                                    "value": null
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Fee by ID",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/fees/:fee_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "fees",
                                        ":fee_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "fee_id",
                                            "value": "63d5418ad6482659acfb43dc"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "617"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"269-03qztZ+NuzEzZkwjUDJKTXc8cXs\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 28 Jan 2023 16:01:57 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"_id\": \"63d5418ad6482659acfb43dc\",\n        \"from_country\": \"NG\",\n        \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n        \"from_currency\": \"NGN\",\n        \"to_currency\": \"NGN\",\n        \"to_country\": \"NG\",\n        \"default\": {\n            \"percentage\": 0.1,\n            \"flat\": 0.25,\n            \"minimum_cap\": 1,\n            \"maximum_cap\": 5\n        },\n        \"type\": \"wallet\",\n        \"__v\": 0,\n        \"ranges\": [\n            {\n                \"_id\": \"63d5418ad6482659acfb43de\",\n                \"fees_id\": \"63d5418ad6482659acfb43dc\",\n                \"min\": 0.01,\n                \"max\": 200,\n                \"percentage\": 1,\n                \"flat\": 0.25,\n                \"minimum_cap\": 5,\n                \"maximum_cap\": 25,\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"63d5418ad6482659acfb43df\",\n                \"fees_id\": \"63d5418ad6482659acfb43dc\",\n                \"min\": 200,\n                \"max\": 500,\n                \"percentage\": 0.5,\n                \"flat\": 0.5,\n                \"minimum_cap\": 15,\n                \"maximum_cap\": 35,\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Issuer Fees",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{base_url}}/v1/fees/issuers/:issuer_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "fees",
                                "issuers",
                                ":issuer_id"
                            ],
                            "variable": [
                                {
                                    "key": "issuer_id",
                                    "value": "625ab8cefc6039363a321e3e"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Issuer Fees",
                            "originalRequest": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/fees/issuers/:issuer_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "fees",
                                        "issuers",
                                        ":issuer_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "issuer_id",
                                            "value": "625ab8cefc6039363a321e3e"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "619"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"26b-tei+l9HqbkAEqMhXMxP19mBv2YM\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 28 Jan 2023 16:11:52 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"63d5418ad6482659acfb43dc\",\n            \"from_country\": \"NG\",\n            \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n            \"from_currency\": \"NGN\",\n            \"to_currency\": \"NGN\",\n            \"to_country\": \"NG\",\n            \"default\": {\n                \"percentage\": 0.1,\n                \"flat\": 0.25,\n                \"minimum_cap\": 1,\n                \"maximum_cap\": 5\n            },\n            \"type\": \"wallet\",\n            \"__v\": 0,\n            \"ranges\": [\n                {\n                    \"_id\": \"63d5418ad6482659acfb43de\",\n                    \"fees_id\": \"63d5418ad6482659acfb43dc\",\n                    \"min\": 0.01,\n                    \"max\": 200,\n                    \"percentage\": 1,\n                    \"flat\": 0.25,\n                    \"minimum_cap\": 5,\n                    \"maximum_cap\": 25,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"63d5418ad6482659acfb43df\",\n                    \"fees_id\": \"63d5418ad6482659acfb43dc\",\n                    \"min\": 200,\n                    \"max\": 500,\n                    \"percentage\": 0.5,\n                    \"flat\": 0.5,\n                    \"minimum_cap\": 15,\n                    \"maximum_cap\": 35,\n                    \"__v\": 0\n                }\n            ]\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Calculate Transaction Fees",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"to_currency\":\"NGN\",\n    \"from_currency\":\"NGN\",\n    \"from_amount\": \"1000\",\n    \"to_amount\": \"1000\",\n    \"type\": \"wallet\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/fees/calculate",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "fees",
                                "calculate"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Calculate Transaction Fees",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_key\": \"20a5b1af773ce68472036e13fb5a881e123379de02b6d525006417327b434096\",\n    \"user_id\": \"63d52b811c8f8fc58dc6f7c7\",\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"to_currency\":\"NGN\",\n    \"from_currency\":\"NGN\",\n    \"from_amount\": \"1000\",\n    \"to_amount\": \"1000\",\n    \"type\": \"wallet\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/fees/calculate",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "fees",
                                        "calculate"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "71"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"47-IHhgKj3w77GN6o+PpJa9dz11h6s\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Sat, 28 Jan 2023 16:37:14 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"transaction\": 1.25,\n        \"stamp\": 0,\n        \"vat\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Update Fee",
                    "request": {
                        "method": "PUT",
                        "header": [],
                        "url": {
                            "raw": "{{base_url}}/v1/fees/:fee_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "fees",
                                ":fee_id"
                            ],
                            "variable": [
                                {
                                    "key": "fee_id",
                                    "value": null
                                }
                            ]
                        }
                    },
                    "response": []
                }
            ]
        },
        {
            "name": "CARDS",
            "item": [
                {
                    "name": "ISSUER CARD SETUP",
                    "item": [
                        {
                            "name": "Create Card Setup",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"provider\": \"railsbank\",\n    \"design\": \"ConsumerMVP\",\n    \"BIN\": \"\",\n    \"CODE\": \"\",\n    \"programme\": \"Xcel-MVP-Consumer-GBP-Physical-UK\",\n    \"carrier\": \"standard\",\n    \"delivery_method\": \"standard-first-class\",\n    \"country\": \"GB\",\n    \"card_type\": \"physical\",\n    \"type\": \"INDIVIDUAL\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "http://localhost:3333/xas/v1/cards/setup",
                                    "protocol": "http",
                                    "host": [
                                        "localhost"
                                    ],
                                    "port": "3333",
                                    "path": [
                                        "xas",
                                        "v1",
                                        "cards",
                                        "setup"
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "XCel Card Setup",
                                    "originalRequest": {
                                        "method": "POST",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "body": {
                                            "mode": "raw",
                                            "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"provider\": \"xcel\",\n    \"design\": \"\",\n    \"BIN\": \"506805\",\n    \"CODE\": \"13\",\n    \"programme\": \"\",\n    \"carrier\": \"\",\n    \"delivery_method\": \"\",\n    \"country\": \"GH\",\n    \"type\": \"INDIVIDUAL\",\n    \"card_type\": \"physical\",\n    \"_id\": \"638f667f49e729b9af6f0728\",\n    \"__v\": 0\n}",
                                            "options": {
                                                "raw": {
                                                    "language": "json"
                                                }
                                            }
                                        },
                                        "url": {
                                            "raw": "http://localhost:3333/xas/v1/cards/setup",
                                            "protocol": "http",
                                            "host": [
                                                "localhost"
                                            ],
                                            "port": "3333",
                                            "path": [
                                                "xas",
                                                "v1",
                                                "cards",
                                                "setup"
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "278"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"116-HMOtSk55COP96Az685uI/eZsV1g\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Tue, 06 Dec 2022 17:12:25 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"provider\": \"xcel\",\n        \"design\": \"\",\n        \"BIN\": \"506805\",\n        \"CODE\": \"13\",\n        \"programme\": \"\",\n        \"carrier\": \"\",\n        \"delivery_method\": \"\",\n        \"country\": \"GH\",\n        \"card_type\": \"physical\",\n        \"type\": \"INDIVIDUAL\",\n        \"_id\": \"638f667f49e729b9af6f0728\",\n        \"__v\": 0\n    }\n}"
                                },
                                {
                                    "name": "Railsbank Card Setup",
                                    "originalRequest": {
                                        "method": "POST",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "body": {
                                            "mode": "raw",
                                            "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"provider\": \"railsbank\",\n    \"design\": \"ConsumerMVP\",\n    \"BIN\": \"\",\n    \"CODE\": \"\",\n    \"programme\": \"Xcel-MVP-Consumer-GBP-Physical-UK\",\n    \"carrier\": \"standard\",\n    \"delivery_method\": \"standard-first-class\",\n    \"country\": \"GB\",\n    \"card_type\": \"physical\",\n    \"type\": \"INDIVIDUAL\"\n}",
                                            "options": {
                                                "raw": {
                                                    "language": "json"
                                                }
                                            }
                                        },
                                        "url": {
                                            "raw": "http://localhost:3333/xas/v1/cards/setup",
                                            "protocol": "http",
                                            "host": [
                                                "localhost"
                                            ],
                                            "port": "3333",
                                            "path": [
                                                "xas",
                                                "v1",
                                                "cards",
                                                "setup"
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "347"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"15b-FUdafWEFEOq3rxLsoClucC9r9sM\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Tue, 06 Dec 2022 17:13:12 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"provider\": \"railsbank\",\n        \"design\": \"ConsumerMVP\",\n        \"BIN\": \"\",\n        \"CODE\": \"\",\n        \"programme\": \"Xcel-MVP-Consumer-GBP-Physical-UK\",\n        \"carrier\": \"standard\",\n        \"delivery_method\": \"standard-first-class\",\n        \"country\": \"GB\",\n        \"card_type\": \"physical\",\n        \"type\": \"INDIVIDUAL\",\n        \"_id\": \"638f78284de58051e1d83913\",\n        \"__v\": 0\n    }\n}"
                                }
                            ]
                        },
                        {
                            "name": "Fetch Card Setup",
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/setup/:id?issuer_id={{issuer_id}}&public_key={{issuer_public_key}}",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "setup",
                                        ":id"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "{{issuer_id}}",
                                            "description": "can also be parsed the request body"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "{{issuer_public_key}}",
                                            "description": "can also be parsed the request body"
                                        }
                                    ],
                                    "variable": [
                                        {
                                            "key": "id",
                                            "value": "{{card_setup_id}}",
                                            "description": "enter  _id of set"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Fetch Card Setup",
                                    "originalRequest": {
                                        "method": "GET",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/setup/:id?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "setup",
                                                ":id"
                                            ],
                                            "query": [
                                                {
                                                    "key": "issuer_id",
                                                    "value": "633412e65e6f1d0012fa45ea",
                                                    "description": "can also be parsed the request body"
                                                },
                                                {
                                                    "key": "public_key",
                                                    "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                                    "description": "can also be parsed the request body"
                                                }
                                            ],
                                            "variable": [
                                                {
                                                    "key": "id",
                                                    "value": "638f78284de58051e1d83913",
                                                    "description": "enter  _id of set"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "347"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"15b-qFPfdqVDH8+uPO6gbxC0bRVvCdE\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 04:38:49 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"_id\": \"638f78284de58051e1d83913\",\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"provider\": \"railsbank\",\n        \"design\": \"ConsumerMVP\",\n        \"BIN\": \"\",\n        \"CODE\": \"\",\n        \"programme\": \"Xcel-MVP-Consumer-GBP-Physical-UK\",\n        \"carrier\": \"standard\",\n        \"delivery_method\": \"standard-first-class\",\n        \"country\": \"GB\",\n        \"card_type\": \"physical\",\n        \"type\": \"INDIVIDUAL\",\n        \"__v\": 0\n    }\n}"
                                }
                            ]
                        },
                        {
                            "name": "Fetch Issuer Card Setups",
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/setup/issuer?issuer_id={{issuer_id}}&public_key={{issuer_public_key}}",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "setup",
                                        "issuer"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "{{issuer_id}}"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "{{issuer_public_key}}"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Fetch Issuer Card Setups",
                                    "originalRequest": {
                                        "method": "GET",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/setup/issuer?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "setup",
                                                "issuer"
                                            ],
                                            "query": [
                                                {
                                                    "key": "issuer_id",
                                                    "value": "633412e65e6f1d0012fa45ea"
                                                },
                                                {
                                                    "key": "public_key",
                                                    "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "595"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"253-R/rQx8FFnmRYUu5ILk9vXiec/+A\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 04:46:09 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"638f667f49e729b9af6f0728\",\n            \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n            \"provider\": \"xcel\",\n            \"design\": \"\",\n            \"BIN\": \"506805\",\n            \"CODE\": \"13\",\n            \"programme\": \"\",\n            \"carrier\": \"\",\n            \"delivery_method\": \"\",\n            \"country\": \"GH\",\n            \"card_type\": \"physical\",\n            \"type\": \"INDIVIDUAL\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"638f78284de58051e1d83913\",\n            \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n            \"provider\": \"railsbank\",\n            \"design\": \"ConsumerMVP\",\n            \"BIN\": \"\",\n            \"CODE\": \"\",\n            \"programme\": \"Xcel-MVP-Consumer-GBP-Physical-UK\",\n            \"carrier\": \"standard\",\n            \"delivery_method\": \"standard-first-class\",\n            \"country\": \"GB\",\n            \"card_type\": \"physical\",\n            \"type\": \"INDIVIDUAL\",\n            \"__v\": 0\n        }\n    ]\n}"
                                }
                            ]
                        },
                        {
                            "name": "Update Card Setup",
                            "request": {
                                "method": "PUT",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"card_type\": \"virtual\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/setup/:id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "setup",
                                        ":id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "id",
                                            "value": "638f667f49e729b9af6f0728",
                                            "description": "Enter setup _id"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Update Card Setup",
                                    "originalRequest": {
                                        "method": "PUT",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "body": {
                                            "mode": "raw",
                                            "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"card_type\": \"virtual\"\n}",
                                            "options": {
                                                "raw": {
                                                    "language": "json"
                                                }
                                            }
                                        },
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/setup/:id",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "setup",
                                                ":id"
                                            ],
                                            "variable": [
                                                {
                                                    "key": "id",
                                                    "value": "638f667f49e729b9af6f0728",
                                                    "description": "Enter setup _id"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "48"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"30-8jGbYMhAJZHpcjyFfgGuJl8XChE\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 04:53:14 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": \"Setup updated\"\n}"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "CARD RULES",
                    "item": [
                        {
                            "name": "Create Card Rule",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"period\": \"one\",\n    \"name\": \"$50 single transaction hard cap\",\n    \"value\": \"50\",\n    \"description\": \"No single card transaction can surpass 50\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rules/:type",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rules",
                                        ":type"
                                    ],
                                    "variable": [
                                        {
                                            "key": "type",
                                            "value": "value",
                                            "description": "volume or value. volume is number of transactions while value is maximum amount allowed"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Create Card Rule",
                                    "originalRequest": {
                                        "method": "POST",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "body": {
                                            "mode": "raw",
                                            "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"period\": \"one\",\n    \"name\": \"$50 single transaction hard cap\",\n    \"value\": \"50\",\n    \"description\": \"No single card transaction can surpass 50\"\n}",
                                            "options": {
                                                "raw": {
                                                    "language": "json"
                                                }
                                            }
                                        },
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/rules/:type",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "rules",
                                                ":type"
                                            ],
                                            "variable": [
                                                {
                                                    "key": "type",
                                                    "value": "value",
                                                    "description": "volume or value. volume is number of transactions while value is maximum amount allowed"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "384"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"180-M6bs4AiYq2mOpGMhy5VMtR1j2p4\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 05:06:51 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"card_rule_type\": \"card-max-spend-per-transaction\",\n        \"card_rule_name\": \"$50 single transaction hard cap\",\n        \"card_rule_body\": \"50\",\n        \"card_rule_description\": \"No single card transaction can surpass 50\",\n        \"card_rule_id\": \"63901f6a-e410-4cc6-985d-0b6b64962dca\",\n        \"card_rule_period\": \"one\",\n        \"_id\": \"63901f6a8c6f66a8012bd7a7\",\n        \"__v\": 0\n    }\n}"
                                }
                            ]
                        },
                        {
                            "name": "Fetch Issuer Rules",
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rules?issuer_id={{issuer_id}}&public_key={{issuer_public_key}}",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rules"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "{{issuer_id}}"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "{{issuer_public_key}}"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Fetch Issuer Rules",
                                    "originalRequest": {
                                        "method": "GET",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/rules?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "rules"
                                            ],
                                            "query": [
                                                {
                                                    "key": "issuer_id",
                                                    "value": "633412e65e6f1d0012fa45ea"
                                                },
                                                {
                                                    "key": "public_key",
                                                    "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "386"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"182-nxmJx33zSY8+LyMF6kWNZ4N2LFE\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 05:07:17 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"63901f6a8c6f66a8012bd7a7\",\n            \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n            \"card_rule_type\": \"card-max-spend-per-transaction\",\n            \"card_rule_name\": \"$50 single transaction hard cap\",\n            \"card_rule_body\": \"50\",\n            \"card_rule_description\": \"No single card transaction can surpass 50\",\n            \"card_rule_id\": \"63901f6a-e410-4cc6-985d-0b6b64962dca\",\n            \"card_rule_period\": \"one\",\n            \"__v\": 0\n        }\n    ]\n}"
                                }
                            ]
                        },
                        {
                            "name": "Get Rule By Card Rule Id",
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rule/:card_rule_id?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rule",
                                        ":card_rule_id"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "633412e65e6f1d0012fa45ea"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                        }
                                    ],
                                    "variable": [
                                        {
                                            "key": "card_rule_id",
                                            "value": "63901f6a-e410-4cc6-985d-0b6b64962dca"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Get Rule By Card Rule Id",
                                    "originalRequest": {
                                        "method": "GET",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/rule/:card_rule_id?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "rule",
                                                ":card_rule_id"
                                            ],
                                            "query": [
                                                {
                                                    "key": "issuer_id",
                                                    "value": "633412e65e6f1d0012fa45ea"
                                                },
                                                {
                                                    "key": "public_key",
                                                    "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                                }
                                            ],
                                            "variable": [
                                                {
                                                    "key": "card_rule_id",
                                                    "value": "63901f6a-e410-4cc6-985d-0b6b64962dca"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "384"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"180-oZL1uBp82NvvHI/cpzG9Pb7J35w\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 05:12:24 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"_id\": \"63901f6a8c6f66a8012bd7a7\",\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"card_rule_type\": \"card-max-spend-per-transaction\",\n        \"card_rule_name\": \"$50 single transaction hard cap\",\n        \"card_rule_body\": \"50\",\n        \"card_rule_description\": \"No single card transaction can surpass 50\",\n        \"card_rule_id\": \"63901f6a-e410-4cc6-985d-0b6b64962dca\",\n        \"card_rule_period\": \"one\",\n        \"__v\": 0\n    }\n}"
                                }
                            ]
                        },
                        {
                            "name": "Apply Card Rules",
                            "request": {
                                "method": "PUT",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rules/apply/:card_id/:card_rule_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rules",
                                        "apply",
                                        ":card_id",
                                        ":card_rule_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "card_id",
                                            "value": null
                                        },
                                        {
                                            "key": "card_rule_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Create Rule Set",
                            "request": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"name\": \"Limit Level 1\",\n    \"description\": \"Card Rules for Limit Level 1\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rule-set",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rule-set"
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Create Rule Set",
                                    "originalRequest": {
                                        "method": "POST",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "body": {
                                            "mode": "raw",
                                            "raw": "{\n    \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n    \"public_key\": \"ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669\",\n    \"name\": \"Limit Level 1\",\n    \"description\": \"Card Rules for Limit Level 1\"\n}",
                                            "options": {
                                                "raw": {
                                                    "language": "json"
                                                }
                                            }
                                        },
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/rule-set",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "rule-set"
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "148"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"94-clnjxTRz2y99yFCtDdAJd3edp4s\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 05:28:59 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"name\": \"Limit Level 1\",\n        \"rules\": [],\n        \"_id\": \"6390249af887db44b93e2c95\",\n        \"__v\": 0\n    }\n}"
                                }
                            ]
                        },
                        {
                            "name": "Add Card Rule to Rule Set",
                            "request": {
                                "method": "PUT",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rule-set/:set_id/:card_rule_id?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rule-set",
                                        ":set_id",
                                        ":card_rule_id"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "633412e65e6f1d0012fa45ea"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                        }
                                    ],
                                    "variable": [
                                        {
                                            "key": "set_id",
                                            "value": "6390249af887db44b93e2c95",
                                            "description": "_id of rule set"
                                        },
                                        {
                                            "key": "card_rule_id",
                                            "value": "63901f6a-e410-4cc6-985d-0b6b64962dca",
                                            "description": "card_rule_id of rule"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Add Card Rule to Rule Set",
                                    "originalRequest": {
                                        "method": "PUT",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/rule-set/:set_id/:card_rule_id?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "rule-set",
                                                ":set_id",
                                                ":card_rule_id"
                                            ],
                                            "query": [
                                                {
                                                    "key": "issuer_id",
                                                    "value": "633412e65e6f1d0012fa45ea"
                                                },
                                                {
                                                    "key": "public_key",
                                                    "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                                }
                                            ],
                                            "variable": [
                                                {
                                                    "key": "set_id",
                                                    "value": "6390249af887db44b93e2c95",
                                                    "description": "_id of rule set"
                                                },
                                                {
                                                    "key": "card_rule_id",
                                                    "value": "63901f6a-e410-4cc6-985d-0b6b64962dca",
                                                    "description": "card_rule_id of rule"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "148"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"94-nAUw8MZzBSZzy2Irtk3A8TSZHak\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 05:32:13 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"rules\": [],\n        \"_id\": \"6390249af887db44b93e2c95\",\n        \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n        \"name\": \"Limit Level 1\",\n        \"__v\": 0\n    }\n}"
                                }
                            ]
                        },
                        {
                            "name": "Apply Rule Set to Card",
                            "request": {
                                "method": "PUT",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rule-set/apply/:set_id/:card_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rule-set",
                                        "apply",
                                        ":set_id",
                                        ":card_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "set_id",
                                            "value": null
                                        },
                                        {
                                            "key": "card_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Get Issuer Rule Sets",
                            "request": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{issuer_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/rule-sets?issuer_id={{issuer_id}}&public_key={{issuer_public_key}}",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "rule-sets"
                                    ],
                                    "query": [
                                        {
                                            "key": "issuer_id",
                                            "value": "{{issuer_id}}"
                                        },
                                        {
                                            "key": "public_key",
                                            "value": "{{issuer_public_key}}"
                                        }
                                    ]
                                }
                            },
                            "response": [
                                {
                                    "name": "Get Issuer Rule Sets",
                                    "originalRequest": {
                                        "method": "GET",
                                        "header": [
                                            {
                                                "key": "Authorization",
                                                "value": "{{issuer_token}}",
                                                "type": "text"
                                            }
                                        ],
                                        "url": {
                                            "raw": "{{base_url}}/v1/cards/rule-sets?issuer_id=633412e65e6f1d0012fa45ea&public_key=ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669",
                                            "host": [
                                                "{{base_url}}"
                                            ],
                                            "path": [
                                                "v1",
                                                "cards",
                                                "rule-sets"
                                            ],
                                            "query": [
                                                {
                                                    "key": "issuer_id",
                                                    "value": "633412e65e6f1d0012fa45ea"
                                                },
                                                {
                                                    "key": "public_key",
                                                    "value": "ca45c9f5f1856204ca1c638b06aae0c588d93bd97641e46137ac03ed50128669"
                                                }
                                            ]
                                        }
                                    },
                                    "status": "OK",
                                    "code": 200,
                                    "_postman_previewlanguage": "json",
                                    "header": [
                                        {
                                            "key": "X-Powered-By",
                                            "value": "Express"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Origin",
                                            "value": "*"
                                        },
                                        {
                                            "key": "Access-Control-Allow-Headers",
                                            "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                        },
                                        {
                                            "key": "Content-Type",
                                            "value": "application/json; charset=utf-8"
                                        },
                                        {
                                            "key": "Content-Length",
                                            "value": "188"
                                        },
                                        {
                                            "key": "ETag",
                                            "value": "W/\"bc-BfQGQAYX/Kn7BJ5WLEHNiLV+X1g\""
                                        },
                                        {
                                            "key": "Date",
                                            "value": "Wed, 07 Dec 2022 05:28:03 GMT"
                                        },
                                        {
                                            "key": "Connection",
                                            "value": "keep-alive"
                                        },
                                        {
                                            "key": "Keep-Alive",
                                            "value": "timeout=5"
                                        }
                                    ],
                                    "cookie": [],
                                    "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"639021937e1621020f8c8312\",\n            \"issuer_id\": \"633412e65e6f1d0012fa45ea\",\n            \"name\": \"Limit Level 1\",\n            \"rules\": [\n                \"63901f6a-e410-4cc6-985d-0b6b64962dca\"\n            ],\n            \"__v\": 0\n        }\n    ]\n}"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "CARD MANAGER",
                    "item": [
                        {
                            "name": "Create a Card",
                            "request": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"type\": \"virtual or physical\",\n    \"name\": \"Name on Card\",\n    \"address\": {\n        \"city\": \"london\",\n        \"line1\": \"24 ghana street\",\n        \"line2\": \"pondicherry\",\n        \"state\": \"london\",\n        \"country\": \"GB\",\n        \"post_code\": \"XYZ123\"\n    }\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/card/:user_id/:account_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "card",
                                        ":user_id",
                                        ":account_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": null
                                        },
                                        {
                                            "key": "account_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Fetch User Cards",
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/card/user/:user_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "card",
                                        "user",
                                        ":user_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Fetch Card Details",
                            "request": {
                                "method": "GET",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/card/:card_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "card",
                                        ":card_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "card_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Activate Card",
                            "request": {
                                "method": "PUT",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/card/:card_id/activate",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "card",
                                        ":card_id",
                                        "activate"
                                    ],
                                    "variable": [
                                        {
                                            "key": "card_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Freeze Card",
                            "request": {
                                "method": "PUT",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/card/:card_id/freeze",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "card",
                                        ":card_id",
                                        "freeze"
                                    ],
                                    "variable": [
                                        {
                                            "key": "card_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        },
                        {
                            "name": "Reset Card Pin",
                            "request": {
                                "method": "PUT",
                                "header": [],
                                "url": {
                                    "raw": "{{base_url}}/v1/cards/card/:card_id/pin",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "cards",
                                        "card",
                                        ":card_id",
                                        "pin"
                                    ],
                                    "variable": [
                                        {
                                            "key": "card_id",
                                            "value": null
                                        }
                                    ]
                                }
                            },
                            "response": []
                        }
                    ]
                }
            ]
        },
        {
            "name": "PRODUCTS",
            "item": [
                {
                    "name": "Create Product Categories",
                    "request": {
                        "method": "POST",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\": \"Cars\",\n    \"description\": \"Best Cars for sale\",\n    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n    \"user_id\": \"6396cfaeae5fd92994bab11e\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/products/category",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                "category"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Product Categories",
                            "originalRequest": {
                                "method": "POST",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"name\": \"Cars\",\n    \"description\": \"Best Cars for sale\",\n    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n    \"user_id\": \"6396cfaeae5fd92994bab11e\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/products/category",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        "category"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "200"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"c8-OJ6MjPRFLxpsHJVFM9eVwn5aVy4\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 08:10:22 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"name\": \"Cars\",\n        \"description\": \"Best Cars for sale\",\n        \"user_id\": \"6396cfaeae5fd92994bab11e\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"_id\": \"639984e54e632108342e7d1f\",\n        \"__v\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Create Product",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n    \"name\": \"BMW iX 2023\",\n    \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n    \"images\": [\n        \"https://bucket.xcelapp.com/assets/img1.jpg\",\n        \"https://bucket.xcelapp.com/assets/img2.jpg\",\n        \"https://bucket.xcelapp.com/assets/img3.jpg\",\n        \"https://bucket.xcelapp.com/assets/img4.jpg\",\n        \"https://bucket.xcelapp.com/assets/img5.jpg\",\n        \"https://bucket.xcelapp.com/assets/img6.jpg\",\n        \"https://bucket.xcelapp.com/assets/img7.jpg\",\n        \"https://bucket.xcelapp.com/assets/img8.jpg\"\n    ],\n    \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n    \"description\": \"German Engineering\",\n    \"amount\": 20000,\n    \"currency\": \"GBP\",\n    \"variations\": [\n        {\n            \"name\": \"red\",\n            \"type\": \"color\",\n            \"price\": 21000\n        },\n        {\n            \"name\": \"space-grey\",\n            \"type\": \"color\",\n            \"price\": 21005\n        },\n        {\n            \"name\": \"v6\",\n            \"type\": \"engine-size\",\n            \"price\": 20009\n        }\n    ],\n    \"category_id\": \"639984e54e632108342e7d1f\",\n    \"payment_code\": \"001567\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/products",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Create Product",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n    \"name\": \"BMW iX 2023\",\n    \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n    \"images\": [\n        \"https://bucket.xcelapp.com/assets/img1.jpg\",\n        \"https://bucket.xcelapp.com/assets/img2.jpg\",\n        \"https://bucket.xcelapp.com/assets/img3.jpg\",\n        \"https://bucket.xcelapp.com/assets/img4.jpg\",\n        \"https://bucket.xcelapp.com/assets/img5.jpg\",\n        \"https://bucket.xcelapp.com/assets/img6.jpg\",\n        \"https://bucket.xcelapp.com/assets/img7.jpg\",\n        \"https://bucket.xcelapp.com/assets/img8.jpg\"\n    ],\n    \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n    \"description\": \"German Engineering\",\n    \"amount\": 20000,\n    \"currency\": \"GBP\",\n    \"variations\": [\n        {\n            \"name\": \"red\",\n            \"type\": \"color\",\n            \"price\": 21000\n        },\n        {\n            \"name\": \"space-grey\",\n            \"type\": \"color\",\n            \"price\": 21005\n        },\n        {\n            \"name\": \"v6\",\n            \"type\": \"engine-size\",\n            \"price\": 20009\n        }\n    ],\n    \"category_id\": \"639984e54e632108342e7d1f\",\n    \"payment_code\": \"001567\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/products",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1050"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"41a-m7qREXRsYNJ/EHFjIxqkHHKGMko\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 08:29:08 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"user_id\": \"6396cfaeae5fd92994bab11e\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"name\": \"BMW iX 2023\",\n        \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n        \"images\": [\n            \"https://bucket.xcelapp.com/assets/img1.jpg\",\n            \"https://bucket.xcelapp.com/assets/img2.jpg\",\n            \"https://bucket.xcelapp.com/assets/img3.jpg\",\n            \"https://bucket.xcelapp.com/assets/img4.jpg\",\n            \"https://bucket.xcelapp.com/assets/img5.jpg\",\n            \"https://bucket.xcelapp.com/assets/img6.jpg\",\n            \"https://bucket.xcelapp.com/assets/img7.jpg\",\n            \"https://bucket.xcelapp.com/assets/img8.jpg\"\n        ],\n        \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n        \"description\": \"German Engineering\",\n        \"variations\": [\n            {\n                \"name\": \"red\",\n                \"type\": \"color\",\n                \"price\": 21000,\n                \"_id\": \"639989506518c3ebad9b07ab\"\n            },\n            {\n                \"name\": \"space-grey\",\n                \"type\": \"color\",\n                \"price\": 21005,\n                \"_id\": \"639989506518c3ebad9b07ac\"\n            },\n            {\n                \"name\": \"v6\",\n                \"type\": \"engine-size\",\n                \"price\": 20009,\n                \"_id\": \"639989506518c3ebad9b07ad\"\n            }\n        ],\n        \"amount\": 20000,\n        \"currency\": \"GBP\",\n        \"category_id\": \"639984e54e632108342e7d1f\",\n        \"hide\": false,\n        \"payment_code\": \"001567\",\n        \"_id\": \"639989506518c3ebad9b07aa\",\n        \"__v\": 0\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch User Products",
                    "request": {
                        "method": "GET",
                        "header": [],
                        "url": {
                            "raw": "{{base_url}}/v1/products/user/:user_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                "user",
                                ":user_id"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": null
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch User Products",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/products/user/:user_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        "user",
                                        ":user_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "6396cfaeae5fd92994bab11e"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1233"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"4d1-YtTyBphFDcV72+bxsuy1ne3rqoc\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 08:45:04 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"639989506518c3ebad9b07aa\",\n            \"user_id\": \"6396cfaeae5fd92994bab11e\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2023\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"639989506518c3ebad9b07ab\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"639989506518c3ebad9b07ac\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"639989506518c3ebad9b07ad\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0,\n            \"category\": [\n                {\n                    \"_id\": \"639984e54e632108342e7d1f\",\n                    \"name\": \"Cars\",\n                    \"description\": \"Best Cars for sale\",\n                    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n                    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n                    \"__v\": 0\n                }\n            ]\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch User Product Categories",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/products/categories/:user_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                "categories",
                                ":user_id"
                            ],
                            "variable": [
                                {
                                    "key": "user_id",
                                    "value": "6396cfaeae5fd92994bab11e"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch User Product Categories",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/products/categories/:user_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        "categories",
                                        ":user_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "user_id",
                                            "value": "6396cfaeae5fd92994bab11e"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "202"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"ca-1NUMtRqKAyTEmR056M6avzIwzVU\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 08:47:12 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"639984e54e632108342e7d1f\",\n            \"name\": \"Cars\",\n            \"description\": \"Best Cars for sale\",\n            \"user_id\": \"6396cfaeae5fd92994bab11e\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"__v\": 0\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Category Products",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/products/category/:category_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                "category",
                                ":category_id"
                            ],
                            "variable": [
                                {
                                    "key": "category_id",
                                    "value": "639984e54e632108342e7d1f"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Category Products",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/products/category/:category_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        "category",
                                        ":category_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "category_id",
                                            "value": "639984e54e632108342e7d1f"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1052"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"41c-+zbZwBKlIG/b2yqdFp2gj2x02Vk\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 08:49:29 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": [\n        {\n            \"_id\": \"639989506518c3ebad9b07aa\",\n            \"user_id\": \"6396cfaeae5fd92994bab11e\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2023\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"639989506518c3ebad9b07ab\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"639989506518c3ebad9b07ac\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"639989506518c3ebad9b07ad\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0\n        }\n    ]\n}"
                        }
                    ]
                },
                {
                    "name": "Update Product",
                    "request": {
                        "method": "PUT",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\": \"BMW iX 2024\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/products/:product_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                ":product_id"
                            ],
                            "variable": [
                                {
                                    "key": "product_id",
                                    "value": "639989506518c3ebad9b07aa"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Update Product",
                            "originalRequest": {
                                "method": "PUT",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"name\": \"BMW iX 2024\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/products/:product_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        ":product_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "product_id",
                                            "value": "639989506518c3ebad9b07aa"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "50"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"32-2KWNxCX0ehNpGFSEoKgTF1FGeb0\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 09:01:54 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": \"Product Updated\"\n}"
                        }
                    ]
                },
                {
                    "name": "Update Product Category",
                    "request": {
                        "method": "PUT",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"name\": \"Automobile\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/products/category/:category_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                "category",
                                ":category_id"
                            ],
                            "variable": [
                                {
                                    "key": "category_id",
                                    "value": "639984e54e632108342e7d1f"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Update Product Category",
                            "originalRequest": {
                                "method": "PUT",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"name\": \"Automobile\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/products/category/:category_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        "category",
                                        ":category_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "category_id",
                                            "value": "639984e54e632108342e7d1f"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "51"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"33-OVMXjazXxBWVVJs51h+fwGeVVgA\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 09:06:48 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": \"Category Updated\"\n}"
                        }
                    ]
                },
                {
                    "name": "Fetch Product",
                    "request": {
                        "method": "GET",
                        "header": [
                            {
                                "key": "Authorization",
                                "value": "{{user_token}}",
                                "type": "text"
                            }
                        ],
                        "url": {
                            "raw": "{{base_url}}/v1/products/:product_id",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "products",
                                ":product_id"
                            ],
                            "variable": [
                                {
                                    "key": "product_id",
                                    "value": "639989506518c3ebad9b07aa"
                                }
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Fetch Product",
                            "originalRequest": {
                                "method": "GET",
                                "header": [
                                    {
                                        "key": "Authorization",
                                        "value": "{{user_token}}",
                                        "type": "text"
                                    }
                                ],
                                "url": {
                                    "raw": "{{base_url}}/v1/products/:product_id",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "products",
                                        ":product_id"
                                    ],
                                    "variable": [
                                        {
                                            "key": "product_id",
                                            "value": "639989506518c3ebad9b07aa"
                                        }
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "1231"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"4cf-zTSUqY1K31MVJOrdJidIS5HyyjE\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Wed, 14 Dec 2022 08:58:13 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"_id\": \"639989506518c3ebad9b07aa\",\n        \"user_id\": \"6396cfaeae5fd92994bab11e\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"name\": \"BMW iX 2023\",\n        \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n        \"images\": [\n            \"https://bucket.xcelapp.com/assets/img1.jpg\",\n            \"https://bucket.xcelapp.com/assets/img2.jpg\",\n            \"https://bucket.xcelapp.com/assets/img3.jpg\",\n            \"https://bucket.xcelapp.com/assets/img4.jpg\",\n            \"https://bucket.xcelapp.com/assets/img5.jpg\",\n            \"https://bucket.xcelapp.com/assets/img6.jpg\",\n            \"https://bucket.xcelapp.com/assets/img7.jpg\",\n            \"https://bucket.xcelapp.com/assets/img8.jpg\"\n        ],\n        \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n        \"description\": \"German Engineering\",\n        \"variations\": [\n            {\n                \"name\": \"red\",\n                \"type\": \"color\",\n                \"price\": 21000,\n                \"_id\": \"639989506518c3ebad9b07ab\"\n            },\n            {\n                \"name\": \"space-grey\",\n                \"type\": \"color\",\n                \"price\": 21005,\n                \"_id\": \"639989506518c3ebad9b07ac\"\n            },\n            {\n                \"name\": \"v6\",\n                \"type\": \"engine-size\",\n                \"price\": 20009,\n                \"_id\": \"639989506518c3ebad9b07ad\"\n            }\n        ],\n        \"amount\": 20000,\n        \"currency\": \"GBP\",\n        \"category_id\": \"639984e54e632108342e7d1f\",\n        \"hide\": false,\n        \"payment_code\": \"001567\",\n        \"__v\": 0,\n        \"category\": [\n            {\n                \"_id\": \"639984e54e632108342e7d1f\",\n                \"name\": \"Cars\",\n                \"description\": \"Best Cars for sale\",\n                \"user_id\": \"6396cfaeae5fd92994bab11e\",\n                \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
                        }
                    ]
                }
            ]
        },
        {
            "name": "QR CODE PAYMENTS",
            "item": []
        },
        {
            "name": "BENEFICIARIES",
            "item": []
        },
        {
            "name": "TELLERS & POS",
            "item": []
        },
        {
            "name": "MISCELLANEOUS",
            "item": []
        },
        {
            "name": "CONNECT",
            "item": [
                {
                    "name": "Verify an Account",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"AccountNumber\":\"2348102478822\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/connect/verify",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "connect",
                                "verify"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Invalid Account",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"AccountNumber\":\"2348102478822\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/connect/verify",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "connect",
                                        "verify"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "132"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"84-x8FgYBUJENgK0gqF1ltXO5LXj70\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 30 Jan 2023 14:21:26 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"ChannelCode\": \"0001\",\n    \"DestinationInstitutionCode\": \"0001\",\n    \"SessionID\": \"9000986\",\n    \"AccountNumber\": \"2348102478822\",\n    \"ResponseCode\": \"07\"\n}"
                        },
                        {
                            "name": "Success",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"AccountNumber\":\"2348102478821\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/connect/verify",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "connect",
                                        "verify"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "166"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"a6-Uyqqbx+T59ur611qH2b72bhHMho\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 30 Jan 2023 14:24:35 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"ChannelCode\": \"0001\",\n    \"DestinationInstitutionCode\": \"0001\",\n    \"SessionID\": \"9000986\",\n    \"AccountNumber\": \"2348102478821\",\n    \"ResponseCode\": \"00\",\n    \"AccountName\": \"Sanni Oluwafikayo\"\n}"
                        }
                    ]
                },
                {
                    "name": "Balance",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"TargetAccountNumber\":\"2348102478821\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/connect/balance",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "connect",
                                "balance"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Balance",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"TargetAccountNumber\":\"2348102478821\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/connect/balance",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "connect",
                                        "balance"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "198"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"c6-LqIWRBlhI6CTD9EcLUOm1QSzMMk\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 30 Jan 2023 14:39:04 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"ChannelCode\": \"0001\",\n        \"DestinationInstitutionCode\": \"0001\",\n        \"SessionID\": \"9000986\",\n        \"TargetAccountNumber\": \"2348102478821\",\n        \"ResponseCode\": \"00\",\n        \"AvailableBalance\": \"240.2\"\n    }\n}"
                        }
                    ]
                },
                {
                    "name": "Block Amount",
                    "request": {
                        "method": "POST",
                        "header": [],
                        "body": {
                            "mode": "raw",
                            "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"TargetAccountNumber\":\"2348102478821\",\n    \"Amount\": \"50\"\n}",
                            "options": {
                                "raw": {
                                    "language": "json"
                                }
                            }
                        },
                        "url": {
                            "raw": "{{base_url}}/v1/connect/amount/block",
                            "host": [
                                "{{base_url}}"
                            ],
                            "path": [
                                "v1",
                                "connect",
                                "amount",
                                "block"
                            ]
                        }
                    },
                    "response": [
                        {
                            "name": "Block Amount",
                            "originalRequest": {
                                "method": "POST",
                                "header": [],
                                "body": {
                                    "mode": "raw",
                                    "raw": "{\n    \"ChannelCode\":\"0001\",\n    \"DestinationInstitutionCode\":\"0001\",\n    \"SessionID\":\"9000986\",\n    \"TargetAccountNumber\":\"2348102478821\",\n    \"Amount\": \"50\"\n}",
                                    "options": {
                                        "raw": {
                                            "language": "json"
                                        }
                                    }
                                },
                                "url": {
                                    "raw": "{{base_url}}/v1/connect/amount/block",
                                    "host": [
                                        "{{base_url}}"
                                    ],
                                    "path": [
                                        "v1",
                                        "connect",
                                        "amount",
                                        "block"
                                    ]
                                }
                            },
                            "status": "OK",
                            "code": 200,
                            "_postman_previewlanguage": "json",
                            "header": [
                                {
                                    "key": "X-Powered-By",
                                    "value": "Express"
                                },
                                {
                                    "key": "Access-Control-Allow-Origin",
                                    "value": "*"
                                },
                                {
                                    "key": "Access-Control-Allow-Headers",
                                    "value": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
                                },
                                {
                                    "key": "Content-Type",
                                    "value": "application/json; charset=utf-8"
                                },
                                {
                                    "key": "Content-Length",
                                    "value": "185"
                                },
                                {
                                    "key": "ETag",
                                    "value": "W/\"b9-UulJWAdQS7qwFiTQDOyXx1BAK3I\""
                                },
                                {
                                    "key": "Date",
                                    "value": "Mon, 30 Jan 2023 14:51:29 GMT"
                                },
                                {
                                    "key": "Connection",
                                    "value": "keep-alive"
                                },
                                {
                                    "key": "Keep-Alive",
                                    "value": "timeout=5"
                                }
                            ],
                            "cookie": [],
                            "body": "{\n    \"status\": true,\n    \"meta\": {},\n    \"data\": {\n        \"ChannelCode\": \"0001\",\n        \"DestinationInstitutionCode\": \"0001\",\n        \"SessionID\": \"9000986\",\n        \"TargetAccountNumber\": \"2348102478821\",\n        \"Amount\": \"50\",\n        \"ResponseCode\": \"00\"\n    }\n}"
                        }
                    ]
                }
            ]
        }
    ]
};
//# sourceMappingURL=postman.js.map