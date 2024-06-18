import * as Joi from "joi";
import { DataTypes, InputsTypes } from "../../../types/enums";
import { ConditionTypes, Deciders, DecisionTypes, FeatureEventTypes, InputDataSources } from "../../../types/integrationsBuilder.types";

const EventDataSchema = Joi.alternatives().try(
    Joi.object({
        function: Joi.string().valid().required(),
        values: Joi.array().items(Joi.string()).required() //.pattern(/^\$\{.+\}$/)
    }),
    Joi.string()//.pattern(/^\$\{.+\}$/)
);

const EventInputDataSchema = Joi.object().pattern(
    Joi.string().required(),
    EventDataSchema
)

const ActionInputSchema = Joi.object({
    params: EventInputDataSchema,
    query: EventInputDataSchema,
    body: EventInputDataSchema,
    headers: EventInputDataSchema,
});

const CondtionSchema = Joi.object({
    type: Joi.string().valid(...Object.values(ConditionTypes)).required(),
    decision_type: Joi.string().valid(...Object.values(DecisionTypes)).required(),
    decider: Joi.string().valid(...Object.values(Deciders)).required(),
    value: Joi.string().required(),
})

const EventsSchema = Joi.object({
    app: Joi.string().required(),
    condition: CondtionSchema,
    type: Joi.string().valid(...Object.values(FeatureEventTypes)).required(),
    event: Joi.string().required(),
    //auth: Joi.string().required(),
    input: Joi.alternatives().conditional('type', {
        is: FeatureEventTypes.ACTION,
        then: ActionInputSchema.required()
    }),
    retries: Joi.number().min(0).required(), // required
    allow_fail: Joi.boolean().required(),
});

const SequenceSchema = Joi.object({
    sequence_tag: Joi.string().required(),
    parents: Joi.array().items(Joi.string()).optional(),
    events: Joi.array().items(EventsSchema)
});
const InputDataSchema = Joi.object().pattern(
    Joi.string().required(),
    Joi.object({
        type: Joi.string().valid(...Object.values(DataTypes)).required(),
        minlength: Joi.number(),
        maxlength: Joi.number(),
    })
)

const schema = Joi.object({
    tag: Joi.string().required(),
    input_type: Joi.string().valid(...Object.values(InputsTypes)).required(),
    input: Joi.alternatives().conditional('input_type', {
        is: InputsTypes.JSON,
        then: InputDataSchema.required(),
        otherwise: Joi.string().required(),
    }).required(),
    store_event_results: Joi.boolean(),
    sequence: Joi.array().items(SequenceSchema).required(),
    output: EventInputDataSchema.required(),
});

export default schema;