var express = require('express');
var request = require('request');


//credentials, for cookies and sessions, to help with security
var credentials = require('./credentials.js');

const accountSid = credentials.sid;
const authToken = credentials.token;

const origin = "+16473701802"


//console.log(accountSid, authToken)

const client = require('twilio')(accountSid, authToken);

var app = express();

app.disable('x-powered-by'); //blocks header from containing info about our server, for security reasons

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

var morgan = require('morgan');

app.use(morgan("combined"));

app.set('port', process.env.PORT || 3000); //web app runs on port 3000

/**
 * request:
 * {number (number in 4161234567 format)
 *  location (string)
 * }
 * 
 */
app.post('/api/text', function(req, res) {
    var data = req.body;
    var numberIn = data['number'];
    var locationIn = data['location'];

    if (typeof numberIn === 'undefined' || isNaN(numberIn))
    {
        return;
    }

    if (typeof locationIn === 'undefined' || Object.prototype.toString.call(locationIn) !== '[object String]')
    {
        locationIn = "Middle of Nowhere"
    }

    client.messages
    .create({
        body: 'PLS HALP I AM AT ' + locationIn,
        from: origin,
        to: '+1'+ numberIn
    })
    .then(message => console.log(message.sid));
});

//app listens on port 3000
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
  });