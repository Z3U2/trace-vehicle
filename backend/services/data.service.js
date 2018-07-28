const DataModel = require('../models/data.model');

exports.getData = async function(query){
    try {
        // Looking for the corresponding entries
        let data = await DataModel.find(query).sort('time');

        return data;
    }
    catch (e) {
        throw Error('Error while looking for data entries')
    }
}

exports.getLines = async function(query){
    try  {
        // Looking for lat and lng only
        let lines = await DataModel.find(query,'lat lng').sort('time');

        return lines;
    }
    catch (e) {
        throw Error('Error while looking for lines')
    }
}

exports.getCharts = async function(query){
    try {
        // Looking for chart data
        let data = await DataModel.find(query,'fuel time velocity').sort('time');
        
        return data;
    }
    catch (e) {
        throw Error('Error while looking for chart data')
    }
}

exports.getMarkers = async function(query){
    try {
        // Looking for the corresponding entries
        let data = await DataModel.find(query).sort('time');

        let newData = [];

        if ( data.length >= 30 ) {
            let step = Math.floor(data.length / 30);
            let i = 0;
            while (i < data.length - 1 ) {
                newData.push(data[i])
                i += step;
            }
            newData.push(data[data.length-1])
            return newData
        }
        else {
            return data;
        }
    }
    catch (e) {
        throw Error('Error while looking for data entries')
    }
}

exports.createEntry = async function(entry) {

    // creating new Entry Object
    let newEntry = new DataModel({
        vehicleId: entry.vehicleId,
        lat: entry.lat,
        lng: entry.lng,
        fuel: entry.fuel,
        velocity: entry.velocity,
        time: entry.time,
        load: entry.load     
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

