'use strict';

export const USER_BASE_URL: string = 'http://localhost:8002';// 'https://ductape-users-3bubdh4twq-uc.a.run.app';
export const USER_CREATE_URL: string = '/users/v1/create';
export const USER_LOGIN_URL: string = '/users/v1/login';
export const USER_FORGOT_URL: string = '/users/v1/forgot';

export const WORKSPACES_BASE_URL: string = 'http://localhost:8001';// 'https://ductape-workspaces-3bubdh4twq-uc.a.run.app';
export const WORKSPACE_CREATE_URL: string = '/workspaces/v1/create';
export const WORKSPACE_FETCH_URL: string = '/workspaces/v1/fetch/:user_id';
export const WORKSPACE_DEFAULT_CHANGE: string = '/workspaces/v1/update/:user_id';
export const WORKSPACE_UPDATE_ENVS: string = '/workspaces/v1/update/:workspace_id/defaults/envs';
export const WORKSPACE_ACCESS_CREATE: string = '';

export const APPS_BASE_URL: string = 'http://localhost:8004';// 'https://ductape-apps-3bubdh4twq-uc.a.run.app';
export const APPS_CREATE_URL: string = '/apps/v1/create';
export const APPS_FETCH_URL: string = '/apps/v1/workspace/:workspace_id/:status';
export const APP_FETCH_URL: string = '/apps/v1/:app_id';
export const APP_SETUP_FETCH: string = '/apps/v1/setup/:app_id';
export const APP_SETUP_ENV_FETCH: string = '/apps/v1/setup/:app_id/:env_id';

export const ENV_UPDATE_URL: string = '/apps/v1/env/:env_id';
export const APP_ENV_CREATE: string = '/apps/v1/app/:app_id/env';
export const APP_CREATE_SETUP: string = '/apps/v1/setup/:app_id';
export const APP_CREATE_WEBHOOK: string = '/actions/v1/webhook/:app_id';

export const APP_FAQ_CREATE: string = '/apps/v1/FAQ/:app_id';
export const APP_FAQ_UPDATE: string = '/apps/v1/FAQ/:app_id/:faq_id';

export const ACTIONS_BASE_URL: string = 'http://localhost:8005';// 'https://ductape-actions-3bubdh4twq-uc.a.run.app';
export const ACTIONS_CREATE_URL: string = '/actions/v1/create';
export const ACTION_FETCH_URL: string = '/actions/v1/:action_id';
export const ACTION_UPDATE_DATA: string = '/actions/v1/action/:action_id/data/:category';
export const ACTIONS_CREATE_RESPONSES: string = '/actions/v1/response';
export const ACTIONS_FETCH_RESPONSES: string = '/actions/v1/response/:action_id';

export const ACTIONS_FOLDER_CREATE: string = '/actions/v1/folder/:app_id';
export const UPDATE_ENTITY_DATA: string = '/actions/v1/entity/data/:category'

export const INTEGRATIONS_BASE_URL: string = 'https://ductape-integrations-3bubdh4twq-uc.a.run.app';
export const INTEGRATIONS_CREATE_URL: string = '/integrations/v1/create';
export const INTEGRATIONS_FETCH_URL: string = '/integrations/v1/workspace/:workspace_id/:status';
export const INTEGRATION_FETCH_URL: string = '/integrations/v1/:integration_id';
export const INTEGRATION_ENVS_URL: string = '/integrations/v1/integration/:integration_id/envs';

export const INTEGRATIONS_ENV_CREATE: string = '/integrations/v1/integration/:integration_id/env';
export const INTEGRATION_APP_CREATE: string = '/integrations/v1/apps/add';
export const INTEGRATION_APP_URL: string = '/integrations/v1/integration/:integration_id/apps';
export const INTEGRATION_APP_STATUS_UPDATE: string = '/integrations/v1/apps/:id/:action';

export const SETUP_FETCH_URL: string = '/apps/v1/setup/:setup_id';
export const DOMAINS_FETCH_URL: string = '/apps/v1/domains';
