const express = require("express");
const dotenv = require("dotenv");

// jo is files ma variables hain unko process.env k andr daldo
dotenv.config({ path: "./config/config.env" });

const app = express();
// Ye app ab request accept kr sakti hai or response bhi de skti hai . Ye app variable hamara server hai .

const PORT = process.env.PORT || 8000;

// Creating a route

app.get("/api/listings", (req, res) => {
  res.json({
    status: "success",
    message: "Listings fetched successfully",
    data: [
      { id: 1, title: "House 1", price: 250000 },
      { id: 2, title: "House 2", price: 300000 },
      { id: 3, title: "House 3", price: 280000 },
    ],
  });
});

app.get("/api/satisfiedClients", (req, res) => {
  res.json({
    status: "success",
    message: "Satisfied clients fetched successfully",
    data: [
      { id: 1, name: "John Doe", rating: 4.5 },
      { id: 2, name: "Jane Smith", rating: 4.8 },
      { id: 3, name: "Michael Johnson", rating: 4.7 },
    ],
  });
});

app.listen(
  PORT,
  console.log(`Server running at ${PORT} Port in ${process.env.NODE_ENV}`)
);
