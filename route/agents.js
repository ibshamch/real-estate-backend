const express = require("express");
const router = express.Router();
const {createNewAgent} = require("./../controllers/agents")

router.post("/createAgent",createNewAgent);


module.exports = router;