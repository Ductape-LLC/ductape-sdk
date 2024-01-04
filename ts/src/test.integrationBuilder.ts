import Ductape, {IDuctape} from '.';
import { DataFormats, HttpMethods } from './types/enums';

const user_id = "658251101a5f969713f004aa";
const workspace_id = "658252ee6c3a3d2ddae5bd85";
const private_key = "9e496f78-8f06-48dc-b7ab-d6979f164b67";
const ductape = new Ductape({user_id, workspace_id, private_key});

const run  = async () => {

    const builder = await ductape.getIntegrationBuilder();

    await builder.createIntegration({
       name: "Slide Marketing",
       description: "Marketing platform" 
    });
    
}
run();