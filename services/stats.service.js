const logger = require("../helpers/logger")

const stats = {
    get: async (req, res) => {
        const start = Date.now()
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        let status;
        try {
            const statsData = {
                totalUsers: 4,
                totalBets: 2,
                totalEvents: 2,
            };

            if (statsData.status) {
                status = statsData.status
            } else {
                status = 200
            }

            res.send(statsData);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        } finally {
            logger.info(`URL: ${fullUrl},
            method: getUser,
            time: ${Date.now() - start}ms, 
            HTTP code: ${status || 400}`)
        }
    }
}

module.exports = stats