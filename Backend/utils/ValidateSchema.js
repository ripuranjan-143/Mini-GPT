import ExpressError from './ExpressError.js';

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(',');
      throw new ExpressError(400, errMsg);
    }
    next();
  };
};

export default validateSchema;
