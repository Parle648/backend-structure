const joi = require("joi")

const SCHEMAS = {
    GET_USER: joi.object({
        id: joi.string().uuid(),
    }).required(),
}

module.exports = SCHEMAS