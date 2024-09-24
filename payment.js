const axios = require("axios");

exports.makePayment = async (phoneNumber, amount) => {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const options = {
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    };
    const params = {
      phone: phoneNumber,
      amount: amount * 100,
      email: "",
      currency: "GHS",
      mobile_money: {
        provider: "mtn",
        phone: phoneNumber,
      },
    };
    const response = await axios.post(
      "https://api.paystack.co/charge",
      params,
      options
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
