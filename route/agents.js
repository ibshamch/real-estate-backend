const express = require("express");
const router = express.Router();
const {createNewAgent,deleteAllAgents,getAllAgents} = require("./../controllers/agents")

router.post("/createAgent",createNewAgent);

router
.get("/",getAllAgents)

router.delete("/deleteAllAgents",deleteAllAgents)


module.exports = router;