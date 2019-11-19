const axios = require("axios");

// SMS Functions
module.exports = {
    removeSpecialChar,
    sendDataToFrontlineSMS
}

function removeSpecialChar(num) {
    // remove white spaces and + in the phone number
    var regexPhoneNumber = /[^a-zA-Z0-9]+/gi;
    return num.replace(regexPhoneNumber, " ").trim();
  }
  
  /** MAKE SURE YOU HAVE THE .env FILE */
  //This allows us to trigger and send messages to Frontline Api
  function sendDataToFrontlineSMS(message, phone_number) {
    let payload = {
      apiKey: process.env.FRONTLINE_KEY,
      payload: {
        message: message,
        recipients: [{ type: "mobile", value: `${phone_number}` }]
      }
    };
    let url = "https://cloud.frontlinesms.com/api/1/webhook";
    axios.post(url, payload);
  }