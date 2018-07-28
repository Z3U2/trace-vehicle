const ImmovableModel = require('../models/immovable.model');

exports.getImmovables = async function (query) {
    try {
        let immovables = await ImmovableModel.find(query);

        return immovables;
    }
    catch (e) {
        throw Error('Error while looking for immovables')
    }
}

exports.getImmovable = async function (id) {
    try {
        let immovable = await ImmovableModel.findById(id);

        return immovable;
    }
    catch (e) {
        throw Error('Error while looking for immovable')
    }
}

exports.createImmovable = async function (immovable) {

    let newImmovable = new ImmovableModel({
        _id: immovable._id,
        lat: immovable.lat,
        lng: immovable.lng
    })

    try {
        let savedImmovable = await newImmovable.save();
        return savedImmovable;
    }
    catch (e) {
        throw Error('Error while creating immovable')
    }

}