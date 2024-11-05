const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name for the user"]
    },
    email: {
        type: String,
        required: [true, "Please add an email for the user"],
        unique: true  // Optional: Enforce unique email addresses
    },
    password: {
        type: String,
        required: [true, "Please add a password for the user"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    listings: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Listing',
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
