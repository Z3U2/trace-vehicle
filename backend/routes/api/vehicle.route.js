const express = require('express'),
    router = express.Router(),
    vehicleController = require('../../controllers/vehicle.controller');



router.get('/',vehicleController.getVehicles)

router.get('/:id',vehicleController.getVehicle)

router.post('/',vehicleController.createVehicle)

module.exports = router