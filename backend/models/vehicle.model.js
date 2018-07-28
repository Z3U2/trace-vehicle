const mongoose = require('mongoose');


const VehicleSchema = new mongoose.Schema({
    _id: String,
    type: String
});

const VehicleModel = mongoose.model('Vehicle',VehicleSchema);

module.exports = VehicleModel;