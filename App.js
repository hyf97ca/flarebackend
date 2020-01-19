var express = require('express');
var request = require('request');


//credentials, for cookies and sessions, to help with security
var credentials = require('./credentials.js');

const accountSid = credentials.sid;
const authToken = credentials.token;

const origin = "+16473701802"

//var date = new Date(2020, 1, 18, 20, 20)
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
        res.json({
            success: false
            });
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

    res.json({
        success: true
        });
    
});

app.get('/api/schedule', function(req, res) {
    res.json({
        "Monday":[
         {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 13, 19, 20), end: new Date(2020, 1, 13, 20, 20)}, 
         {title:"grocery shopping", location:"walmart", start: new Date(2020, 1, 13, 20, 20), end: new Date(2020, 1, 13, 21, 20)}
        ],
        "Tuesday":[
          {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 13, 19, 20), end: new Date(2020, 1, 13, 20, 20)}, 
          {title:"swimming", location:"pool", start: new Date(2020, 1, 13, 18, 20), end: new Date(2020, 1, 13, 19, 20)}
        ],
        "Wednesday":[
          {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 14, 19, 20), end: new Date(2020, 1, 14, 20, 20)}, 
          {title:"visit children", location:"mexico", start: new Date(2020, 1, 14, 17, 20), end: new Date(2020, 1, 14, 21, 20)}
        ],
        "Thursday":[
          {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 15, 19, 20), end: new Date(2020, 1, 15, 20, 20)}, 
          {title:"water plants", location:"home", start: new Date(2020, 1, 15, 19, 00), end: new Date(2020, 1, 15, 19, 20)}
        ],
        "Friday":[
          {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 16, 19, 20), end: new Date(2020, 1, 16, 20, 20)}, 
          {title:"regular checkup", location:"doctor", start: new Date(2020, 1, 16, 20, 20), end: new Date(2020, 1, 16, 21, 20)}
        ],
        "Saturday":[
          {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 17, 19, 20), end: new Date(2020, 1, 17, 20, 20)}, 
          {title:"go for icecream", location:"walmart", start: new Date(2020, 1, 17, 9, 20), end: new Date(2020, 1, 17, 10, 30)}
        ],
        "Sunday":[
          {title:"walk the dog", location:"nowhere", start: new Date(2020, 1, 18, 19, 20), end: new Date(2020, 1, 18, 20, 20)}, 
          {title:"bingo", location:"community centre", start: new Date(2020, 1, 18, 20, 20), end: new Date(2020, 1, 18, 21, 20)}
        ]
      })
});

//app listens on port 3000
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
  });