const Joi = require('joi');

const ValidateJoi = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {

            return res.status(422).json({error});
        }
    };
};

const Schemas = {
  
        signUp : Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),

            password: Joi.string().required()
        }),
     
        signIn: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),

        update: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string()
        }),
    

   
 


};

module.exports = {ValidateJoi, Schemas}