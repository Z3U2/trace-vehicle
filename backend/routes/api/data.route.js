const express = require('express'),
      router  = express.Router(),
      dataController = require('../../controllers/data.controller');



exports.DataRoute = class {
    constructor (dataRef) {
        this.dataRef = dataRef
    }

    get router() {
        router.get('/', dataController.getData)
        router.get('/markers',dataController.getMarkers)
        router.get('/lines',dataController.getLines)
        router.get('/charts',dataController.getCharts)
        router.post('/', (req, res, next) => {
            let data = {
                vehicleId: req.body.entry.vehicleId,
                lat: req.body.entry.lat,
                lng: req.body.entry.lng,
                fuel: req.body.entry.fuel,
                velocity: req.body.entry.velocity,
                time: req.body.entry.time,
                load: req.body.entry.load
            };
            this.writePositionData(data);

            next();
        });
        router.post('/', dataController.createEntry)

        return router
    }

    // Helper functions
    writePositionData(data) {
        this.dataRef
            .child(data.vehicleId)
            .set({
                lat: parseFloat(data.lat), // isNaN(data.lat) ? parseFloat(data.lat) : data.lat,
                lng: parseFloat(data.lng), // isNan(data.lng) ? parseFloat(data.lng) : data.lng
                fuel: data.fuel,
                velocity: data.velocity,
                time: data.time,
                load: data.load
            });
    }   
}