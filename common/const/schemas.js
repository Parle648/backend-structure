const joi = require("joi")

const SCHEMAS = {
    USER: {
        GET_ONE: joi.object({
            id: joi.string().uuid(),
        }).required(),
        POST: joi.object({
            id: joi.string().uuid(),
            type: joi.string().required(),
            email: joi.string().email().required(),
            phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/).required(),
            name: joi.string().required(),
            city: joi.string(),
        }).required(),
        UPDATE: joi.object({
            email: joi.string().email(),
            phone: joi.string().pattern(/^\+?3?8?(0\d{9})$/),
            name: joi.string(),
            city: joi.string(),
        }).required()
    }
}

module.exports = SCHEMAS