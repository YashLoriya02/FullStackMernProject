const mongoose = require('mongoose')
const uri = process.env.MONGO_URI

const connectToDatabase = async () => {
    try {
        await mongoose.connect(uri)
        console.log("Database Connected Succesfully.")
    } catch (error) {
        console.log("Connection Error.")
        console.log(error)
        process.exit(0)
    }
}

module.exports = connectToDatabase