export interface IDuctapeInit {
    user_id: string;
    workspace_id: string;
    private_key?: string;
}

export interface IBuilderInit {
    workspace_id: string;
    public_key: string; 
    user_id: string;
    token: string;
}