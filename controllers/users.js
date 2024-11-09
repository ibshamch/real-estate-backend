const ErrorResponse = require("./../utils/errorResponse");
const usersModel = require("./../model/users");
const listingModel = require("../model/listings");
const asyncHandler = require("./../middleware/async");

/*
 * @des Get all users  
   @route GET /api/users
 * @route GET /api/listings/:listingid/users
 * @access Public
 */


exports.getAllUsers = asyncHandler(async (req,res,next)=> {
    let query;

    if(req.params.listingId){
  // @route GET /api/listings/:listingid/user
        query = usersModel.find({listings:req.params.listingId})
    }else{
    // @route GET /api/users
        query = usersModel.find().populate({
            path: 'listings',
            select : 'title'
        })
    }

    const users = await query;

    res.status(200).json({
        success:true,
        count:users.length,
        data:users
    })

})



/*
 *  @des Get Single user  
    @route GET /api/user/:id
 *  @access Public
 */


    exports.getUser = asyncHandler(async (req,res,next)=> {
        const user = await usersModel.findById(req.params.userId).populate({
            path : "listings",
            select : "title description"
        });
        if(!user){
            return next(new ErrorResponse(`No user with the id of ${req.params.id}`),404)
        }

        res.status(200).json({
            success:true,
            count:user.length,
            data:user
        })
    
    })
    


    /*
 *  @des Add user  
    @route POST /api/listings/:listingId/users
 *  @access Private
 */


    exports.addUser = asyncHandler(async (req, res, next) => {
        req.body.listings = req.params.listingId;
    
        const listing = await listingModel.findById(req.params.listingId);
    
        if (!listing) {
            return next(new ErrorResponse(`No listing with the id of ${req.params.listingId}`, 404));
        }
    
        const user = await usersModel.create(req.body);
    
        res.status(200).json({
            success: true,
            data: user
        });
    });
    




        /*
 *  @des Update user  
    @route PUT /api/users/:user
 *  @access Private
 */


    exports.updateCourse = asyncHandler(async (req, res, next) => {
        
    
        const user = await usersModel.findByIdAndUpdate(req.params.userId,req.body,{
            new:true,
            runValidators: true 
        }); 
    

        if(!user){
            new ErrorResponse(`No course with id of ${req.params.userId}`), 404
        }

        res.status(200).json({
            success: true,
            data: user
        });
    });
    
        /*
 *  @des Delete user  
    @route DELETE /api/users/:user
 *  @access Private
 */
    // Maybe we update this.
    exports.deleteUser = asyncHandler(async (req, res, next) => {
        const user = await usersModel.findByIdAndDelete(req.params.userId);
    
        if (!user) {
            return next(new ErrorResponse(`No user with id of ${req.params.userId}`, 404));
        }
    
    
        res.status(200).json({
            success: true,
            data: {}
        });
    });
    
    