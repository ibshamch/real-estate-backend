const ErrorResponse = require("./../utils/errorResponse");
const listingModel = require("./../model/listings");
const asyncHandler = require("./../middleware/async");

const getAllListings =   asyncHandler(
  async(req, res,next) => {
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
  }
)



const getListing = asyncHandler(
  async (req, res,next) => {
    
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
  
  }
) 




const createNewListing = asyncHandler(
  async(req, res,next) => {
    // Ye function database ke andr aik new listing daalega object form main 
 
     const listing = await listingModel.create(req.body); // Database ma new listing object banao 
     
     res.status(201).json({
       success: true,
       message:"New listing created successfully",
       data: listing
     })
   }
) 


const updateListing = 
asyncHandler(
  async(req,res,next) => {
  
      const listing = await listingModel.findByIdAndUpdate((req.params.id), req.body , {
        new:true,
        runValidators : true
      })
      res.status(200).json({
        success: true , 
        message : "Successfully Updated", 
        data: listing
      })
  
   
  }
    
)



const deleteListing = asyncHandler(
  async(req,res,next) => {
    const listing = await listingModel.findByIdAndDelete(req.params.id);
    if(!listing){
      next(new ErrorResponse("Server Error from Error Response", 500))
    }else{
      res.status(200).json({
        success: true, 
        message: "Listing deleted Successfully"
      })
    }
  }  
)

const deleteAllListings = asyncHandler(
  async(req,res,next) => {
   const result =  await listingModel.deleteMany();

   if(result.length === 0) {
    res.status(400).json({
      success : false,
      message : "No Listing Found to Delete"
    })
   }

   res.status(200).json({
    success : true,
    message : "All Listings Delete Successfully"
  })

  }
)





const getListingsByAgentId = 
asyncHandler(
  async (req, res,next) => {
      const agentId = req.params.agentId;
      console.log(agentId)
      // Find listings where agentDetails.name matches the provided agent name
      const listings = await listingModel.find({ 
        "agentDetails.id": agentId 
      });
  
      // Check if any listings were found
      if (listings.length === 0) {
        next(new ErrorResponse("No Listing Found Error from Error Response", 404))
      }
  
      // Return the found listings
      return res.status(200).json(listings);
  }  
)





module.exports = {
  getAllListings,
  createNewListing,
  updateListing,
  deleteListing,
  getListingsByAgentId,
  getListing,
  deleteAllListings
};
