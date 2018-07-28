const immovableDataService = require('../services/immovable_data.service');


exports.getData = async function (req, res, next) {
    let query = constructQuery(req)
    try {
        let data = await immovableDataService.getData(query);

        return res.status(200).json({
            status: 200,
            data: data,
            message: "Successfully received data"
        })
    }
    catch (e) {
        next(e);
    }
}

exports.createEntry = async function (req, res, next) {
    let entry = {
        immovableId: req.body.entry.immovableId,
        charge: req.body.entry.charge,
        time: req.body.entry.time
    }

    try {
        let data = await immovableDataService.createEntry(entry);

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
    if (req.query.immovableId) {
        query["immovableId"] = req.query.immovableId
    }
    return query;
}