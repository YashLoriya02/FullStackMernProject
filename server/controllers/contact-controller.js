const Contact = require('../models/contact-model')

const contactForm = async(req, res) => {
    try {
        const response = req.body
        await Contact.create(response)
        return res.send({message : "Data Saved Successfully."})
    } catch (error) {
        res.send({message : "Some Error Occured."})
    }
}

module.exports = contactForm