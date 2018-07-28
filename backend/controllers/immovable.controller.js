const immovableService = require('../services/immovable.service');

exports.getImmovables = async function (req, res, next) {
    try {
        let query = {}
        if (req.query.minLat && req.query.minLng && req.query.maxLat && req.query.maxLng) {
            query.lat = {
                $gt: req.query.minLat,
                $lt: req.query.maxLat
            };
            query.lng = {
                $gt: req.query.minLng,
                $lt: req.query.maxLng
            }
        }
        let immovables = await immovableService.getImmovables(query);

        return res.status(200).json({
            status: 200,
            data: immovables,
            message: "Successfully received immovables"
        })
    }
    catch (e) {
        next(e)
    }
}

exports.getImmovable = async function (req, res, next) {
    if (!req.params.id) {
        next(Error('No id paramater'))
    }
    try {
        let immovable = await immovableService.getImmovable(req.params.id);

        return res.status(200).json({
            status: 200,
            data: immovable,
            message: "Successfully received immovable"
        })
    }
    catch (e) {
        next(e)
    }
}

exports.createImmovable = async function (req, res, next) {
    let immovable = {
        _id: req.body.immovable._id,
        lat: req.body.immovable.lat,
        lng: req.body.immovable.lng
    }

    console.log(req.body)

    try {
        immovable = await immovableService.createImmovable(immovable)

        return res.status(200).json({
            status: 200,
            data: immovable,
            message: "Successfully created immovable"
        })
    }
    catch (e) {
        next(e)
    }
}