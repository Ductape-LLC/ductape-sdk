import Ductape, { IDuctape } from '.';
import { DataFormats, HttpMethods, InputsTypes, StatusCodes, SuccessMarkerType } from './types/enums';

const user_id = "658251101a5f969713f004aa";
const workspace_id = "658252ee6c3a3d2ddae5bd85";
const private_key = "9e496f78-8f06-48dc-b7ab-d6979f164b67";
const ductape = new Ductape({ user_id, workspace_id, private_key });

const run = async () => {

    const builder = await ductape.getAppBuilder();

    await builder.createApp({
        app_name: "Zid",
        description: "E-Commerce Platform"
    });

    /*builder.createEnv({
        env_name: 'development',
        slug: 'dev',
    })

    await builder.updateEnv('dev', {
        env_name: 'development',
        description: 'Development Environments'
    })

    const envs = builder.fetchEnvs();

    console.log(envs);*/

    const actions = builder.fetchActions();

    console.log(actions)

    const actionPayload = {
        resource: "/api/v1/posts/:user_id?public_key=srs45576yy",
        method: HttpMethods.POST,
        name: "Create post",
        request_type: DataFormats.JSON,
        description: "Create a post",
        body: {
            type: InputsTypes.JSON,
            sample: {
                title: "The King and his Wife",
                content: "The king and his wife had a child"
            }
        },
        headers: {
            type: InputsTypes.JSON,
            sample: {
                "Authorization": "{{AuthKey}}",
                "Content-Type": "application/json"
            }
        },
        responses: [{
            name: "SUCCESS",
            tag: "POST_CREATED",
            body: {
                type: InputsTypes.JSON,
                sample: {
                    _id: "17y382892-19283920-18283",
                    title: "The King and his Wife",
                    content: "The king and his wife had a child"
                }
            },
            response_format: DataFormats.JSON,
            status_code: StatusCodes.CREATED,  
            success: true,
            is_status_code_success: false,
            success_values: {
                type: SuccessMarkerType.KEY,
                body: {
                    type: InputsTypes.JSON,
                    sample: {
                        _id: "17y382892-19283920-18283",
                    }
                }
            }
        }]

    }

    // await builder.createAction(actionPayload);


    await builder.updateAction('CREATE_POST', {...actionPayload})




}
run();