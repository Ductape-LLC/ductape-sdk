'use strict';

export const USER_BASE_URL: string = 'http://localhost:8002';// 'https://ductape-users-3bubdh4twq-uc.a.run.app';
export const USER_CREATE_URL: string = '/users/v1/create';
export const USER_LOGIN_URL: string = '/users/v1/login';
export const USER_FORGOT_URL: string = '/users/v1/forgot';
export const USER_PRIVATE_KEY_LOGIN_URL: string = '/users/v1/login/authKey';

export const WORKSPACES_BASE_URL: string = 'http://localhost:8001';// 'https://ductape-workspaces-3bubdh4twq-uc.a.run.app';
export const WORKSPACE_CREATE_URL: string = '/workspaces/v1/create';
export const WORKSPACE_FETCH_URL: string = '/workspaces/v1/fetch/:user_id';
export const WORKSPACE_GET_URL: string = '/workspaces/v1/get/:workspace_id';
export const WORKSPACE_DEFAULT_CHANGE: string = '/workspaces/v1/update/:user_id';
export const WORKSPACE_UPDATE_ENVS: string = '/workspaces/v1/update/:workspace_id/defaults/envs';
export const WORKSPACE_ACCESS_CREATE: string = '';

export const APPS_BASE_URL: string = 'http://localhost:8004';// 'https://ductape-apps-3bubdh4twq-uc.a.run.app';
export const APPS_CREATE_URL: string = '/apps/v1/create';
export const APPS_FETCH_URL: string = '/apps/v1/workspace/:workspace_id/:status';
export const APP_FETCH_BY_TAG: string = '/apps/v1/fetch/tag';
export const APPS_FETCH_ACCESS_BY_TAG = '/apps/v1/access/:workspace_id/:access_tag';

export const APP_CREATE_ACCESS_TAG = '/apps/v1/access'
export const APP_CRUD_URL: string = '/apps/v1/:app_id';

export const VALIDATE_APP_BUILDER_SESSION: string = '/apps/v1/builder/validate';
export const CREATE_APP_BUILDER_SESSION: string = '/apps/v1/builder';
export const CHECK_APP_EXISTS: string = '/apps/v1/check-app-exists';


export const INTEGRATIONS_BASE_URL: string = 'http://localhost:8009';//'https://ductape-integrations-3bubdh4twq-uc.a.run.app';
export const INTEGRATIONS_CREATE_URL: string = '/integrations/v1/create';
export const INTEGRATIONS_FETCH_URL: string = '/integrations/v1/workspace/:workspace_id/:status';
export const INTEGRATION_CRUD_URL: string = '/integrations/v1/:integration_id';
export const CHECK_INTEGRATION_EXISTS: string = '/integrations/v1/check-integration-exists';

export const PROCESSOR_SAVE_RESULT: string = '/integrations/v1/processor'


export const LOGS_BASE_URL: string = 'http://localhost:8008';
export const LOGS_CREATE_URL: string = '/log/v1/create';