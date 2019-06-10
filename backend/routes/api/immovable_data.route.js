const express = require('express'),
    immovableDataController = require('../../controllers/immovable_data.controller');



exports.ImmovableDataRoute = class {
    constructor(immovableDataRef) {
        this.immovableDataRef = immovableDataRef
    }

    get router() {
        let router = express.Router()
        router.get('/', immovableDataController.getData)
        router.post('/', (req, res, next) => {
            let data = {
                immovableId: req.body.entry.immovableId,
                charge: req.body.entry.charge,
                time: req.body.entry.time
            };
            this.writePositionData(data);

            next();
        });
        router.post('/', immovableDataController.createEntry)

        return router
    }

    // Helper functions
    writePositionData(data) {
        this.immovableDataRef
            .child(data.immovableId)
            .set({
                charge: data.charge,
                time: data.time
            });
    }
}