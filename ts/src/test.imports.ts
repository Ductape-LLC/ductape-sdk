import Ductape from ".";
import * as fs from 'fs';
import postman from './postman'
import { PostmanCollectionV21 } from "./imports/imports.types";

const user_id = "658251101a5f969713f004aa";
const workspace_id = "658252ee6c3a3d2ddae5bd85";
const private_key = "9e496f78-8f06-48dc-b7ab-d6979f164b67";
const ductape = new Ductape({ user_id, workspace_id, private_key });

const filePath = './postman.json';

const run = async () => {
    const importer = await ductape.getActionImporter();

    // console.log(postman);

    importer.importPostmanV21(postman as unknown as PostmanCollectionV21, true);
    
}

run();