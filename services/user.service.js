const database = require("../db/db");
const SCHEMAS = require("../common/const/schemas");

const userService = {
    getUser: async (req, res, id) => {
        try {
            const isValidResult = SCHEMAS.GET_USER.validate(req.params);

            if(isValidResult.error) {
                res.status(400).send({ error: isValidResult.error.details[0].message });
                return;
            };

            const user = await database.user.getOne(id);

            return user.error 
              ? res.status(404).send({error: user.error}) 
              : res.send({...user});
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        }
    },
}

module.exports = userService;