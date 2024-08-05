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
const eventService = require("../services/event.service");
const betService = require("../services/bet.service");
const transactionService = require("../services/transaction.service");
const stats = require("../services/stats.service");

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
        updateUserData(Router, userService.updateUser)
    )

    apiRouter.use(
        API_PATHS.EVENT_ROUTE,
        modifyEvent(Router, eventService.putEvent)
    )

    apiRouter.use(
        API_PATHS.EVENT_ROUTE,
        postEvent(Router, eventService.postEvent)
    )

    apiRouter.use(
        API_PATHS.BET_ROUTE,
        postBet(Router, betService.post)
    )

    apiRouter.use(
        API_PATHS.STATS_ROUTE,
        getStats(Router, stats.get)
    )

    apiRouter.use(
        API_PATHS.TRANSACTION_ROUTE,
        postTransaction(Router, transactionService.postTransacrtion)
    )

    return apiRouter
}

module.exports = applicationApi;