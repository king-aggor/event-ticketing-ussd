const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createUser = async (
  phoneNumber,
  sessionId,
  serviceId,
  ticketType,
  amount,
  paymentType,
  paymentRef
) => {
  try {
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
  } catch (err) {
    console.log(err);
    // res.set("Content-type:text/plain");
    // res.send(err);
  }
};
