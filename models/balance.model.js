import Joi from "joi";

export const balanceSchema = Joi.object({
    value: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().required()
})