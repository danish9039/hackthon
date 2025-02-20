const axios = require("axios");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN 
const twilioNumber = process.env.TWILIO_PHONE_NUMBER 
const emergencyNumber = process.env.EMERGENCY_PHONE_NUMBER // Change to your local emergency number
if (!accountSid || !authToken || !twilioNumber || !emergencyNumber) {
    throw new Error("Twilio environment variables not configured properly!");
  }
const client = twilio(accountSid, authToken);

const sendSOSAlert = async (req, res) => {
  const { lat, lng } = req.body;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Location data is required" });
  }

  const locationLink = `https://www.google.com/maps?q=${lat},${lng}`;
  const message = `🚨 EMERGENCY ALERT! 🚨\nLocation: ${locationLink}\nPlease respond immediately.`;

  try {
    await client.messages.create({
      body: message,
      from: twilioNumber,
      to: emergencyNumber,
    });

    res.json({ success: true, message: "SOS alert sent successfully!" });
  } catch (error) {
    console.error("Error sending SOS alert:", error);
    res.status(500).json({ error: "Failed to send SOS alert" });
  }
};

module.exports = { sendSOSAlert };
