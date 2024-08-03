var knex = require("knex");
const dbConfig = require("../knexfile");
const db = knex(dbConfig.development);

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
    },
}

module.exports = database;