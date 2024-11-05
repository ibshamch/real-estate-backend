const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, "Please add a email for the user"]
    },
    password: {
        type: String,
        required: [true,"Please add password for the user"]
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    listing: {
        type: mongoose.Schema.ObjectId,
        ref : 'Listing',
        required : true
    }
});



module.exports = mongoose.model("User",userSchema);
