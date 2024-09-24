const express = require("express");
const bodyParser = require("body-parser");
// const prisma = require("./prisma");
const { PrismaClient } = require("@prisma/client");

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
      response = `CON You have requested to purchase a Regular ticket(GHc500)
    1. Confirm
    `;
    } else if (text == "1*2") {
      response = `CON You have requested to purchase a VIP (GHc700)
    1. Confirm
    `;
    } else if (text == "1*3") {
      response = `CON You have requested to purchase a All Access (GHc1000)
    1. Confirm
    `;
    } else if (text == "1*1*1") {
      const ticketType = "Regular";
      const amount = 500.0;
      const paymentType = "momo";
      const paymentRef = "efeefe";
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
    } else if (text == "1*2*1") {
      const ticketType = "VIP";
      const amount = 700.0;
      const paymentType = "momo";
      const paymentRef = "efeefe";
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
    } else if (text == "1*3*1") {
      const ticketType = "All Access";
      const amount = 1000.0;
      const paymentType = "momo";
      const paymentRef = "efeefe";
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
      response = `END You have requested to purchase an All Access Ticket for (GHc1000)
    You will recieve a mobile money prompt to confirm your purchase
    `;
    }
    res.set("Content-type:text/plain");
    res.send(response);
  } catch (err) {
    res.set("Content-type:text/plain");
    res.send(err);
  }
});

const port = 3030;
app.listen(port, () => {
  console.log(`listenting on ${port}`);
});
