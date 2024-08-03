const database = require("../db/db");
const SCHEMAS = require("../common/const/schemas");

const userService = {
    getUser: async (req, res, id) => {
        try {
            // todo validation
            const isValidResult = SCHEMAS.USER.GET_USER.validate(req.params);

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
    postUser: async (req, res) => {
        try {
            // todo validation
            var schema = SCHEMAS.USER.POST_USER;
    
            var isValidResult = schema.validate(req.body);
    
            if(isValidResult.error) {
                res.status(400).send({ error: isValidResult.error.details[0].message });
                return;
            };
    
            req.body.balance = 0;
            
            const user = await database.user.create(req.body);
    
            if (user.status >= 400) {
                return res.status(user.status).send({error: user.error})
            } else {
                return res.send({...user})
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        }
    } 
}

module.exports = userService;