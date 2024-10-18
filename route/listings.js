const express = require("express");
const router = express.Router();
const { getAllListings,createNewListing,updateListing,deleteListing ,getListingsByAgentName,getListing} = require("../controllers/listings");

router.get("/", getAllListings);


router.get("/agents/:agentName",getListingsByAgentName);

router.get("/:id",getListing)

router.post("/createNewListing",createNewListing);

router.put("/updateListing/:id",updateListing)

router.delete("/deleteListing/:id",deleteListing)



module.exports = router;

//  router aik object hai , uske andr maybe koi get name ki array , us array ke andr humne 2 route add krdiye hain , "/api/listings" , "/api/satisfiedClients" , ab hum is router object ma se ye routes nikal skte hain.
