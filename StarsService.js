var http = require('http');

function Map(postData) {
    return {
        "Description": null,
        "Description1": 0,
        "ReceivedDate": null,
        "PaymentID": 0,
        "Principal": 0.0,
        "Interest": 0.0,
        "Fees": 0.0,
        "NoteID": 0,
        "DueDay": 3,
        "ConfirmationNumber": 0,
        "SourceType": null,
        "PaymentNotes": null,
        "IsDuplicate": false,
        "DuplicateMessage": null,
        "EffectiveDate": postData.effectiveDate,
        "NoteDate": "0001-01-01T00:00:00",

        //------ REQUIRED FIELDS SENT FROM REQUEST -------
        /*
        {
        	uid: "",
        	paymentAmount: "",
        	accountNumber: "",
        	accountType: "",
        	routingNumber: "",
        	effectiveDate: ""
        }*/
        "LenderID": 43958,
        "ParticipantID": postData.uid,
        "PaymentAmount": postData.paymentAmount,
        "NoteIDList": [1179592, 1498173],
        "AccountNumber": postData.accountNumber,
        "AccountType": postData.accountType,
        "RoutingNumber": postData.routingNumber
    }

}

module.exports =
    paymentService = function () {
        return {
            Middleware: function (req, res, next) {
                //Secure all routes
                if (!req.user) {
                    //    res.redirect('/');
                }
                next();
            },

            PostPayment: function (req, res) {

                var post_data = Map({
                    uid: req.body.uid,
                    paymentAmount: req.body.paymentAmount,
                    accountNumber: req.body.accountNumber,
                    accountType: req.body.accountType,
                    routingNumber: req.body.routingNumber,
                    effectiveDate: req.body.effectiveDate
                });

                // An object of options to indicate where to post to
                var post_options = {
                    host: 'dev.intsvcstar.nelnet.net',
                    port: '80',
                    path: '/nds.star_sp/api/v1/payments',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(post_data)
                    }
                };


                // Set up the request
                var post_req = http.request(post_options, function (res) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        console.log('Response: ' + chunk);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            }
        }
    }