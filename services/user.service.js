const database = require("../db/db");
const createErrorObject = require("../helpers/createErrorObject");

const userService = {
    getUser: async (req, res, id) => {
        try {
            const user = await database.user.getOne(id);

            return user.status >= 400 
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
            req.body.balance = 0;
            
            const user = await database.user.create(req.body);
    
            return user.status >= 400 
            ? res.status(404).send({error: user.error}) 
            : res.send({...user});
        } catch (error) {
            const errorData = createErrorObject(error);

            return res.status(errorData.status).send({error: errorData.error});
        }
    },
    updateUser: async (req, res) => {
        try {
            const updatedUser = await database.user.update(req.params.id, req.body);

            console.log(updatedUser);

            return updatedUser.status >= 400
              ? res.status(updatedUser.status).send({error: updatedUser.error})
              : res.send(updatedUser) ;
        } catch (error) {
            const errorData = createErrorObject(error);

            return res.status(errorData.status).send({error: errorData.error});
        }
    }
}

module.exports = userService;