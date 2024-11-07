const express = require("express");
const router = express.Router({ mergeParams:true });
const { getAllUsers , getUser, addUser} = require("../controllers/users");

router.route("/").get(getAllUsers).post(addUser);

router.route("/:userId").get(getUser);


module.exports = router;