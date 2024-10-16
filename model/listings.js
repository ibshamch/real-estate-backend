const mongoose = require("mongoose");

const listingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  property: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,  // String to handle currency symbols or time periods
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phase: String,  // Optional by default
    block: String,  // Optional by default
    lat: String,    // Optional by default
    long: String,   // Optional by default
  },
  builtIn: {
    type: Number,  // Optional
  },
  features: {
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    corner: {
      type: Boolean,
    },
  },
  details: {
    type: String,
    required: true,
  },
  agentDetails: {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,  // Changed to string for better phone number handling
      required: true,
    },
    whatsapp: {
      type: String,  // Changed to string for international phone numbers
      required: true,
    },
  },
  isFeatured: {
    type: Boolean,
    required: true,
  },
  imageLinks: {
    mainImage: {
      type: String,
      required: true,
    },
    galleryImages: {
      type: [String],
      default: [],   // Default to an empty array if no gallery images provided
    },
  },
});

module.exports = mongoose.model('Listing', listingsSchema);
