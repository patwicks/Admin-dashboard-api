const Joi = require("joi")

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().min(8).max(255),
        email: Joi.string().required().min(15).max(255).email(),
        password: Joi.string().required().min(8).max(255),
        gender: Joi.string().required(),
        profile: Joi.string().required().uri(),
       
    });
    return schema.validate(data);
}



// Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().min(15).max(255).email(),
        password: Joi.string().required().min(8).max(255),
    });
    return schema.validate(data);
}

module.exports = { 
    registerValidation,
    loginValidation };