import Joi from 'joi';

const signupSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  }),
});

const userIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
});

const chatSchema = Joi.object({
  body: Joi.object({
    threadId: Joi.string().required(),
    message: Joi.string().min(1).required(),
  }),
});

export default { signupSchema, loginSchema, userIdSchema, chatSchema };
