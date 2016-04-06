var express = require('express');
var app = express();
var path = require("path");
var ejs = require("ejs");
var logger = require('morgan');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var methodOverride      = require('method-override');

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// create reusable transporter object using the default SMTP transport

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(methodOverride());

app.use(bodyParser.urlencoded({                     // parse application/x-www-form-urlencoded
  extended: true
}));


app.use(express.static(path.join(__dirname, '')));
app.use(express.static(path.join(__dirname, 'views')));


var transporter = nodemailer.createTransport('smtps://carolina.janedoe%40gmail.com:chutiyabangya@smtp.gmail.com');

// setup e-mail data with unicode symbols




app.get('/', function (req, res) {
  res.contentType('text/html');
  res.render('index.html', {title: "rudra_acs"});
});

app.post('/email', upload.array(),function (req, res) {

  //console.log("Inside email");
  var params = req.body.params;

  //console.log(req.body);


  params = JSON.parse(params);
  //console.log(JSON.stringify(params));

  var card = '<b> Contact Card</b> <br /> Name: ' + params.content.first_name;
  card += "<br/> Last Name: " + params.content.first_name;
  card += "<br/> Phone: " + params.content.phone;
  card += "<br/> Email: " + params.content.email;
  card += "<br/> Address: " + params.content.address;
  card += "<br/> City: " + params.content.city;
  card += "<br/> State: " + params.content.State;
  card += "<br/> Zip: " + params.content.zip;
  card += "<br/> URL: " + params.content.url;

  var card_text = 'Contact Card Name: ' + params.content.first_name;
  card_text += "Last Name: " + params.content.first_name;
  card_text += "Phone: " + params.content.phone;
  card_text += "Email: " + params.content.email;
  card_text += " Address: " + params.content.address;
  card_text += " City: " + params.content.city;
  card_text += "<br/> State: " + params.content.state;
  card_text += "<br/> Zip: " + params.content.zip;
  card_text += "<br/> URL: " + params.content.url;

  var mailOptions = {
      from: 'carolina.janedoe@gmail.com', // sender address
      to: params.to, // list of receivers
      subject: 'Contact', // Subject line
      text: card_text, // plaintext body
      html:  card// html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      //console.log('Message sent: ' + info.response);
      res.send(true);
  });
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
