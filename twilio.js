//twillio
var twilio = require('twilio');

// Find your account sid and auth token in your Twilio account Console.
var client = twilio('AC06f14f0f86060526d0f9be2457da9957', '46cb2d785ad31bfbb3a19e7246ce2d5f');

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