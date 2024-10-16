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



module.exports = {
  getAllListings,
  createNewListing
};
