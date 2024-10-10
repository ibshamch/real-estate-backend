const express = require("express");
const router = express.Router();
const { getAllListings } = require("../controllers/listings");
router.get("/", getAllListings);

module.exports = router;

//  router aik object hai , uske andr maybe koi get name ki array , us array ke andr humne 2 route add krdiye hain , "/api/listings" , "/api/satisfiedClients" , ab hum is router object ma se ye routes nikal skte hain.
