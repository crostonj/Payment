require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var common = require("./common");

var app = express();
//var host = process.argv[2] != null ? process.argv[2] : "localhost";
var host = process.env.HOSTIP;
var port = 4002;
var cors = require('cors');

//app.use(cors);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var StarsRouter = require('./Stars/StarsRouter')();

app.use('/', StarsRouter);

app.post('/old', function (req, res) {

    var payment = {
        amount: req.body.amount,
        date: req.body.date,
        account: req.body.account,
        paymentSource: req.body.paymentSource,
        effectiveDate: req.body.effectiveDate
    };

    if (payment.amount > 300)
    {
        res.status(400);
        res.send('Payment too high');
    }
    else
    {
        res.status(200);
        res.send(payment);
    }
});
app.get('/', function (req, res) {
    res.status(200);
    res.send('hello')
});

app.listen(port,  host, function (err) {
    console.log('running server ' + host + ' on port ' + port);
});



