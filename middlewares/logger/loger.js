const winston = require("winston");

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

const loggerMiddleware = (service) => {
    return (req, res, next) => {
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        logger.info(`URL: ${fullUrl}, method: ${service}, time: ${Date.now()}`)
        next()
    }
}

module.exports = loggerMiddleware;