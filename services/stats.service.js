const stats = {
    get: async (req, res) => {
        try {
            const statsData = {
                totalUsers: 4,
                totalBets: 2,
                totalEvents: 2,
            };

            res.send(statsData);
        } catch (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }
    }
}

module.exports = stats