const express = require("express");
const dotenv = require("dotenv");
const listingRouter = require("./route/listings");
const testomonialsRouter = require("./route/testomonials");
const morgan = require("morgan");
// jo is files ma variables hain unko process.env k andr daldo
dotenv.config({ path: "./config/config.env" });

const app = express();
// Ye app ab request accept kr sakti hai or response bhi de skti hai . Ye app variable hamara server hai .

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Server ko batao ke router object ma jo routes hain uska use krle
app.use("/api/listings", listingRouter);
app.use("/api/satisfiedClients", testomonialsRouter);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running at ${PORT} Port in ${process.env.NODE_ENV}`)
);
