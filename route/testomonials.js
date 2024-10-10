const express = require("express");
const router = express.Router();
const { getAllTestomonials } = require("./../controllers/testomonials");
router.get("/", getAllTestomonials);

module.exports = router;
