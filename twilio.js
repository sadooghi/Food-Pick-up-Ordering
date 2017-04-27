require('dotenv').load();
//twillio
var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

function random_time (){
  return Math.ceil(Math.round(Math.random()*((40 - 10)) + 10));
}
//send sms to customer
client.sendMessage({
  to: '+16044422496',
  from: '+16043301252',
  body: `Hello! your order will be ready in ${random_time ()} mineuts !`
}, function(err, message) {
    console.log(message.sid);
});


// Send sms to restaurant owner
client.sendMessage({
  to: '+16044422496',
  from: '+16043301252',
  body: `Hello! you have an order of ${output of ajax}`
}, function(err, message) {
    console.log(message.sid);
});
