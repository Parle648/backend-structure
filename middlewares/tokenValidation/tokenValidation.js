const jwt = require("jsonwebtoken");

const tokenValidation = () => {
    return (req, res, next) => {
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
    
        if(req.params.id !== tokenPayload.id) {
            return res.status(401).send({ error: 'UserId mismatch' });
        }
    
        next()
    }
};

module.exports = tokenValidation