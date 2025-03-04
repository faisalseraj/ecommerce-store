import Joi from "joi";

// User registration validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(8).required(), // Validate password length (at least 8 characters)
  phoneNumber: Joi.string().required(),
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  role: Joi.string().min(1).required(),
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

// src/app/_validators/BusinessValidator.ts

const businessSchemaValidator = Joi.object({
  businessName: Joi.string().required().trim().min(3).max(50),
  businessPhone: Joi.string().required().trim().min(10).max(15),
  businessAddress: Joi.string().required().trim().min(10).max(100),
  aboutUs: Joi.string().optional().trim().min(10).max(500),
  keywords: Joi.string().optional().trim().min(3).max(50),
  userId: Joi.string().required().trim().guid(),
});

export { registerSchema, loginSchema, businessSchemaValidator };
