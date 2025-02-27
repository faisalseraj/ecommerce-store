import Joi from 'joi';

// User registration validation schema
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(), // Validate password length (at least 8 characters)
    phoneNumber: Joi.string().required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
});

// User login validation schema
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export { registerSchema, loginSchema };