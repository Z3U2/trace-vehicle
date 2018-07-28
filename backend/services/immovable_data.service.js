const ImmovableDataModel = require('../models/immovable_data.model');


exports.getData = async function (query) {
    try {
        // Looking for the corresponding entries
        let data = await ImmovableDataModel.find(query).sort('time');

        return data;
    }
    catch (e) {
        throw Error('Error while looking for data entries')
    }
}

exports.createEntry = async function (entry) {

    // creating new Entry Object
    let newEntry = new ImmovableDataModel({
        immovableId: entry.immovableId,
        time: entry.time,
        charge: entry.charge
    });

    try {
        // saving the Entry
        let savedEntry = await newEntry.save();

        return savedEntry;
    }
    catch (e) {
        throw Error('Error while saving data entry');
    }
}

