import { userClient } from "../../clients/users.client";
import { IPrivKeyLoginPayload, IUserAuthResponse } from "../../types/appBuilder.types";
import { DataFormats } from "../../types/enums";
import { USER_PRIVATE_KEY_LOGIN_URL } from "../urls";

export interface IUserApiService {
    fetchUserByPrivateKey(data: IPrivKeyLoginPayload): Promise<IUserAuthResponse>;
}

export class UserApiService implements IUserApiService {
    /* private token: string;
    private public_key: string;
    private user_id: string;*/

    constructor() {}

    async fetchUserByPrivateKey(payload: IPrivKeyLoginPayload): Promise<IUserAuthResponse> {
        const res = await userClient("", DataFormats.JSON).post(USER_PRIVATE_KEY_LOGIN_URL, payload);

        return res.data.data as unknown as IUserAuthResponse;
    }
}