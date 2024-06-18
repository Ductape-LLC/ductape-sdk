import Ductape, { IDuctape } from '.';
import { DataFormats, DataTypes, HttpMethods, InputsTypes, Languages, TokenPeriods } from './types/enums';
import { ConditionTypes, Deciders, DecisionTypes, FeatureEventTypes } from './types/integrationsBuilder.types';

const user_id = "658251101a5f969713f004aa";
const workspace_id = "658252ee6c3a3d2ddae5bd85";
const private_key = "9e496f78-8f06-48dc-b7ab-d6979f164b67";
const ductape = new Ductape({ user_id, workspace_id, private_key });

const run = async () => {

    const builder = await ductape.getIntegrationBuilder();

    await builder.createIntegration({
        name: "Test integrations",
        description: "Marketing platform"
    });

    const auctionAccess = await builder.createAppAccessTag('ductape:auction_api');
    const catsAccess = await builder.createAppAccessTag('ductape:cat_api');


    await builder.addApp({
        access_tag: 'ductape:auction_api:ductape',
        envs: [{
            app_env_slug: 'prd',
            integration_env_slug: 'prd',
            auth: {
                auth_tag: 'user_login',
                data: { // data here is missing vali
                    body: {
                        email: "oluwafikayosanni@gmail.com",
                        password: "password"
                    },
                    headers: {},
                    params: {},
                    query: {}
                },
            }
        }, {
            app_env_slug: 'snd',
            integration_env_slug: 'snd',
            auth: {
                auth_tag: 'user_login',
                data: {
                    body: {
                        email: "oluwafikayosanni@gmail.com",
                        password: "password"
                    },
                    headers: {},
                    params: {},
                    query: {}
                },
            }
        }]
    });

    await builder.createFeature({
        tag: "deploy_auction",
        input_type: InputsTypes.JSON,
        input: {
            time: {type: DataTypes.INTEGER},
            beneficiary: {type: DataTypes.STRING},
            amount: {type: DataTypes.INTEGER}
        },
        sequence: [{
            sequence_tag: 'deploy_an_auction',
            events: [{
                app: 'ductape:auction_api:ductape',
                type: FeatureEventTypes.ACTION,
                event: 'deploy_contract',
                input: {
                    params: {},
                    headers: {
                        Authorization: `$Auth{user_login}{data}{access_token}`
                    },
                    body: {
                        time: `$Input{time}`,
                        beneficiary: `$Input{beneficiary}`,
                    },
                    query: {}
                },
                retries: 2,
                allow_fail: false
            }]
        }, {
            sequence_tag: 'submit_a_bid',
            parents: ['deploy_an_auction'],
            events: [{
                app: 'ductape:auction_api:ductape',
                type: FeatureEventTypes.ACTION,
                event: 'submit_bid',
                input: {
                    params: {
                        auction_id: `$Sequence{deploy_an_auction}{deploy_contract}{data}{id}`
                    },
                    query: {},
                    body: {
                        amount: `$Input{amount}`
                    },
                    headers: {
                        Authorization: `$Auth{user_login}{data}{access_token}`
                    },
                },
                retries: 2,
                allow_fail: false
            }]
        }],
        output: {}
    });


    /*await builder.createEnv({slug: "prd", env_name: "production", description: "production environment"}, false);

    await builder.addApp({
        access_tag: "HIVE_ODDITY1936",
        envs: [{
            app_env_slug: "prd",
            integration_env_slug: "prd",
            variables: [{
                key: "pin",
                value: "1135"
            }, {
                key: "zip_code",
                value: "112233",
            }],
            auth: {
                auth_tag: "LOGIN_AUTH",
                data: {
                    body: {
                        email: "sanni.oluwafikayo@gmail.com",
                        password: "passwordeer",
                    }
                }
            }
        }],
    });*/

    //${EventOutput}${Nico-Samba}

    /*await builder.createFeature({
        tag: "Feature1",
        input_type: InputsTypes.JSON,
        store_event_results: false,
        input: {
            firstname: {type: DataTypes.STRING, minlength: 5, maxlength: 5},
            surname: {type: DataTypes.STRING, minlength: 5, maxlength: 5},
            level: {type: DataTypes.INTEGER},
        },
        sequence: [{
            sequence_tag: "LOGIN_USER",
            events: [{
                app: "HIVE_ODDITY1936",
                type: FeatureEventTypes.ACTION,
                event: "LOGIN_USER",
                auth: "AUTURE",
                input: {
                    headers: {},
                    query: {},
                    params: {},
                    body: {},
                },
                retries: 0,
                allow_fail: true,
            }]
        }, {
            parents: ["LOGIN_USER"],
            sequence_tag: "NICO_SAMBA",
            events: [
                {
                    condition: {
                        type: ConditionTypes.DO_WHILE,
                        decision_type: DecisionTypes.LESS_THAN,
                        decider: Deciders.LENGTH,
                        value: '$Input{level}'
                    },//same as input schema,
                    app: "HIVE_ODDITY1936", // in case you're using an app // can only be one of the below tags
                    type: FeatureEventTypes.ACTION, // plug in an event
                    event: "UPVOTE_POST",
                    auth: "AUTURE",
                    input: {
                        headers: {},
                        query: {
                            sammy: {function: "minify", values: ['$Sequence{NICO_SAMBA}{UPVOTE_POST}{postId}', '$Input{level}']}, // double-slash means anywhere you find variable starting with // you return the firs find /// means second find other put the exact path to the variable here
                            samwell: '$Sequence{NICO_SAMBA}{UPVOTE_POST}{post}{[0]}{user_name}',
                        },
                        params: {
                            dram: "$Sequence{NICO_SAMBA}{UPVOTE_POST}{postId}",
                            drama: "$Sequence{NICO_SAMBA}{UPVOTE_POST}{postId}"
                        },
                        body: {

                        }
                    }, // requires validation
                    retries: 0,
                    allow_fail: false,
                }
            ]
        }],
        output: {
            lastname: '$Input{level}',
            outlay: '$Sequence{NICO_SAMBA}{UPVOTE_POST}{//postId}"'
        }
    })*/

    /**
     auth_tag: "",
     values: {

     }
     */

    /*await builder.createCache({
        tag: "", // cache tag
        sequence_tag: "",
        event_tag: "",
        expiry: 20,
        period: TokenPeriods.MINUTES,
    })

    await builder.createFunction({
        tag: "",
        language: Languages.JAVASCRIPT,
        function: "",
        input: [{ key: "", minLength: 0, maxLength: 0, type: DataTypes.BOOLEAN, required: true }], // Array<IParsedSample>
        output: {
            type: DataTypes.STRING,
            output_keys: [], // if value is an object
        }
    }, false)

    await builder.createFeature({
        tag: "",
        input_type: InputsTypes.JSON,
        input: {
            // normal JSON // parse with json parser
        },
        sequence: [{
            sequence_tag: "",
            level: 0,
            events: [
                {
                    origin_level: 0,
                    condition: {},//same as input schema,
                    app_tag: "", // in case you're using an app // can only be one of the below tags
                    event_type: FeatureEventTypes.APP_ACTION, // plug in an event
                    event_tag: "",
                    action_tag: "", // plug in an app action
                    feature_tag: "", // plug in an existing feature
                    notification_tag: "", // plug in a notification
                    database_action_tag: "", // plug into a database action
                    job_tag: "", // start a job
                    input: {
                        jack:{
                            origin_event_tag: '',
                            type: '', // input or output
                            value_type: '',// picked or calculated
                            origin_level: '', //
                            key: '', 
                            level: '',
                            default_value: '',
                            // for calculated
                            input: {
                                values: [{
                                    origin_event_tag: '',
                                    type: '',
                                    origin_level: '',
                                    key: '',
                                    default_value: '',
                                }], 
                                function_tags: ['sammy', 'sammo'],
                            }
                        },
                        jill: {

                        }
                    }, // requires validation
                    retries: 0,
                    allow_fail: false,
                }
            ]
        }]
    });*/

    // await builder.createDatabaseAction({});

    // await builder.createDatabase({});

    // await builder.createJob({});

    // await builder.createNotification({})

}
run();