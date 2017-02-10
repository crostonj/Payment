var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 4002;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/', function (req, res) {

    var payment = {
        amount: req.body.amount,
        date: req.body.date,
        account: req.body.account,
        paymentSource: req.body.paymentSource,
        effectiveDate: req.body.effectiveDate
    };

    if (payment.amount > 300)
        res.status(400);
    else
        res.status(200);
    res.send(payment);
});
app.get('/', function (req, res) {
    res.status(200);
    res.send('hello')
});

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});



