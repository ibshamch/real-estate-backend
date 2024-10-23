// This helps us avoid using try catch again and again

const asyncHandler = (fn) => (req,res,next) =>  {
    return Promise.resolve(fn(req,res,next).catch(next));
}

module.exports = asyncHandler;