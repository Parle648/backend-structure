const database = require("../db/db");
const createErrorObject = require("../helpers/createErrorObject");
const jwt = require("jsonwebtoken");
const logger = require("../helpers/logger")

const userService = {
    getUser: async (req, res, id) => {
        const start = Date.now()
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        let status;
        try {
            const user = await database.user.getOne(id);

            if (user.status) {
                status = user.status
            } else {
                status = 201
            }

            return user.status >= 400 
              ? res.status(404).send({error: user.error}) 
              : res.send({...user});
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        } finally {
            logger.info(`URL: ${fullUrl},
            method: getUser,
            time: ${Date.now() - start}ms, 
            HTTP code: ${status || 400}`)
        }
    },
    postUser: async (req, res) => {
        const start = Date.now()
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        let status;
        try {
            req.body.balance = 0;
            
            const user = await database.user.create(req.body);

            if (!user.status) {
                user.createdAt = user.created_at;
                delete user.created_at;
                user.updatedAt = user.updated_at;
                delete user.updated_at;
                user.accessToken = jwt.sign({ id: user.id, type: user.type }, process.env.JWT_SECRET)
                status = 201
            } else {
                status = user.status
            }

            return user.status >= 400 
             ? res.status(404).send({error: user.error}) 
             : res.send({...user});
        } catch (error) {
            const errorData = createErrorObject(error);

            return res.status(errorData.status).send({error: errorData.error});
        } finally {
            logger.info(`URL: ${fullUrl},
            method: postUser,
            time: ${Date.now() - start}ms, 
            HTTP code: ${status || 400}`)
        }
    },
    updateUser: async (req, res) => {
        const start = Date.now()
        let fullUrl = req. protocol + '://' + req. get('host') + req. originalUrl;
        let status; 
        try {
            const updatedUser = await database.user.update(req.params.id, req.body);

            if (updatedUser.status >= 400) {
                status = updatedUser.status
            } else {
                status = 200
            }

            return updatedUser.status >= 400
              ? res.status(updatedUser.status).send({error: updatedUser.error})
              : res.send(updatedUser) ;
        } catch (error) {
            const errorData = createErrorObject(error);

            return res.status(errorData.status).send({error: errorData.error});
        } finally {
            logger.info(`URL: ${fullUrl},
            method: updateUser,
            time: ${Date.now() - start}ms, 
            HTTP code: ${status || 400}`)
        }
    }
}

module.exports = userService;