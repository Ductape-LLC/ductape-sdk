import Ductape from ".";

const user_id = "658251101a5f969713f004aa";
const workspace_id = "658252ee6c3a3d2ddae5bd85";
const private_key = "9e496f78-8f06-48dc-b7ab-d6979f164b67";
const ductape = new Ductape({ user_id, workspace_id, private_key });

const run = async () => {
    const processor = await ductape.getProcessor();

    const result = await processor.processFeature({
        integration_id: "66499a1bfc558b3d54ca714f",
        env: "prd",
        input: {
            time: 5000,
            beneficiary: "0xe48f2E87f5535ABE82b499E2a501Ce207231cEdA",
            amount: 40
        },
        feature_tag: "deploy_auction"
    });

    console.log("RESULT!!!",result);
}

run()