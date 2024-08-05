const jwt = require("jsonwebtoken");

const betPostTokenValidation = () => {
    return (req, res, next) => {
        var authorizationKey = 'authorization';
        let token = req.headers[authorizationKey];
        if(!token) {
          return res.status(401).send({ error: 'Not Authorized' });
        }
        token = token.replace('Bearer ', '');
        try {
          var tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
          userId = tokenPayload.id;
          next();
        } catch (err) {
            console.log(err);
            return res.status(401).send({ error: 'Not Authorized' });
        }
    }
};

module.exports = betPostTokenValidation;