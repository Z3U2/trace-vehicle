const vehicleService = require('../services/vehicle.service');

exports.getVehicles = async function(req, res, next) {
    try {
        let vehicles = await vehicleService.getVehicles({});

        return res.status(200).json({
            status: 200,
            data: vehicles,
            message: "Successfully received vehicles"
        })
    }
    catch (e) {
        next(e)
    }
}

exports.getVehicle = async function(req, res, next) {
    if (!req.params.id) {
        next (Error('No id paramater'))
    }
    try {
        let vehicle = await vehicleService.getVehicle(req.params.id);

        return res.status(200).json({
            status:200,
            data: vehicle,
            message: "Successfully received vehicle"
        })
    }
    catch (e) {
        next(e)
    }
}

exports.createVehicle = async function(req, res, next) {
    let vehicle = {
        _id: req.body.vehicle._id,
        type: req.body.vehicle.type
    }

    try {
        vehicle = await vehicleService.createVehicle(vehicle)

        return res.status(200).json({
            status: 200,
            data: vehicle,
            message: "Successfully created vehicle"
        })
    }
    catch (e){
        next(e)
    }
}