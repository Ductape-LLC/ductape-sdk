import Ductape from '.';
import * as fs from 'fs';
import { AuthTypes, DataFormats, DecoratorPostions, InputsTypes, TokenPeriods } from './types/enums';

const user_id = "658251101a5f969713f004aa";
const workspace_id = "658252ee6c3a3d2ddae5bd85";
const private_key = "9e496f78-8f06-48dc-b7ab-d6979f164b67";
const ductape = new Ductape({ user_id, workspace_id, private_key });

const run = async () => {

    const app = await ductape.getAppBuilder();

    const {app_id: auction_id } = await app.createApp({
        app_name: "Auction Api",
        description: "Auction API"
    });

    const importer = await ductape.getActionImporter();

    const auctionApiFilePath = '/Users/oluwafikayosanni/Documents/Work/Ductape/ductape-sdk/ts/src/postman.json';

    const auctionApiFilePathData = fs.readFileSync(auctionApiFilePath, 'utf8');
    const auctionApiData = JSON.parse(auctionApiFilePathData)

    importer.importPostmanV21(auctionApiData, true, auction_id)

    /*const {app_id: cat_id } = await app.createApp({
        app_name: "Cat Api",
        description: "Cat API"
    });

    const catApiFilePath = '/Users/oluwafikayosanni/Documents/Work/Ductape/ductape-sdk/ts/src/postman2.json'

 
    const catApiFilePathData = fs.readFileSync(catApiFilePath, 'utf8');
    const catApiData = JSON.parse(catApiFilePathData)

    importer.importPostmanV21(catApiData, true, cat_id)*/



    const auctionApi = await ductape.getAppBuilder();
    const catsApi = await ductape.getAppBuilder();

    await auctionApi.initializeAppByTag('ductape:auction_api');
    await catsApi.initializeAppByTag('ductape:cat_api')

    auctionApi.updateApp({
        retries: {
            max: 5,
            policy: {
                500: {available: true, lag: 500000},
                503: {available: true, lag: 100000},
                400: {available: true, lag: 500000},
                401: {available: true, lag: 500000},
                403: {available: false, lag: 0},
                404: {available: false, lag: 0}
            }
        }
    })


    /*await auctionApi.updateEnv('prd', {
        base_url: 'http://localhost:3000'
    });

    await auctionApi.updateEnv('dev', {
        base_url: 'http://localhost:3000'
    });



    await catsApi.updateEnv('prd', {
        base_url: 'http://localhost:3001'
    });

    await catsApi.updateEnv('dev', {
        base_url: 'http://localhost:3001'
    });*/

    /*await auctionApi.createAuth({
        action_tag: 'login',
        expiry: 7,
        period: TokenPeriods.HOURS,
        setup_type: AuthTypes.CREDENTIALS,
        tag: 'user_login',
        name: 'Login as a user',
        description: 'login as a user',
    })

    await catsApi.createAuth({
        action_tag: 'login',
        expiry: 7,
        period: TokenPeriods.HOURS,
        setup_type: AuthTypes.CREDENTIALS,
        tag: 'user_login',
        name: 'Login as a user',
        description: 'login as a user',
    })*/




}
run();