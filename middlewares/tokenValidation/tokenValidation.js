const jwt = require("jsonwebtoken");
const TOKEN_VALIDATION_TYPE = require("../../common/enums/validationTypes");

const tokenValidation = (type) => {
    return (req, res, next) => {
        let token = req.headers[`authorization`];
        let tokenPayload;

        if(!token) {
            return res.status(401).send({ error: 'Not Authorized' });
        }
    
        token = token.replace('Bearer ', '');

        try {
            tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
            if (type == TOKEN_VALIDATION_TYPE.IS_ADMIN && tokenPayload.type !== 'admin') {
                throw new Error();
            }
        } catch (err) {
            return res.status(401).send({ error: 'Not Authorized' });
        }

        if(type == TOKEN_VALIDATION_TYPE.ORDINARY && req.params.id !== tokenPayload.id) {
            return res.status(401).send({ error: 'UserId mismatch' });
        }
    
        next()
    }
};

module.exports = tokenValidation