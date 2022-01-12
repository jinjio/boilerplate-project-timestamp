// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: "hello"})
});

app.get("/api/:timestamp", function(req, res) {
  let date_string = req.params.timestamp;

  if (date_string.match(/\d{5,}/)) {
    date_string = +date_string
  }
  let dates = new Date(date_string)
  if(dates.toUTCString() == "Invalid Date") {
    res.json({error: dates.toUTCString()})
  }
  res.json({"unix": dates.valueOf(),"utc": dates.toGMTString()})
})

app.get("/api/", (req, res) => {
  let dates = new Date()
  res.json({ unix: dates.valueOf(), utc: dates.toUTCString() })
})

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

