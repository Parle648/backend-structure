const API_PATHS = require("../common/const/apiPaths");
const getUser = require("./user/getUser");
const postUser = require("./user/postUser");
const updateUserData = require("./user/updateUserData");
const modifyEvent = require("./event/modifyEvent");
const postEvent = require("./event/postEvent");
const postBet = require("./bet/postBet");
const getStats = require("./stat/getStats");
const postTransaction = require("./transaction/postTransaction");
const userService = require("../services/user.service");

const applicationApi = (Router) => {
    const apiRouter = Router();

    apiRouter.use(
        API_PATHS.USER_ROUTE,
        getUser(Router, userService.getUser)
    );

    apiRouter.use(
        API_PATHS.USER_ROUTE,
        postUser(Router, userService.postUser)
    );

    apiRouter.use(
        API_PATHS.USER_ROUTE,
        updateUserData(Router)
    )

    apiRouter.use(
        API_PATHS.EVENT_ROUTE,
        modifyEvent(Router)
    )

    apiRouter.use(
        API_PATHS.EVENT_ROUTE,
        postEvent(Router)
    )

    apiRouter.use(
        API_PATHS.BET_ROUTE,
        postBet(Router)
    )

    apiRouter.use(
        API_PATHS.STATS_ROUTE,
        getStats(Router)
    )

    apiRouter.use(
        API_PATHS.TRANSACTION_ROUTE,
        postTransaction(Router)
    )

    return apiRouter
}

module.exports = applicationApi;