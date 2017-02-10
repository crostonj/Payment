var express = require('express');
var paymentRouter = express.Router();

module.exports = router = function () {
    var StarsService = require('./StarsService')();

    paymentRouter.use(StarsService.Middleware);
    paymentRouter.route('/')
        .post(StarsService.PostPayment);

    return paymentRouter;

}