const agentsSchema = require("./../model/agents");

const createNewAgent = async(req,res) => {
    const agent = await agentsSchema.create(req.body);

    res.json({
        data : agent
    })

}

module.exports = {
    createNewAgent
}