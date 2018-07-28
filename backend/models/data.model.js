const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        ref: 'Vehicle'
    },
    lat: Number,    
    lng: Number,
    fuel: {
        type: Number,
        min: 0,
        max: 100
    },
    velocity: Number,
    time: Number,
    load: {
        type: Number,
        min: 0,
        max: 100
    }
});

const DataModel = mongoose.model('Data',DataSchema);

module.exports = DataModel;