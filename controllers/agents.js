const agentsModel = require("./../model/agents");
const asyncHandler = require("./../middleware/async")
const ErrorResponse = require("./../middleware/error")
const createNewAgent = asyncHandler (
    async(req,res,next) => {
        const agent = await agentsModel.create(req.body);
    
        res.json({
            data : agent
        })
    
    }
)

const getAllAgents = asyncHandler(
    async(req,res,next) => {
        const agents = await agentsModel.find();
        if(agents.length === 0 ) {
            res.json ( {
                success: false ,
                message : "No Agents Found"
            }
            )
        }


        res.json({
            success : true,
            data : agents
        })
    
    }
)


const deleteAllAgents = asyncHandler(
    async(req,res,next) => {
     const result =  await agentsModel.deleteMany();
     if(result.deletedCount === 0) {
      res.status(400).json({
        success : false,
        message : "No Agents Found to Delete"
      })
     }
  
     res.status(200).json({
      success : true,
      message : "All Agents Delete Successfully"
    })
  
    }
  )

module.exports = {
    createNewAgent,
    deleteAllAgents,
    getAllAgents
}