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
    event: {
        post: async (eventDTO) => {
            return db("odds").insert(eventDTO.odds).returning("*").then(([odds]) => {
                delete eventDTO.odds;
                eventDTO.away_team = eventDTO.awayTeam;
                eventDTO.home_team = eventDTO.homeTeam;
                eventDTO.start_at = eventDTO.startAt;
                delete eventDTO.awayTeam;
                delete eventDTO.homeTeam;
                delete eventDTO.startAt;

                return db("event").insert({
                    ...eventDTO,
                    odds_id: odds.id
                }).returning("*").then(([event]) => {
                    statEmitter.emit('newEvent');

                    ['bet_amount', 'event_id', 'away_team', 'home_team', 'odds_id', 'start_at', 'updated_at', 'created_at'].forEach(whatakey => {
                        var index = whatakey.indexOf('_');
                        var newKey = whatakey.replace('_', '');
                        newKey = newKey.split('')
                        newKey[index] = newKey[index].toUpperCase();
                        newKey = newKey.join('');
                        event[newKey] = event[whatakey];
                        delete event[whatakey];
                    });

                    ['home_win', 'away_win', 'created_at', 'updated_at'].forEach(whatakey => {
                        var index = whatakey.indexOf('_');
                        var newKey = whatakey.replace('_', '');
                        newKey = newKey.split('')
                        newKey[index] = newKey[index].toUpperCase();
                        newKey = newKey.join('');
                        odds[newKey] = odds[whatakey];
                        delete odds[whatakey];
                    })

                    return { 
                        ...event,
                        odds,
                    };
                })
            });
        },
        put: async (eventId, eventDTO) => {
            try {
                const bets = await db('bet').where('event_id', eventId).andWhere('win', null);
        
                const [w1, w2] = eventDTO.score.split(":").map(Number);
                let result;
                if (w1 > w2) {
                    result = 'w1';
                } else if (w2 > w1) {
                    result = 'w2';
                } else {
                    result = 'x';
                }
        
                const [event] = await db('event').where('id', eventId).update({ score: eventDTO.score }).returning('*');
        
                await Promise.all(bets.map(async (bet) => {
                    if (bet.prediction === result) {
                        await db('bet').where('id', bet.id).update({ win: true });
                        const [user] = await db('user').where('id', bet.user_id);
                        await db('user').where('id', bet.user_id).update({
                            balance: user.balance + (bet.bet_amount * bet.multiplier),
                        });
                    } else {
                        await db('bet').where('id', bet.id).update({ win: false });
                    }
                }));
        
                const transformKeys = (event) => {
                    const newEvent = {};
                    ['bet_amount', 'event_id', 'away_team', 'home_team', 'odds_id', 'start_at', 'updated_at', 'created_at'].forEach(key => {
                        const newKey = key.replace(/_(.)/g, (_, chr) => chr.toUpperCase());
                        newEvent[newKey] = event[key];
                    });
                    return { ...event, ...newEvent };
                };
        
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(transformKeys(event));
                    }, 1000);
                });
            } catch (error) {
                console.error('Error processing event:', error);
                throw error;
            }
        }
    }
}

module.exports = database;