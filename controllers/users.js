const ErrorResponse = require("./../utils/errorResponse");
const usersModel = require("./../model/users");
const asyncHandler = require("./../middleware/async");

/*
 * @des Get all users  
    @route GET /api/users
 * @route GET /api/listings/:listingid/user
 * @access Public
 */


exports.getAllUsers = asyncHandler(async (req,res,next)=> {
    let query;

    if(req.params.listingId){
  // @route GET /api/listings/:listingid/user
        query = usersModel.find({listings:req.params.listingId})
    }else{
    // @route GET /api/users
        query = usersModel.find();
    }

    const users = await query;

    res.status(200).json({
        success:true,
        count:users.length,
        data:users
    })

})
