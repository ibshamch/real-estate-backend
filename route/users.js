const express = require("express");
const router = express.Router({ mergeParams:true });
const { getAllUsers , getUser, addUser , updateCourse,deleteUser} = require("../controllers/users");

router.route("/").get(getAllUsers).post(addUser);

router.route("/:userId").get(getUser).put(updateCourse).delete(deleteUser)


module.exports = router;