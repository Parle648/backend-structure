var knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);
var jwt = require("jsonwebtoken");
var ee = require('events');
var statEmitter = new ee();

const database = {
    user: {
        getOne: (id) => {
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
        create: (userDTO) => {
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
                // todo separate helper
                if(err.code == '23505') {
                    return {
                        status: 400,
                        error: err.detail
                    }
                }
                return {
                    status: 500,
                    error: "Internal servier error"
                }
            });
        },
        update: (id, userDTO) => {
            return db("user").where('id', id).update(userDTO).returning("*").then(([result]) => {
                return { 
                    result: {...result},
                    status: 200,
                };
            }).catch(err => {
                // todo separate helper
                if(err.code == '23505') {
                    console.log(err);
                    return {
                        status: 400,
                        error: err.detail
                    };
                }
                console.log(err);
                return {
                    status: 500,
                    error: "Internal Server Error"
                };
            });
        }
    },
}

module.exports = database;