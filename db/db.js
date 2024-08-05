var knex = require("knex");
const dbConfig = require("../knexfile");
var jwt = require("jsonwebtoken");
var ee = require('events');
const db = knex(dbConfig.development);
var statEmitter = new ee();

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
                return result;
            })
        },
        update: async (id, userDTO) => {
            return db("user").where('id', id).update(userDTO).returning("*").then(([result]) => {
                return { 
                    ...result,
                };
            })
        }
    },
    event: {
        getOne: async (id) => {
            return await db('event').where('id', id)
        },
        post: async (eventDTO) => {
            // todo 
            return db("odds").insert(eventDTO.odds).returning("*").then(([odds]) => {
                // * refactoring
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
                    // * refactoring
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
        
                // * refactoring
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

                // * refactoring        
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
    },
    bet: {
        post: async (bodyDTO, multiplier, event, user) => {
            try {
                const [bet] = await db('bet').insert({
                    ...bodyDTO,
                    multiplier,
                    event_id: event.id
                }).returning('*');

                const currentBalance = user.balance - bodyDTO.bet_amount;

                if (currentBalance) {
                    statEmitter.emit('newBet');
                }

                return bet;
            } catch (error) {
                console.error(error);
                return {
                    status: 500,
                    error: 'Internal Server Error'
                }
            }
        }
    },
    odds: {
        getOne: async (id) => {
            const [odds] = await db('odds').where('id', id);

            if (!odds) {
                return {
                    status: 404,
                    error: 'Odds not found'
                }
            }

            return odds
        }
    },
    transaction: {
        post: async (transactionDTO) => {
            return db("user").where('id', transactionDTO.user_id).then(([user]) => {
                if(!user) {
                    return {
                        status: 400,
                        error: 'User does not exist'
                    }
                }
                return db("transaction").insert(transactionDTO).returning("*").then(([result]) => {
                var currentBalance = transactionDTO.amount + user.balance;
                return db("user").where('id', transactionDTO.user_id).update('balance', currentBalance).then(() => {
                    ['user_id', 'card_number', 'created_at', 'updated_at'].forEach(whatakey => {
                    var index = whatakey.indexOf('_');
                    var newKey = whatakey.replace('_', '');
                    newKey = newKey.split('')
                    newKey[index] = newKey[index].toUpperCase();
                    newKey = newKey.join('');
                    result[newKey] = result[whatakey];
                    delete result[whatakey];
                    })
                    return { 
                        ...result,
                        currentBalance,
                    };
                });
                });
            }).catch(err => {
                console.log(err);
                return {
                    status: 500,
                    error: 'Internal Server Error'
                }
            });
        }
    }
}

module.exports = database;