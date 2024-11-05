const express = require("express");
const { getAllListings,createNewListing,updateListing,deleteListing,deleteAllListings ,getListingsByAgentId,getListing,  getListingsInRadius} = require("../controllers/listings");

// Include other resource router
const usersRouter = require("./../route/users");
const router = express.Router();
// Re-route into other resource routers 
router.use("/:listingId/users",usersRouter)

router.get("/", getAllListings);

router
.route("/radius/:zipcode/:distance")
.get(getListingsInRadius)

router.get("/agents/:agentId",getListingsByAgentId);

router.get("/:id",getListing)

router.post("/createNewListing",createNewListing);

router.put("/updateListing/:id",updateListing)

router
  .delete("/deleteListing/:id", deleteListing)
  .delete("/deleteAllListings", deleteAllListings);



module.exports = router;

//  router aik object hai , uske andr maybe koi get name ki array , us array ke andr humne 2 route add krdiye hain , "/api/listings" , "/api/satisfiedClients" , ab hum is router object ma se ye routes nikal skte hain.
