const listingModel = require("./../model/listings");



const getAllListings = async(req, res) => {
  /*
  1. success : true /false 
  2. message : Request successfully done etc
  3. data : from database
  */ 
  const listings = await listingModel.find();
  
  res.status(200).json(
      {
        success : true,
        message:"All listings fetched successfully from the database",
        data : listings
      }
  );
};

const getListing = async (req, res) => {
  try {
    const listing = await listingModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "One listing fetched successfully",
      data: listing,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching listing",
      error: error.message, // Including error details can help during debugging
    });
  }
};




const createNewListing = async(req, res) => {
 // Ye function database ke andr aik new listing daalega object form main 
try {
  const listing = await listingModel.create(req.body); // Database ma new listing object banao 
  
  res.status(201).json({
    success: true,
    message:"New listing created successfully",
    data: listing
  })

} catch (error) {
  res.status(400).json({
    success:false,
    message: "Error creating new listing",
  })  
}



}


const updateListing = async(req,res) => {
  try {
    const listing = await listingModel.findByIdAndUpdate((req.params.id), req.body , {
      new:true,
      runValidators : true
    })
    res.status(200).json({
      success: true , 
      message : "Successfully Updated", 
      data: listing
    })

  } catch (error) {
    res.status(400).json({
      success:false,
      message: "Error creating new listing",
    })  
  }
}


const deleteListing = async(req,res) => {
  const listing = await listingModel.findByIdAndDelete(req.params.id);
  if(!listing){
    res.status(400).json({
      success: false, 
      message: "No Listing Found"
    })
  }else{
    res.status(200).json({
      success: true, 
      message: "Listing deleted Successfully"
    })
  }
}

const getListingsByAgentName = async (req, res) => {
  try {
    const agentName = req.params.agentName;
    console.log(agentName)
    // Find listings where agentDetails.name matches the provided agent name
    const listings = await listingModel.find({ 
      "agentDetails.name": agentName 
    });

    // Check if any listings were found
    if (listings.length === 0) {
      return res.status(404).json({ message: 'No listings found posted by this agent.' });
    }

    // Return the found listings
    return res.status(200).json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};




module.exports = {
  getAllListings,
  createNewListing,
  updateListing,
  deleteListing,
  getListingsByAgentName,
  getListing
};
