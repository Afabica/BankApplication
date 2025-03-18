import twilio from "twilio";

export default function MessageHandler(info, res) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages.create({
    body: "OTP for password change.",
    messageServiceSid: "",
    to: "+16088798709",
  });
}
