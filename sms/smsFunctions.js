const sms = require("./smsHelper");

// SMS Functions
module.exports = {
    removeSpecialChar,
    sendDataToFrontlineSMS,
    changeDriverAvailability
}

function removeSpecialChar(num) {
    // remove whitespaces and + in the phone number
    var regexPhoneNumber = /[^a-zA-Z0-9]+/gi;
    return num.replace(regexPhoneNumber, " ").trim();
  }
  
  /** MAKE SURE YOU HAVE THE .env FILE */
  function sendDataToFrontlineSMS(message, phone_number) {
    let payload = {
      apiKey: process.env.FRONTLINE_KEY,
      payload: {
        message: message,
        recipients: [{ type: "mobile", value: `+${phone_number}` }]
      }
    };
    let url = "https://cloud.frontlinesms.com/api/1/webhook";
    axios.post(url, payload);
  }

  function changeDriverAvailability(id, data) {
    sms
      .updateDriverAvailability(id, data)
      .then(driver => driver)
      .catch(err => console.log(err));
  }