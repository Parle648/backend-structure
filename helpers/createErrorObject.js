const createErrorObject = (error) => {
    if(error.code == '23505') {
        console.log(error);
        return {
            status: 400,
            error: error.detail
        };
    }
    console.log(error);
    return {
        status: 500,
        error: "Internal Server Error"
    };
};

module.exports = createErrorObject;