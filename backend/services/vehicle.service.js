const VehicleModel = require('../models/vehicle.model');

exports.getVehicles = async function(query) {
    try {
        let vehicles = await VehicleModel.find(query);

        return vehicles;
    }
    catch (e) {
        throw Error('Error while looking for vehicles')
    }
}

exports.getVehicle = async function(id) {
    try {
        let vehicle = await VehicleModel.findById(id);

        return vehicle;
    }
    catch (e) {
        throw Error('Error while looking for vehicle')
    }
}

exports.createVehicle = async function(vehicle) {

    let newVehicle = new VehicleModel({
        _id: vehicle._id,
        type: vehicle.type
    })

    try {
        let savedVehicle = await newVehicle.save();
    }
    catch (e) {
        throw Error('Error while creating vehicle')
    }

}