import * as Joi from 'joi';

const configSchema = Joi.object({
  /* POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_HOST: Joi.string().required(), */
  DATABASE_URL: Joi.string().required(),
  API_KEY: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
});

export default configSchema;
