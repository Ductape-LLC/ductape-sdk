// @ts-nocheck
const data = {
	"info": {
		"_postman_id": "550e6a6b-08a4-40ea-8e17-489f271016a1",
		"name": "XCEL V2",
		"description": "**1\\. Introduction**\n\nXCel as a Service (XaaS) provides a comprehensive set of methods and functions to seamlessly integrate your application or service with the XCel payments ecosystem.\n\n**2\\. Base URL**\n\nStaging Environment: [`https://sandbox-api.xcelapp.com/xas/v1`](https://sandbox-api.xcelapp.com/xas/v1`)\n\nProduction Environment: N/A\n\n**3\\. Authentication**\n\nOur API endpoints employ HMAC Authentication mechanism for request authentication. HMAC is an acronym for Hash-Based Message Authentication Code.\n\n**3.1 Using HMAC for Request Authentication:**\n\nThis authentication method is typically employed in environments lacking VPN, dedicated IP, or shared servers. You will be provided with a user secret, which will be utilized to calculate a digest hash. This hash will then be sent as headers in every request. Each request will have a unique digest, ensuring security.\n\n**3.2 Calculation of HMAC Digest Signature**\n\n**Prerequisites**:\n\n\\- Request body (if available): For example, \\`{ \"name\":\"tayo\" }\\`, otherwise, an empty object (\\`{}\\`)\n\n\\- App ID: Client application ID\n\n\\- Issuer ID: Client Issuer ID\n\n\\- Public key: Client public key\n\n**Steps to compute HMAC Digest signature:**\n\nStep 1: Create a JSON_PAYLOAD_STRING by converting the request payload to a JSON string. Even if the payload is empty, convert an empty object.\n\nStep 2: Construct a security string with the following format: \\`JSON_PAYLOAD_STRING + 'etz' + APP_ID + 'etz' + PUBLIC_KEY + 'etz' + ISSUER_ID\\`\n\nStep 3: Encode the Payload_Hash in Base64 (if applicable). \\`ENCODED_PAYLOAD = ConvertToBase64(PAYLOAD_HASH)\\`\n\nStep 4: Create a security string for the current request. \\`SECURED_STRING = REQUEST_TYPE + ENDPOINT + TIMESTAMP + ENCODED_PAYLOAD;\\`\n\nStep 5: Perform UTF-8 encoding of the Secured String. \\`ENCODED_SECURED_STRING = Encode_UTF8(SECURED_STRING)\\`\n\nStep 6: Sign the encoded secured string using HMAC (SHA-512) with your user secret. \\`HASH_SIGNATURE = HASH_HMAC_SHA512(Key: YOUR_USER_SECRET, Message: ENCODED_SECURED_STRING)\\`\n\nStep 7: Convert the HASH_SIGNATURE to base64. \\`FINAL_SIGNATURE = ConvertToBase64(HASH_SIGNATURE)\\`\n\n**Example Code Implementations**\n\n``` javascript\nconst crypto = require(\"crypto\");\n// This should be empty for GET requests\nconst requestBody = {\n  \"identifier\": \"+2349012345584\",\n  \"password\": \"password\"\n};\nconst APP_ID = \"640b79494567f7cb1531a666\";\nconst ISSUER_ID = \"640b79987667f7cb1531a65f\";\nconst publicKey =\n  \"eTz.test_e87f28c998E4358767b4d572414c7155f403fe3589806e3e346ff5d0b432326\";\nconst boatPayloadStr = JSON.stringify(requestBody);\nconst boatHashStr = `${boatPayloadStr}etz${APP_ID}etz${publicKey}etz${ISSUER_ID}`;\nconst xAuthHeader = crypto\n  .createHmac(\"sha512\", publicKey)\n  .update(boatHashStr, \"utf-8\")\n  .digest(\"base64\");\n\n```\n\n``` dart\nimport 'dart:convert';\nimport 'package:crypto/crypto.dart';\nvoid main() {\n  // This should be empty for GET requests\n  final requestBody = {\n    \"identifier\": \"+2349012345584\",\n    \"password\": \"password\"\n  };\n  final String APP_ID = \"640b794e6667f7cb1531a666\";\n  final String ISSUER_ID = \"640b794d6667f7cb1531a65f\";\n  final String publicKey =\n    \"eTz.test_e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326\";\n  final boatPayloadStr = jsonEncode(requestBody);\n  final boatHashStr =\n    '$boatPayloadStr' 'etz$APP_ID' 'etz$publicKey' 'etz$ISSUER_ID';\n  final hmac = Hmac(sha512, utf8.encode(publicKey));\n  final xAuthHeader = base64.encode(hmac.convert(utf8.encode(boatHashStr)).bytes);\n}\n\n```\n\n**4\\. Response Code**\n\nA successful transaction or activity request is indicated by an HTTP response code of 200/201 (OK) and success: true. Any other response code implies a failed request. It is important to examine the code property directly in the main response body before determining if the transaction has genuinely failed.",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "25958647",
		"_collection_link": "https://restless-eclipse-208583.postman.co/workspace/eTranzact-Global-Workspace~2c6e2a0e-ef3c-4b0b-8eab-1d6d2fd6da81/collection/24495425-550e6a6b-08a4-40ea-8e17-489f271016a1?action=share&creator=25958647&source=collection_link"
	},
	"item": [
		{
			"name": "ACCOUNTS (UPDATED)",
			"item": [
				{
					"name": "auth",
					"item": [
						{
							"name": "issuer login",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"pm.test(\"Save Issuer Token\", function () {",
											"    var jsonData = pm.response.json();",
											"    pm.environment.set(\"USER_TOKEN\", jsonData.data.token);",
											"});"
										],
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "nS9MxJkb9CsMlyj3dj3L2kB4O+2k2A2MpBXornn2A8t/hgMdnYtuap9kSb09tTgX7HGo/ONRzJLqOb2CG3ZSMA==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"email\":\"regideso@etranzactglobal.com\",\n    \"password\":\"password\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/login",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"issuer",
										"login"
									]
								},
								"description": "Login as an issuer. This allows you to get the needed credentials and keys to operate your issuer functions"
							},
							"response": [
								{
									"name": "Issuer Login",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "nS9MxJkb9CsMlyj3dj3L2kB4O+2k2A2MpBXornn2A8t/hgMdnYtuap9kSb09tTgX7HGo/ONRzJLqOb2CG3ZSMA==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"email\":\"regideso@etranzactglobal.com\",\n    \"password\":\"password\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/login",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"issuer",
												"login"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Issuer login successful\",\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBiNzk0ZDY2NjdmN2NiMTUzMWE2NWYiLCJjb21wYW55X25hbWUiOiJSZWdpZGVzbyIsImRlc2NyaXB0aW9uIjoiQmlsbCBwYXltZW50IHBsYXRmb3JtIiwibG9nbyI6Imh0dHBzOi8vYWRtaW4ueGNlbGFwcC5jb20vYXNzZXRzL2ltYWdlcy9tYWlubG9nby5wbmciLCJiYW5rX3JvdXRlX2NvZGUiOiIwMDIiLCJwZXJtaXNzaW9ucyI6eyJpbnRlcm5hdGlvbmFsX3RyYW5zZmVycyI6ZmFsc2UsImxvY2FsX2ludHJhX3RyYW5zZmVycyI6ZmFsc2UsImxvY2FsX2ludGVyX3RyYW5zZmVycyI6ZmFsc2UsImxvY2FsX2JpbGxfcGF5bWVudHMiOmZhbHNlLCJsb2NhbF9haXJ0aW1lX2RhdGEiOmZhbHNlLCJsb2NhbF9sb2FuX3NlcnZpY2VzIjpmYWxzZSwicG9zX3RyYW5zYWN0aW9ucyI6ZmFsc2UsImFjY291bnRfY3JlYXRpb24iOnRydWUsInBvdHMiOmZhbHNlLCJjdXN0b21fZmVlcyI6ZmFsc2UsImN1c3RvbV9saW1pdHMiOmZhbHNlfSwiaXNfYWN0aXZlIjpmYWxzZSwibWFzdGVyX2lzc3VlciI6ZmFsc2UsImNyZWF0ZWQiOiIyMDIzLTAzLTEwVDE4OjM5OjA5LjQyOVoiLCJfX3YiOjAsImlhdCI6MTY4MjY4MDk0OSwiZXhwIjoxNjgyNzY3MzQ5fQ.RUI-VaEhjCOx26kRKcr9ml_AfLKyZ4cZ3GVj6iHLvLE\",\n        \"_id\": \"640b794d6667f7cb1531a662\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"name\": \"Regideso\",\n        \"email\": \"regideso@etranzactglobal.com\",\n        \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n        \"__v\": 0,\n        \"issuer_details\": [\n            {\n                \"_id\": \"640b794d6667f7cb1531a65f\",\n                \"company_name\": \"Regideso\",\n                \"description\": \"Bill payment platform\",\n                \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n                \"bank_route_code\": \"002\",\n                \"permissions\": {\n                    \"international_transfers\": false,\n                    \"local_intra_transfers\": false,\n                    \"local_inter_transfers\": false,\n                    \"local_bill_payments\": false,\n                    \"local_airtime_data\": false,\n                    \"local_loan_services\": false,\n                    \"pos_transactions\": false,\n                    \"account_creation\": true,\n                    \"pots\": false,\n                    \"custom_fees\": false,\n                    \"custom_limits\": false\n                },\n                \"is_active\": false,\n                \"master_issuer\": false,\n                \"created\": \"2023-03-10T18:39:09.429Z\",\n                \"__v\": 0\n            }\n        ],\n        \"issuer\": {\n            \"_id\": \"640b794d6667f7cb1531a65f\",\n            \"company_name\": \"Regideso\",\n            \"description\": \"Bill payment platform\",\n            \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n            \"bank_route_code\": \"002\",\n            \"permissions\": {\n                \"international_transfers\": false,\n                \"local_intra_transfers\": false,\n                \"local_inter_transfers\": false,\n                \"local_bill_payments\": false,\n                \"local_airtime_data\": false,\n                \"local_loan_services\": false,\n                \"pos_transactions\": false,\n                \"account_creation\": true,\n                \"pots\": false,\n                \"custom_fees\": false,\n                \"custom_limits\": false\n            },\n            \"is_active\": false,\n            \"master_issuer\": false,\n            \"created\": \"2023-03-10T18:39:09.429Z\",\n            \"__v\": 0,\n            \"public_key\": \"eTz.test_e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326\"\n        }\n    }\n}"
								}
							]
						},
						{
							"name": "user login",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"pm.test('Save user token', ()=> {",
											"    const response = pm.response.json();",
											"    pm.environment.set('USER_TOKEN', response.data.token)",
											"})"
										],
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"auth": {
									"type": "noauth"
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "/iGt0QeG0fjbId0zCDdb5nE6BmGLGUNm3yy+pchDTvlqSOIf8Hg+GpmDdsDGxACecCqlrVq4X4RI/SlosAfeQg==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"identifier\":\"user2@yahoo.com\",\n    \"password\":\"password\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/user/login",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"user",
										"login"
									]
								}
							},
							"response": [
								{
									"name": "user login",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "640b794e6667f7cb1531a666",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "640b794d6667f7cb1531a65f",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "nS9MxJkb9CsMlyj3dj3L2kB4O+2k2A2MpBXornn2A8t/hgMdnYtuap9kSb09tTgX7HGo/ONRzJLqOb2CG3ZSMA==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"access\": {\n        \"identifier\":\"adminuser6@yahoo.com\",\n        \"password\":\"password\"\n    }\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "https://sandbox-api.xcelapp.com/xas/v1/accounts/user/login",
											"protocol": "https",
											"host": [
												"sandbox-api",
												"xcelapp",
												"com"
											],
											"path": [
												"xas",
												"v1",
												"accounts",
												"user",
												"login"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"User logged in successfully\",\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub3RpZmljYXRpb24iOnsidHlwZSI6ImZpcmViYXNlIiwidG9rZW4iOiJlaUh0SUNhWFFqTzlTdjI5Vmt0NzZlOkFQQTkxYkYtZmlwSEQ1cFNZZ0hib1ZRSlgtWFNHTWhpeHVJdXBtaElFNEdmWWEzMEp1alBhOTZLX3JLWFVzR2p0N1M0Q2tORzBsYWV1RENtOFdGRmNSTUJfNnBMNFZnYzYtYXFMR2FPSTQ4RFRlY0U5Z0tmU0d4UllCdldkOU1JOFBvM0R5ZmtycUJRIn0sInVzZXJfaW5mbyI6eyJ1c2VyX3R5cGUiOiJJTkRJVklEVUFMIiwicGVyc29uIjp7ImZpcnN0X25hbWUiOiJVc2VyIiwibGFzdF9uYW1lIjoiMSIsIm1hcml0YWxfc3RhdHVzIjpmYWxzZSwiZW1wbG95bWVudF9zdGF0dXMiOmZhbHNlLCJkYXRlT2ZCaXJ0aCI6IjIwMDQtMDEtMDEiLCJlbWFpbCI6InVzZXIxQHlhaG9vLmNvbSIsImdlbmRlciI6Im1hbGUiLCJfaWQiOiI2NDI2OWUyZDJkMWYwNmMwNDZhMDEzN2IiLCJwaG9uZSI6IisyMzQ5MDEyMzQ1NTg0In19LCJhZGRyZXNzZXMiOnsiYWRkcmVzcyI6eyJsaW5lMSI6IjQyIE9rZXN1bmEgc3RyZWV0IiwibGluZTIiOiIiLCJjaXR5IjoiWWFiYSIsImNvdW50cnkiOiJORyIsInN0YXRlIjoiTGFnb3MiLCJwb3N0X2NvZGUiOiIxMDAwMDAxIiwiX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdjIn0sIm1haWxpbmdfYWRkcmVzcyI6eyJsaW5lMSI6IjQyIE9rZXN1bmEgc3RyZWV0IiwibGluZTIiOiIiLCJjaXR5IjoiWWFiYSIsImNvdW50cnkiOiJORyIsInN0YXRlIjoiTGFnb3MiLCJwb3N0X2NvZGUiOiIxMDAwMDAxIiwiX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdkIn19LCJfaWQiOiI2NDI2OWUyZDJkMWYwNmMwNDZhMDEzN2EiLCJpc3N1ZXJfaWQiOiI2NDBiNzk0ZDY2NjdmN2NiMTUzMWE2NWYiLCJhcHBfaWQiOiI2NDBiNzk0ZTY2NjdmN2NiMTUzMWE2NjYiLCJjb3VudHJ5X29mX3Jlc2lkZW5jZSI6Ik5HIiwicHJlZmVyZW5jZXMiOnsicmVxdWlyZV9hdXRob3JpemVycyI6ZmFsc2UsInNlY3VyZV9sb2dpbiI6ZmFsc2UsImFsbG93RXh0cmFBY2Nlc3MiOmZhbHNlLCJkaXNhYmxlZCI6ZmFsc2UsInZlcnNpb25fbG9ja2VkIjpmYWxzZSwidHJ1c3RlZCI6ZmFsc2UsImNsb3NlZCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsIl9pZCI6IjY0MjY5ZTJkMmQxZjA2YzA0NmEwMTM3ZSJ9LCJ1cGRhdGVkIjoiMjAyMy0wMy0zMVQwODo0Nzo0MS43MjRaIiwiX192IjowLCJ1c2VyX2tleSI6ImVUei50ZXN0XzRjYTRkYzZlMTYyOTYwOWRmMGEyNzA5ODkxNzRjZjQ3NGRhODhkYTIyMzA5NTM4Mzk2YjhkZTNmZTQ4NTBmNDgiLCJpYXQiOjE2ODUwOTk5OTUsImV4cCI6MTY4NTE4NjM5NX0.-vYRyPfMpdBHCraITzwIKSM0FuRR5FIHdqzWkj82x8Q\",\n        \"user\": {\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"eiHtICaXQjO9Sv29Vkt76e:APA91bF-fipHD5pSYgHboVQJX-XSGMhixuIupmhIE4GfYa30JujPa96K_rKXUsGjt7S4CkNG0laeuDCm8WFFcRMB_6pL4Vgc6-aqLGaOI48DTecE9gKfSGxRYBvWd9MI8Po3DyfkrqBQ\"\n            },\n            \"user_info\": {\n                \"user_type\": \"INDIVIDUAL\",\n                \"person\": {\n                    \"first_name\": \"User\",\n                    \"last_name\": \"1\",\n                    \"marital_status\": false,\n                    \"employment_status\": false,\n                    \"dateOfBirth\": \"2004-01-01\",\n                    \"email\": \"user1@yahoo.com\",\n                    \"gender\": \"male\",\n                    \"_id\": \"64269e2d2d1f06c046a0137b\",\n                    \"phone\": \"+2349012345584\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"42 Okesuna street\",\n                    \"line2\": \"\",\n                    \"city\": \"Yaba\",\n                    \"country\": \"NG\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"1000001\",\n                    \"_id\": \"64269e2d2d1f06c046a0137c\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"42 Okesuna street\",\n                    \"line2\": \"\",\n                    \"city\": \"Yaba\",\n                    \"country\": \"NG\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"1000001\",\n                    \"_id\": \"64269e2d2d1f06c046a0137d\"\n                }\n            },\n            \"_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"app_id\": \"640b794e6667f7cb1531a666\",\n            \"country_of_residence\": \"NG\",\n            \"preferences\": {\n                \"require_authorizers\": false,\n                \"secure_login\": false,\n                \"allowExtraAccess\": false,\n                \"disabled\": false,\n                \"version_locked\": false,\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"_id\": \"64269e2d2d1f06c046a0137e\"\n            },\n            \"updated\": \"2023-03-31T08:47:41.724Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_4ca4dc6e1629609df0a270989174cf474da88da22309538396b8de3fe4850f48\"\n        },\n        \"issuer\": {\n            \"permissions\": {\n                \"international_transfers\": false,\n                \"local_intra_transfers\": false,\n                \"local_inter_transfers\": false,\n                \"local_bill_payments\": false,\n                \"local_airtime_data\": false,\n                \"local_loan_services\": false,\n                \"pos_transactions\": false,\n                \"account_creation\": true,\n                \"pots\": false,\n                \"custom_fees\": false,\n                \"custom_limits\": false\n            },\n            \"_id\": \"640b794d6667f7cb1531a65f\",\n            \"company_name\": \"Regideso\",\n            \"description\": \"Bill payment platform\",\n            \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n            \"bank_route_code\": \"002\",\n            \"is_active\": false,\n            \"master_issuer\": false,\n            \"created\": \"2023-03-10T18:39:09.429Z\",\n            \"__v\": 0\n        }\n    }\n}"
								}
							]
						},
						{
							"name": "user login with token",
							"request": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "0KaHH/Krkml0zHU1B5LO8N2WiNAg2jwTtIksNJnuvJEq7Az7M7s+3WeEGwnL7fmoV+4lym80ta/cCXJcy6nTYw==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"identifier\": \"adminuser6@yahoo.com\",\n    \"OTP\": \"111111\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/user/login/withToken",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"user",
										"login",
										"withToken"
									]
								}
							},
							"response": [
								{
									"name": "user login with token",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "0KaHH/Krkml0zHU1B5LO8N2WiNAg2jwTtIksNJnuvJEq7Az7M7s+3WeEGwnL7fmoV+4lym80ta/cCXJcy6nTYw==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"identifier\": \"adminuser6@yahoo.com\",\n    \"OTP\": \"111111\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/user/login/withToken",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"user",
												"login",
												"withToken"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"User token login successful\",\n    \"data\": {\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRiZWUxZWY3OTM4MTJmZmJkNTlhZjAiLCJuYW1lIjoiQWRtaW4gVXNlciAxIiwidXNlcl9pZCI6IjY0NGJlZTFlZjc5MzgxMmZmYmQ1OWFlYiIsImlkZW50aWZpZXIiOiJhZG1pbnVzZXI2QHlhaG9vLmNvbSIsInBpbiI6IjAzYWM2NzQyMTZmM2UxNWM3NjFlZTFhNWUyNTVmMDY3OTUzNjIzYzhiMzg4YjQ0NTllMTNmOTc4ZDdjODQ2ZjQiLCJhY2Nlc3NfbGV2ZWwiOiJBTEwiLCJpc3N1ZXJfaWQiOiI2NDBiNzk0ZDY2NjdmN2NiMTUzMWE2NWYiLCJhY3RpdmUiOmZhbHNlLCJfX3YiOjAsImlhdCI6MTY4MzExODg2NCwiZXhwIjoxNjgzMjA1MjY0fQ.1YDdaVfuSk2uRHeM_wpyFtKkkPCoFxYVIYxL6J19rb0\",\n        \"user\": {\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"user_info\": {\n                \"user_type\": \"ADMIN\",\n                \"company\": {\n                    \"name\": \"issuer test 2\",\n                    \"registration_no\": \"AC-98E982e31\",\n                    \"company_type\": \"Edtech\",\n                    \"email\": \"douye@yahoo.com\",\n                    \"phone\": \"09066027359\",\n                    \"kyc_done\": false,\n                    \"volume_expected\": \"200000000\",\n                    \"value_expected\": \"200000000\",\n                    \"_id\": \"644bee1ef793812ffbd59aec\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"644bee1ef793812ffbd59aed\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"644bee1ef793812ffbd59aee\"\n                }\n            },\n            \"_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"app_id\": \"640b794e6667f7cb1531a666\",\n            \"country_of_residence\": \"NG\",\n            \"updated\": \"2023-04-28T16:02:38.603Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_bcf602ae3c3ec950062e2e81eadc8617fcb59e12be058f00bb1bb55d16aaa196\"\n        },\n        \"issuer\": {\n            \"permissions\": {\n                \"international_transfers\": false,\n                \"local_intra_transfers\": false,\n                \"local_inter_transfers\": false,\n                \"local_bill_payments\": false,\n                \"local_airtime_data\": false,\n                \"local_loan_services\": false,\n                \"pos_transactions\": false,\n                \"account_creation\": true,\n                \"pots\": false,\n                \"custom_fees\": false,\n                \"custom_limits\": false\n            },\n            \"_id\": \"640b794d6667f7cb1531a65f\",\n            \"company_name\": \"Regideso\",\n            \"description\": \"Bill payment platform\",\n            \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo.png\",\n            \"bank_route_code\": \"002\",\n            \"is_active\": false,\n            \"master_issuer\": false,\n            \"created\": \"2023-03-10T18:39:09.429Z\",\n            \"__v\": 0\n        }\n    }\n}"
								}
							]
						}
					],
					"description": "User authentication related endpoints"
				},
				{
					"name": "app",
					"item": [
						{
							"name": "create issuer app",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "l1G7d2veyQIvOrJ/lltceHB9i1RVwFF6uRFHQ0VdPQm0vzyua/UWgg2BDEenMF4WFppF5tbXu5j3RikMkJMYxQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"app_name\": \"Test App\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n    \"colors\": {\n        \"primary\": \"#000000\",\n        \"secondary\": \"#000000\",\n        \"accent\": \"#000000\",\n        \"background\": \"#ffffff\"\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/create",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"app",
										"create"
									]
								},
								"description": "Whenever you create an app, you create the ability to access app functions"
							},
							"response": [
								{
									"name": "Create an App",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "l1G7d2veyQIvOrJ/lltceHB9i1RVwFF6uRFHQ0VdPQm0vzyua/UWgg2BDEenMF4WFppF5tbXu5j3RikMkJMYxQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"app_name\": \"Test App\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n    \"colors\": {\n        \"primary\": \"#000000\",\n        \"secondary\": \"#000000\",\n        \"accent\": \"#000000\",\n        \"background\": \"#ffffff\"\n    }\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/create",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"app",
												"create"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"App created successfully\",\n    \"data\": {\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"app_name\": \"Test App\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n        \"colors\": {\n            \"primary\": \"#000000\",\n            \"secondary\": \"#000000\",\n            \"accent\": \"#000000\",\n            \"background\": \"#ffffff\"\n        },\n        \"active\": false,\n        \"_id\": \"644bab3da5510a445b819b04\",\n        \"__v\": 0\n    }\n}"
								}
							]
						},
						{
							"name": "get issuer app",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/:app_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"app",
										":app_id"
									],
									"variable": [
										{
											"key": "app_id",
											"value": "{{APP_ID}}"
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
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/:app_id",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"app",
												":app_id"
											],
											"variable": [
												{
													"key": "app_id",
													"value": "{{APP_ID}}"
												}
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"App returned successfully\",\n    \"data\": {\n        \"colors\": {\n            \"primary\": \"#000000\",\n            \"secondary\": \"#000000\",\n            \"accent\": \"#000000\",\n            \"background\": \"#ffffff\"\n        },\n        \"_id\": \"640b794e6667f7cb1531a666\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"app_name\": \"Test App Updated3\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n        \"active\": false,\n        \"private_key\": \"d9162ec0-bf72-11ed-8167-ad639752562c\",\n        \"__v\": 0\n    }\n}"
								}
							]
						},
						{
							"name": "generate app keys",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"pm.test(\"Save App token\", () => {",
											"    const response = pm.response.json();",
											"    pm.environment.set('APP_TOKEN', response.data.token);",
											"})"
										],
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "Wz64VSQPELwT/ixbf0ISosQxK57OWQHnzF4NY86qESmcZ/fXNOz0E+7kdQ6dpBYdfxDBaukdX7jW0yYdsfkQlg==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"app_id\":\"640b794e6667f7cb1531a666\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/keys",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"app",
										"keys"
									]
								},
								"description": "These keys are used to perform app functions and should not be stored on frontend clients"
							},
							"response": [
								{
									"name": "Generate App Keys",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "Wz64VSQPELwT/ixbf0ISosQxK57OWQHnzF4NY86qESmcZ/fXNOz0E+7kdQ6dpBYdfxDBaukdX7jW0yYdsfkQlg==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"app_id\":\"640b794e6667f7cb1531a666\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/keys",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"app",
												"keys"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"App keys returned successfully\",\n    \"data\": {\n        \"app_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\",\n        \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xvcnMiOnsicHJpbWFyeSI6IiMwMDAwMDAiLCJzZWNvbmRhcnkiOiIjMDAwMDAwIiwiYWNjZW50IjoiIzAwMDAwMCIsImJhY2tncm91bmQiOiIjZmZmZmZmIn0sIl9pZCI6IjY0MGI3OTRlNjY2N2Y3Y2IxNTMxYTY2NiIsImlzc3Vlcl9pZCI6IjY0MGI3OTRkNjY2N2Y3Y2IxNTMxYTY1ZiIsImFwcF9uYW1lIjoiVGVzdCBBcHAgVXBkYXRlZDMiLCJsb2dvIjoiaHR0cHM6Ly9hZG1pbi54Y2VsYXBwLmNvbS9hc3NldHMvaW1hZ2VzL2xvZ28ucG5nIiwiYWN0aXZlIjpmYWxzZSwiX192IjowLCJpYXQiOjE2ODI2ODA5MjAsImV4cCI6MTY4Mjc2NzMyMH0.6gWFpbl2evsxBXJK1XaYS2Ne6RJO_pheNIIPNQ6IOZM\",\n        \"token_type\": \"Bearer\"\n    }\n}"
								}
							]
						},
						{
							"name": "update app",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "PUT",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "yjn1liQaN/V1ftp4KvQKsbopd4q3MqUKvbQZNtVyybgYGk47mRi2nyEeYtPjcb+ne5Qc3jo3JFauqd5bsSBnzQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"app_name\": \"Test App Updated3\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/update",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"app",
										"update"
									]
								},
								"description": "Whenever you create an app, you create the ability to access app functions"
							},
							"response": [
								{
									"name": "Update app information",
									"originalRequest": {
										"method": "PUT",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "l1G7d2veyQIvOrJ/lltceHB9i1RVwFF6uRFHQ0VdPQm0vzyua/UWgg2BDEenMF4WFppF5tbXu5j3RikMkJMYxQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"app_name\": \"Test App Updated3\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/app/update",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"app",
												"update"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"App details updated successfully\",\n    \"data\": {\n        \"_id\": \"640b794e6667f7cb1531a666\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"app_name\": \"Test App Updated3\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/logo.png\",\n        \"active\": false,\n        \"__v\": 0,\n        \"public_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\"\n    }\n}"
								}
							]
						}
					]
				},
				{
					"name": "ip address",
					"item": [
						{
							"name": "add whitelisted ips to app",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											""
										],
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "8y7nZnpdzNQH/GFdNrN/MG60BbTPLtsKTsyNLEvxGjIPSrGcDVyS3xBQmbDDDqZP4V9SyfRTmHBE+UxvFqA2ww==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"ip_addresses\": [{\n        \"app_id\": \"640b794e6667f7cb1531a666\",\n        \"ip_address\": \"00.000.00.02\",\n        \"app_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\"\n    }]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/whitelist/ip",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "8y7nZnpdzNQH/GFdNrN/MG60BbTPLtsKTsyNLEvxGjIPSrGcDVyS3xBQmbDDDqZP4V9SyfRTmHBE+UxvFqA2ww==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"ip_addresses\": [{\n        \"app_id\": \"640b794e6667f7cb1531a666\",\n        \"ip_address\": \"00.000.00.02\",\n        \"app_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\"\n    }]\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/whitelist/ip",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"whitelist",
												"ip"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Ip Address added successfully\",\n    \"data\": [\n        {\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"app_id\": \"640b794e6667f7cb1531a666\",\n            \"ip_address\": \"00.000.00.02\",\n            \"_id\": \"644bac1a036ca6c4eea3ce98\",\n            \"__v\": 0\n        }\n    ]\n}"
								},
								{
									"name": "Conflicting IP addresses",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "8y7nZnpdzNQH/GFdNrN/MG60BbTPLtsKTsyNLEvxGjIPSrGcDVyS3xBQmbDDDqZP4V9SyfRTmHBE+UxvFqA2ww==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"ip_addresses\": [{\n        \"app_id\": \"640b794e6667f7cb1531a666\",\n        \"ip_address\": \"00.000.00.02\",\n        \"app_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\"\n    }]\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/whitelist/ip",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"whitelist",
												"ip"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": false,\n    \"error\": \"ConflictException\",\n    \"statusCode\": 409,\n    \"message\": \"App with IP already exists\",\n    \"stack\": {}\n}"
								}
							]
						},
						{
							"name": "remove whitelisted ips from app",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "DELETE",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "aMfVgvTA2oAR0JxjoPijwu9aOpan9vSO4NnxlNPm1nT1912pVnvYK/QClGE0zGq2AiV1bofHVuXOkuJ6O1Jivw==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"ip_address\": \"00.000.00.02\",\n    \"app_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/whitelist/ip",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "aMfVgvTA2oAR0JxjoPijwu9aOpan9vSO4NnxlNPm1nT1912pVnvYK/QClGE0zGq2AiV1bofHVuXOkuJ6O1Jivw==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"ip_address\": \"00.000.00.02\",\n    \"app_key\": \"eTz.test_db67a1674e941b7da0bcd7aaf87ec7078bbd3ee19a469b1955c608f1536b2fd7\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/whitelist/ip",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"whitelist",
												"ip"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Ip Address removed successfully\",\n    \"data\": {\n        \"_id\": \"644babde02e6e6b2f8a490a3\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"app_id\": \"640b794e6667f7cb1531a666\",\n        \"ip_address\": \"00.000.00.02\",\n        \"__v\": 0\n    }\n}"
								}
							]
						}
					]
				},
				{
					"name": "issuer",
					"item": [
						{
							"name": "create operation country and currencies",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "idTQJtJleWR3AISHzCdqbbeGeJyGp6RqSMHL/yFBnstp3LmSp2kx1Lw8s5XKEQm+kwtKEZdKeD6gKckoCnZVZQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"countries\": [\n        {\n            \"iso_code_2\": \"IND\",\n            \"currencies\": [\n                {\n                    \"currency_code\": \"NGN\"\n                },\n                {\n                    \"currency_code\": \"USD\"\n                },\n                {\n                    \"currency_code\": \"GHS\"\n                },\n                {\n                    \"currency_code\": \"GBP\"\n                }\n            ]\n        },\n        {\n            \"iso_code_2\": \"GB\",\n            \"currencies\": [\n                {\n                    \"currency_code\": \"NGN\"\n                },\n                {\n                    \"currency_code\": \"USD\"\n                },\n                {\n                    \"currency_code\": \"GHS\"\n                },\n                {\n                    \"currency_code\": \"GBP\"\n                },\n                {\n                    \"currency_code\": \"EUR\"\n                }\n            ]\n        }\n    ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/ops/countries",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"name": "issuer registration dev",
							"request": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "vpWFiVAPHbuv0X8z9jDVJOnEqAFKu84W/yV/Ag0KxsiPOuE9pdz+CBaAAzbyt9DVSjCwNWPiq2417ZVZb1nNvA==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"company_name\": \"issuer test 4\",\n    \"description\": \"Bill payment platform\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo4.png\",\n    \"access\": [{\n        \"name\": \"Regideso\",\n        \"email\": \"douye2@yahoo.com\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\"\n    }]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/register",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"issuer",
										"register"
									]
								},
								"description": "As a third party partner, you are expected to create an Issuer account with us. This is the first step of the integration process"
							},
							"response": [
								{
									"name": "Issuer Registration",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "vpWFiVAPHbuv0X8z9jDVJOnEqAFKu84W/yV/Ag0KxsiPOuE9pdz+CBaAAzbyt9DVSjCwNWPiq2417ZVZb1nNvA==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"company_name\": \"issuer test 4\",\n    \"description\": \"Bill payment platform\",\n    \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo4.png\",\n    \"access\": [{\n        \"name\": \"Regideso\",\n        \"email\": \"douye2@yahoo.com\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\"\n    }]\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/register",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"issuer",
												"register"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Issuer created successfully\",\n    \"data\": {\n        \"company_name\": \"issuer test 4\",\n        \"description\": \"Bill payment platform\",\n        \"logo\": \"https://admin.xcelapp.com/assets/images/mainlogo4.png\",\n        \"permissions\": {\n            \"international_transfers\": false,\n            \"local_intra_transfers\": false,\n            \"local_inter_transfers\": false,\n            \"local_bill_payments\": false,\n            \"local_airtime_data\": false,\n            \"local_loan_services\": false,\n            \"pos_transactions\": false,\n            \"account_creation\": true,\n            \"pots\": false,\n            \"custom_fees\": false,\n            \"custom_limits\": false\n        },\n        \"is_active\": false,\n        \"master_issuer\": false,\n        \"_id\": \"644bebb20a59d6c7a20090e4\",\n        \"created\": \"2023-04-28T15:52:18.504Z\",\n        \"__v\": 0,\n        \"public_key\": \"eTz.test_6d1a7094511d3275f3fd38e6787953965a3a30b013e5e2471550c710b77ded7f\"\n    }\n}"
								}
							]
						},
						{
							"name": "register issuer admin user",
							"request": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "BRR7ur0eRWM/MpUbvgDs+hgsTnk1mlrwwvzK/xDA/O+iObaBUBWbN7J2Ii/k35uuZzNcwHDu5N7pTmlcii8duQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"country_of_residence\": \"NG\",\n    \"user_info\": {\n        \"user_type\": \"ADMIN\",\n        \"company\": {\n            \"name\": \"issuer test 2\",\n            \"registration_no\": \"AC-98E982e31\",\n            \"company_type\": \"Edtech\",\n            \"incoporation_locality\": \"Nigeria\",\n            \"email\": \"douye@yahoo.com\",\n            \"phone\": \"09066027359\",\n            \"volume_expected\": \"200000000\",\n            \"value_expected\": \"200000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [\n        {\n            \"name\": \"Admin User 1\",\n            \"identifier\": \"adminuser6@yahoo.com\",\n            \"pin\": \"1234\",\n            \"password\": \"password\",\n            \"access_level\": \"ALL\"\n        }\n    ],\n    \"authorizers\": [\n        {\n            \"email\": \"douye@yahoo.com\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            }\n        }\n    ],\n    \"directors\": [\n        {\n            \"user_id\": \"6426a5f92d1f06c046a013bc\",\n            \"first_name\": \"User\",\n            \"last_name\": \"4\",\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                }\n            },\n            \"email_address\": \"user4@yahoo.com\",\n            \"kyc_done\": true,\n            \"proof_of_address\": \"sample poa\",\n            \"proof_of_id\": \"sample poi\"\n        }\n    ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/customer",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"customer"
									]
								},
								"description": "As a third party partner, you are expected to create an Issuer account with us. This is the first step of the integration process"
							},
							"response": [
								{
									"name": "register issuer issuer admin",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "BRR7ur0eRWM/MpUbvgDs+hgsTnk1mlrwwvzK/xDA/O+iObaBUBWbN7J2Ii/k35uuZzNcwHDu5N7pTmlcii8duQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"country_of_residence\": \"NG\",\n    \"user_info\": {\n        \"user_type\": \"ADMIN\",\n        \"company\": {\n            \"name\": \"issuer test 2\",\n            \"registration_no\": \"AC-98E982e31\",\n            \"company_type\": \"Edtech\",\n            \"incoporation_locality\": \"Nigeria\",\n            \"email\": \"douye@yahoo.com\",\n            \"phone\": \"09066027359\",\n            \"volume_expected\": \"200000000\",\n            \"value_expected\": \"200000000\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [\n        {\n            \"name\": \"Admin User 1\",\n            \"identifier\": \"adminuser6@yahoo.com\",\n            \"pin\": \"1234\",\n            \"password\": \"password\",\n            \"access_level\": \"ALL\"\n        }\n    ],\n    \"authorizers\": [\n        {\n            \"email\": \"douye@yahoo.com\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            }\n        }\n    ],\n    \"directors\": [\n        {\n            \"user_id\": \"6426a5f92d1f06c046a013bc\",\n            \"first_name\": \"User\",\n            \"last_name\": \"4\",\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\"\n                }\n            },\n            \"email_address\": \"user4@yahoo.com\",\n            \"kyc_done\": true,\n            \"proof_of_address\": \"sample poa\",\n            \"proof_of_id\": \"sample poi\"\n        }\n    ]\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/customer",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"customer"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Account created successfully\",\n    \"data\": {\n        \"customer\": {\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"app_id\": \"640b794e6667f7cb1531a666\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"country_of_residence\": \"NG\",\n            \"user_info\": {\n                \"user_type\": \"ADMIN\",\n                \"company\": {\n                    \"name\": \"issuer test 2\",\n                    \"registration_no\": \"AC-98E982e31\",\n                    \"company_type\": \"Edtech\",\n                    \"email\": \"douye@yahoo.com\",\n                    \"phone\": \"09066027359\",\n                    \"kyc_done\": false,\n                    \"volume_expected\": \"200000000\",\n                    \"value_expected\": \"200000000\",\n                    \"_id\": \"644bee1ef793812ffbd59aec\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"644bee1ef793812ffbd59aed\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"644bee1ef793812ffbd59aee\"\n                }\n            },\n            \"_id\": \"644bee1ef793812ffbd59aeb\",\n            \"updated\": \"2023-04-28T16:02:38.603Z\",\n            \"private_key\": \"192a0cc0-e5de-11ed-b7fa-01fd4cb86121\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_bcf602ae3c3ec950062e2e81eadc8617fcb59e12be058f00bb1bb55d16aaa196\"\n        },\n        \"access\": [\n            {\n                \"name\": \"Admin User 1\",\n                \"user_id\": \"644bee1ef793812ffbd59aeb\",\n                \"identifier\": \"adminuser6@yahoo.com\",\n                \"pin\": \"03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\",\n                \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n                \"access_level\": \"ALL\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"active\": false,\n                \"_id\": \"644bee1ef793812ffbd59af0\",\n                \"__v\": 0\n            }\n        ],\n        \"authorizers\": [\n            {\n                \"user_id\": \"644bee1ef793812ffbd59aeb\",\n                \"notification\": {\n                    \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\",\n                    \"type\": \"firebase\"\n                },\n                \"_id\": \"644bee1ff793812ffbd59af3\",\n                \"uuid\": \"199d8f10-e5de-11ed-b7fa-01fd4cb86121\",\n                \"__v\": 0\n            }\n        ],\n        \"directors\": [\n            {\n                \"user_id\": \"644bee1ef793812ffbd59aeb\",\n                \"first_name\": \"User\",\n                \"last_name\": \"4\",\n                \"email_address\": \"user4@yahoo.com\",\n                \"kyc_done\": true,\n                \"proof_of_address\": \"sample poa\",\n                \"proof_of_id\": \"sample poi\",\n                \"_id\": \"644bee1ff793812ffbd59af6\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
								}
							]
						},
						{
							"name": "setup operation currency",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{ISSUER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "1vwyJuidaXbLBFL+NFazSEqwtbJZsxEJ+ZGwvfH5lRL+LCkZcck5lROxsvMLPTgvWxxckuuqYgpkEtisUSBkcQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currencies\": [\n        {\n            \"iso_code_2\": \"IND\",\n            \"currency_code\": \"AFN\"\n        },\n        {\n            \"iso_code_2\": \"GB\",\n            \"currency_code\": \"NGN\"\n        }\n    ]\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/ops/countries/currencies",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"issuer",
										"ops",
										"countries",
										"currencies"
									]
								}
							},
							"response": [
								{
									"name": "Setup operation currency",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "MqSXLyCKY/ltUy1ART5INiPvs2SAO1Nrjecxi8+dZV+O/niqNMDzjA1ry9ffLSHDp7v0Ox/03QOyK5J5YJGZvg==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"currencies\": [\n        {\n            \"iso_code_2\": \"IND\",\n            \"currency_code\": \"AFN\"\n        },\n        {\n            \"iso_code_2\": \"GB\",\n            \"currency_code\": \"NGN\"\n        }\n    ]\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/ops/countries/currencies",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"issuer",
												"ops",
												"countries",
												"currencies"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Issuer country currencies added successfully\",\n    \"data\": [\n        {\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"iso_code_2\": \"IND\",\n            \"currency_code\": \"AFN\",\n            \"active\": false,\n            \"_id\": \"644bc220b786b857346b3ccf\",\n            \"__v\": 0\n        }\n    ]\n}"
								}
							]
						}
					]
				},
				{
					"name": "user",
					"item": [
						{
							"name": "fetch account balance for current user",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/balance/:country_code/:account_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"balance",
										":country_code",
										":account_id"
									],
									"variable": [
										{
											"key": "country_code",
											"value": "NG"
										},
										{
											"key": "account_id",
											"value": "2340040000229301"
										}
									]
								}
							},
							"response": [
								{
									"name": "fetch account balance for current user",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
												"type": "text"
											}
										],
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/balance/:country_code/:account_id",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"balance",
												":country_code",
												":account_id"
											],
											"variable": [
												{
													"key": "country_code",
													"value": "NG"
												},
												{
													"key": "account_id",
													"value": "2340040000229303"
												}
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Account balance gotten successfully\",\n    \"data\": {\n        \"currentBalance\": 0,\n        \"ledgerBalance\": 0,\n        \"currency\": \"NGN\",\n        \"currencySymbol\": \"₦\"\n    }\n}"
								}
							]
						},
						{
							"name": "register issuer user",
							"event": [
								{
									"listen": "test",
									"script": {
										"exec": [
											"pm.test('SAVE USER ID AND KEY', function(){",
											"    const res = pm.response.json();",
											"    const data = res.data.customer;",
											"    pm.environment.set('USER_ID', data._id);",
											"    pm.environment.set('USER_KEY', data.user_key);",
											"})"
										],
										"type": "text/javascript"
									}
								}
							],
							"request": {
								"auth": {
									"type": "noauth"
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "to+x6zDg48QtXRCucvsdWu0a/6lQP63Cc4y7Bb/6DAQkLn0ZpLprU9n3D6M33YOaNqWIRawtS/7kgkg3q5YwWQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"country_of_residence\": \"NG\",\n    \"currency_code\": \"TVD\",\n    \"user_info\": {\n        \"user_type\": \"INDIVIDUAL\",\n        \"person\": {\n            \"first_name\": \"Douye\",\n            \"last_name\": \"Wokoro\",\n            \"middle_name\": \"Samuel\",\n            \"marital_status\": false,\n            \"employment_status\": false,\n            \"dateOfBirth\": \"1995-09-07\",\n            \"phone\": \"090600221115\",\n            \"email\": \"wokorosamuel14@yahoo.com\",\n            \"gender\": \"male\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"\",\n        \"identifier\": \"wokorosamuel14@yahoo.com\",\n        \"pin\": \"1234\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\"\n    }],\n    \"preferences\": {\n        \"secure_login\": false\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/customer",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"customer"
									]
								}
							},
							"response": [
								{
									"name": "register issuer user",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "idTQJtJleWR3AISHzCdqbbeGeJyGp6RqSMHL/yFBnstp3LmSp2kx1Lw8s5XKEQm+kwtKEZdKeD6gKckoCnZVZQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"notification\": {\n        \"type\": \"firebase\",\n        \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n    },\n    \"country_of_residence\": \"NGN\",\n    \"user_info\": {\n        \"user_type\": \"INDIVIDUAL\",\n        \"person\": {\n            \"first_name\": \"Douye\",\n            \"last_name\": \"Wokoro\",\n            \"middle_name\": \"Samuel\",\n            \"marital_status\": false,\n            \"employment_status\": false,\n            \"dateOfBirth\": \"1995-09-07\",\n            \"phone\": \"09060020022\",\n            \"email\": \"wokorosamuel3@yahoo.com\",\n            \"gender\": \"male\"\n        }\n    },\n    \"addresses\": {\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        },\n        \"mailing_address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\"\n        }\n    },\n    \"access\": [{\n        \"name\": \"\",\n        \"identifier\": \"wokorosamuel3@yahoo.com\",\n        \"pin\": \"1234\",\n        \"password\": \"password\",\n        \"access_level\": \"ALL\"\n    }],\n    \"preferences\": {\n        \"secure_login\": false\n    }\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/customer",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"customer"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Account created successfully\",\n    \"data\": {\n        \"account\": {\n            \"user_id\": \"6464ce270aeee303ba70079d\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"932825011166131\",\n            \"account_id\": \"2340040000230663\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"account_type\": \"credit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"6464ce2b0aeee303ba7007ab\",\n            \"created_at\": \"2023-05-17T12:52:59.504Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_e1e7d78c8c2e411552255c6c63476967dfa8a8b851bac46be3ef9823da7165cd\"\n        },\n        \"customer\": {\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"app_id\": \"640b794e6667f7cb1531a666\",\n            \"notification\": {\n                \"type\": \"firebase\",\n                \"token\": \"cAQLCNQuRGazet2VtVunZS:APA91bFaYnSHovMgYonh7qCfG5oesZFiDsiT8e7LfaOR6fEEMXIkjEDWZBB_mLf1pvt0JrOI2bTS9plTSp2U-UtINhIIfGeu0Ma0rfCXmxbNT-UHjBtG1bwkdPcvkJzNRCzjoTYjTthb\"\n            },\n            \"country_of_residence\": \"NG\",\n            \"user_info\": {\n                \"user_type\": \"INDIVIDUAL\",\n                \"person\": {\n                    \"first_name\": \"Douye\",\n                    \"middle_name\": \"Samuel\",\n                    \"last_name\": \"Wokoro\",\n                    \"marital_status\": false,\n                    \"employment_status\": false,\n                    \"dateOfBirth\": \"1995-09-07\",\n                    \"email\": \"wokorosamuel14@yahoo.com\",\n                    \"gender\": \"male\",\n                    \"phone\": \"090600221115\",\n                    \"_id\": \"6464ce270aeee303ba70079e\"\n                }\n            },\n            \"addresses\": {\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"6464ce270aeee303ba70079f\"\n                },\n                \"mailing_address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"6464ce270aeee303ba7007a0\"\n                }\n            },\n            \"preferences\": {\n                \"require_authorizers\": false,\n                \"secure_login\": false,\n                \"allowExtraAccess\": false,\n                \"disabled\": false,\n                \"version_locked\": false,\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"_id\": \"6464ce270aeee303ba7007a1\"\n            },\n            \"_id\": \"6464ce270aeee303ba70079d\",\n            \"updated\": \"2023-05-17T12:52:55.525Z\",\n            \"private_key\": \"be2b7060-f4b1-11ed-92ac-fd5ff03da7f5\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_dd705081bd812a148ffd44727fba83924cf0f0e63757f7c9411d9c6e5bc4429e\"\n        },\n        \"access\": [\n            {\n                \"name\": \"\",\n                \"user_id\": \"6464ce270aeee303ba70079d\",\n                \"identifier\": \"wokorosamuel14@yahoo.com\",\n                \"pin\": \"03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4\",\n                \"password\": \"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8\",\n                \"access_level\": \"ALL\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"active\": false,\n                \"_id\": \"6464ce270aeee303ba7007a3\",\n                \"__v\": 0\n            }\n        ],\n        \"authorizers\": [],\n        \"directors\": []\n    }\n}"
								}
							]
						},
						{
							"name": "fetch user accounts",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/user",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"user"
									]
								}
							},
							"response": [
								{
									"name": "fetch user accounts",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/user",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"user"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"User accounts retrieved successfully\",\n    \"data\": [\n        {\n            \"_id\": \"64269e302d1f06c046a0138b\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"4614935072\",\n            \"account_id\": \"6880040000227074\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"account_type\": \"credit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"created_at\": \"2023-03-31T08:47:44.051Z\",\n            \"__v\": 0,\n            \"flag\": \"https://flagcdn.com/tv.svg\",\n            \"account_key\": \"eTz.test_f29462f69e34683663ad221a18046e931a028f9eaa6d8faedff1201e54f3ee75\",\n            \"currencySymbol\": \"$T\",\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI2OWUzMDJkMWYwNmMwNDZhMDEzOGIiLCJ1c2VyX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdhIiwiaXNzdWVyX2lkIjoiNjQwYjc5NGQ2NjY3ZjdjYjE1MzFhNjVmIiwiaWRlbnRpZmllciI6IjQ2MTQ5MzUwNzIiLCJhY2NvdW50X2lkIjoiNjg4MDA0MDAwMDIyNzA3NCIsImNvdW50cnkiOiJORyIsImN1cnJlbmN5IjoiVFZEIiwiYW1vdW50X2Jsb2NrZWQiOjAsInByb3ZpZGVyIjoid2FsbGV0LWFwaSIsImFjY291bnRfdHlwZSI6ImNyZWRpdF9zZXR0bGVtZW50IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDIzLTAzLTMxVDA4OjQ3OjQ0LjA1MVoiLCJwcml2YXRlX2tleSI6ImI0MDg0MDMwLWNmYTAtMTFlZC05NmJiLWE5NDk0ODFiMDU3OSIsIl9fdiI6MCwiaWF0IjoxNjg0NDEwODY0LCJleHAiOjg5NjY0fQ.agVW0mfYkBthMsHhMUmfw5c0zEGUQsGMJE56OhhU_Uc\",\n            \"currentBalance\": 9999.08,\n            \"ledgerBalance\": 0\n        },\n        {\n            \"_id\": \"644c0824a01f2572567bce75\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"3589806e3e343330222909\",\n            \"account_id\": \"6880040000229077\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"account_type\": \"pot_debit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"created_at\": \"2023-04-28T17:53:40.874Z\",\n            \"__v\": 0,\n            \"flag\": \"https://flagcdn.com/tv.svg\",\n            \"account_key\": \"eTz.test_80c97ecebf9976470dfe0dfdb8d7f7443696f472f5266a51dc62e57c35a5bf16\",\n            \"currencySymbol\": \"$T\",\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRjMDgyNGEwMWYyNTcyNTY3YmNlNzUiLCJ1c2VyX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdhIiwiaXNzdWVyX2lkIjoiNjQwYjc5NGQ2NjY3ZjdjYjE1MzFhNjVmIiwiaWRlbnRpZmllciI6IjM1ODk4MDZlM2UzNDMzMzAyMjI5MDkiLCJhY2NvdW50X2lkIjoiNjg4MDA0MDAwMDIyOTA3NyIsImNvdW50cnkiOiJORyIsImN1cnJlbmN5IjoiVFZEIiwiYW1vdW50X2Jsb2NrZWQiOjAsInByb3ZpZGVyIjoid2FsbGV0LWFwaSIsImFjY291bnRfdHlwZSI6InBvdF9kZWJpdF9zZXR0bGVtZW50IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTI4VDE3OjUzOjQwLjg3NFoiLCJwcml2YXRlX2tleSI6IjljMmZjNmEwLWU1ZWQtMTFlZC05NDc5LWZmMGY3ZjI3NWQwYSIsIl9fdiI6MCwiaWF0IjoxNjg0NDEwODY0LCJleHAiOjg5NjY0fQ.vvbArjtuFTL6qvhpFKqKRqDpa6hOGAb0ZbJ1J5P0cJU\",\n            \"currentBalance\": 0,\n            \"ledgerBalance\": 0\n        },\n        {\n            \"_id\": \"644c0b725b4340ebc5933d77\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"3589806e3e343330222904\",\n            \"account_id\": \"2340040000229078\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"account_type\": \"pot_debit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"created_at\": \"2023-04-28T18:07:46.801Z\",\n            \"__v\": 0,\n            \"flag\": \"https://flagcdn.com/tv.svg\",\n            \"account_key\": \"eTz.test_8973e26f4f411adb6cfd7e60df217fb4656609add438f337bea4656b8ed0202b\",\n            \"currencySymbol\": \"$T\",\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRjMGI3MjViNDM0MGViYzU5MzNkNzciLCJ1c2VyX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdhIiwiaXNzdWVyX2lkIjoiNjQwYjc5NGQ2NjY3ZjdjYjE1MzFhNjVmIiwiaWRlbnRpZmllciI6IjM1ODk4MDZlM2UzNDMzMzAyMjI5MDQiLCJhY2NvdW50X2lkIjoiMjM0MDA0MDAwMDIyOTA3OCIsImNvdW50cnkiOiJORyIsImN1cnJlbmN5IjoiVFZEIiwiYW1vdW50X2Jsb2NrZWQiOjAsInByb3ZpZGVyIjoid2FsbGV0LWFwaSIsImFjY291bnRfdHlwZSI6InBvdF9kZWJpdF9zZXR0bGVtZW50IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTI4VDE4OjA3OjQ2LjgwMVoiLCJwcml2YXRlX2tleSI6Ijk0NjYyNTIwLWU1ZWYtMTFlZC04ZWRiLWEzNzE0OTNjMGUyZCIsIl9fdiI6MCwiaWF0IjoxNjg0NDEwODY0LCJleHAiOjg5NjY0fQ.iIJe3CsIkNK06YZktcXoWK4Vfz-1zYq2MVwBnU1UUvw\",\n            \"currentBalance\": 0,\n            \"ledgerBalance\": 0\n        },\n        {\n            \"_id\": \"644c10e0cbe301eb0777dd06\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"3589806e3e343330222909\",\n            \"account_id\": \"2340040000229079\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"account_type\": \"pot_debit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"created_at\": \"2023-04-28T18:30:56.101Z\",\n            \"__v\": 0,\n            \"flag\": \"https://flagcdn.com/tv.svg\",\n            \"account_key\": \"eTz.test_f007b0f663e2a74144a738dab2b8783a0124befbfa2d01681b3881f927098ab2\",\n            \"currencySymbol\": \"$T\",\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRjMTBlMGNiZTMwMWViMDc3N2RkMDYiLCJ1c2VyX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdhIiwiaXNzdWVyX2lkIjoiNjQwYjc5NGQ2NjY3ZjdjYjE1MzFhNjVmIiwiaWRlbnRpZmllciI6IjM1ODk4MDZlM2UzNDMzMzAyMjI5MDkiLCJhY2NvdW50X2lkIjoiMjM0MDA0MDAwMDIyOTA3OSIsImNvdW50cnkiOiJORyIsImN1cnJlbmN5IjoiVFZEIiwiYW1vdW50X2Jsb2NrZWQiOjAsInByb3ZpZGVyIjoid2FsbGV0LWFwaSIsImFjY291bnRfdHlwZSI6InBvdF9kZWJpdF9zZXR0bGVtZW50IiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImJhbm5lZCI6ZmFsc2UsImNyZWF0ZWRfYXQiOiIyMDIzLTA0LTI4VDE4OjMwOjU2LjEwMVoiLCJwcml2YXRlX2tleSI6ImQwN2M1OTUwLWU1ZjItMTFlZC1hYWVjLTI3ZWQ3MzcyMDRkMSIsIl9fdiI6MCwiaWF0IjoxNjg0NDEwODY0LCJleHAiOjg5NjY0fQ.ni8qkhcZG7S6Ala2_RkfPWOAUYBFM01vXmPbzDrcODs\",\n            \"currentBalance\": 0,\n            \"ledgerBalance\": 0\n        },\n        {\n            \"_id\": \"644c12063e59414948c64b9d\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"3589806e3e343330222920\",\n            \"account_id\": \"2340040000229080\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"871\",\n            \"pan\": \"51773117492290767\",\n            \"account_type\": \"pot_debit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"created_at\": \"2023-04-28T18:35:50.185Z\",\n            \"__v\": 0,\n            \"flag\": \"https://flagcdn.com/tv.svg\",\n            \"account_key\": \"eTz.test_64f356193004775546b600b5a9d59460d86f2bca7331dc266670e665fe58c2bc\",\n            \"currencySymbol\": \"$T\",\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRjMTIwNjNlNTk0MTQ5NDhjNjRiOWQiLCJ1c2VyX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdhIiwiaXNzdWVyX2lkIjoiNjQwYjc5NGQ2NjY3ZjdjYjE1MzFhNjVmIiwiaWRlbnRpZmllciI6IjM1ODk4MDZlM2UzNDMzMzAyMjI5MjAiLCJhY2NvdW50X2lkIjoiMjM0MDA0MDAwMDIyOTA4MCIsImNvdW50cnkiOiJORyIsImN1cnJlbmN5IjoiVFZEIiwiYW1vdW50X2Jsb2NrZWQiOjAsInBhbmN2diI6Ijg3MSIsInBhbiI6IjUxNzczMTE3NDkyMjkwNzY3IiwicHJvdmlkZXIiOiJ3YWxsZXQtYXBpIiwiYWNjb3VudF90eXBlIjoicG90X2RlYml0X3NldHRsZW1lbnQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwiYmFubmVkIjpmYWxzZSwiY3JlYXRlZF9hdCI6IjIwMjMtMDQtMjhUMTg6MzU6NTAuMTg1WiIsInByaXZhdGVfa2V5IjoiN2ZjNjAxOTAtZTVmMy0xMWVkLWI4MGItNmI1YTEwOWJkYzFjIiwiX192IjowLCJpYXQiOjE2ODQ0MTA4NjQsImV4cCI6ODk2NjR9.KsKViYh3vhZe7GGsyEUf8qRwj5KWNZeZuLrQfIz8z1E\",\n            \"currentBalance\": 0,\n            \"ledgerBalance\": 0\n        },\n        {\n            \"_id\": \"644c1260575d0bdf4e9db731\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"3589806e3e343330222930\",\n            \"account_id\": \"2340040000229081\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"668\",\n            \"pan\": \"51773119162290773\",\n            \"expiry\": \"04/25\",\n            \"account_type\": \"pot_debit_settlement\",\n            \"international\": false,\n            \"banned\": false,\n            \"created_at\": \"2023-04-28T18:37:20.978Z\",\n            \"__v\": 0,\n            \"flag\": \"https://flagcdn.com/tv.svg\",\n            \"account_key\": \"eTz.test_4a96c61070a49f3696e9324daa4ecf6b3a121351a4f2738bdee4c2a5c8c5dc06\",\n            \"currencySymbol\": \"$T\",\n            \"account_token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDRjMTI2MDU3NWQwYmRmNGU5ZGI3MzEiLCJ1c2VyX2lkIjoiNjQyNjllMmQyZDFmMDZjMDQ2YTAxMzdhIiwiaXNzdWVyX2lkIjoiNjQwYjc5NGQ2NjY3ZjdjYjE1MzFhNjVmIiwiaWRlbnRpZmllciI6IjM1ODk4MDZlM2UzNDMzMzAyMjI5MzAiLCJhY2NvdW50X2lkIjoiMjM0MDA0MDAwMDIyOTA4MSIsImNvdW50cnkiOiJORyIsImN1cnJlbmN5IjoiVFZEIiwiYW1vdW50X2Jsb2NrZWQiOjAsInBhbmN2diI6IjY2OCIsInBhbiI6IjUxNzczMTE5MTYyMjkwNzczIiwiZXhwaXJ5IjoiMDQvMjUiLCJwcm92aWRlciI6IndhbGxldC1hcGkiLCJhY2NvdW50X3R5cGUiOiJwb3RfZGViaXRfc2V0dGxlbWVudCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJiYW5uZWQiOmZhbHNlLCJjcmVhdGVkX2F0IjoiMjAyMy0wNC0yOFQxODozNzoyMC45NzhaIiwicHJpdmF0ZV9rZXkiOiJiNWU0MTIzMC1lNWYzLTExZWQtOTQ4YS0wYmRkNTdiNWRhOTYiLCJfX3YiOjAsImlhdCI6MTY4NDQxMDg2NCwiZXhwIjo4OTY2NH0.IWOlmJISgGUzyOOsiIfazXmfaW3afK-yViTDD0wP7yk\",\n            \"currentBalance\": 0,\n            \"ledgerBalance\": 0\n        }\n    ]\n}"
								}
							]
						},
						{
							"name": "validated user account",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/validate/account/:country_code/:account_no/:bank_code/:type",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"validate",
										"account",
										":country_code",
										":account_no",
										":bank_code",
										":type"
									],
									"variable": [
										{
											"key": "country_code",
											"value": "NG"
										},
										{
											"key": "account_no",
											"value": "2340040000229301"
										},
										{
											"key": "bank_code",
											"value": "002"
										},
										{
											"key": "type",
											"value": "internal"
										}
									]
								}
							},
							"response": [
								{
									"name": "Internal validation",
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
													"value": "63b8046676f0656a875608e8"
												},
												{
													"key": "country_code",
													"value": "NG"
												},
												{
													"key": "account_no",
													"value": "688999999974615"
												},
												{
													"key": "bank_code",
													"value": "0001"
												},
												{
													"key": "type",
													"value": "internal",
													"description": "can either be internal or external"
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
									"body": "{\n    \"success\": true,\n    \"message\": \"Accounts validation returned successfully\",\n    \"data\": {\n        \"name\": \"issuer test 2\",\n        \"accounts\": [\n            {\n                \"account_id\": \"2340040000229301\",\n                \"currency\": \"NGN\"\n            }\n        ]\n    }\n}"
								}
							]
						},
						{
							"name": "create issuer admin account",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/accounts/:type",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"issuer",
										"accounts",
										":type"
									],
									"variable": [
										{
											"key": "type",
											"value": "fees",
											"description": "fees, debit_settlement, credit_settlement, loan_issuance, loan_interest, loan_repayment"
										}
									]
								}
							},
							"response": [
								{
									"name": "create issuer admin accounts",
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
											"raw": "",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/issuer/accounts/:type",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
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
									"body": "{\n    \"success\": true,\n    \"message\": \"Issuer accounts added successfully\",\n    \"data\": [\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"234999999849448\",\n            \"account_id\": \"2340040000229317\",\n            \"country\": \"NG\",\n            \"currency\": \"TVD\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"+baGy0QxeglXbXQxsApm1g==\",\n            \"pan\": \"RtxNoa/U56HSMOp291BBzfc8REd/rMsbwinSrAFNXw0=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"6452576bafe9516acbd34404\",\n            \"created_at\": \"2023-05-03T12:45:31.481Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_ae6cbed376b1c4b9a4c8486f662a6c5962a3a75384bf448cb61f7f91700def19\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"234999999682433\",\n            \"account_id\": \"2340040000229318\",\n            \"country\": \"NG\",\n            \"currency\": \"NGN\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"8E7B+RaEuvGKNOy2CwWJpA==\",\n            \"pan\": \"0+bFmHZdFNZwG56xuYo1SMAlivD2NSDA2XerWHYciAA=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"6452576eafe9516acbd3440d\",\n            \"created_at\": \"2023-05-03T12:45:34.103Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_b3c6180b6ce9aaf5690e84563828a8077a8be2d6de15da6e20d03d8a4324a473\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"234999999908744\",\n            \"account_id\": \"2340040000229319\",\n            \"country\": \"NG\",\n            \"currency\": \"USD\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"heTPiuh8YynFOWGhwKxqwQ==\",\n            \"pan\": \"efG4oSgYkEMXqGRkYLPWxAncDc1E+K1uYfDbQqQFENs=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"64525770afe9516acbd34416\",\n            \"created_at\": \"2023-05-03T12:45:36.697Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_95e5b97161aabfa2e15a40c1b9a234e464d35c46131953d2d0a7b691831ab0a0\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"234999999911103\",\n            \"account_id\": \"2340040000229320\",\n            \"country\": \"NG\",\n            \"currency\": \"GHS\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"y5dxFyXwJooV2SvrYZBtDw==\",\n            \"pan\": \"/sNDL6twhVEDeXhLvJpuedRqFqd0T4Dg4e/uQEk6D6c=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"64525772afe9516acbd3441f\",\n            \"created_at\": \"2023-05-03T12:45:38.937Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_64ca93d3b1c4470a8e3ab90f82d32d5a0fac5cbcd1ceafb7dd3dd94fb7a7b5b7\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"234999999900599\",\n            \"account_id\": \"2340040000229321\",\n            \"country\": \"NG\",\n            \"currency\": \"GBP\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"2mNmNORiK5KUNzz+SyiwnQ==\",\n            \"pan\": \"Jcjbf8xR7ApTBPUuPd+n4JQekcxGrG0cACJ1RhQ9BSE=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"64525775afe9516acbd34428\",\n            \"created_at\": \"2023-05-03T12:45:41.276Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_1b61322e296dc551e42b187f4943d87dd2686409d2d1bc01d9989483859af579\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"44999999777552\",\n            \"account_id\": \"0440040000229322\",\n            \"country\": \"GB\",\n            \"currency\": \"NGN\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"EYJvwF+rW7NtYZT1dBzPkQ==\",\n            \"pan\": \"zQ92BI9SYL9YQgr2GyZ1bB/1s9BwB2HWlWdJyMHYLww=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"64525777afe9516acbd34431\",\n            \"created_at\": \"2023-05-03T12:45:43.634Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_c4fff676ee4d48c76a9c11c16133dac966bb9a79dc744e335a4ce55f224e8b44\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"44999999273971\",\n            \"account_id\": \"0440040000229323\",\n            \"country\": \"GB\",\n            \"currency\": \"USD\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"t39JmEFmcd1RGellwn8o3A==\",\n            \"pan\": \"wbXLhX8KVWcAnRiw9ahL77hqEkHXvPrFSMO21qkG6K8=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"6452577aafe9516acbd3443a\",\n            \"created_at\": \"2023-05-03T12:45:46.396Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_e34209632dc93f578412efa31cdeb49ef691bdaa1e6010afc06213f1b5b3847a\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"44999999337061\",\n            \"account_id\": \"0440040000229324\",\n            \"country\": \"GB\",\n            \"currency\": \"GHS\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"UEsGxcfdZ+RucbB4S4Fwzw==\",\n            \"pan\": \"a3Z/5JtppGOccnRLpLm2v4AocTMJoWSWPtpHS2RrO/M=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"6452577cafe9516acbd34443\",\n            \"created_at\": \"2023-05-03T12:45:48.647Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_4280ac1155528251b9bae091b236f3db43d427941ec425bd260dd257e1da82b3\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"44999999654416\",\n            \"account_id\": \"0440040000229325\",\n            \"country\": \"GB\",\n            \"currency\": \"EUR\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"9ZCYp19WR/LbVNWAxMoj8g==\",\n            \"pan\": \"7TunkW7yFN1hkEck2sLe+ktpRrHJPXjTGWrTXDbDBSk=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"6452577fafe9516acbd3444c\",\n            \"created_at\": \"2023-05-03T12:45:51.376Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_5fcf0ff5b9ff914999cf154100407a93c42b3a52b657b84c481979faa06ef3f0\"\n        },\n        {\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"identifier\": \"234999999163696\",\n            \"account_id\": \"2340040000229326\",\n            \"country\": \"NG\",\n            \"currency\": \"AFN\",\n            \"amount_blocked\": 0,\n            \"pancvv\": \"KZ/jwkdeM1r/ttjt++k0og==\",\n            \"pan\": \"qXMt2+LRm+iWsm2A2ybhAg/t6J0scAVhmURM2WY6h3M=\",\n            \"expiry\": \"EBNSe09MxPFcu7myw3YOIQ==\",\n            \"account_type\": \"fees\",\n            \"international\": false,\n            \"banned\": false,\n            \"_id\": \"64525782afe9516acbd34455\",\n            \"created_at\": \"2023-05-03T12:45:54.023Z\",\n            \"__v\": 0,\n            \"user_key\": \"eTz.test_6f1a97ddc1815c0eef9f0d624a1894a1da0a5c828479af03c88fa84885c66b42\"\n        }\n    ]\n}"
								}
							]
						}
					]
				},
				{
					"name": "wallet",
					"item": [
						{
							"name": "create etranzact account",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "idTQJtJleWR3AISHzCdqbbeGeJyGp6RqSMHL/yFBnstp3LmSp2kx1Lw8s5XKEQm+kwtKEZdKeD6gKckoCnZVZQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"type\": \"pot_debit_settlement\",\n    \"country_code\": \"NG\",\n    \"currency_code\": \"TVD\",\n    \"identifier\": \"3589806e3e343330233232\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts"
									]
								}
							},
							"response": [
								{
									"name": "create etranzact account",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "idTQJtJleWR3AISHzCdqbbeGeJyGp6RqSMHL/yFBnstp3LmSp2kx1Lw8s5XKEQm+kwtKEZdKeD6gKckoCnZVZQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"type\": \"pot_debit_settlement\",\n    \"country_code\": \"NG\",\n    \"currency_code\": \"TVD\",\n    \"identifier\": \"3589806e3e343330233232\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Wallet created successfully\",\n    \"data\": {\n        \"user_id\": \"644c14ed49a444fa2c6576c7\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"identifier\": \"3589806e3e343330233232\",\n        \"account_id\": \"2340040000229083\",\n        \"country\": \"NG\",\n        \"currency\": \"TVD\",\n        \"amount_blocked\": 0,\n        \"pancvv\": \"26pziLvjFBINCvZc0yjUOg==\",\n        \"pan\": \"OREwOKip6RGB/I2o+evIcE6ogdWUkJwNuB1lJZKeI08=\",\n        \"expiry\": \"uCO+SUBiamJB0m2gxDLI8Q==\",\n        \"account_type\": \"pot_debit_settlement\",\n        \"international\": false,\n        \"banned\": false,\n        \"_id\": \"644c15b12a3d72e7000c6d79\",\n        \"created_at\": \"2023-04-28T18:51:29.296Z\",\n        \"__v\": 0,\n        \"user_key\": \"eTz.test_a79d0224ea18272639c4ef530fd21f3c7ccb6cfa0065bf2d0bda88bd1b009ced\"\n    }\n}"
								}
							]
						}
					]
				},
				{
					"name": "branch",
					"item": [
						{
							"name": "fetch user branches",
							"protocolProfileBehavior": {
								"disableBodyPruning": true
							},
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/branches",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"branches"
									]
								}
							},
							"response": [
								{
									"name": "fetch user branches",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "",
											"options": {
												"raw": {
													"language": "javascript"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/branches",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"branches"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Branches returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"6452682d65ae84aa7e3c1cdf\",\n            \"user_id\": \"644bee1ef793812ffbd59aeb\",\n            \"name\": \"California Branch\",\n            \"branch_code\": \"0075\",\n            \"address\": {\n                \"line1\": \"26 Oluwole Oladejo Street\",\n                \"line2\": \"Ojodu Berger\",\n                \"city\": \"Lagos\",\n                \"country\": \"Nigeria\",\n                \"state\": \"Lagos\",\n                \"post_code\": \"100216\",\n                \"_id\": \"6452682d65ae84aa7e3c1ce0\"\n            },\n            \"created_at\": \"2023-05-03T13:57:01.415Z\",\n            \"__v\": 0\n        }\n    ]\n}"
								}
							]
						},
						{
							"name": "create branch",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "fS0b3PK9FbxdIGqY+92QZzOn0NKZE6zgkB54M3XnRY6e742UAPgbD8PhsOE+crLIUYpA12ot3wQ7Z1MMoDJZ9A==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"name\": \"California Branch\",\n    \"branch_code\": \"0075\",\n    \"address\": {\n        \"line1\": \"26 Oluwole Oladejo Street\",\n        \"line2\": \"Ojodu Berger\",\n        \"city\": \"Lagos\",\n        \"country\": \"Nigeria\",\n        \"state\": \"Lagos\",\n        \"post_code\": \"100216\"\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/branch",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"branch"
									]
								}
							},
							"response": [
								{
									"name": "create branch",
									"originalRequest": {
										"method": "POST",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "idTQJtJleWR3AISHzCdqbbeGeJyGp6RqSMHL/yFBnstp3LmSp2kx1Lw8s5XKEQm+kwtKEZdKeD6gKckoCnZVZQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"name\": \"California Branch\",\n    \"branch_code\": \"0075\",\n    \"address\": {\n        \"line1\": \"26 Oluwole Oladejo Street\",\n        \"line2\": \"Ojodu Berger\",\n        \"city\": \"Lagos\",\n        \"country\": \"Nigeria\",\n        \"state\": \"Lagos\",\n        \"post_code\": \"100216\"\n    }\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/branch",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"branch"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Branch created successfully\",\n    \"data\": {\n        \"user_id\": \"644bee1ef793812ffbd59aeb\",\n        \"name\": \"California Branch\",\n        \"branch_code\": \"0075\",\n        \"address\": {\n            \"line1\": \"26 Oluwole Oladejo Street\",\n            \"line2\": \"Ojodu Berger\",\n            \"city\": \"Lagos\",\n            \"country\": \"Nigeria\",\n            \"state\": \"Lagos\",\n            \"post_code\": \"100216\",\n            \"_id\": \"6452682d65ae84aa7e3c1ce0\"\n        },\n        \"_id\": \"6452682d65ae84aa7e3c1cdf\",\n        \"created_at\": \"2023-05-03T13:57:01.415Z\",\n        \"__v\": 0\n    }\n}"
								}
							]
						}
					]
				},
				{
					"name": "setup",
					"item": [
						{
							"name": "fetch country banks",
							"request": {
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts//banks/:country_code",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
									"name": "fetch country banks",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
												"type": "text"
											}
										],
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts//banks/:country_code",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
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
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Banks returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"5d3828f8eef5015d48275497\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"kyLE8CuoB\",\n            \"bank_name\": \"XCel\",\n            \"bank_code\": \"0001\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"country_code\": \"234\",\n            \"org_no\": \"000004\",\n            \"__v\": 0,\n            \"type\": \"internal\"\n        },\n        {\n            \"_id\": \"5d3828f8eef5015d48275498\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"kyLE8CuoB\",\n            \"bank_name\": \"United Bank of Africa\",\n            \"bank_code\": \"033\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"country_code\": \"234\",\n            \"org_no\": \"000004\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1dbc51871600042f81b2\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"pJT8ysDsnW\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"044\",\n            \"bank_name\": \"ACCESS BANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000014\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1dd351871600042f81b3\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"YQJFuCMZI_\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"755\",\n            \"bank_name\": \"ABMFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1dec51871600042f81b4\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"wA-B4khIjt\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"735\",\n            \"bank_name\": \"PARALLEX MF\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090004\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a1ecf51871600042f81b5\",\n            \"created\": \"2020-07-08T09:27:01.754Z\",\n            \"id\": \"ZPuFqmghNX\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"301\",\n            \"bank_name\": \"PARALLEX MFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090004\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a220a51871600042f81b6\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"3FWdLuS9NR\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"082\",\n            \"bank_name\": \"KEYSTONE\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000002\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a223951871600042f81b7\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"MKq58s3wsV\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"733\",\n            \"bank_name\": \"CMFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090130\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a225051871600042f81b8\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"5pywmyoxHy\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"050\",\n            \"bank_name\": \"ECOBANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000010\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a228751871600042f81b9\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"kLmSlOUQbT\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"214\",\n            \"bank_name\": \"FCMB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000003\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a22a651871600042f81ba\",\n            \"created\": \"2020-07-08T09:27:01.755Z\",\n            \"id\": \"vJGDJw3APa\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"070\",\n            \"bank_name\": \"FIDELITY\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000007\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a232951871600042f81bb\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"us2R-VLMVN\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"011\",\n            \"bank_name\": \"FIRST BANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000016\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a234851871600042f81bc\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"0TBJoKloeX\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"058\",\n            \"bank_name\": \"GTBANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000013\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a236e51871600042f81bd\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"4T9LNjgYUW\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"039\",\n            \"bank_name\": \"STANBIC IBTC\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000012\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a238751871600042f81be\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"XJ2lOOUXfQ\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"084\",\n            \"bank_name\": \"ENTERPRISE\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000019\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23a051871600042f81bf\",\n            \"created\": \"2020-07-08T09:27:01.756Z\",\n            \"id\": \"GICJyXGY5m\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"232\",\n            \"bank_name\": \"Sterling\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000001\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23b951871600042f81c0\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"0pUnBuvXjP\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"076\",\n            \"bank_name\": \"POLARIS BANK\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000008\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23d151871600042f81c1\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"xEkn9Rrn-Vu\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"032\",\n            \"bank_name\": \"Union Bank\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000018\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a23e951871600042f81c2\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"y1ECduy7NRn\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"215\",\n            \"bank_name\": \"Unity\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000011\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a241151871600042f81c3\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"pKuVh-RD-hE\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"035\",\n            \"bank_name\": \"Wema\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000017\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a242851871600042f81c4\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"WqMdbD1BZ5q\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"057\",\n            \"bank_name\": \"Zenith\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000015\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a243a51871600042f81c5\",\n            \"created\": \"2020-07-08T09:27:01.759Z\",\n            \"id\": \"7B5TSkGkGPX\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"063\",\n            \"bank_name\": \"DIAMOND\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000005\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a245151871600042f81c6\",\n            \"created\": \"2020-07-08T09:27:01.760Z\",\n            \"id\": \"iOgStm8BgE4\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"030\",\n            \"bank_name\": \"HERITAGE\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"000020\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        },\n        {\n            \"_id\": \"5d3a246c51871600042f81c7\",\n            \"created\": \"2020-07-08T09:27:01.760Z\",\n            \"id\": \"CiifdAsDo3G\",\n            \"country_code\": \"234\",\n            \"bank_code\": \"700\",\n            \"bank_name\": \"ACCION MFB\",\n            \"country_code_text\": \"NG\",\n            \"country_currency_symbol\": \"NGN\",\n            \"org_no\": \"090134\",\n            \"__v\": 0,\n            \"type\": \"external\"\n        }\n    ]\n}"
								}
							]
						},
						{
							"name": "fetch setup data",
							"request": {
								"auth": {
									"type": "noauth"
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/setup-data?issuer_id=640b794d6667f7cb1531a65f",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"setup-data"
									],
									"query": [
										{
											"key": "issuer_id",
											"value": "640b794d6667f7cb1531a65f"
										}
									]
								},
								"description": "Data For Fetching Varoius Defaults Data For Setting things up"
							},
							"response": [
								{
									"name": "fetch setup data",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
												"type": "text"
											}
										],
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/setup-data",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"setup-data"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Setup data retrieved successfully\",\n    \"data\": {\n        \"transaction_types\": [\n            {\n                \"_id\": \"60888814277f5f0018d5ec36\",\n                \"type\": \"payment processing\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"6088887a277f5f0018d5ec37\",\n                \"type\": \"salary processing\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"60888896277f5f0018d5ec38\",\n                \"type\": \"church funding\",\n                \"__v\": 0\n            }\n        ],\n        \"business_types\": [\n            {\n                \"_id\": \"60888a21277f5f0018d5ec39\",\n                \"type\": \"Financial Institution\",\n                \"__v\": 0\n            }\n        ],\n        \"countries\": [\n            {\n                \"_id\": \"6088280d4b1d2500185a6d07\",\n                \"name\": \"Nigeria\",\n                \"alpha2Code\": \"NG\",\n                \"alpha3Code\": \"NGA\",\n                \"callingCode\": \"234\",\n                \"capital\": \"Abuja\",\n                \"latitude\": \"10.0\",\n                \"longitude\": \"8.0\",\n                \"currencyCode\": \"NGN\",\n                \"currencyName\": \"Nigerian naira\",\n                \"currencySymbol\": \"₦\",\n                \"flag\": \"https://flagcdn.com/ng.svg\",\n                \"__v\": 0,\n                \"callingSign\": \"+234\"\n            },\n            {\n                \"_id\": \"6088519a277f5f0018d5ec23\",\n                \"name\": \"United Kingdom\",\n                \"alpha2Code\": \"GB\",\n                \"alpha3Code\": \"GBR\",\n                \"callingCode\": \"044\",\n                \"capital\": \"London\",\n                \"latitude\": \"54.0\",\n                \"longitude\": \"-2.0\",\n                \"currencyCode\": \"GBP\",\n                \"currencyName\": \"British pound\",\n                \"currencySymbol\": \"£\",\n                \"flag\": \"https://flagcdn.com/gb.svg\",\n                \"__v\": 0,\n                \"callingSign\": \"+44\"\n            },\n            {\n                \"_id\": \"608851d5277f5f0018d5ec24\",\n                \"name\": \"United States of America\",\n                \"alpha2Code\": \"US\",\n                \"alpha3Code\": \"USA\",\n                \"callingCode\": \"001\",\n                \"capital\": \"Washington, D.C.\",\n                \"latitude\": \"38.0\",\n                \"longitude\": \"-97.0\",\n                \"currencyCode\": \"USD\",\n                \"currencyName\": \"United States dollar\",\n                \"currencySymbol\": \"$\",\n                \"flag\": \"https://flagcdn.com/us.svg\",\n                \"__v\": 0,\n                \"callingSign\": \"+1\"\n            },\n            {\n                \"_id\": \"608851ed277f5f0018d5ec25\",\n                \"name\": \"Ghana\",\n                \"alpha2Code\": \"GH\",\n                \"alpha3Code\": \"GHA\",\n                \"callingCode\": \"233\",\n                \"capital\": \"Accra\",\n                \"latitude\": \"8.0\",\n                \"longitude\": \"-2.0\",\n                \"currencyCode\": \"GHS\",\n                \"currencyName\": \"Ghanaian cedi\",\n                \"currencySymbol\": \"₵\",\n                \"flag\": \"https://flagcdn.com/gh.svg\",\n                \"__v\": 0,\n                \"callingSign\": \"+233\"\n            },\n            {\n                \"_id\": \"60885220277f5f0018d5ec26\",\n                \"flag\": \"https://flagcdn.com/za.svg\",\n                \"name\": \"South Africa\",\n                \"alpha2Code\": \"ZA\",\n                \"alpha3Code\": \"ZAF\",\n                \"callingCode\": \"027\",\n                \"capital\": \"Pretoria\",\n                \"latitude\": \"-29.0\",\n                \"longitude\": \"24.0\",\n                \"currencyCode\": \"ZAR\",\n                \"currencyName\": \"South African rand\",\n                \"currencySymbol\": \"R\",\n                \"__v\": 0,\n                \"callingSign\": \"+27\"\n            },\n            {\n                \"_id\": \"60885258277f5f0018d5ec27\",\n                \"flag\": \"https://flagcdn.com/sn.svg\",\n                \"name\": \"Senegal\",\n                \"alpha2Code\": \"SN\",\n                \"alpha3Code\": \"SEN\",\n                \"callingCode\": \"221\",\n                \"capital\": \"Dakar\",\n                \"latitude\": \"14.0\",\n                \"longitude\": \"-14.0\",\n                \"currencyCode\": \"XOF\",\n                \"currencyName\": \"West African CFA franc\",\n                \"currencySymbol\": \"CFA\",\n                \"__v\": 0,\n                \"callingSign\": \"+221\"\n            },\n            {\n                \"_id\": \"60885281277f5f0018d5ec28\",\n                \"flag\": \"https://flagcdn.com/cm.svg\",\n                \"name\": \"Cameroon\",\n                \"alpha2Code\": \"CM\",\n                \"alpha3Code\": \"CMR\",\n                \"callingCode\": \"237\",\n                \"capital\": \"Yaoundé\",\n                \"latitude\": \"6.0\",\n                \"longitude\": \"12.0\",\n                \"currencyCode\": \"XAF\",\n                \"currencyName\": \"Central African CFA franc\",\n                \"currencySymbol\": \"XAF\",\n                \"__v\": 0,\n                \"callingSign\": \"+237\"\n            },\n            {\n                \"_id\": \"608852a3277f5f0018d5ec29\",\n                \"flag\": \"https://flagcdn.com/ci.svg\",\n                \"name\": \"Côte d'Ivoire\",\n                \"alpha2Code\": \"CI\",\n                \"alpha3Code\": \"CIV\",\n                \"callingCode\": \"225\",\n                \"capital\": \"Yamoussoukro\",\n                \"latitude\": \"8.0\",\n                \"longitude\": \"-5.0\",\n                \"currencyCode\": \"XOF\",\n                \"currencyName\": \"West African CFA franc\",\n                \"currencySymbol\": \"CFA\",\n                \"__v\": 0,\n                \"callingSign\": \"+225\"\n            },\n            {\n                \"_id\": \"608852b7277f5f0018d5ec2a\",\n                \"flag\": \"https://flagcdn.com/cd.svg\",\n                \"name\": \"Democratic Republic of Congo\",\n                \"alpha2Code\": \"CD\",\n                \"alpha3Code\": \"COD\",\n                \"callingCode\": \"243\",\n                \"capital\": \"Kinshasa\",\n                \"latitude\": \"0.0\",\n                \"longitude\": \"25.0\",\n                \"currencyCode\": \"CDF\",\n                \"currencyName\": \"Congolese franc\",\n                \"currencySymbol\": \"Fr\",\n                \"__v\": 0,\n                \"callingSign\": \"+243\"\n            },\n            {\n                \"_id\": \"608852c7277f5f0018d5ec2b\",\n                \"flag\": \"https://flagcdn.com/et.svg\",\n                \"name\": \"Ethiopia\",\n                \"alpha2Code\": \"ET\",\n                \"alpha3Code\": \"ETH\",\n                \"callingCode\": \"251\",\n                \"capital\": \"Addis Ababa\",\n                \"latitude\": \"8.0\",\n                \"longitude\": \"38.0\",\n                \"currencyCode\": \"ETB\",\n                \"currencyName\": \"Ethiopian birr\",\n                \"currencySymbol\": \"Br\",\n                \"__v\": 0,\n                \"callingSign\": \"+251\"\n            },\n            {\n                \"_id\": \"608852df277f5f0018d5ec2c\",\n                \"flag\": \"https://flagcdn.com/ke.svg\",\n                \"name\": \"Kenya\",\n                \"alpha2Code\": \"KE\",\n                \"alpha3Code\": \"KEN\",\n                \"callingCode\": \"254\",\n                \"capital\": \"Nairobi\",\n                \"latitude\": \"1.0\",\n                \"longitude\": \"38.0\",\n                \"currencyCode\": \"KES\",\n                \"currencyName\": \"Kenyan shilling\",\n                \"currencySymbol\": \"Sh\",\n                \"__v\": 0,\n                \"callingSign\": \"+254\"\n            },\n            {\n                \"_id\": \"608852f2277f5f0018d5ec2d\",\n                \"flag\": \"https://flagcdn.com/zm.svg\",\n                \"name\": \"Zambia\",\n                \"alpha2Code\": \"ZM\",\n                \"alpha3Code\": \"ZMB\",\n                \"callingCode\": \"260\",\n                \"capital\": \"Lusaka\",\n                \"latitude\": \"-15.0\",\n                \"longitude\": \"30.0\",\n                \"currencyCode\": \"ZMW\",\n                \"currencyName\": \"Zambian kwacha\",\n                \"currencySymbol\": \"ZK\",\n                \"__v\": 0,\n                \"callingSign\": \"+260\"\n            },\n            {\n                \"_id\": \"60885361277f5f0018d5ec2e\",\n                \"flag\": \"https://flagcdn.com/fr.svg\",\n                \"name\": \"France\",\n                \"alpha2Code\": \"FR\",\n                \"alpha3Code\": \"FRA\",\n                \"callingCode\": \"033\",\n                \"capital\": \"Paris\",\n                \"latitude\": \"46.0\",\n                \"longitude\": \"2.0\",\n                \"currencyCode\": \"EUR\",\n                \"currencyName\": \"Euro\",\n                \"currencySymbol\": \"€\",\n                \"__v\": 0,\n                \"callingSign\": \"+33\"\n            },\n            {\n                \"_id\": \"60885375277f5f0018d5ec2f\",\n                \"flag\": \"https://flagcdn.com/de.svg\",\n                \"name\": \"Germany\",\n                \"alpha2Code\": \"DE\",\n                \"alpha3Code\": \"DEU\",\n                \"callingCode\": \"049\",\n                \"capital\": \"Berlin\",\n                \"latitude\": \"51.0\",\n                \"longitude\": \"9.0\",\n                \"currencyCode\": \"EUR\",\n                \"currencyName\": \"Euro\",\n                \"currencySymbol\": \"€\",\n                \"__v\": 0,\n                \"callingSign\": \"+49\"\n            },\n            {\n                \"_id\": \"60885384277f5f0018d5ec30\",\n                \"flag\": \"https://flagcdn.com/es.svg\",\n                \"name\": \"Spain\",\n                \"alpha2Code\": \"ES\",\n                \"alpha3Code\": \"ESP\",\n                \"callingCode\": \"034\",\n                \"capital\": \"Madrid\",\n                \"latitude\": \"40.0\",\n                \"longitude\": \"-4.0\",\n                \"currencyCode\": \"EUR\",\n                \"currencyName\": \"Euro\",\n                \"currencySymbol\": \"€\",\n                \"__v\": 0,\n                \"callingSign\": \"+34\"\n            },\n            {\n                \"_id\": \"60885395277f5f0018d5ec31\",\n                \"flag\": \"https://flagcdn.com/cn.svg\",\n                \"name\": \"China\",\n                \"alpha2Code\": \"CN\",\n                \"alpha3Code\": \"CHN\",\n                \"callingCode\": \"086\",\n                \"capital\": \"Beijing\",\n                \"latitude\": \"35.0\",\n                \"longitude\": \"105.0\",\n                \"currencyCode\": \"CNY\",\n                \"currencyName\": \"Chinese yuan\",\n                \"currencySymbol\": \"¥\",\n                \"__v\": 0,\n                \"callingSign\": \"+86\"\n            },\n            {\n                \"_id\": \"608853c5277f5f0018d5ec32\",\n                \"flag\": \"https://flagcdn.com/in.svg\",\n                \"name\": \"India\",\n                \"alpha2Code\": \"IN\",\n                \"alpha3Code\": \"IND\",\n                \"callingCode\": \"091\",\n                \"capital\": \"New Delhi\",\n                \"latitude\": \"20.0\",\n                \"longitude\": \"77.0\",\n                \"currencyCode\": \"INR\",\n                \"currencyName\": \"Indian rupee\",\n                \"currencySymbol\": \"₹\",\n                \"__v\": 0,\n                \"callingSign\": \"+91\"\n            },\n            {\n                \"_id\": \"608853d7277f5f0018d5ec33\",\n                \"flag\": \"https://flagcdn.com/ae.svg\",\n                \"name\": \"United Arab Emirates\",\n                \"alpha2Code\": \"AE\",\n                \"alpha3Code\": \"ARE\",\n                \"callingCode\": \"971\",\n                \"capital\": \"Abu Dhabi\",\n                \"latitude\": \"24.0\",\n                \"longitude\": \"54.0\",\n                \"currencyCode\": \"AED\",\n                \"currencyName\": \"United Arab Emirates dirham\",\n                \"currencySymbol\": \"د.إ\",\n                \"__v\": 0,\n                \"callingSign\": \"+971\"\n            },\n            {\n                \"_id\": \"6088542a277f5f0018d5ec34\",\n                \"flag\": \"https://flagcdn.com/lr.svg\",\n                \"name\": \"Liberia\",\n                \"alpha2Code\": \"LR\",\n                \"alpha3Code\": \"LBR\",\n                \"callingCode\": \"231\",\n                \"capital\": \"Monrovia\",\n                \"latitude\": \"6.5\",\n                \"longitude\": \"-9.5\",\n                \"currencyCode\": \"LRD\",\n                \"currencyName\": \"Liberian dollar\",\n                \"currencySymbol\": \"$\",\n                \"__v\": 0,\n                \"callingSign\": \"+231\"\n            },\n            {\n                \"_id\": \"625fcad63c37dcbdc56f3dc9\",\n                \"flag\": \"https://flagcdn.com/cg.svg\",\n                \"name\": \"Congo Brazaville\",\n                \"alpha2Code\": \"CG\",\n                \"alpha3Code\": \"COG\",\n                \"callingCode\": \"242\",\n                \"capital\": \"Brazaville\",\n                \"latitude\": \"6.5\",\n                \"longitude\": \"-9.5\",\n                \"currencyCode\": \"XAF\",\n                \"currencyName\": \"XAF\",\n                \"currencySymbol\": \"F\",\n                \"__v\": 0,\n                \"callingSign\": \"+242\"\n            },\n            {\n                \"_id\": \"63c79fbead88116ecd54d4de\",\n                \"name\": \"Tuvalu\",\n                \"alpha2Code\": \"TV\",\n                \"alpha3Code\": \"TUV\",\n                \"callingCode\": \"688\",\n                \"capital\": \"Funafuti\",\n                \"latitude\": \"10.0\",\n                \"longitude\": \"8.0\",\n                \"currencyCode\": \"TVD\",\n                \"currencyName\": \"Tuvalu Dollar\",\n                \"currencySymbol\": \"$T\",\n                \"flag\": \"https://flagcdn.com/tv.svg\",\n                \"__v\": 0,\n                \"callingSign\": \"+688\"\n            },\n            {\n                \"_id\": \"63c7a061ad88116ecd54d4df\",\n                \"name\": \"Laos\",\n                \"alpha2Code\": \"LA\",\n                \"alpha3Code\": \"LAO\",\n                \"callingCode\": \"856\",\n                \"capital\": \"Vientiane\",\n                \"latitude\": \"10.0\",\n                \"longitude\": \"8.0\",\n                \"currencyCode\": \"LAK\",\n                \"currencyName\": \"Laotian Kip\",\n                \"currencySymbol\": \"₭\",\n                \"flag\": \"https://flagcdn.com/la.svg\",\n                \"__v\": 0,\n                \"callingSign\": \"+856\"\n            }\n        ]\n    }\n}"
								}
							]
						},
						{
							"name": "get opt countries",
							"request": {
								"auth": {
									"type": "noauth"
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/accounts/countries",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"accounts",
										"countries"
									]
								},
								"description": "Data For Fetching Varoius Defaults Data For Setting things up"
							},
							"response": [
								{
									"name": "get country data",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
												"type": "text"
											}
										],
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/accounts/countries",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"accounts",
												"countries"
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": "{\n    \"success\": true,\n    \"message\": \"Countries returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"6088280d4b1d2500185a6d07\",\n            \"name\": \"Nigeria\",\n            \"alpha2Code\": \"NG\",\n            \"alpha3Code\": \"NGA\",\n            \"callingCode\": \"234\",\n            \"capital\": \"Abuja\",\n            \"latitude\": \"10.0\",\n            \"longitude\": \"8.0\",\n            \"currencyCode\": \"NGN\",\n            \"currencyName\": \"Nigerian naira\",\n            \"currencySymbol\": \"₦\",\n            \"flag\": \"https://flagcdn.com/ng.svg\",\n            \"__v\": 0,\n            \"callingSign\": \"+234\"\n        },\n        {\n            \"_id\": \"6088519a277f5f0018d5ec23\",\n            \"name\": \"United Kingdom\",\n            \"alpha2Code\": \"GB\",\n            \"alpha3Code\": \"GBR\",\n            \"callingCode\": \"044\",\n            \"capital\": \"London\",\n            \"latitude\": \"54.0\",\n            \"longitude\": \"-2.0\",\n            \"currencyCode\": \"GBP\",\n            \"currencyName\": \"British pound\",\n            \"currencySymbol\": \"£\",\n            \"flag\": \"https://flagcdn.com/gb.svg\",\n            \"__v\": 0,\n            \"callingSign\": \"+44\"\n        }\n    ]\n}"
								}
							]
						}
					]
				}
			],
			"description": "First we setup your developer (issuer) account, app, generate app keys and also whitelist your IP address to allow secure seamless connection between your app's API and the Xcel API."
		},
		{
			"name": "POTS (UPDATED)",
			"item": [
				{
					"name": "create pot",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "3f/KVYPN4XSYxjSCZjPDTloGeONv25TYBvl5XxEQd9IfxMYpOzGmUUAcaDcNem0fZAPXvutsQXW54XRelsoiJw==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"currency\": \"TVD\",\n    \"country\": \"NG\",\n    \"name\": \"Group Pot\",\n    \"purpose\": \"Group Savings\",\n    \"duration\": \"2023-05-06\",\n    \"type\": \"regular\",\n    \"target\": 2000\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/pots",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots"
							]
						}
					},
					"response": [
						{
							"name": "create pot",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "W91zJwYp5b5AaZ2D5Rhv9EsmEzLUcETdKpZDxQfLpPI+cGxtk1OGH/zUFfmVXYTLm7S3PBd0EYIHr3NeLv6J3Q==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency\": \"NGN\",\n    \"name\": \"Group Pot\",\n    \"purpose\": \"Group Savings\",\n    \"type\": \"saving\",\n    \"target\": 200000,\n    \"cycle\": \"quarterly\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Pot created successfully\",\n    \"data\": {\n        \"issuer_id\": \"641d6fb5fbfd7f09dd443cdd\",\n        \"admin_id\": \"641d6fb5fbfd7f09dd443cdd\",\n        \"currency\": \"NGN\",\n        \"name\": \"Group Pot\",\n        \"purpose\": \"Group Savings\",\n        \"type\": \"savings\",\n        \"locked\": false,\n        \"cycle\": \"quarterly\",\n        \"target\": 200000,\n        \"next_maturity\": \"2023-06-24T12:20:33.000Z\",\n        \"_id\": \"641d95917f3288aae32864ba\",\n        \"created_at\": \"2023-03-24T12:20:33.492Z\",\n        \"updated_at\": \"2023-03-24T12:20:33.492Z\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "invite user",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "m5Aii3jiuQk35Dv35exzIkJJoI1dL9cg2e2VOgPl2ER64VjYU9UjEhG+kMNbtKIfYB11zrkZJge5McwiLoGgjA==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"pot_id\": \"6454c35c36776a7446b35cbb\",\n    \"user_id\": \"640b794d6667f7cb1531a65f\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/pots/invite",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"invite"
							]
						}
					},
					"response": [
						{
							"name": "successful invite",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "GeXp046ZOV+G8DvHIWiQIgaAPdLjTO78ke3gAGgB/MrttfVfLZXTqB4yKQja8nr8n4Q/5CQBdWscyigSUt3gFQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency\": \"NGN\",\n    \"name\": \"Group Pot\",\n    \"purpose\": \"Group Savings\",\n    \"type\": \"saving\",\n    \"target\": 200000,\n    \"cycle\": \"quarterly\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"User invited to pot successfully\",\n    \"data\": {\n        \"pot_id\": \"642157c61c5319299adad4ac\",\n        \"user_id\": \"641d694fa37ab68fafc68af1\",\n        \"status\": \"pending\",\n        \"expiry_date\": null,\n        \"_id\": \"642157d01c5319299adad4b4\",\n        \"created_at\": \"2023-03-27T08:46:08.682Z\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "get user pots",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "GeXp046ZOV+G8DvHIWiQIgaAPdLjTO78ke3gAGgB/MrttfVfLZXTqB4yKQja8nr8n4Q/5CQBdWscyigSUt3gFQ==",
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
							"raw": "{{XCEL_v2_BASE_URL}}/pots",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots"
							]
						}
					},
					"response": [
						{
							"name": "get user pots",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency\": \"NGN\",\n    \"name\": \"Group Pot\",\n    \"purpose\": \"Group Savings\",\n    \"type\": \"saving\",\n    \"target\": 200000,\n    \"cycle\": \"quarterly\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots?type=esusu&pot_id=642eae701fc62dd859e5f7fc&limit=1&skip=0",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									],
									"query": [
										{
											"key": "type",
											"value": "esusu"
										},
										{
											"key": "pot_id",
											"value": "642eae701fc62dd859e5f7fc"
										},
										{
											"key": "limit",
											"value": "1"
										},
										{
											"key": "skip",
											"value": "0"
										}
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"User pots returned successfully\",\n    \"data\": {\n        \"count\": 5,\n        \"total_balance\": 0.04,\n        \"result\": [\n            {\n                \"_id\": \"642e6f702a4d6ddfe4b1a0f4\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"owner_id\": \"64269e2d2d1f06c046a0137a\",\n                \"balance\": 0,\n                \"currency\": \"TVD\",\n                \"country\": \"NG\",\n                \"name\": \"Group Pot\",\n                \"purpose\": \"Group Savings\",\n                \"type\": \"esusu\",\n                \"locked\": false,\n                \"cycle\": \"quarterly\",\n                \"target\": 200000,\n                \"member_limit\": 12,\n                \"payment_limit\": null,\n                \"next_maturity\": \"2023-04-06T07:06:24.000Z\",\n                \"created_at\": \"2023-04-06T07:06:24.651Z\",\n                \"updated_at\": \"2023-04-06T07:06:24.651Z\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"642ead72e3d0b7a3df74c66a\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"owner_id\": \"64269e2d2d1f06c046a0137a\",\n                \"balance\": 0,\n                \"currency\": \"TVD\",\n                \"country\": \"NG\",\n                \"name\": \"Group Pot\",\n                \"purpose\": \"Group Savings\",\n                \"type\": \"esusu\",\n                \"locked\": false,\n                \"cycle\": \"weekly\",\n                \"target\": 2000,\n                \"member_limit\": 12,\n                \"payment_limit\": null,\n                \"next_maturity\": \"2023-04-06T11:30:58.000Z\",\n                \"created_at\": \"2023-04-06T11:30:58.734Z\",\n                \"updated_at\": \"2023-04-06T11:30:58.734Z\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"642eadf4f6e8f403c5905ad3\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"owner_id\": \"64269e2d2d1f06c046a0137a\",\n                \"balance\": 0,\n                \"currency\": \"TVD\",\n                \"country\": \"NG\",\n                \"name\": \"Group Pot\",\n                \"purpose\": \"Group Savings\",\n                \"type\": \"esusu\",\n                \"locked\": false,\n                \"cycle\": \"weekly\",\n                \"target\": 2000,\n                \"member_limit\": 12,\n                \"payment_limit\": null,\n                \"next_maturity\": \"2023-04-06T11:33:08.000Z\",\n                \"created_at\": \"2023-04-06T11:33:08.868Z\",\n                \"updated_at\": \"2023-04-06T11:33:08.868Z\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"642eae26c93af18ef5b31aa8\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"owner_id\": \"64269e2d2d1f06c046a0137a\",\n                \"balance\": 0,\n                \"currency\": \"TVD\",\n                \"country\": \"NG\",\n                \"name\": \"Group Pot\",\n                \"purpose\": \"Group Savings\",\n                \"type\": \"esusu\",\n                \"locked\": false,\n                \"cycle\": \"weekly\",\n                \"target\": 2000,\n                \"member_limit\": 12,\n                \"payment_limit\": null,\n                \"next_maturity\": \"2023-04-06T11:33:58.000Z\",\n                \"created_at\": \"2023-04-06T11:33:58.277Z\",\n                \"updated_at\": \"2023-04-06T11:33:58.277Z\",\n                \"__v\": 0\n            },\n            {\n                \"_id\": \"642eae701fc62dd859e5f7fc\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"owner_id\": \"64269e2d2d1f06c046a0137a\",\n                \"balance\": 0.04,\n                \"currency\": \"TVD\",\n                \"country\": \"NG\",\n                \"name\": \"Group Pot\",\n                \"purpose\": \"Group Savings\",\n                \"type\": \"esusu\",\n                \"locked\": false,\n                \"cycle\": \"weekly\",\n                \"target\": 2000,\n                \"member_limit\": 12,\n                \"payment_limit\": null,\n                \"next_maturity\": \"2023-04-06T11:35:12.000Z\",\n                \"created_at\": \"2023-04-06T11:35:12.655Z\",\n                \"updated_at\": \"2023-04-06T11:35:12.655Z\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
						}
					]
				},
				{
					"name": "credit pot",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "frdPQw3EBXDTpHMAHGyvnxeI0Y8GAahWg/Cf1SDnQ2p077XMOAoVdW2gmR8im6YjJ6Mj6bEwbcABIKwJXl75rw==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"pot_id\": \"6454c2336f63196e9ab236c9\",\n    \"from_amount\": \"100\",\n    \"to_amount\": \"100\",\n    \"pin\": \"1234\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/pots/credit",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"credit"
							]
						}
					},
					"response": [
						{
							"name": "credit pot",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "a1GBr3JPc83EyzFqkTdf56KYmD8X0BGO1c2DTwEJ/FXM1WAS7JAJ9egzsSf1wDZU6F7XOr2a6SmAjUcxRD15Mg==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"pot_id\": \"6454c2336f63196e9ab236c9\",\n    \"from_amount\": \"0.01\",\n    \"to_amount\": \"0.01\",\n    \"pin\": \"1234\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots/credit",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots",
										"credit"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Pot credited successfully\",\n    \"data\": {\n        \"pot_id\": \"646208364e055c15ef9d6d66\",\n        \"type\": \"pots_credit\",\n        \"user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"title\": \"POT funding\",\n        \"timestamp\": \"2023-05-18T12:22:53.090Z\",\n        \"date\": \"2023-05-18T12:22:53.090Z\",\n        \"date_id\": \"2023-05-17T23:00:00.000Z\",\n        \"sender_user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"merchant_id\": \"\",\n        \"subsidiary_id\": \"\",\n        \"account_type\": \"ADMIN\",\n        \"settlements\": {\n            \"debit\": {\n                \"created\": \"2023-03-30T12:33:17.812Z\",\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"64258152927f719bdacd7030\"\n                },\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"app_id\": \"640b794e6667f7cb1531a666\",\n                \"first_name\": \"XCel Merchant Limited\",\n                \"last_name\": \" \",\n                \"account_id\": \"6880040000227040\",\n                \"currency\": \"TVD\",\n                \"wallet_no\": \"3589806e3e346ff5d0b493873\",\n                \"scheme_code\": \"688004\",\n                \"account_type\": \"ADMIN\",\n                \"email\": \"valentine.obi@xcelapp.com\",\n                \"phone\": \"08102478821\",\n                \"trusted\": true,\n                \"closed\": false,\n                \"country\": \"NG\",\n                \"banned\": false,\n                \"limit_level\": \"10000000\",\n                \"provider\": \"wallet-api\",\n                \"disabled\": false,\n                \"version_locked\": false\n            },\n            \"credit\": {\n                \"created\": \"2023-04-03T21:29:34.140Z\",\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"64258152927f719bdacd7030\"\n                },\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"app_id\": \"640b794e6667f7cb1531a666\",\n                \"first_name\": \"XCel Merchant Limited\",\n                \"last_name\": \" \",\n                \"account_id\": \"6880040000227487\",\n                \"currency\": \"TVD\",\n                \"wallet_no\": \"3589806e3e343330222222\",\n                \"scheme_code\": \"688004\",\n                \"account_type\": \"ADMIN\",\n                \"email\": \"valentine.obi@xcelapp.com\",\n                \"phone\": \"08102478821\",\n                \"trusted\": true,\n                \"closed\": false,\n                \"country\": \"NG\",\n                \"banned\": false,\n                \"limit_level\": \"10000000\",\n                \"provider\": \"wallet-api\",\n                \"disabled\": false,\n                \"version_locked\": false\n            }\n        },\n        \"payer_id\": \"4614935072\",\n        \"channel_id\": \"Wallet API\",\n        \"src_country_code\": \"NG\",\n        \"des_country_code\": \"NG\",\n        \"src_account\": \"4614935072\",\n        \"src_scheme_code\": \"234004\",\n        \"des_scheme_code\": \"688004\",\n        \"src_currency_code\": \"TVD\",\n        \"des_currency_code\": \"TVD\",\n        \"src_currency_sign\": \"$T\",\n        \"des_currency_sign\": \"$T\",\n        \"trans_code\": \"payment\",\n        \"src_card_num\": \"6880040000227074\",\n        \"des_card_num\": \"6880040000227487\",\n        \"payment_code\": \"\",\n        \"src_amount_paid\": \"0.10\",\n        \"des_amount_paid\": \"0.10\",\n        \"description\": \"User pot credit\",\n        \"des_first_name\": \"XCel Merchant Limited\",\n        \"src_first_name\": \"User\",\n        \"des_last_name\": \" \",\n        \"src_last_name\": \"1\",\n        \"trans_type\": \"pots\",\n        \"name\": \"XCel Merchant Limited  \",\n        \"exchange_rate\": \"1\",\n        \"sent_status\": false,\n        \"reference_no\": \"e23af291-8fea-4117-a6bc-384478afa95e\",\n        \"channel\": \"Wallet API\",\n        \"external_reference\": \"e23af291-8fea-4117-a6bc-384478afa95e\",\n        \"status\": \"success\",\n        \"transaction_id\": \"e23af291-8fea-4117-a6bc-384478afa95e\"\n    }\n}"
						}
					]
				},
				{
					"name": "debit pot",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "naODHKNloE7NnfH3KN3kfRpGo8rXszxvzz6V5Av2hMhgRmOfSK3N0vo61xXSwFFTmntM48Hngn9EL2kZtl4o5Q==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"pot_id\": \"646244b4e5744133f5f35315\",\n    \"amount\": 0.01,\n    \"pin\": \"1234\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/pots/debit",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"debit"
							]
						}
					},
					"response": [
						{
							"name": "debit pot",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "w/bhmyrLVenOyjfWwStfLQmAlN3279Ljw0e/mneWkdhmS8k3cwsE/Wdpr0PbvOQcz4XYyKMrSnUynqkp5TfIqA==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"pot_id\": \"642b902ca250be419cebe4dc\",\n    \"from_amount\": \"0.01\",\n    \"to_amount\": \"0.01\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Pot funds withdrawn successfully\",\n    \"data\": {\n        \"pot_id\": \"646208364e055c15ef9d6d66\",\n        \"type\": \"pots_debit\",\n        \"user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"title\": \"POT withdrawal\",\n        \"timestamp\": \"2023-05-18T12:25:28.802Z\",\n        \"date\": \"2023-05-18T12:25:28.802Z\",\n        \"date_id\": \"2023-05-17T23:00:00.000Z\",\n        \"receiver_user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"merchant_id\": \"\",\n        \"subsidiary_id\": \"\",\n        \"account_type\": \"INDIVIDUAL\",\n        \"settlements\": {\n            \"debit\": {\n                \"created\": \"2023-03-30T12:33:17.812Z\",\n                \"address\": {\n                    \"line1\": \"26 Oluwole Oladejo Street\",\n                    \"line2\": \"Ojodu Berger\",\n                    \"city\": \"Lagos\",\n                    \"country\": \"Nigeria\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"100216\",\n                    \"_id\": \"64258152927f719bdacd7030\"\n                },\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"app_id\": \"640b794e6667f7cb1531a666\",\n                \"first_name\": \"XCel Merchant Limited\",\n                \"last_name\": \" \",\n                \"account_id\": \"6880040000227040\",\n                \"currency\": \"TVD\",\n                \"wallet_no\": \"3589806e3e346ff5d0b493873\",\n                \"scheme_code\": \"688004\",\n                \"account_type\": \"ADMIN\",\n                \"email\": \"valentine.obi@xcelapp.com\",\n                \"phone\": \"08102478821\",\n                \"trusted\": true,\n                \"closed\": false,\n                \"country\": \"NG\",\n                \"banned\": false,\n                \"limit_level\": \"10000000\",\n                \"provider\": \"wallet-api\",\n                \"disabled\": false,\n                \"version_locked\": false\n            },\n            \"credit\": {\n                \"user_id\": \"64269e2d2d1f06c046a0137a\",\n                \"created\": \"2023-03-31T08:47:44.051Z\",\n                \"address\": {\n                    \"line1\": \"42 Okesuna street\",\n                    \"line2\": \"\",\n                    \"city\": \"Yaba\",\n                    \"country\": \"NG\",\n                    \"state\": \"Lagos\",\n                    \"post_code\": \"1000001\",\n                    \"_id\": \"64269e2d2d1f06c046a0137c\"\n                },\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"app_id\": \"640b794e6667f7cb1531a666\",\n                \"first_name\": \"User\",\n                \"last_name\": \"1\",\n                \"account_id\": \"6880040000227074\",\n                \"currency\": \"TVD\",\n                \"wallet_no\": \"4614935072\",\n                \"scheme_code\": \"234004\",\n                \"provider\": \"wallet-api\",\n                \"email\": \"user1@yahoo.com\",\n                \"country\": \"NG\",\n                \"phone\": \"+2349012345584\",\n                \"trusted\": false,\n                \"closed\": false,\n                \"banned\": false,\n                \"firebase_id\": \"eiHtICaXQjO9Sv29Vkt76e:APA91bF-fipHD5pSYgHboVQJX-XSGMhixuIupmhIE4GfYa30JujPa96K_rKXUsGjt7S4CkNG0laeuDCm8WFFcRMB_6pL4Vgc6-aqLGaOI48DTecE9gKfSGxRYBvWd9MI8Po3DyfkrqBQ\",\n                \"notification_type\": \"firebase\",\n                \"notification_setup\": {},\n                \"account_type\": \"INDIVIDUAL\",\n                \"private_key\": \"b2a52dc0-cfa0-11ed-96bb-a949481b0579\",\n                \"public_key\": \"eTz.test_4ca4dc6e1629609df0a270989174cf474da88da22309538396b8de3fe4850f48\",\n                \"disabled\": false,\n                \"version_locked\": false\n            }\n        },\n        \"payer_id\": \"3589806e3e343330921100\",\n        \"ref_no\": \"6880040000227074\",\n        \"channel_id\": \"Wallet API\",\n        \"src_country_code\": \"NG\",\n        \"des_country_code\": \"NG\",\n        \"des_account\": \"6880040000227074\",\n        \"src_account\": \"3589806e3e343330921100\",\n        \"src_scheme_code\": \"688004\",\n        \"des_scheme_code\": \"234004\",\n        \"src_currency_code\": \"TVD\",\n        \"des_currency_code\": \"TVD\",\n        \"src_currency_sign\": \"$T\",\n        \"des_currency_sign\": \"$T\",\n        \"trans_code\": \"payment\",\n        \"src_card_num\": \"6880040000227486\",\n        \"des_card_num\": \"6880040000227074\",\n        \"payment_code\": \"\",\n        \"src_amount_paid\": \"0.10\",\n        \"des_amount_paid\": \"0.10\",\n        \"description\": \"Pot withdrawal\",\n        \"des_first_name\": \"User\",\n        \"src_first_name\": \"XCel Merchant Limited\",\n        \"des_last_name\": \"1\",\n        \"src_last_name\": \" \",\n        \"trans_type\": \"pots\",\n        \"name\": \"User 1\",\n        \"exchange_rate\": \"1\",\n        \"sent_status\": false,\n        \"reference_no\": \"53e65337-72c7-4d53-ae2f-2b2b69de9e27\",\n        \"channel\": \"Wallet API\",\n        \"account_no\": \"6880040000227074\",\n        \"external_reference\": \"53e65337-72c7-4d53-ae2f-2b2b69de9e27\",\n        \"status\": \"success\",\n        \"transaction_id\": \"53e65337-72c7-4d53-ae2f-2b2b69de9e27\"\n    }\n}"
						}
					]
				},
				{
					"name": "add pot admin",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "GeXp046ZOV+G8DvHIWiQIgaAPdLjTO78ke3gAGgB/MrttfVfLZXTqB4yKQja8nr8n4Q/5CQBdWscyigSUt3gFQ==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"pot_id\": \"642b8a277d5e89df55e63be0\",\n    \"user_id\": \"641d6fb5fbfd7f09dd443cdd\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/pots/admin",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"admin"
							]
						}
					},
					"response": [
						{
							"name": "successful invite",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency\": \"NGN\",\n    \"name\": \"Group Pot\",\n    \"purpose\": \"Group Savings\",\n    \"type\": \"saving\",\n    \"target\": 200000,\n    \"cycle\": \"quarterly\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Pot admin added successfully\",\n    \"data\": {\n        \"pot_id\": \"642157c61c5319299adad4ac\",\n        \"user_id\": \"641d694fa37ab68fafc68af1\",\n        \"status\": \"pending\",\n        \"expiry_date\": null,\n        \"_id\": \"642157d01c5319299adad4b4\",\n        \"created_at\": \"2023-03-27T08:46:08.682Z\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "update pot invite status",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "x+eyXc9ZCp4MI/xayJfHlF+Ve0O9camWnTFh1SNPxhF/ffpDop2idaUphtjMGtXoHj/n3I1ux7Jhc9Iz7shLkw==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"status\": \"accepted\",\n    \"invite_id\": \"642d9cbdc17f4dc54d931261\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/pots/invite/response",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"invite",
								"response"
							]
						}
					},
					"response": [
						{
							"name": "update pot invite status",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency\": \"NGN\",\n    \"name\": \"Group Pot\",\n    \"purpose\": \"Group Savings\",\n    \"type\": \"saving\",\n    \"target\": 200000,\n    \"cycle\": \"quarterly\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/pots",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Pot invitation accepted successfully\",\n    \"data\": {\n        \"pot_id\": \"6421bc3869fb16e27fd92172\",\n        \"member_index\": 2,\n        \"user_id\": \"641d6fb5fbfd7f09dd443cdd\",\n        \"accepted\": true,\n        \"admin\": false,\n        \"_id\": \"6421bf805b88b05107d86508\",\n        \"created_at\": \"2023-03-27T16:08:32.231Z\",\n        \"updated_at\": \"2023-03-27T16:08:32.231Z\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "get pot invites",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "x+eyXc9ZCp4MI/xayJfHlF+Ve0O9camWnTFh1SNPxhF/ffpDop2idaUphtjMGtXoHj/n3I1ux7Jhc9Iz7shLkw==",
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
							"raw": "{{XCEL_v2_BASE_URL}}/pots/invites?status=pending",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"invites"
							],
							"query": [
								{
									"key": "status",
									"value": "pending"
								}
							]
						}
					},
					"response": [
						{
							"name": "get pot invites",
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
									"raw": "{{XCEL_v2_BASE_URL}}/pots",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Invitations returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"6421bc4269fb16e27fd9217b\",\n            \"pot_id\": \"6421bc3869fb16e27fd92172\",\n            \"user_id\": \"641d6fb5fbfd7f09dd443cdd\",\n            \"status\": \"pending\",\n            \"expiry_date\": null,\n            \"created_at\": \"2023-03-27T15:54:42.185Z\",\n            \"__v\": 0\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "get pot transactions",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
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
							"raw": "{{XCEL_v2_BASE_URL}}/pots/transactions",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"pots",
								"transactions"
							]
						}
					},
					"response": [
						{
							"name": "get pot transactions",
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
									"raw": "{{XCEL_v2_BASE_URL}}/pots/transactions?type=pots_debit&limit=0&skip=0&status=success",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"pots",
										"transactions"
									],
									"query": [
										{
											"key": "type",
											"value": "pots_debit"
										},
										{
											"key": "limit",
											"value": "0"
										},
										{
											"key": "skip",
											"value": "0"
										},
										{
											"key": "status",
											"value": "success"
										}
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Pot transactions returned successfully\",\n    \"data\": {\n        \"count\": 2,\n        \"summary\": {\n            \"in\": 2000,\n            \"out\": 2000\n        },\n        \"transactions\": [\n            {\n                \"_id\": \"642ebe2d5ec8f5ea5d0d2d06\",\n                \"pot_id\": \"642eae701fc62dd859e5f7fc\",\n                \"type\": \"pots_debit\",\n                \"user_id\": \"64269e2d2d1f06c046a0137a\",\n                \"transaction_id\": \"aad92bab-e926-4501-8f9e-7c250cb9f19c\",\n                \"description\": \"User pot credit\",\n                \"title\": \"POT withdrawal\",\n                \"src_first_name\": \"User\",\n                \"src_currency_sign\": \"$T\",\n                \"des_currency_sign\": \"$T\",\n                \"src_amount_paid\": 2000,\n                \"src_currency_code\": \"TVD\",\n                \"des_currency_code\": \"TVD\",\n                \"status\": \"success\",\n                \"timestamp\": \"2023-04-06T12:42:21.151Z\",\n                \"__v\": 0,\n                \"des_amount_paid\": 20000\n            },\n            {\n                \"_id\": \"642ebffd7fda3dcdf81313b3\",\n                \"pot_id\": \"642eae701fc62dd859e5f7fc\",\n                \"type\": \"pots_credit\",\n                \"user_id\": \"64269e2d2d1f06c046a0137a\",\n                \"transaction_id\": \"228c114c-8ccb-4db0-b310-691e6d8a8c64\",\n                \"description\": \"User pot credit\",\n                \"title\": \"POT withdrawal\",\n                \"src_first_name\": \"User\",\n                \"des_first_name\": \"XCel Merchant Limited\",\n                \"src_currency_sign\": \"$T\",\n                \"des_currency_sign\": \"$T\",\n                \"src_amount_paid\": 2000,\n                \"des_amount_paid\": 2000,\n                \"src_currency_code\": \"TVD\",\n                \"des_currency_code\": \"TVD\",\n                \"status\": \"success\",\n                \"timestamp\": \"2023-04-06T12:50:04.787Z\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
						}
					]
				}
			]
		},
		{
			"name": "FEES(UPDATED)",
			"item": [
				{
					"name": "Create Fees",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "lFeoC1+prhlo536tsJGMAzmWR3ADNa6fJ8/fFFHXzGleUh6tf43uS4Vf09CDmgoIaSNIKuScglki5qfVDOBuAA==",
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
							"raw": "{{XCEL_v2_BASE_URL}}/fees",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
									"raw": "{{XCEL_v2_BASE_URL}}/fees",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Fee created successfully\",\n    \"data\": {\n        \"from_country\": \"NG\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"from_currency\": \"NGN\",\n        \"to_currency\": \"NGN\",\n        \"to_country\": \"NG\",\n        \"default\": {\n            \"percentage\": 0.1,\n            \"flat\": 0.25,\n            \"minimum_cap\": 1,\n            \"maximum_cap\": 5\n        },\n        \"type\": \"wallet\",\n        \"_id\": \"646141a88797b7ecb7bdfd42\",\n        \"__v\": 0,\n        \"ranges\": [\n            {\n                \"fees_id\": \"646141a88797b7ecb7bdfd42\",\n                \"min\": 0.01,\n                \"max\": 200,\n                \"percentage\": 1,\n                \"flat\": 0.25,\n                \"minimum_cap\": 5,\n                \"maximum_cap\": 25,\n                \"_id\": \"646141a88797b7ecb7bdfd44\",\n                \"__v\": 0\n            },\n            {\n                \"fees_id\": \"646141a88797b7ecb7bdfd42\",\n                \"min\": 200,\n                \"max\": 500,\n                \"percentage\": 0.5,\n                \"flat\": 0.5,\n                \"minimum_cap\": 15,\n                \"maximum_cap\": 35,\n                \"_id\": \"646141a88797b7ecb7bdfd45\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
						}
					]
				},
				{
					"name": "Fetch Fee by ID",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "lFeoC1+prhlo536tsJGMAzmWR3ADNa6fJ8/fFFHXzGleUh6tf43uS4Vf09CDmgoIaSNIKuScglki5qfVDOBuAA==",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/fees/646141a88797b7ecb7bdfd42",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"fees",
								"646141a88797b7ecb7bdfd42"
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
									"raw": "{{XCEL_v2_BASE_URL}}/fees/issuers/640b794d6667f7cb1531a65f",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"fees",
										"issuers",
										"640b794d6667f7cb1531a65f"
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Fees returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"646141a88797b7ecb7bdfd42\",\n            \"from_country\": \"NG\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"from_currency\": \"NGN\",\n            \"to_currency\": \"NGN\",\n            \"to_country\": \"NG\",\n            \"default\": {\n                \"percentage\": 0.1,\n                \"flat\": 0.25,\n                \"minimum_cap\": 1,\n                \"maximum_cap\": 5\n            },\n            \"type\": \"wallet\",\n            \"__v\": 0,\n            \"ranges\": [\n                {\n                    \"_id\": \"646141a88797b7ecb7bdfd44\",\n                    \"fees_id\": \"646141a88797b7ecb7bdfd42\",\n                    \"min\": 0.01,\n                    \"max\": 200,\n                    \"percentage\": 1,\n                    \"flat\": 0.25,\n                    \"minimum_cap\": 5,\n                    \"maximum_cap\": 25,\n                    \"__v\": 0\n                },\n                {\n                    \"_id\": \"646141a88797b7ecb7bdfd45\",\n                    \"fees_id\": \"646141a88797b7ecb7bdfd42\",\n                    \"min\": 200,\n                    \"max\": 500,\n                    \"percentage\": 0.5,\n                    \"flat\": 0.5,\n                    \"minimum_cap\": 15,\n                    \"maximum_cap\": 35,\n                    \"__v\": 0\n                }\n            ]\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Calculate Transaction Fees",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"from_country\":\"NG\",\n    \"to_country\":\"NG\",\n    \"to_currency\":\"NGN\",\n    \"from_currency\":\"NGN\",\n    \"from_amount\": \"1000\",\n    \"to_amount\": \"1000\",\n    \"type\": \"wallet\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/fees/calculate",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
									"raw": "{{XCEL_v2_BASE_URL}}/fees/calculate",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Calculation performed successfully\",\n    \"data\": {\n        \"transaction\": 1.25,\n        \"stamp\": 0,\n        \"vat\": 0\n    }\n}"
						}
					]
				}
			]
		},
		{
			"name": "PRODUCTS(UPDATED)",
			"item": [
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
									"raw": "{{XCEL_v2_BASE_URL}}/products",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Product created successfully\",\n    \"data\": {\n        \"user_id\": \"6396cfaeae5fd92994bab11e\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"name\": \"BMW iX 2023\",\n        \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n        \"images\": [\n            \"https://bucket.xcelapp.com/assets/img1.jpg\",\n            \"https://bucket.xcelapp.com/assets/img2.jpg\",\n            \"https://bucket.xcelapp.com/assets/img3.jpg\",\n            \"https://bucket.xcelapp.com/assets/img4.jpg\",\n            \"https://bucket.xcelapp.com/assets/img5.jpg\",\n            \"https://bucket.xcelapp.com/assets/img6.jpg\",\n            \"https://bucket.xcelapp.com/assets/img7.jpg\",\n            \"https://bucket.xcelapp.com/assets/img8.jpg\"\n        ],\n        \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n        \"description\": \"German Engineering\",\n        \"variations\": [\n            {\n                \"name\": \"red\",\n                \"type\": \"color\",\n                \"price\": 21000,\n                \"_id\": \"646147134e7b20af8a569781\"\n            },\n            {\n                \"name\": \"space-grey\",\n                \"type\": \"color\",\n                \"price\": 21005,\n                \"_id\": \"646147134e7b20af8a569782\"\n            },\n            {\n                \"name\": \"v6\",\n                \"type\": \"engine-size\",\n                \"price\": 20009,\n                \"_id\": \"646147134e7b20af8a569783\"\n            }\n        ],\n        \"amount\": 20000,\n        \"currency\": \"GBP\",\n        \"category_id\": \"639984e54e632108342e7d1f\",\n        \"hide\": false,\n        \"payment_code\": \"001567\",\n        \"_id\": \"646147134e7b20af8a569780\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "Create Product Categories",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "9RsNnOglChZTTud3bRMb9SGa3a1cpK5HgSCL7lf9A4nhkZiWxaE271Rm9kTS95LavoA1w5KvYqiwZrR3rlzqbw==",
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
							"raw": "{{XCEL_v2_BASE_URL}}/products/category",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/category",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Category created successfully\",\n    \"data\": {\n        \"name\": \"Cars\",\n        \"description\": \"Best Cars for sale\",\n        \"user_id\": \"6396cfaeae5fd92994bab11e\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"_id\": \"6461482be0be5c8985b3f91c\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "Update Product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"name\": \"BMW iX 2030\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/products/:product_id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"products",
								":product_id"
							],
							"variable": [
								{
									"key": "product_id",
									"value": "646147134e7b20af8a569780"
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/:product_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Product updated successfully\",\n    \"data\": {\n        \"_id\": \"646147134e7b20af8a569780\",\n        \"user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"name\": \"BMW iX 2030\",\n        \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n        \"images\": [\n            \"https://bucket.xcelapp.com/assets/img1.jpg\",\n            \"https://bucket.xcelapp.com/assets/img2.jpg\",\n            \"https://bucket.xcelapp.com/assets/img3.jpg\",\n            \"https://bucket.xcelapp.com/assets/img4.jpg\",\n            \"https://bucket.xcelapp.com/assets/img5.jpg\",\n            \"https://bucket.xcelapp.com/assets/img6.jpg\",\n            \"https://bucket.xcelapp.com/assets/img7.jpg\",\n            \"https://bucket.xcelapp.com/assets/img8.jpg\"\n        ],\n        \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n        \"description\": \"German Engineering\",\n        \"variations\": [\n            {\n                \"name\": \"red\",\n                \"type\": \"color\",\n                \"price\": 21000,\n                \"_id\": \"646147134e7b20af8a569781\"\n            },\n            {\n                \"name\": \"space-grey\",\n                \"type\": \"color\",\n                \"price\": 21005,\n                \"_id\": \"646147134e7b20af8a569782\"\n            },\n            {\n                \"name\": \"v6\",\n                \"type\": \"engine-size\",\n                \"price\": 20009,\n                \"_id\": \"646147134e7b20af8a569783\"\n            }\n        ],\n        \"amount\": 20000,\n        \"currency\": \"GBP\",\n        \"category_id\": \"639984e54e632108342e7d1f\",\n        \"hide\": false,\n        \"payment_code\": \"001567\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "Update Product Category",
					"request": {
						"method": "PUT",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/category/:category_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"products",
										"category",
										":category_id"
									],
									"variable": [
										{
											"key": "category_id",
											"value": null
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Category updated successfully\",\n    \"data\": {\n        \"_id\": \"6461482be0be5c8985b3f91c\",\n        \"name\": \"Automobiles\",\n        \"description\": \"Best Cars for sale\",\n        \"user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "Fetch User Products",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/products/user/:user_id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"products",
								"user",
								":user_id"
							],
							"variable": [
								{
									"key": "user_id",
									"value": "64269e2d2d1f06c046a0137a"
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/user/:user_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"User products returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"646147134e7b20af8a569780\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2030\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"646147134e7b20af8a569781\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"646147134e7b20af8a569782\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"646147134e7b20af8a569783\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0,\n            \"category\": [\n                {\n                    \"_id\": \"639984e54e632108342e7d1f\",\n                    \"name\": \"Automobile\",\n                    \"description\": \"Best Cars for sale\",\n                    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n                    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n                    \"__v\": 0\n                }\n            ]\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Fetch User Product Categories",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/products/categories/:user_id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"products",
								"categories",
								":user_id"
							],
							"variable": [
								{
									"key": "user_id",
									"value": "64269e2d2d1f06c046a0137a"
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/categories/:user_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"User categories returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"6461482be0be5c8985b3f91c\",\n            \"name\": \"Automobiles\",\n            \"description\": \"Best Cars for sale\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"__v\": 0\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Fetch Category Products",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/products/category/:category_id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/category/:category_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Products in category returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"639989506518c3ebad9b07aa\",\n            \"user_id\": \"6396cfaeae5fd92994bab11e\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2024\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"639989506518c3ebad9b07ab\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"639989506518c3ebad9b07ac\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"639989506518c3ebad9b07ad\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"63fdb974b75424e387cc55d0\",\n            \"user_id\": \"63a02a24e6c7bb37d02e56b1\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2023\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"63fdb974b75424e387cc55d1\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"63fdb974b75424e387cc55d2\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"63fdb974b75424e387cc55d3\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"63fdc89a828fa6f01149f658\",\n            \"user_id\": \"63a02a24e6c7bb37d02e56b1\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2023\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"63fdc89a828fa6f01149f659\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"63fdc89a828fa6f01149f65a\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"63fdc89a828fa6f01149f65b\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"64614699d36127fab783bcec\",\n            \"user_id\": \"6396cfaeae5fd92994bab11e\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2023\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"64614699d36127fab783bced\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"64614699d36127fab783bcee\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"64614699d36127fab783bcef\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0\n        },\n        {\n            \"_id\": \"646147134e7b20af8a569780\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2030\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"646147134e7b20af8a569781\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"646147134e7b20af8a569782\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"646147134e7b20af8a569783\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Fetch Product",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/products/:product_id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"products",
								":product_id"
							],
							"variable": [
								{
									"key": "product_id",
									"value": "646147134e7b20af8a569780"
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
									"raw": "{{XCEL_v2_BASE_URL}}/products/:product_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
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
							"body": "{\n    \"success\": true,\n    \"message\": \"Product returned successfully\",\n    \"data\": [\n        {\n            \"_id\": \"646147134e7b20af8a569780\",\n            \"user_id\": \"64269e2d2d1f06c046a0137a\",\n            \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n            \"name\": \"BMW iX 2030\",\n            \"account_id\": \"62681c54-4ad1-4f48-82e6-a30804d36126\",\n            \"images\": [\n                \"https://bucket.xcelapp.com/assets/img1.jpg\",\n                \"https://bucket.xcelapp.com/assets/img2.jpg\",\n                \"https://bucket.xcelapp.com/assets/img3.jpg\",\n                \"https://bucket.xcelapp.com/assets/img4.jpg\",\n                \"https://bucket.xcelapp.com/assets/img5.jpg\",\n                \"https://bucket.xcelapp.com/assets/img6.jpg\",\n                \"https://bucket.xcelapp.com/assets/img7.jpg\",\n                \"https://bucket.xcelapp.com/assets/img8.jpg\"\n            ],\n            \"logo\": \"https://bucket.xcelapp.com/assets/logo.jpg\",\n            \"description\": \"German Engineering\",\n            \"variations\": [\n                {\n                    \"name\": \"red\",\n                    \"type\": \"color\",\n                    \"price\": 21000,\n                    \"_id\": \"646147134e7b20af8a569781\"\n                },\n                {\n                    \"name\": \"space-grey\",\n                    \"type\": \"color\",\n                    \"price\": 21005,\n                    \"_id\": \"646147134e7b20af8a569782\"\n                },\n                {\n                    \"name\": \"v6\",\n                    \"type\": \"engine-size\",\n                    \"price\": 20009,\n                    \"_id\": \"646147134e7b20af8a569783\"\n                }\n            ],\n            \"amount\": 20000,\n            \"currency\": \"GBP\",\n            \"category_id\": \"639984e54e632108342e7d1f\",\n            \"hide\": false,\n            \"payment_code\": \"001567\",\n            \"__v\": 0,\n            \"category\": [\n                {\n                    \"_id\": \"639984e54e632108342e7d1f\",\n                    \"name\": \"Automobile\",\n                    \"description\": \"Best Cars for sale\",\n                    \"user_id\": \"6396cfaeae5fd92994bab11e\",\n                    \"branch_id\": \"63998198e688ccd6b9d78d9f\",\n                    \"__v\": 0\n                }\n            ]\n        }\n    ]\n}"
						}
					]
				}
			]
		},
		{
			"name": "INTEGRATIONS(UPDATED)",
			"item": [
				{
					"name": "creation integration",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{ISSUER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "Uq0y0AtZpGc2BnsiMIIt+5jDWD4a6jLiNRefh1arTVkhWa97O7ozoelgVRraIifT2ggYEL7sG+fxEl39L09oZg==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"keys\": {\"sec_key\": \"k_test_51KUcsvAwERllv1Ckr9zwcaPt0zsvNFczQ2JjeUto03Dzjp9ppCmHmurwfWppZCkLgaPU1D7dCbYgGSzmh7fjxP4C00lRmzOLUO\", \"pub_key\": \"pk_test_51KUcsvAwERllv1CkiiXu2dVaUPLtCbL3tx6eS0XiVf5ruEP8fmR9Tb2nE8136DEf0GmsrsuvRGmsLRLwt9HjYNmx00koASkkTH\"},\n    \"type\": \"stripe\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/integrations",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"integrations"
							]
						}
					},
					"response": [
						{
							"name": "creation integration",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "x-Pub-Key",
										"value": "e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"keys\": {\"api_key\": \"xxxxxxx\", \"pub_key\": \"xxxxxxx\"},\n    \"type\": \"paystack\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/integrations",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"integrations"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Integration details created successfully\",\n    \"data\": {\n        \"keys\": \"0eMF3r0PGIx48mCI5/09CtHdA5Ic8BoLvpAAm5iZJwi9ANaPXEkKvSh+oEToR/Gs\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"type\": \"paystack\",\n        \"created_at\": \"2023-04-14T11:05:17.620Z\",\n        \"updated_at\": \"2023-04-14T11:05:17.620Z\",\n        \"_id\": \"64393379a0846f50b3a5abdc\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "update integration",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{ISSUER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "z5T1ZCF1YjwM08UrU3RmMKC3NIUSfVrLvY3vpFfFNpccpzpYXNIBfILwNUnjHOyjaEAlD/3b+mlys/15Rx0yZg==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"keys\": {\n        \"sec_key\": \"sk_test_51KUcsvAwERllv1Ckr9zwcaPt0zsvNFczQ2JjeUto03Dzjp9ppCmHmurwfWppZCkLgaPU1D7dCbYgGSzmh7fjxP4C00lRmzOLUO\",\n        \"pub_key\": \"pk_test_51KUcsvAwERllv1CkiiXu2dVaUPLtCbL3tx6eS0XiVf5ruEP8fmR9Tb2nE8136DEf0GmsrsuvRGmsLRLwt9HjYNmx00koASkkTH\"\n    },\n    \"type\": \"stripe\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/integrations/:id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"integrations",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "643d3435cefb7f0937baa95c"
								}
							]
						}
					},
					"response": [
						{
							"name": "update integration",
							"originalRequest": {
								"method": "PUT",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "z5T1ZCF1YjwM08UrU3RmMKC3NIUSfVrLvY3vpFfFNpccpzpYXNIBfILwNUnjHOyjaEAlD/3b+mlys/15Rx0yZg==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"keys\": {\"data\": \"encrpyted\"},\n    \"type\": \"flutterwave\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/integrations/:id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"integrations",
										":id"
									],
									"variable": [
										{
											"key": "id",
											"value": "6439370d1f30fa62e9ddae57"
										}
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Integration details updated successfully\",\n    \"data\": {\n        \"_id\": \"6439370d1f30fa62e9ddae57\",\n        \"keys\": \"LUNJMXCKYwq+eTaqEaLbDUgnglUEbUfx22PQUSUPrI8=\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"type\": \"flutterwave\",\n        \"created_at\": \"2023-04-14T11:19:40.670Z\",\n        \"updated_at\": \"2023-04-14T11:19:40.670Z\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "get integrations",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{ISSUER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "X-Pub-Key",
								"value": "e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/integrations?type=flutterwave&skip=0&limit=1",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"integrations"
							],
							"query": [
								{
									"key": "type",
									"value": "flutterwave"
								},
								{
									"key": "skip",
									"value": "0"
								},
								{
									"key": "limit",
									"value": "1"
								}
							]
						}
					},
					"response": [
						{
							"name": "get integrations",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "X-Pub-Key",
										"value": "e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/integrations?type=flutterwave&skip=0&limit=1",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"integrations"
									],
									"query": [
										{
											"key": "type",
											"value": "flutterwave"
										},
										{
											"key": "skip",
											"value": "0"
										},
										{
											"key": "limit",
											"value": "1"
										}
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Integration details updated successfully\",\n    \"data\": {\n        \"count\": 1,\n        \"integrations\": [\n            {\n                \"_id\": \"6439370d1f30fa62e9ddae57\",\n                \"keys\": \"LUNJMXCKYwq+eTaqEaLbDUgnglUEbUfx22PQUSUPrI8=\",\n                \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n                \"type\": \"flutterwave\",\n                \"created_at\": \"2023-04-14T11:19:40.670Z\",\n                \"updated_at\": \"2023-04-14T11:19:40.670Z\",\n                \"__v\": 0\n            }\n        ]\n    }\n}"
						}
					]
				},
				{
					"name": "get single integration",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{ISSUER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "x-Pub-Key",
								"value": "e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/integrations/:id",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"integrations",
								":id"
							],
							"variable": [
								{
									"key": "id",
									"value": "6439370d1f30fa62e9ddae57"
								}
							]
						}
					},
					"response": [
						{
							"name": "get single integration",
							"originalRequest": {
								"method": "GET",
								"header": [
									{
										"key": "x-Pub-Key",
										"value": "e87f28c9934f7a01ee1b4d572414c7155f403fe3589806e3e346ff5d0b432326",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/integrations/:id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"integrations",
										":id"
									],
									"variable": [
										{
											"key": "id",
											"value": "6439370d1f30fa62e9ddae57"
										}
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Integration details returned successfully\",\n    \"data\": {\n        \"_id\": \"6439370d1f30fa62e9ddae57\",\n        \"keys\": \"LUNJMXCKYwq+eTaqEaLbDUgnglUEbUfx22PQUSUPrI8=\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"type\": \"flutterwave\",\n        \"created_at\": \"2023-04-14T11:19:40.670Z\",\n        \"updated_at\": \"2023-04-14T11:19:40.670Z\",\n        \"__v\": 0\n    }\n}"
						}
					]
				},
				{
					"name": "generate intent",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"amount\": 100000,\n    \"currency\": \"NGN\",\n    \"provider\": \"stripe\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/integrations/payment/intent",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"integrations",
								"payment",
								"intent"
							]
						}
					},
					"response": [
						{
							"name": "generate intent",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"amount\": 100000,\n    \"currency\": \"NGN\",\n    \"provider\": \"stripe\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/integrations/payment/intent",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"integrations",
										"payment",
										"intent"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Payment intent created successfully\",\n    \"data\": {\n        \"id\": \"pi_3MxqnTAwERllv1Ck0GAiH8kN\",\n        \"object\": \"payment_intent\",\n        \"amount\": 100000,\n        \"amount_capturable\": 0,\n        \"amount_details\": {\n            \"tip\": {}\n        },\n        \"amount_received\": 0,\n        \"application\": null,\n        \"application_fee_amount\": null,\n        \"automatic_payment_methods\": null,\n        \"canceled_at\": null,\n        \"cancellation_reason\": null,\n        \"capture_method\": \"automatic\",\n        \"charges\": {\n            \"object\": \"list\",\n            \"data\": [],\n            \"has_more\": false,\n            \"total_count\": 0,\n            \"url\": \"/v1/charges?payment_intent=pi_3MxqnTAwERllv1Ck0GAiH8kN\"\n        },\n        \"client_secret\": \"pi_3MxqnTAwERllv1Ck0GAiH8kN_secret_NKDN19NGh0pccQQwelCInOvPo\",\n        \"confirmation_method\": \"automatic\",\n        \"created\": 1681733079,\n        \"currency\": \"ngn\",\n        \"customer\": null,\n        \"description\": null,\n        \"invoice\": null,\n        \"last_payment_error\": null,\n        \"latest_charge\": null,\n        \"livemode\": false,\n        \"metadata\": {},\n        \"next_action\": null,\n        \"on_behalf_of\": null,\n        \"payment_method\": null,\n        \"payment_method_options\": {\n            \"card\": {\n                \"installments\": null,\n                \"mandate_options\": null,\n                \"network\": null,\n                \"request_three_d_secure\": \"automatic\"\n            }\n        },\n        \"payment_method_types\": [\n            \"card\"\n        ],\n        \"processing\": null,\n        \"receipt_email\": null,\n        \"review\": null,\n        \"setup_future_usage\": null,\n        \"shipping\": null,\n        \"source\": null,\n        \"statement_descriptor\": null,\n        \"statement_descriptor_suffix\": null,\n        \"status\": \"requires_payment_method\",\n        \"transfer_data\": null,\n        \"transfer_group\": null\n    }\n}"
						}
					]
				}
			]
		},
		{
			"name": "LOANS (UPDATED)",
			"item": [
				{
					"name": "issuer",
					"item": [
						{
							"name": "Save loan type",
							"request": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "U4iJ+AbPLgCjLWWWAjl7jlLROOeT3Z7dLl9kjNZUvzmOHHndwYSs86v485313o+zafOc+VhEQrnjjvGYHwTT9Q==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency\": \"TVD\",\n    \"range\": {\n        \"min_amount\": 5000,\n        \"max_amount\": 200000\n    },\n    \"interest\": {\n        \"interest_rate\": 15,\n        \"interest_rate_cycle\": \"weekly\"\n    },\n    \"repayment\": {\n        \"repayment_rate\": \"weekly\",\n        \"num_of_repayments_expected\": 4,\n        \"partial_repayment\": true,\n        \"minimum_repayment_percentage\": 10\n    },\n    \"late_fees\": {\n        \"late_fees\": 10,\n        \"late_fee_cycle\": \"weekly\"\n    },\n    \"guarantor_eligibility\": {\n        \"guarantor_required\": true,\n        \"guarantor_type\": \"employer\",\n        \"guarantor_indemnity\": false\n    },\n    \"user_eligibility\": {\n        \"user_eligibility_required\": true,\n        \"all_time_transaction_volume_minimum\": 10000,\n        \"all_time_transaction_value_minimum\": 500,\n        \"monthly_transaction_value_maximum\": 600,\n        \"monthly_transaction_volume_maximum\": 6000,\n        \"user_type\": \"individual\",\n        \"kyc_required\": true\n    }\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loan-types",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loan-types"
									]
								}
							},
							"response": []
						},
						{
							"name": "Loan types (Issuer)",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "U4iJ+AbPLgCjLWWWAjl7jlLROOeT3Z7dLl9kjNZUvzmOHHndwYSs86v485313o+zafOc+VhEQrnjjvGYHwTT9Q==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loans/loan-types",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loans",
										"loan-types"
									]
								}
							},
							"response": []
						},
						{
							"name": "get loans",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "U4iJ+AbPLgCjLWWWAjl7jlLROOeT3Z7dLl9kjNZUvzmOHHndwYSs86v485313o+zafOc+VhEQrnjjvGYHwTT9Q==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loans/loan-types",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loans",
										"loan-types"
									]
								}
							},
							"response": []
						},
						{
							"name": "get loan by id",
							"request": {
								"method": "GET",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "U4iJ+AbPLgCjLWWWAjl7jlLROOeT3Z7dLl9kjNZUvzmOHHndwYSs86v485313o+zafOc+VhEQrnjjvGYHwTT9Q==",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loans/:loan_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loans",
										":loan_id"
									],
									"variable": [
										{
											"key": "loan_id",
											"value": "646380a712d61628fb28d25d"
										}
									]
								}
							},
							"response": [
								{
									"name": "Loan details",
									"originalRequest": {
										"method": "GET",
										"header": [
											{
												"key": "Authorization",
												"value": "{{ISSUER_TOKEN}}",
												"type": "text"
											}
										],
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/v1/loans/:loan_id?issuer_id={{ISSUER_ID}}&public_key={{ISSUER_PUBLIC_KEY}}",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"v1",
												"loans",
												":loan_id"
											],
											"query": [
												{
													"key": "issuer_id",
													"value": "{{ISSUER_ID}}"
												},
												{
													"key": "public_key",
													"value": "{{ISSUER_PUBLIC_KEY}}"
												}
											],
											"variable": [
												{
													"key": "loan_id",
													"value": "64367befee874d791fb29d67"
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
											"value": "1363"
										},
										{
											"key": "ETag",
											"value": "W/\"553-62ExlXA12aQ5lJgovZwID3gkQS4\""
										},
										{
											"key": "Date",
											"value": "Wed, 12 Apr 2023 09:59:54 GMT"
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
									"body": "{\n    \"success\": true,\n    \"message\": \"Loan details\",\n    \"data\": {\n        \"_id\": \"64367befee874d791fb29d67\",\n        \"user_id\": \"64229238a306b31ea6c8fee4\",\n        \"loan_register_id\": \"64367befee874d791fb29d65\",\n        \"loan_type\": {\n            \"range\": {\n                \"min_amount\": 3000,\n                \"max_amount\": 8000\n            },\n            \"interest\": {\n                \"interest_rate\": 15,\n                \"interest_rate_cycle\": \"weekly\"\n            },\n            \"repayment\": {\n                \"repayment_rate\": \"weekly\",\n                \"num_of_repayments_expected\": 4,\n                \"partial_repayment\": true,\n                \"minimum_repayment_percentage\": 10\n            },\n            \"late_fees\": {\n                \"late_fees\": 10,\n                \"late_fee_cycle\": \"weekly\"\n            },\n            \"guarantor_eligibility\": {\n                \"guarantor_required\": true,\n                \"guarantor_type\": \"employer\",\n                \"guarantor_indemnity\": false\n            },\n            \"user_eligibility\": {\n                \"user_eligibility_required\": true,\n                \"all_time_transaction_volume_minimum\": 10000,\n                \"all_time_transaction_value_minimum\": 500,\n                \"monthly_transaction_value_maximum\": 600,\n                \"monthly_transaction_volume_maximum\": 6000,\n                \"user_type\": \"individual\",\n                \"kyc_required\": true\n            },\n            \"_id\": \"64352b0cc70a6e600d932d67\",\n            \"issuer_id\": \"6413e9c8b65e12938dd37822\",\n            \"currency\": \"TVD\",\n            \"country\": \"CD\",\n            \"created_at\": \"2023-04-11T09:37:11.731Z\",\n            \"updated_at\": \"2023-04-11T09:37:11.731Z\"\n        },\n        \"amount_collected\": 320,\n        \"amount_repaid\": 0,\n        \"interest_paid\": 0,\n        \"currency\": \"TVD\",\n        \"country\": \"CD\",\n        \"number_of_repayments_done\": 0,\n        \"number_of_pending_repayments\": 4,\n        \"next_repayment_date\": \"2023-04-19T09:37:51.819Z\",\n        \"next_repayment_amount\": 80,\n        \"status\": \"requested\",\n        \"created_at\": \"2023-04-12T09:37:39.372Z\",\n        \"updated_at\": \"2023-04-12T09:37:39.372Z\"\n    }\n}"
								}
							]
						},
						{
							"name": "Update loan status",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "PUT",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "fBWF2u16RO/Qy+g96GvDSPwVngGJlejudP11gYY3yRy8nFBfy5ASBqPydnLLfmVaC5QtE4N62Aifc5qLyc04wQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"status\": \"approved\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loans/:loan_id",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loans",
										":loan_id"
									],
									"variable": [
										{
											"key": "loan_id",
											"value": "6463f03a311349718172acb9"
										}
									]
								}
							},
							"response": [
								{
									"name": "Update loan status",
									"originalRequest": {
										"method": "PUT",
										"header": [
											{
												"key": "X-APP-ID",
												"value": "{{APP_ID}}",
												"type": "text"
											},
											{
												"key": "X-ISSUER-ID",
												"value": "{{ISSUER_ID}}",
												"type": "text"
											},
											{
												"key": "X-AUTH-SIGNATURE",
												"value": "fBWF2u16RO/Qy+g96GvDSPwVngGJlejudP11gYY3yRy8nFBfy5ASBqPydnLLfmVaC5QtE4N62Aifc5qLyc04wQ==",
												"type": "text"
											}
										],
										"body": {
											"mode": "raw",
											"raw": "{\n    \"status\": \"approved\"\n}",
											"options": {
												"raw": {
													"language": "json"
												}
											}
										},
										"url": {
											"raw": "{{XCEL_v2_BASE_URL}}/loans/:loan_id",
											"host": [
												"{{XCEL_v2_BASE_URL}}"
											],
											"path": [
												"loans",
												":loan_id"
											],
											"variable": [
												{
													"key": "loan_id",
													"value": "6463f03a311349718172acb9"
												}
											]
										}
									},
									"_postman_previewlanguage": null,
									"header": null,
									"cookie": [],
									"body": null
								}
							]
						}
					]
				},
				{
					"name": "user",
					"item": [
						{
							"name": "Request loan",
							"request": {
								"auth": {
									"type": "bearer",
									"bearer": [
										{
											"key": "token",
											"value": "{{USER_TOKEN}}",
											"type": "string"
										}
									]
								},
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "U4iJ+AbPLgCjLWWWAjl7jlLROOeT3Z7dLl9kjNZUvzmOHHndwYSs86v485313o+zafOc+VhEQrnjjvGYHwTT9Q==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"guarantor_user_id\": \"641aaca6bcde146483268bac\",\n    \"guarantor_type\": \"employer\",\n    \"amount_collected\": 120,\n    \"amount_guaranteed\": 100,\n    \"day_of_month_paid\": 25,\n    \"loan_type_id\": \"641ab11f4cd0df26269ae8ef\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loans",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loans"
									],
									"query": [
										{
											"key": "issuer_id",
											"value": "{{ISSUER_ID}}",
											"disabled": true
										},
										{
											"key": "public_key",
											"value": "{{ISSUER_PUBLIC_KEY}}",
											"disabled": true
										}
									]
								}
							},
							"response": []
						},
						{
							"name": "Loan types (User)",
							"request": {
								"method": "GET",
								"header": [
									{
										"key": "Authorization",
										"value": "{{USER_TOKEN}}",
										"type": "text"
									}
								],
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/v1/loans/:user_id/loan-types?issuer_id={{ISSUER_ID}}&public_key={{ISSUER_PUBLIC_KEY}}",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"v1",
										"loans",
										":user_id",
										"loan-types"
									],
									"query": [
										{
											"key": "issuer_id",
											"value": "{{ISSUER_ID}}"
										},
										{
											"key": "public_key",
											"value": "{{ISSUER_PUBLIC_KEY}}"
										}
									],
									"variable": [
										{
											"key": "user_id",
											"value": "641d9dbcbe8898f507f5b386"
										}
									]
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "Loan repayment",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "fBWF2u16RO/Qy+g96GvDSPwVngGJlejudP11gYY3yRy8nFBfy5ASBqPydnLLfmVaC5QtE4N62Aifc5qLyc04wQ==",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"loan_id\": \"6463f03a311349718172acb9\",\n    \"amount\": 50,\n    \"type\": \"loan_repayment\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/loans/payment",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"loans",
								"payment"
							]
						}
					},
					"response": [
						{
							"name": "Loan repayment",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "X-APP-ID",
										"value": "{{APP_ID}}",
										"type": "text"
									},
									{
										"key": "X-ISSUER-ID",
										"value": "{{ISSUER_ID}}",
										"type": "text"
									},
									{
										"key": "X-AUTH-SIGNATURE",
										"value": "fBWF2u16RO/Qy+g96GvDSPwVngGJlejudP11gYY3yRy8nFBfy5ASBqPydnLLfmVaC5QtE4N62Aifc5qLyc04wQ==",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"loan_id\": \"6463f03a311349718172acb9\",\n    \"amount\": 50,\n    \"type\": \"loan_repayment\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "{{XCEL_v2_BASE_URL}}/loans/payment",
									"host": [
										"{{XCEL_v2_BASE_URL}}"
									],
									"path": [
										"loans",
										"payment"
									]
								}
							},
							"_postman_previewlanguage": null,
							"header": null,
							"cookie": [],
							"body": "{\n    \"success\": true,\n    \"message\": \"Loan updated\",\n    \"data\": {\n        \"_id\": \"6463f03a311349718172acb9\",\n        \"user_id\": \"64269e2d2d1f06c046a0137a\",\n        \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n        \"loan_register_id\": \"6463f03a311349718172acb7\",\n        \"loan_type\": {\n            \"range\": {\n                \"min_amount\": 5000,\n                \"max_amount\": 200000\n            },\n            \"interest\": {\n                \"interest_rate\": 15,\n                \"interest_rate_cycle\": \"weekly\"\n            },\n            \"repayment\": {\n                \"repayment_rate\": \"weekly\",\n                \"num_of_repayments_expected\": 4,\n                \"partial_repayment\": true,\n                \"minimum_repayment_percentage\": 10\n            },\n            \"late_fees\": {\n                \"late_fees\": 10,\n                \"late_fee_cycle\": \"weekly\"\n            },\n            \"guarantor_eligibility\": {\n                \"guarantor_required\": true,\n                \"guarantor_type\": \"employer\",\n                \"guarantor_indemnity\": false\n            },\n            \"user_eligibility\": {\n                \"user_eligibility_required\": true,\n                \"all_time_transaction_volume_minimum\": 10000,\n                \"all_time_transaction_value_minimum\": 500,\n                \"monthly_transaction_value_maximum\": 600,\n                \"monthly_transaction_volume_maximum\": 6000,\n                \"user_type\": \"individual\",\n                \"kyc_required\": true\n            },\n            \"_id\": \"646380a712d61628fb28d25d\",\n            \"issuer_id\": \"640b794d6667f7cb1531a65f\",\n            \"currency\": \"TVD\",\n            \"country\": \"NG\",\n            \"created_at\": \"2023-05-16T13:09:46.473Z\",\n            \"updated_at\": \"2023-05-16T13:09:46.473Z\"\n        },\n        \"amount_collected\": 120,\n        \"amount_repaid\": 50,\n        \"interest_paid\": 0,\n        \"currency\": \"TVD\",\n        \"country\": \"NG\",\n        \"number_of_repayments_done\": 1,\n        \"number_of_pending_repayments\": 3,\n        \"next_repayment_date\": \"2023-05-23T22:21:05.996Z\",\n        \"next_repayment_amount\": 23.333333333333332,\n        \"status\": \"in progress\",\n        \"created_at\": \"2023-05-16T21:05:47.706Z\",\n        \"updated_at\": \"2023-05-16T21:05:47.706Z\"\n    }\n}"
						}
					]
				}
			]
		},
		{
			"name": "TRANSACTIONS",
			"item": [
				{
					"name": "new",
					"item": [
						{
							"name": "payment settlement",
							"request": {
								"method": "GET",
								"header": []
							},
							"response": []
						}
					]
				},
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
							"raw": "{\n    \"user_key\": \"a62bbc8c1f1eac052c5b53a325fa2389e5a4f321b968de52174881fea4852a34\",\n    \"user_id\": \"6396bbeead79b2b831abf2b4\",\n    \"to_currency\": \"NGN\",\n    \"to_country\": \"NG\",\n    \"from_amount\": \"0.01\",\n    \"to_amount\": \"0.01\",\n    \"description\":\"Credit User from Stripe\",\n    \"type\": \"credit\",\n    \"channel\": \"Stripe\",\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/transaction/third-party-credit",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
							"raw": "{\n    \"public_key\": \"40906ffcb19e76c53305cf529c30237b200ba71c\",\n    \"issuer_id\": \"625ab8cefc6039363a321e3e\",\n    \"channel\": \"XCel\",\n    \"to_country\":\"NG\",\n    \"to_acct\": \"2348102378821\",\n    \"from_currency\": \"NGN\",\n    \"to_currency\": \"NGN\",\n    \"dl_code\": \"idjspwowdjjdjddj\",\n    \"to_provider_code\":\"\",\n    \"account_name\": \"Sanni Oluwafikayo\",\n    \"description\": \"\",\n    \"from_amount\":\"0.1\",\n    \"to_amount\":\"0.1\",\n    \"type\": \"wallet\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/transaction/admin",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
							"raw": "{{XCEL_v2_BASE_URL}}/transaction/admin",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
							"raw": "{{XCEL_v2_BASE_URL}}/transaction/payment",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
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
							"raw": "{{XCEL_v2_BASE_URL}}/v1/transaction/payment",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
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
						"header": [],
						"url": {
							"raw": ""
						}
					},
					"response": []
				},
				{
					"name": "Schedule Debit",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": ""
						}
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
				},
				{
					"name": "webhook",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "    {\n        \"settlement_date\": \"2020-09-25\",\n        \"payment_type\": \"payment-type-card\",\n        \"transaction_type\": \"transaction-type-card-receive\",\n        \"card_currency\": \"GBP\",\n        \"receipt_id\": \"00000001\",\n        \"transaction_status\": \"transaction-status-approved\",\n        \"transaction_audit_number\": \"570316\",\n        \"conversion_rate\": 0.79,\n        \"point_of_sale_reference\": \"000077039482\",\n        \"mcc_description\": \"Computer Software Stores\",\n        \"ledger_to_id\": \"5f5508d9-ff10-4880-9e0c-d4fe3d9409a8\",\n        \"card_expiry_date\": \"23-09\",\n        \"card_id\": \"5f5677b3-d700-4f4e-9279-d928706870dd\",\n        \"original_transaction_id\": \"5f6d92bc-e934-4c65-9ea3-19ed8e812911\",\n        \"merchant_category_code\": \"5734\",\n        \"point_of_sale_country_code\": \"US\",\n        \"transaction_direction\": \"credit\",\n        \"card_used\": \"426536126\",\n        \"additional_info\": \"T6315MDS1B9UDA0925  3206416739\",\n        \"merchantbank_id\": \"002950\",\n        \"transaction_info\": {\n            \"sender\": {},\n            \"sender_account\": {},\n            \"receiver\": {},\n            \"receiver_account\": {},\n            \"transaction_id\": \"\"\n        },\n        \"merchant_details\": \"DIGITALOCEAN COM       NEW YORK CITY NY \",\n        \"amount\": 0.79,\n        \"transaction_id\": \"5f6d92fb-2e56-4511-bc7a-4300bfcbb3e2\",\n        \"card_entry_method\": \"81\",\n        \"created_at\": \"2020-09-25T06:49:31.771Z\",\n        \"partner_product\": \"Railsbank-Debit-Card-1\",\n        \"conversion_date\": \"2020-09-24\",\n        \"daily_unique_refence\": \"MDS1HZBOP\",\n        \"asset_type\": \"gbp\",\n        \"asset_class\": \"currency\",\n        \"transaction_currency\": \"USD\",\n        \"merchant_id\": \"000445283188990\",\n        \"point_of_sale_info\": \"1025100006600840100130000 \",\n        \"amount_local_currency\": 1,\n        \"card_transaction_type\": \"Purchase\"\n    },",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						}
					},
					"response": []
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
									"raw": "{{base_url}}/xas/v1/cards/setup",
									"host": [
										"{{base_url}}"
									],
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
				},
				{
					"name": "New Request",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{USER_TOKEN}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"amount\": 50000,\n    \"currency\": \"NGN\",\n    \"payment_method\": [\"card\"]\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/cards/payment",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"cards",
								"payment"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "NOTIFICATIONS (UPDATED)",
			"item": [
				{
					"name": "notify user",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "X-APP-ID",
								"value": "{{APP_ID}}",
								"type": "text"
							},
							{
								"key": "X-ISSUER-ID",
								"value": "{{ISSUER_ID}}",
								"type": "text"
							},
							{
								"key": "X-AUTH-SIGNATURE",
								"value": "6ayqXIcMB4lhZZXGxdQhu+KU+OKrnrVjQdhhhyHfk+XuKNK74Ck/ZYTZsoXFjgIhfSFutR8s2DcqS+jV7hRWhg==",
								"type": "text"
							}
						],
						"url": {
							"raw": "{{XCEL_v2_BASE_URL}}/notifications/notify",
							"host": [
								"{{XCEL_v2_BASE_URL}}"
							],
							"path": [
								"notifications",
								"notify"
							]
						}
					},
					"response": []
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
				},
				{
					"name": "Unblock Amount",
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
							"raw": "{{base_url}}/v1/connect/amount/unblock",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"amount",
								"unblock"
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
				},
				{
					"name": "Debit Account",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/debit",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"debit"
							]
						}
					},
					"response": []
				},
				{
					"name": "Credit Accounit",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/credit",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"credit"
							]
						}
					},
					"response": []
				},
				{
					"name": "Credit Mandate",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/mandate/credit",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"mandate",
								"credit"
							]
						}
					},
					"response": []
				},
				{
					"name": "Debit Mandate",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/mandate/debit",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"mandate",
								"debit"
							]
						}
					},
					"response": []
				},
				{
					"name": "Mandate Advice",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/mandate/advice",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"mandate",
								"advice"
							]
						}
					},
					"response": []
				},
				{
					"name": "Status",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/status",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"status"
							]
						}
					},
					"response": []
				},
				{
					"name": "Acknowledge",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/acknowledge",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"acknowledge"
							]
						}
					},
					"response": []
				},
				{
					"name": "Account Block",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/account/block",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"account",
								"block"
							]
						}
					},
					"response": []
				},
				{
					"name": "Account Unblock",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "{{base_url}}/v1/connect/account/unblock",
							"host": [
								"{{base_url}}"
							],
							"path": [
								"v1",
								"connect",
								"account",
								"unblock"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "LIMITS",
			"item": [
				{
					"name": "RULES",
					"item": [
						{
							"name": "Create Rule",
							"request": {
								"method": "POST",
								"header": [],
								"url": {
									"raw": ""
								}
							},
							"response": []
						},
						{
							"name": "Update Rule",
							"request": {
								"method": "PUT",
								"header": [],
								"url": {
									"raw": ""
								}
							},
							"response": []
						}
					]
				},
				{
					"name": "RULE SETS",
					"item": [
						{
							"name": "Create Rule Set",
							"request": {
								"method": "POST",
								"header": [],
								"url": {
									"raw": ""
								}
							},
							"response": []
						},
						{
							"name": "Append Ruleset To Account",
							"request": {
								"method": "POST",
								"header": [],
								"url": {
									"raw": ""
								}
							},
							"response": []
						},
						{
							"name": "Append Rule To Rule Set",
							"request": {
								"method": "POST",
								"header": [],
								"url": {
									"raw": ""
								}
							},
							"response": []
						}
					]
				}
			]
		}
	],
	"variable": [
		{
			"key": "XCEL_v2_BASE_URL",
			"value": "https://sandbox-api.xcelapp.com/xas/v1"
		},
		{
			"key": "APP_ID",
			"value": "640b794e6667f7cb1531a666"
		},
		{
			"key": "ISSUER_ID",
			"value": "640b794d6667f7cb1531a65f"
		}
	]
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJmaXJzdG5hbWUiOiJGaWtheW9taSIsImxhc3RuYW1lIjoiU2FubmkiLCJlbWFpbCI6InNhbm5pLm9sdXdhZmlrYXlvQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiNWU4ODQ4OThkYTI4MDQ3MTUxZDBlNTZmOGRjNjI5Mjc3MzYwM2QwZDZhYWJiZGQ2MmExMWVmNzIxZDE1NDJkOCIsImFjdGl2ZSI6dHJ1ZSwiY3JlYXRlZCI6IjIwMjItMDctMTFUMTI6MzA6MzYuOTIzWiIsIl9fdiI6MCwid29ya3NwYWNlcyI6W3siX2lkIjoiNjJkMmY5MGM0ZjNmMGIxMDM5ZmUwZDIyIiwid29ya3NwYWNlX2lkIjoiNjJkMmY5MGI0ZjNmMGIxMDM5ZmUwZDIwIiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsIl9fdiI6MCwiZGVmYXVsdCI6ZmFsc2UsIndvcmtzcGFjZV9uYW1lIjoiRXhxdSJ9LHsiX2lkIjoiNjJkMmZiZjY3MjZmOTc4ZTBjMzY0MzBiIiwid29ya3NwYWNlX2lkIjoiNjJkMmZiZjU3MjZmOTc4ZTBjMzY0MzA5IiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsIl9fdiI6MCwiZGVmYXVsdCI6ZmFsc2UsIndvcmtzcGFjZV9uYW1lIjoiU3RhcnR1cGlhIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2MmRkNTg3NDRhNTJlOTAzNWY2YzE1MWYifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2MmRkNTg3NDRhNTJlOTAzNWY2YzE1MjAifV19LHsiX2lkIjoiNjJkMmZjMDc3MjZmOTc4ZTBjMzY0MzBmIiwid29ya3NwYWNlX2lkIjoiNjJkMmZjMDc3MjZmOTc4ZTBjMzY0MzBkIiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsIl9fdiI6MCwiZGVmYXVsdCI6ZmFsc2UsIndvcmtzcGFjZV9uYW1lIjoiVGltaSJ9LHsiX2lkIjoiNjM4YjlhNjE1MzcwNzE5ZjVlN2U0NjlkIiwid29ya3NwYWNlX2lkIjoiNjM4YjlhNjE1MzcwNzE5ZjVlN2U0Njk4IiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiUGF5c3RhY2siLCJkZWZhdWx0RW52cyI6W3siZW52X25hbWUiOiJwcm9kdWN0aW9uIiwic2x1ZyI6InByZCIsImRlc2NyaXB0aW9uIjoicHJvZHVjdGlvbiBlbnZpcm9ubWVudCIsIl9pZCI6IjYzOGI5YTYxNTM3MDcxOWY1ZTdlNDY5OSJ9LHsiZW52X25hbWUiOiJzYW5kYm94Iiwic2x1ZyI6InNuZCIsImRlc2NyaXB0aW9uIjoic2FuZGJveCBlbnZpcm9ubWVudCIsIl9pZCI6IjYzOGI5YTYxNTM3MDcxOWY1ZTdlNDY5YSJ9XX0seyJfaWQiOiI2M2I2YzBhZTE5MWFhNzUyYjE5OTk5ZjUiLCJ3b3Jrc3BhY2VfaWQiOiI2M2I2YzBhYzE5MWFhNzUyYjE5OTk5ZjAiLCJ1c2VyX2lkIjoiNjJjYzE3ZWM1YTYyZmQ4OTlkMjU2ZGUwIiwiYWNjZXNzX2xldmVsIjoib3duZXIiLCJhY2NlcHRlZCI6dHJ1ZSwiZGVmYXVsdCI6ZmFsc2UsIl9fdiI6MCwid29ya3NwYWNlX25hbWUiOiJGaWtheW9tSW5jIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2M2I2YzBhYzE5MWFhNzUyYjE5OTk5ZjEifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2M2I2YzBhYzE5MWFhNzUyYjE5OTk5ZjIifV19LHsiX2lkIjoiNjNiNmM1NDkxOTFhYTc1MmIxOTk5OWZlIiwid29ya3NwYWNlX2lkIjoiNjJkMmZiZjU3MjZmOTc4ZTBjMzY0MzA5IiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiU3RhcnR1cGlhIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2MmRkNTg3NDRhNTJlOTAzNWY2YzE1MWYifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2MmRkNTg3NDRhNTJlOTAzNWY2YzE1MjAifV19LHsiX2lkIjoiNjNlNmEyOGI0OTI1YTI0NGM1YWMyNDkxIiwid29ya3NwYWNlX2lkIjoiNjNlNmEyOGI0OTI1YTI0NGM1YWMyNDhjIiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoic2FubmlzIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2M2U2YTI4YjQ5MjVhMjQ0YzVhYzI0OGQifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2M2U2YTI4YjQ5MjVhMjQ0YzVhYzI0OGUifV19LHsiX2lkIjoiNjNlNmEzMjA0OTI1YTI0NGM1YWMyNDliIiwid29ya3NwYWNlX2lkIjoiNjNlNmEzMjA0OTI1YTI0NGM1YWMyNDk2IiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiSmhhZGVzIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2M2U2YTMyMDQ5MjVhMjQ0YzVhYzI0OTcifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2M2U2YTMyMDQ5MjVhMjQ0YzVhYzI0OTgifV19LHsiX2lkIjoiNjNlNmI0Nzk0OTI1YTI0NGM1YWMyNGFkIiwid29ya3NwYWNlX2lkIjoiNjNlNmI0Nzk0OTI1YTI0NGM1YWMyNGE4IiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoia2luZ3N3YXkiLCJkZWZhdWx0RW52cyI6W3siZW52X25hbWUiOiJwcm9kdWN0aW9uIiwic2x1ZyI6InByZCIsImRlc2NyaXB0aW9uIjoicHJvZHVjdGlvbiBlbnZpcm9ubWVudCIsIl9pZCI6IjYzZTZiNDc5NDkyNWEyNDRjNWFjMjRhOSJ9LHsiZW52X25hbWUiOiJzYW5kYm94Iiwic2x1ZyI6InNuZCIsImRlc2NyaXB0aW9uIjoic2FuZGJveCBlbnZpcm9ubWVudCIsIl9pZCI6IjYzZTZiNDc5NDkyNWEyNDRjNWFjMjRhYSJ9XX0seyJfaWQiOiI2M2U2YjQ5MDQ5MjVhMjQ0YzVhYzI0YjUiLCJ3b3Jrc3BhY2VfaWQiOiI2M2U2YjQ5MDQ5MjVhMjQ0YzVhYzI0YjAiLCJ1c2VyX2lkIjoiNjJjYzE3ZWM1YTYyZmQ4OTlkMjU2ZGUwIiwiYWNjZXNzX2xldmVsIjoib3duZXIiLCJhY2NlcHRlZCI6dHJ1ZSwiZGVmYXVsdCI6ZmFsc2UsIl9fdiI6MCwid29ya3NwYWNlX25hbWUiOiJtYXJpYW5uZSIsImRlZmF1bHRFbnZzIjpbeyJlbnZfbmFtZSI6InByb2R1Y3Rpb24iLCJzbHVnIjoicHJkIiwiZGVzY3JpcHRpb24iOiJwcm9kdWN0aW9uIGVudmlyb25tZW50IiwiX2lkIjoiNjNlNmI0OTA0OTI1YTI0NGM1YWMyNGIxIn0seyJlbnZfbmFtZSI6InNhbmRib3giLCJzbHVnIjoic25kIiwiZGVzY3JpcHRpb24iOiJzYW5kYm94IGVudmlyb25tZW50IiwiX2lkIjoiNjNlNmI0OTA0OTI1YTI0NGM1YWMyNGIyIn1dfSx7Il9pZCI6IjYzZTZiNTRjNDkyNWEyNDRjNWFjMjRiZCIsIndvcmtzcGFjZV9pZCI6IjYzZTZiNTRjNDkyNWEyNDRjNWFjMjRiOCIsInVzZXJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJhY2Nlc3NfbGV2ZWwiOiJvd25lciIsImFjY2VwdGVkIjp0cnVlLCJkZWZhdWx0IjpmYWxzZSwiX192IjowLCJ3b3Jrc3BhY2VfbmFtZSI6Ik9yamkiLCJkZWZhdWx0RW52cyI6W3siZW52X25hbWUiOiJwcm9kdWN0aW9uIiwic2x1ZyI6InByZCIsImRlc2NyaXB0aW9uIjoicHJvZHVjdGlvbiBlbnZpcm9ubWVudCIsIl9pZCI6IjYzZTZiNTRjNDkyNWEyNDRjNWFjMjRiOSJ9LHsiZW52X25hbWUiOiJzYW5kYm94Iiwic2x1ZyI6InNuZCIsImRlc2NyaXB0aW9uIjoic2FuZGJveCBlbnZpcm9ubWVudCIsIl9pZCI6IjYzZTZiNTRjNDkyNWEyNDRjNWFjMjRiYSJ9XX0seyJfaWQiOiI2M2U2YjU2NDQ5MjVhMjQ0YzVhYzI0YzQiLCJ3b3Jrc3BhY2VfaWQiOiI2M2U2YjU2NDQ5MjVhMjQ0YzVhYzI0YmYiLCJ1c2VyX2lkIjoiNjJjYzE3ZWM1YTYyZmQ4OTlkMjU2ZGUwIiwiYWNjZXNzX2xldmVsIjoib3duZXIiLCJhY2NlcHRlZCI6dHJ1ZSwiZGVmYXVsdCI6ZmFsc2UsIl9fdiI6MCwid29ya3NwYWNlX25hbWUiOiJ6YWNrIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2M2U2YjU2NDQ5MjVhMjQ0YzVhYzI0YzAifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2M2U2YjU2NDQ5MjVhMjQ0YzVhYzI0YzEifV19LHsiX2lkIjoiNjNmZTBmYzA4ZmE5NTU2ZTBlYWQ4YWMzIiwid29ya3NwYWNlX2lkIjoiNjNmZTBmYzA4ZmE5NTU2ZTBlYWQ4YWJlIiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiVGVzdEFwcCIsImRlZmF1bHRFbnZzIjpbeyJlbnZfbmFtZSI6InByb2R1Y3Rpb24iLCJzbHVnIjoicHJkIiwiZGVzY3JpcHRpb24iOiJwcm9kdWN0aW9uIGVudmlyb25tZW50IiwiX2lkIjoiNjNmZTBmYzA4ZmE5NTU2ZTBlYWQ4YWJmIn0seyJlbnZfbmFtZSI6InNhbmRib3giLCJzbHVnIjoic25kIiwiZGVzY3JpcHRpb24iOiJzYW5kYm94IGVudmlyb25tZW50IiwiX2lkIjoiNjNmZTBmYzA4ZmE5NTU2ZTBlYWQ4YWMwIn1dfSx7Il9pZCI6IjY0NjUzYmU1NDg4ZTlmYmY5ZTQ4NWMzOSIsIndvcmtzcGFjZV9pZCI6IjY0NjUzYmUyNDg4ZTlmYmY5ZTQ4NWMzNCIsInVzZXJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJhY2Nlc3NfbGV2ZWwiOiJvd25lciIsImFjY2VwdGVkIjp0cnVlLCJkZWZhdWx0IjpmYWxzZSwiX192IjowLCJ3b3Jrc3BhY2VfbmFtZSI6IlJvb2tpZSIsImRlZmF1bHRFbnZzIjpbeyJlbnZfbmFtZSI6InByb2R1Y3Rpb24iLCJzbHVnIjoicHJkIiwiZGVzY3JpcHRpb24iOiJwcm9kdWN0aW9uIGVudmlyb25tZW50IiwiX2lkIjoiNjQ2NTNiZTI0ODhlOWZiZjllNDg1YzM1In0seyJlbnZfbmFtZSI6InNhbmRib3giLCJzbHVnIjoic25kIiwiZGVzY3JpcHRpb24iOiJzYW5kYm94IGVudmlyb25tZW50IiwiX2lkIjoiNjQ2NTNiZTI0ODhlOWZiZjllNDg1YzM2In1dfSx7Il9pZCI6IjY0NjU3ZDE3NDg4ZTlmYmY5ZTQ4NWM0NSIsIndvcmtzcGFjZV9pZCI6IjY0NjU3Y2U0NDg4ZTlmYmY5ZTQ4NWMzYyIsInVzZXJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJhY2Nlc3NfbGV2ZWwiOiJvd25lciIsImFjY2VwdGVkIjp0cnVlLCJkZWZhdWx0IjpmYWxzZSwiX192IjowLCJ3b3Jrc3BhY2VfbmFtZSI6IkphbWVzIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2NDY1N2NlNDQ4OGU5ZmJmOWU0ODVjM2QifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2NDY1N2NlNDQ4OGU5ZmJmOWU0ODVjM2UifV19LHsiX2lkIjoiNjQ2NTdkYTRlY2NmYTUzOWFkZTE5MDRkIiwid29ya3NwYWNlX2lkIjoiNjQ2NTdkOWJlY2NmYTUzOWFkZTE5MDQ4IiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiSmFtZXMiLCJkZWZhdWx0RW52cyI6W3siZW52X25hbWUiOiJwcm9kdWN0aW9uIiwic2x1ZyI6InByZCIsImRlc2NyaXB0aW9uIjoicHJvZHVjdGlvbiBlbnZpcm9ubWVudCIsIl9pZCI6IjY0NjU3ZDliZWNjZmE1MzlhZGUxOTA0OSJ9LHsiZW52X25hbWUiOiJzYW5kYm94Iiwic2x1ZyI6InNuZCIsImRlc2NyaXB0aW9uIjoic2FuZGJveCBlbnZpcm9ubWVudCIsIl9pZCI6IjY0NjU3ZDliZWNjZmE1MzlhZGUxOTA0YSJ9XX0seyJfaWQiOiI2NDY1N2RlNmVjY2ZhNTM5YWRlMTkwNTQiLCJ3b3Jrc3BhY2VfaWQiOiI2NDY1N2RkZWVjY2ZhNTM5YWRlMTkwNGYiLCJ1c2VyX2lkIjoiNjJjYzE3ZWM1YTYyZmQ4OTlkMjU2ZGUwIiwiYWNjZXNzX2xldmVsIjoib3duZXIiLCJhY2NlcHRlZCI6dHJ1ZSwiZGVmYXVsdCI6ZmFsc2UsIl9fdiI6MCwid29ya3NwYWNlX25hbWUiOiJKYW1hbCIsImRlZmF1bHRFbnZzIjpbeyJlbnZfbmFtZSI6InByb2R1Y3Rpb24iLCJzbHVnIjoicHJkIiwiZGVzY3JpcHRpb24iOiJwcm9kdWN0aW9uIGVudmlyb25tZW50IiwiX2lkIjoiNjQ2NTdkZGVlY2NmYTUzOWFkZTE5MDUwIn0seyJlbnZfbmFtZSI6InNhbmRib3giLCJzbHVnIjoic25kIiwiZGVzY3JpcHRpb24iOiJzYW5kYm94IGVudmlyb25tZW50IiwiX2lkIjoiNjQ2NTdkZGVlY2NmYTUzOWFkZTE5MDUxIn1dfSx7Il9pZCI6IjY0NjViYmM2ZWNjZmE1MzlhZGUxOTA1YyIsIndvcmtzcGFjZV9pZCI6IjY0NjViYmM0ZWNjZmE1MzlhZGUxOTA1NyIsInVzZXJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJhY2Nlc3NfbGV2ZWwiOiJvd25lciIsImFjY2VwdGVkIjp0cnVlLCJkZWZhdWx0IjpmYWxzZSwiX192IjowLCJ3b3Jrc3BhY2VfbmFtZSI6IkFrYW5qaSIsImRlZmF1bHRFbnZzIjpbeyJlbnZfbmFtZSI6InByb2R1Y3Rpb24iLCJzbHVnIjoicHJkIiwiZGVzY3JpcHRpb24iOiJwcm9kdWN0aW9uIGVudmlyb25tZW50IiwiX2lkIjoiNjQ2NWJiYzRlY2NmYTUzOWFkZTE5MDU4In0seyJlbnZfbmFtZSI6InNhbmRib3giLCJzbHVnIjoic25kIiwiZGVzY3JpcHRpb24iOiJzYW5kYm94IGVudmlyb25tZW50IiwiX2lkIjoiNjQ2NWJiYzRlY2NmYTUzOWFkZTE5MDU5In1dfSx7Il9pZCI6IjY0ZWE1YmZhYjZmNGU2MWUwMDEwODM1YyIsIndvcmtzcGFjZV9pZCI6IjY0ZWE1YmY5YjZmNGU2MWUwMDEwODM1NyIsInVzZXJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJhY2Nlc3NfbGV2ZWwiOiJvd25lciIsImFjY2VwdGVkIjp0cnVlLCJkZWZhdWx0Ijp0cnVlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiUGFzdGVsIiwiZGVmYXVsdEVudnMiOlt7ImVudl9uYW1lIjoicHJvZHVjdGlvbiIsInNsdWciOiJwcmQiLCJkZXNjcmlwdGlvbiI6InByb2R1Y3Rpb24gZW52aXJvbm1lbnQiLCJfaWQiOiI2NGVhNWJmOWI2ZjRlNjFlMDAxMDgzNTgifSx7ImVudl9uYW1lIjoic2FuZGJveCIsInNsdWciOiJzbmQiLCJkZXNjcmlwdGlvbiI6InNhbmRib3ggZW52aXJvbm1lbnQiLCJfaWQiOiI2NGVhNWJmOWI2ZjRlNjFlMDAxMDgzNTkifV19LHsiX2lkIjoiNjRlZTNmZDViNmY0ZTYxZTAwMTA4MzYzIiwid29ya3NwYWNlX2lkIjoiNjRlZTNmZDViNmY0ZTYxZTAwMTA4MzVlIiwidXNlcl9pZCI6IjYyY2MxN2VjNWE2MmZkODk5ZDI1NmRlMCIsImFjY2Vzc19sZXZlbCI6Im93bmVyIiwiYWNjZXB0ZWQiOnRydWUsImRlZmF1bHQiOmZhbHNlLCJfX3YiOjAsIndvcmtzcGFjZV9uYW1lIjoiU2FiaSIsImRlZmF1bHRFbnZzIjpbeyJlbnZfbmFtZSI6InByb2R1Y3Rpb24iLCJzbHVnIjoicHJkIiwiZGVzY3JpcHRpb24iOiJwcm9kdWN0aW9uIGVudmlyb25tZW50IiwiX2lkIjoiNjRlZTNmZDViNmY0ZTYxZTAwMTA4MzVmIn0seyJlbnZfbmFtZSI6InNhbmRib3giLCJzbHVnIjoic25kIiwiZGVzY3JpcHRpb24iOiJzYW5kYm94IGVudmlyb25tZW50IiwiX2lkIjoiNjRlZTNmZDViNmY0ZTYxZTAwMTA4MzYwIn1dfSx7Il9pZCI6IjY0ZjE1OTI4NTA2NzRjZTU5MTJjMDQ4NiIsIndvcmtzcGFjZV9pZCI6IjY0ZjE1OTI4NTA2NzRjZTU5MTJjMDQ4MSIsInVzZXJfaWQiOiI2MmNjMTdlYzVhNjJmZDg5OWQyNTZkZTAiLCJhY2Nlc3NfbGV2ZWwiOiJvd25lciIsImFjY2VwdGVkIjp0cnVlLCJkZWZhdWx0IjpmYWxzZSwiX192IjowLCJ3b3Jrc3BhY2VfbmFtZSI6IlN3aWZ0TW9uZXkiLCJkZWZhdWx0RW52cyI6W3siZW52X25hbWUiOiJwcm9kdWN0aW9uIiwic2x1ZyI6InByZCIsImRlc2NyaXB0aW9uIjoicHJvZHVjdGlvbiBlbnZpcm9ubWVudCIsIl9pZCI6IjY0ZjE1OTI4NTA2NzRjZTU5MTJjMDQ4MiJ9LHsiZW52X25hbWUiOiJzYW5kYm94Iiwic2x1ZyI6InNuZCIsImRlc2NyaXB0aW9uIjoic2FuZGJveCBlbnZpcm9ubWVudCIsIl9pZCI6IjY0ZjE1OTI4NTA2NzRjZTU5MTJjMDQ4MyJ9XX1dLCJwdWJsaWNfa2V5IjoiZGE0MTE5ODAyM2VkYzMwNDc2YjI5ZDY2MWI1NjIzYmM2ODQyYzY1MiIsImlhdCI6MTY5MzkzNjMxOCwiZXhwIjo0ODQ5Njk2MzE4fQ.rw2HVlBrR454z7Ei7F9WhfYHwOEkRlbaS_jC3LBnEOg"
export {data, token};