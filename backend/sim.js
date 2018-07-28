const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const axios = require('axios');
const moment = require('moment');
const Papa = require('papaparse');
const fs = require('fs');

const log = console.log;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://vehicle-tracking-prototype.firebaseio.com'
});


admin
    .database()
    .ref('data')
    .remove();

const url = 'http://localhost:3000/api/data';



// This line opens the file as a readable stream
const readStreamOld = fs.createReadStream("C:/Users/Seed/Documents/pfe/new_data.csv");
const readStreamStuck = fs.createReadStream("C:/Users/Seed/Documents/pfe/stuck.csv");
const readStreamSlow = fs.createReadStream("C:/Users/Seed/Documents/pfe/slow.csv");
const readStreamNice = fs.createReadStream("C:/Users/Seed/Documents/pfe/nice.csv");

// This will wait until we know the readable stream is actually valid before doing anything
readStreamOld.on('open', function () {
    
    Papa.parse(readStreamOld, {
        header: true,
        dynamicTyping:true,
        complete: function (results) {
            for(let i in results.data) {
                setTimeout(postData,i*1000,results.data[i],"old"+i)
            }
        }
    })
});

readStreamStuck.on('open',function () {

    Papa.parse(readStreamStuck, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            var len = results.data.length
            var i = 0
            var a = 0
            var stuckInterval = setInterval( (val) => {
                if (val[a].time == i) {
                    postData(val[a], "stuck" + i)
                    a++
                }
                if (i + 1 >= len) {
                    clearInterval(stuckInterval)
                }
                i++;
            }, 1000, results.data)
        }
    })
})

readStreamSlow.on('open', function () {

    Papa.parse(readStreamSlow, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            var len = results.data.length
            var i = 0
            var a = 0
            var slowInterval = setInterval((val) => {
                if (val[a].time == i) {
                    postData(val[a], "slow" + i)
                    a++
                }
                if (i + 1 >= len) {
                    clearInterval(slowInterval)
                }
                i++;
            }, 1000, results.data)
        }
    })
})

readStreamNice.on('open', function () {

    Papa.parse(readStreamNice, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            var len = results.data.length
            var i = 0
            var a = 0
            var niceInterval = setInterval((val) => {
                if (val[a].time == i) {
                    postData(val[a], "nice" + i)
                    a++
                }
                if (i + 1 >= len) {
                    clearInterval(niceInterval)
                }
                i++;
            }, 1000, results.data)
        }
    })
})


// for (let i in positions) {
//     setTimeout(postData, i * 1000, positions[i], i);
// }

function postData(val,label) {
    console.log(label)
    let ID = label.match(/^[a-zA-Z]*/g)[0]
    // console.log(ID + " : " + val.time)
    //console.log(ID + " : " + JSON.stringify(val))
    axios
        .post(url, {
            entry: {
                vehicleId: ID,
                lat: val.Y,
                lng: val.X,
                fuel: val.fuel,
                velocity: val.velocity,
                time: moment().valueOf(),
                load: 20
            }
        })
        .then(res => {
            //console.log(res.data);
        })
        .catch(err => {
            console.log('err')
            //console.log(err);
        });
}
