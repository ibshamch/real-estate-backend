const ErrorResponse = require("./../utils/errorResponse");
const listingModel = require("./../model/listings");
const asyncHandler = require("./../middleware/async");
const geocoder = require("../utils/geocoder");

const getAllListings =   asyncHandler(
  async(req, res,next) => {
    /*
    1. success : true /false 
    2. message : Request successfully done etc
    3. data : from database
    */ 


    // Advanced filtering : 
    let query;

    // Copy req.query
    const reqQuery = { ...req.query};

    // Feilds to exclude 
    const removeFields = ['select','sort','page','limit']; 

    //Loop over removeFields and delete them from reqQuery 
    removeFields.forEach(param => delete reqQuery[param])


// Create Query String
    let queryStr = JSON.stringify(reqQuery); 
// Creating Operators $gt $gte 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

// Finding resource
    query = listingModel.find(JSON.parse(queryStr));


// Select Fields 
if(req.query.select){
  console.log(req.query.select)
  const fields = req.query.select.split(',').join(" ")
  query = query.select(fields);
}

//Sort
if(req.query.sort){
  const sortBy = req.query.sort.split(",").join('');
  query = query.sort(sortBy);
}else{
query = query.sort('-createdAt')
}


// Pagination 
const page = parseInt(req.query.page, 10) || 1 ;
const limit = parseInt(req.query.limit, 10) || 10 ;
console.log(page,limit)
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await listingModel.countDocuments();
query = query.skip(startIndex).limit(limit);


    // Executing the query
      const listings = await query;

// Pagination result 
const pagination = {};
if(endIndex < total){
  pagination.next = {
    page : page + 1,
    limit
  }
}

if(startIndex > 0){
  pagination.prev = {
    page : page - 1,
    limit
  }
}


      res.status(200).json(
          {
            success : true,
            message:"All listings fetched successfully from the database",
            count: listings.length,
            pagination,
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




// @desc  Get listings within a radius 
// @route GET /api/listings/radius/:zipcode/:distance
// @access Private


const getListingsInRadius = asyncHandler(
  async(req,res,next) => {
    const {zipcode , distance} = req.params;
    // Get lat/long from geocoder 
    const loc = await geocoder.geocode(zipcode);
    console.log(loc);

    const lat = loc[0].latitude;
    const long = loc[0].longitude;

    // Calculate the radious using radians
    // Divide distance by radius of Earth
    // Earth Radius = 3,963 miles / 6,378.1 km 
    
    const radius = distance / 3963; 

    const listings = await listingModel.find({location : {
      $geoWithin: {$centerSphere: [ [ long, lat ] , radius ]}
    }});


    res.status(200).json({
      success: true,
      count: listings.length,
      data : listings
    });
  }
)






// Advanced Filtering 














module.exports = {
  getAllListings,
  createNewListing,
  updateListing,
  deleteListing,
  getListingsByAgentId,
  getListing,
  deleteAllListings,
  getListingsInRadius,

};
