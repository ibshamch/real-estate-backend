const mongoose = require("mongoose")

const agentsSchema = new mongoose.Schema({
    name : {
        type: String , 
        required: true
    },
    number : {
        type: String,
        required: true  
    },
    whatsapp : {
        type: String,
        required: true  
    },
    email : {
        type: String,
        required: true  
    },
    experience : {
        type: String,
        required: true  
    },
    description : {
        type: String,
    }
})


module.exports = mongoose.model("Agent",agentsSchema)