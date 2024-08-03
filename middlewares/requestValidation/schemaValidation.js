const validateBody = (req, res, next, schema) => {
    const isValidResult = schema.validate(req.body);

    if(isValidResult.error) {

        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    } else {
        next()
    };
};

const validateParams = (req, res, next, schema) => {
    const isValidResult = schema.validate(req.params);

    if(isValidResult.error) {

        res.status(400).send({ error: isValidResult.error.details[0].message });
        return;
    } else {
        next()
    };
};

module.exports = { validateBody, validateParams };