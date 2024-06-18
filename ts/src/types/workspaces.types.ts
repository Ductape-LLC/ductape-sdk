export interface IWorkspace {
    _id?: string;
    public_key?: string;
    token?: string;
    user_id?: string;
    name: string;
    url?: string;
    email?: string;
    logo?: string;
    defaultEnvs: Array<unknown>;
    address?: {
        house_number?: string;
        street_name?: string;
        address?: string;
        post_code?: string;
        city?: string;
        country?: string;
    },
    description?: string;
    permissions: {
        sandbox_actions: boolean,
        sandbox_effects: boolean,
        production_actions: boolean,
        production_effects: boolean
    },
    is_active: boolean
    private_key: string
};