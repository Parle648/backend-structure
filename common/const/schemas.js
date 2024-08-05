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
    },
    EVENT: {
        POST: joi.object({
            id: joi.string().uuid(),
            type: joi.string().required(),
            homeTeam: joi.string().required(),
            awayTeam: joi.string().required(),
            startAt: joi.date().required(),
            odds: joi.object({
                homeWin: joi.number().min(1.01).required(),
                awayWin: joi.number().min(1.01).required(),
                draw: joi.number().min(1.01).required(),
            }).required(),
        }).required(),
        PUT: joi.object({
            score: joi.string().required(),
        }).required(),
    },
    BET: {
        POST: joi.object({
            id: joi.string().uuid(),
            eventId: joi.string().uuid().required(),
            betAmount: joi.number().min(1).required(),
            prediction: joi.string().valid('w1', 'w2', 'x').required(),
        }).required()
    },
    TRASACTION: {
        POST: joi.object({
            id: joi.string().uuid(),
            userId: joi.string().uuid().required(),
            cardNumber: joi.string().required(),
            amount: joi.number().min(0).required(),
        }).required()
    }
}

module.exports = SCHEMAS