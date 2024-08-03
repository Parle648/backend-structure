var knex = require("knex");
const dbConfig = require("../knexfile");
var jwt = require("jsonwebtoken");
var ee = require('events');
const db = knex(dbConfig.development);
var statEmitter = new ee();
const createErrorObject = require("../helpers/createErrorObject");

const database = {
    user: {
        getOne: async (id) => {
            return db("user").where('id', id).returning("*").then(([result]) => {
                if(!result) {
                    return {
                        status: 404,
                        error: 'User not found'
                    };
                };

                return result;
            }); 
        },
        create: async (userDTO) => {
            return db("user").insert(userDTO).returning("*").then(([result]) => {
                result.createdAt = result.created_at;
                delete result.created_at;
                result.updatedAt = result.updated_at;
                delete result.updated_at;
                statEmitter.emit('newUser');
                
                return {
                    ...result,
                    accessToken: jwt.sign({ id: result.id, type: result.type }, process.env.JWT_SECRET),
                };
            }).catch(err => {
                createErrorObject(err)
            });
        },
        update: async (id, userDTO) => {
            return db("user").where('id', id).update(userDTO).returning("*").then(([result]) => {
                return { 
                    result: {...result},
                    status: 200,
                };
            }).catch(err => {
                createErrorObject(err)
            });
        }
    },
}

module.exports = database;