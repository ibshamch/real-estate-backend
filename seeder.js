const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load models
const listingsModel = require("./model/listings");

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected'))
  .catch(err => console.error(err));

// Read the JSON Files
const listings = JSON.parse(fs.readFileSync(`${__dirname}/data/listings.json`, 'utf-8'));

// Import into DB
const importData = async () => {
    try {
        await listingsModel.create(listings);
        console.log('Data imported...');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// Delete Data from DB
const deleteData = async () => {
    try {
        await listingsModel.deleteMany();
        console.log('Data destroyed...');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

// Check command line arguments
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
