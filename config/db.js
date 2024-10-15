const mongoose = require("mongoose")
// Hum mongoose ka use kar rhe hain take hum apne project/server ko database ke saat connect kar skein.
// Database ke saat connect hone ma time lagta ha . To hum async function ka use kreinge 
const connectDB =  async () => {
    // first line : mujhe promise nai do , mujhe data do .
    const conn = await mongoose.connect(process.env.MONGO_URI);  
    console.log(`Mongo Connected: ${conn.connection.host}`)
}

module.exports = connectDB