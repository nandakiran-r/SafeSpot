const express = require('express');
const app = express();
require("dotenv").config()

const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.post('/', (req, res) => {
    client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: "+918089465673",
      from: "+18124722724",
    })
    .then(call => console.log(call.sid));
});

const port = process.env.PORT || 2000;

app.listen(port, () => {

    console.log(`Server listening on port ${port}`);

});
