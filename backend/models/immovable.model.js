const mongoose = require('mongoose');


const ImmovableSchema = new mongoose.Schema({
    _id: String,
    lat: Number,
    lng: Number
});

const ImmovableModel = mongoose.model('Immovable',ImmovableSchema);

module.exports = ImmovableModel;