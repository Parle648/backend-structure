const database = require("../db/db");

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
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        }
    },
    updateUser: async (req, res) => {
        try {
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