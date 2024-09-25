const axios = require("axios");
require("dotenv").config();

exports.makePayment = async (phoneNumber, amount) => {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const options = {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    };
    const params = {
      phone: phoneNumber,
      amount: amount * 100,
      email: "emmanuelaggorea@gmail.com",
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
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
