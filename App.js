var express = require('express');
var request = require('request');

const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const authToken = 'your_auth_token';
const client = require('twilio')(accountSid, authToken);

var app = express();

app.disable('x-powered-by'); //blocks header from containing info about our server, for security reasons

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('body-parser').json());

var morgan = require('morgan');

app.use(morgan("combined"));

app.set('port', process.env.PORT || 3000); //web app runs on port 3000

app.post('/api/text', function(req, res) {


});