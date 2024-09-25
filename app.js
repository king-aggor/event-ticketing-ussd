const express = require("express");
const bodyParser = require("body-parser");
// const prisma = require("./prisma");
const { PrismaClient } = require("@prisma/client");
const payment = require("./payment");

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", async (req, res) => {
  const { sessionId, serviceId, phoneNumber, text } = req.body;

  let response = "";
  try {
    if (text == "") {
      response = `CON welcome ${phoneNumber} to event ticketing
    1. Purchase a Ticket
    2. Enquire About Event
    `;
    } else if (text == "1") {
      response = `CON Select The Type of Ticket
     1. Regular (GHc700)
     2. VIP (GHc1000)
     3. All Access (GHc500)
     `;
    } else if (text == "2") {
      response = `END 420 Club Jungle Party is a stonner event party help in the jungle on the last friday of every month`;
    } else if (text == "1*1") {
      response = `CON You have requested to purchase a Regular Ticket. GHc500 will be deducted from your momo account
    1. Confirm
    `;
    } else if (text == "1*2") {
      response = `CON You have requested to purchase a VIP Ticket. GHc700 will be deducted from your momo account
    1. Confirm
    `;
    } else if (text == "1*3") {
      response = `CON You have requested to purchase an All Access Ticket. GHc1000 will be deducted from your momo account
    1. Confirm
    `;
    } else if (text == "1*1*1") {
      const paymentResponse = await payment.makePayment(phoneNumber, 500.0);

      const ticketType = "Regular";
      const amount = 500.0;
      const paymentType = "momo";
      if (paymentResponse.data.status === "success") {
        const paymentRef = paymentResponse.data.reference;
        await prisma.user.create({
          data: {
            phoneNumber,
            sessionId,
            serviceId,
            ticketType,
            amount,
            paymentType,
            paymentRef,
          },
        });
        response = `END You have requested to purchase a Regular Ticket for GHc500
    You will recieve a mobile money prompt to confirm your purchase
    `;
      } else {
        response = `END Payment Failed`;
      }
    } else if (text == "1*2*1") {
      const paymentResponse = await payment.makePayment(phoneNumber, 700.0);
      const ticketType = "VIP";
      const amount = 700.0;
      const paymentType = "momo";
      if (paymentResponse.data.status === "success") {
        const paymentRef = paymentResponse.data.reference;
        await prisma.user.create({
          data: {
            phoneNumber,
            sessionId,
            serviceId,
            ticketType,
            amount,
            paymentType,
            paymentRef,
          },
        });
        response = `END You have requested to purchase a VIP Ticket for (GHc700)
    You will recieve a mobile money prompt to confirm your purchase
    `;
      } else {
        response = `END Payment Failed`;
      }
    } else if (text == "1*3*1") {
      const paymentResponse = await payment.makePayment(phoneNumber, 1000.0);
      const ticketType = "All Access";
      const amount = 1000.0;
      const paymentType = "momo";
      if (paymentResponse.data.status === "success") {
        const paymentRef = paymentResponse.data.reference;
        await prisma.user.create({
          data: {
            phoneNumber,
            sessionId,
            serviceId,
            ticketType,
            amount,
            paymentType,
            paymentRef,
          },
        });
        // console.log(paymentResponse);
        response = `END You have requested to purchase an All Access Ticket for (GHc1000)
    You will recieve a mobile money prompt to confirm your purchase
    `;
      } else {
        response = `END Payment Failed`;
      }
      //   console.log(paymentResponse);
      //   response = `END You have requested to purchase an All Access Ticket for (GHc1000)
      // You will recieve a mobile money prompt to confirm your purchase
      // `;
    }
    res.set("Content-type:text/plain");
    res.send(response);
  } catch (err) {
    console.log(err);
    res.set("Content-type:text/plain");
    res.send(err);
  }
});

const port = 3030;
app.listen(port, () => {
  console.log(`listenting on ${port}`);
});
