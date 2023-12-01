import Joi, { ObjectSchema } from 'joi';

const createBlogPostValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  images: Joi.array().items(Joi.string().required()),
  emotions: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('happy', 'agree', 'disagree').required(),
      count: Joi.number().default(0)
    })
  ),
  categories: Joi.array().items(Joi.string().required()),
  tags: Joi.array().items(Joi.string().required()),
  createdAt: Joi.date().default(() => new Date()),
  updatedAt: Joi.date().default(() => new Date()),
  status: Joi.string().default('draft')
});

const updateBlogPostValidationSchema = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  title: Joi.string(),
  content: Joi.string(),
  emotions: Joi.array().items(
    Joi.object({
      type: Joi.string().valid('happy', 'agree', 'disagree', 'more').required(),
      count: Joi.number().default(0)
    })
  ),
  comments: Joi.number(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  status: Joi.string().valid('draft', 'published'),
  images: Joi.array().items(Joi.string()),
  categories: Joi.array().items(Joi.string()),
  tags: Joi.array().items(Joi.string())
});

const createCommentValidationSchema = Joi.object({
  content: Joi.string().required(),
  name: Joi.string().default('Anonymous'),
  post: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(), // assuming MongoDB ObjectId for post reference
  createdAt: Joi.date().default(() => new Date())
});

const updateCommentValidationSchema = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  content: Joi.string(),
  name: Joi.string(),
  post: Joi.string().regex(/^[0-9a-fA-F]{24}$/), // assuming MongoDB ObjectId for post reference
  createdAt: Joi.date()
});

const createCategoryValidationSchema: ObjectSchema = Joi.object({
  name: Joi.string().required(),
  tags: Joi.array().items(Joi.string().required())
});

const updateCategoryValidationSchema = Joi.object({
  _id: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  name: Joi.string(),
  tags: Joi.array().items(Joi.string())
});

const addCommentToBlogValidationSchema = Joi.object({
  message: Joi.string().required(),
  name: Joi.string().default('Anonymous'),
  email: Joi.string().email().required(),
  createdAt: Joi.date().default(() => new Date())
});

export {
  createBlogPostValidationSchema,
  updateBlogPostValidationSchema,
  createCommentValidationSchema,
  updateCommentValidationSchema,
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
  addCommentToBlogValidationSchema
};
