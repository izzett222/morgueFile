import Joi from 'joi';

const signupSchema = Joi.object({
  firstName: Joi.string().min(1).max(30).required()
    .messages({
      'string.base': 'firstName should be a string',
      'string.min': 'the firstName should have at least one character',
      'string.max': 'the firstName should have less than 30 character',
      'any.required': 'firstName is required',
    }),
  lastName: Joi.string().min(1).max(30).required()
    .messages({
      'string.base': 'lastName should be a string',
      'string.min': 'the lastName should have at least one character',
      'string.max': 'the lastName should have less than 30 character',
      'any.required': 'lastName is required',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'please provide a valid email',
      'any.required': 'email is required',
    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.base': 'password should be a string',
      'string.min': 'The password should have more than 7 character',
      'any.required': 'password is required',
    }),
});

const validateSignup = (req, res, next) => {
  const { body } = req;
  const { error } = signupSchema.validate(body, { abortEarly: false });
  if (!error) {
    return next();
  }
  return res.status(400).json({ error: error.details.map((el) => el.message) });
};

export default validateSignup;
