const Service = require("../models/service-model")

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).json({message : "No Services Found"})
        }
        res.status(200).json(response)
    } catch (error) {
        console.log(`Error in Fetching Service: ${error}`)
    }
}

module.exports = services
