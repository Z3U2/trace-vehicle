const express = require('express'),
      vehicle = require('./api/vehicle.route');
      immovable = require('./api/immovable.route');
const { DataRoute } = require('./api/data.route');
const { ImmovableDataRoute } = require('./api/immovable_data.route');

exports.ApiRoute = class {
    constructor (dataRef,immovableDataRef) {
        this.dataRef=dataRef
        this.immovableDataRef=immovableDataRef
    }

    get router() {
        let router = express.Router()
        let dataRouter = new DataRoute(this.dataRef).router
        let immovableDataRouter = new ImmovableDataRoute(this.immovableDataRef).router
        router.use('/data',dataRouter)
        router.use('/vehicles',vehicle)
        router.use('/immovables',immovable)
        router.use('/immovable_data',immovableDataRouter)
        return router
    }
}