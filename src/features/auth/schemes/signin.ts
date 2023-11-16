import Joi, { ObjectSchema } from 'joi';

const loginSchema: ObjectSchema = Joi.object().keys({
  // Using alternatives to accept either username or email
  account: Joi.alternatives().try(
    Joi.string().email().messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is a required field'
    }),
    Joi.string().min(4).max(8).messages({
      'string.min': 'Invalid username',
      'string.max': 'Invalid username',
      'string.empty': 'Username is a required field'
    })
  ).required().messages({
    'any.required': 'Username or Email is required'
  }),
  password: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  })
}).required();

export { loginSchema };
