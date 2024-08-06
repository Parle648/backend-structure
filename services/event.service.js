const database = require("../db/db");
const createErrorObject = require("../helpers/createErrorObject");
const logger = require("../helpers/logger")

const eventService = {
    postEvent: async (req, res) => {
        const start = Date.now()
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        let status;
        try {
            const createdEvent = await database.event.post(req.body);

            if (createdEvent.status) {
                status = createdEvent.status
            } else {
                status = 200
            }

            return res.send({...createdEvent})
        } catch (err) {
            return createErrorObject(err);
        } finally {
            logger.info(`URL: ${fullUrl},
            method: getUser,
            time: ${Date.now() - start}ms, 
            HTTP code: ${status || 400}`)
        }
    },
    putEvent: async (req, res) => {
        const start = Date.now()
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        let status;
        try {
            var eventId = req.params.id;
            const updatedEvent = await database.event.put(eventId, req.body);

            if (updatedEvent.status) {
                status = updatedEvent.status
            } else {
                status = 200
            }

            if (updatedEvent.id !== undefined) {
                return res.send(updatedEvent)
            } else {
                throw new Error(updatedEvent.error)
            }
        } catch (err) {
            createErrorObject(err);
            return;
        } finally {
            logger.info(`URL: ${fullUrl},
            method: getUser,
            time: ${Date.now() - start}ms, 
            HTTP code: ${status || 400}`)
        }
    }
}

module.exports = eventService;