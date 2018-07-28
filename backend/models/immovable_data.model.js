const mongoose = require('mongoose');

const ImmovableDataSchema = new mongoose.Schema({
    immovableId: {
        type: String,
        ref: 'Immovable'
    },
    charge: {
        type: Number,
        min: 0,
        max: 100
    },
    time: Number
});

const ImmovableDataModel = mongoose.model('Immovable_Data', ImmovableDataSchema);

module.exports = ImmovableDataModel;