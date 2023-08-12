const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `missed required password field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missed required email field`,
  }),
  subscription: Joi.string(),
  token: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missed required email field`,
  }),
});

module.exports = { registerSchema, emailSchema };
