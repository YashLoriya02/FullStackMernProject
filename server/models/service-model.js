const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    service: String,
    description: String,
    price: String,
    provider: String
});

const Service = mongoose.model('services', serviceSchema);

module.exports = Service