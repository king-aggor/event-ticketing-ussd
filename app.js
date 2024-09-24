const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
  const { sessionId, serviceId, phoneNumber, text } = req.body;

  let response = "";

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
    response = `END You have requested to purchase a Regular ticket. You will recieve a propmt to make payment`;
  } else if (text == "1*2") {
    response = `END You have requested to purchase a VIP ticket. You will recieve a propmt to make payment`;
  } else if (text == "1*3") {
    response = `END You have requested to purchase an All Access ticket. You will recieve a propmt to make payment`;
  }
  res.set("Content-type:text/plain");
  res.send(response);
});

const port = 3030;
app.listen(port, () => {
  console.log(`listenting on ${port}`);
});
