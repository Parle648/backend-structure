const database = require("../db/db");
const SCHEMAS = require("../common/const/schemas");
const jwt = require("jsonwebtoken")

const userService = {
    getUser: async (req, res, id) => {
        try {
            // todo validation
            const isValidResult = SCHEMAS.USER.GET_ONE.validate(req.params);

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
            var schema = SCHEMAS.USER.POST;
    
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
    },
    updateUser: async (req, res) => {
        try {
            // todo validation
            let token = req.headers[`authorization`];
            let tokenPayload;
    
            if(!token) {
                return res.status(401).send({ error: 'Not Authorized' });
            }
    
            token = token.replace('Bearer ', '');
            
            try {
                tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
            } catch (err) {
                return res.status(401).send({ error: 'Not Authorized' });
            }
    
            // todo schema + validation
            const schema = SCHEMAS.USER.UPDATE
            var isValidResult = schema.validate(req.body);
    
            if(isValidResult.error) {
                res.status(400).send({ error: isValidResult.error.details[0].message });
                return;
            };
            
            if(req.params.id !== tokenPayload.id) {
                return res.status(401).send({ error: 'UserId mismatch' });
            }
    
            const updatedUser = await database.user.update(req.params.id, req.body);

            return updatedUser.error === undefined
            ? res.send(updatedUser.result) 
            : res.send({status: updatedUser.status, error: updatedUser.error});
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        }
    }
}

module.exports = userService;