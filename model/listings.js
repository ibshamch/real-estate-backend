const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("./../utils/geocoder")
const listingsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  }
  ,
  property: {
    type: String,
    required: true,
  },
  slug : String,
  size: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,  // String to handle currency symbols or time periods
    required: true,
  },
  address : {
    type: String, 
    required: [true, 'Please add an address'] 
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    country: String,
    zipcode: String,
    type: {
      type: String,
      enum: ["Point"],
    },
    formattedAddress: {
      type:String
    },
    coordinates: {
      type : [Number],
      index: "2dsphere"
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
    id : {
      type: String , 
      required : true
    },
    number: {
      type: String,  
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
  
},{
  toJSON : {
    virtuals : true
  },
  toObject : {
    virtuals : true
  }
});


listingsSchema.pre("save",function(next){
this.slug = slugify(this.title, {lower : true})
next()
});


//Geocode & create location field 
listingsSchema.pre("save", async function(next){
const loc = await geocoder.geocode(this.address);
 if (loc.length > 0) {
        this.location = {
            type: "Point", 
            coordinates: [loc[0].longitude, loc[0].latitude],
            formattedAddress: loc[0].formattedAddress,
            street: loc[0].streetName,
            city: loc[0].city || this.location.city,
            state: loc[0].state,
            zipcode: loc[0].zipcode,
            country: loc[0].country,
        };
    } else {
        console.log('No location found for address:', this.address);
    }



// do not save address in database : 
this.address = undefined;

next();
})


// // Cascade delete users if listing is deleted 
// listingsSchema.pre("remove", async function (next) {
//   await this.model("User").deleteMany({ listings: this._id });
//   next();
// });




// Reverse populate with virtuals
listingsSchema.virtual("user", {
  ref: "User",              // The model to reference (User model)
  localField: "_id",        // Field in the Listing model
  foreignField: "listings", // Field in the User model
  justOne: false            // Set to false to get an array (in case of multiple matches)
});


module.exports = mongoose.model('Listing', listingsSchema);


