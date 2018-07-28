const dataService = require('../services/data.service');

exports.getLines = async function(req, res, next) {
    let query = constructQuery(req)
    try {
        let lines = await dataService.getLines(query);

        return res.status(200).json({
            status:200,
            data: lines,
            message: "Successfully received lines"
        })
    }
    catch (e) {
        next(e);
    }
}

exports.getCharts = async function(req, res, next) {
    let query = constructQuery(req);
    try {
        let data = await dataService.getCharts(query);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Successfully received chart data"
        })
    }
    catch (e) {
        next(e)
    }
}

exports.getMarkers = async function (req, res, next) {
    let query = constructQuery(req)
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
    try {
        let data = await dataService.getMarkers(query);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Successfully received markers"
        })
    }
    catch (e) {
        next(e);
    }
}

exports.getData = async function(req, res, next) {
    let query = constructQuery(req)
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
    try {
        let data = await dataService.getData(query);

        return res.status(200).json({
            status:200,
            data: data,
            message: "Successfully received data"
        })
    }
    catch (e) {
        next(e);
    }
}

exports.createEntry = async function(req, res, next) {
    let entry = {
        vehicleId: req.body.entry.vehicleId,
        lat: req.body.entry.lat,
        lng: req.body.entry.lng,
        fuel: req.body.entry.fuel,
        velocity: req.body.entry.velocity,
        time: req.body.entry.time,
        load: req.body.entry.load
    }

    try {
        let data = await dataService.createEntry(entry);

        return res.status(200).send("ok")
    }
    catch (e) {
        next(e)
    }
}

function constructQuery(req) {
    let query = {}
    if (req.query.from && req.query.to) {
        query["time"] = {
            $gt: req.query.from,
            $lt: req.query.to
        }

    }
    else if (req.query.from) {
        query["time"] = {
            $gt: req.query.from
        }
    }
    else if (req.query.to) {
        query["time"] = {
            $lt: req.query.to
        }
    }
    if (req.query.vehicleId) {
        query["vehicleId"] = req.query.vehicleId
    }
    return query;
}