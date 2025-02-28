const express = require('express');
const app = express();
require("dotenv").config()
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use any SMTP provider
  auth: {
    user: 'iedcemeadeveloper@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});


app.post('/', (req, res) => {
  client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: "+918089465673",
    from: "+18124722724",
  })
    .then(call => console.log(call.sid));
});

app.post('/send-email', async (req, res) => {
  const { title, content } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "amridchandhrd@gmail.com",
    subject: `Emergency Report: ${title}`,
    text: `${content}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Report sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send report' });
  }
});

const port = process.env.PORT || 2000;

app.listen(port, () => {

  console.log(`Server listening on port ${port}`);

});
