import Joi, { ObjectSchema } from 'joi';

const createPortfolioSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name is a required field'
  }),
  description: Joi.string().optional().allow(null, ''),
  shortInfo: Joi.string().optional().allow(null, ''),
  image: Joi.string().optional().allow(null, ''),
  shortDescription: Joi.string().optional().allow(null, ''),
  mainDescription: Joi.string().optional().allow(null, ''),
  projectsCompleted: Joi.number().optional(),
  satisfiedClients: Joi.number().optional(),
  experienceId: Joi.string().optional().allow(null, '')
});

const createEducationAndExperienceSchema: ObjectSchema = Joi.object().keys({
  projectIds: Joi.array().items(Joi.string()).optional(),
  skillSet: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          'string.base': 'Name should be a type of string',
          'string.empty': 'Name is a required field'
        }),
        level: Joi.number().required().messages({
          'number.base': 'Level should be a type of number',
          'number.empty': 'Level is a required field'
        })
      })
    )
    .optional(),
  responsibilities: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required().messages({
          'string.base': 'Name should be a type of string',
          'string.empty': 'Name is a required field'
        }),
        description: Joi.string().required().messages({
          'string.base': 'Description should be a type of string',
          'string.empty': 'Description is a required field'
        })
      })
    )
    .optional()
});

const createProjectSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Name should be a type of string',
    'string.empty': 'Name is a required field'
  }),
  responsibility: Joi.string().required().messages({
    'string.base': 'Responsibility should be a type of string',
    'string.empty': 'Responsibility is a required field'
  }),
  type: Joi.string().required().messages({
    'string.base': 'Type should be a type of string',
    'string.empty': 'Type is a required field'
  }),
  domain: Joi.string().required().messages({
    'string.base': 'Domain should be a type of string',
    'string.empty': 'Domain is a required field'
  }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date should be a type of date',
    'date.empty': 'Start date is a required field'
  }),
  endDate: Joi.date().required().messages({
    'date.base': 'End date should be a type of date',
    'date.empty': 'End date is a required field'
  }),
  title: Joi.string().required().messages({
    'string.base': 'Title should be a type of string',
    'string.empty': 'Title is a required field'
  }),
  image: Joi.string().optional().allow(null, '')
});

const updatePortfolioSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().optional().allow(null, ''),
  description: Joi.string().optional().allow(null, ''),
  image: Joi.string().optional().allow(null, ''),
  shortDescription: Joi.string().optional().allow(null, ''),
  mainDescription: Joi.string().optional().allow(null, ''),
  projectsCompleted: Joi.number().optional(),
  satisfiedClients: Joi.number().optional(),
  experienceId: Joi.string().optional().allow(null, ''),
  shortInfo: Joi.string().optional().allow(null, '')
});

const updateEducationAndExperienceSchema: ObjectSchema = Joi.object().keys({
  projectIds: Joi.array().items(Joi.string()).optional(),
  skillSet: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional().allow(null, ''),
        level: Joi.number().optional()
      })
    )
    .optional(),
  responsibilities: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional().allow(null, ''),
        description: Joi.string().optional().allow(null, '')
      })
    )
    .optional()
});

const updateProjectSchema: ObjectSchema = Joi.object().keys({
  name: Joi.string().optional().allow(null, ''),
  responsibility: Joi.string().optional().allow(null, ''),
  type: Joi.string().optional().allow(null, ''),
  domain: Joi.string().optional().allow(null, ''),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  title: Joi.string().optional().allow(null, ''),
  image: Joi.string().optional().allow(null, '')
});

export {
  createPortfolioSchema,
  createEducationAndExperienceSchema,
  createProjectSchema,
  updatePortfolioSchema,
  updateEducationAndExperienceSchema,
  updateProjectSchema
};
