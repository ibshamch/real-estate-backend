const express = require("express");
const dotenv = require("dotenv");

// jo is files ma variables hain unko process.env k andr daldo
dotenv.config({ path: "./config/config.env" });

const app = express();
// Ye app ab request accept kr sakti hai or response bhi de skti hai . Ye app variable hamara server hai .

const PORT = process.env.PORT || 8000;

// GET route
app.get("/", (req, res) => {
  res.json({
    message: "GET request received",
  });
});

app.listen(
  PORT,
  console.log(`Server running at ${PORT} Port in ${process.env.NODE_ENV}`)
);
