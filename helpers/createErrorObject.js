const createErrorObject = (error) => {
    if(error.code == '23505') {
        return {
            status: 400,
            error: error.detail
        };
    } else {
        return {
            status: 500,
            error: "Internal Server Error"
        };
    }
};

module.exports = createErrorObject;