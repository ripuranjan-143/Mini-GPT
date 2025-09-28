import Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
})

export default { signupSchema, loginSchema };
