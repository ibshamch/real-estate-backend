const agentsSchema = require("./../model/agents");

const createNewAgent = async(req,res,next) => {
    const agent = await agentsSchema.create(req.body);

    res.json({
        data : agent
    })

}

module.exports = {
    createNewAgent
}