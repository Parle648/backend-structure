const createErrorObject = (error) => {
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
};

module.exports = createErrorObject;