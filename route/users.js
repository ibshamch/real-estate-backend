const express = require("express");
const router = express.Router({ mergeParams:true });
const { getAllUsers } = require("../controllers/users");

router.route("/").get(getAllUsers)


module.exports = router;